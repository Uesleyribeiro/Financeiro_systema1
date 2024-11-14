from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from flask_jwt_extended import JWTManager, jwt_required, create_access_token, get_jwt_identity
from dotenv import load_dotenv
import os
from datetime import timedelta
from models import db, Usuario, Empresa, PlanoContas, Transacao
from utils.relatorios import gerar_balanco, gerar_dre, gerar_fluxo_caixa
from flask_marshmallow import Marshmallow
from marshmallow import ValidationError

ma = Marshmallow(app)

load_dotenv()

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY')
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=1)

db.init_app(app)
migrate = Migrate(app, db)
CORS(app)
jwt = JWTManager(app)

class Usuario(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password_hash = db.Column(db.String(128))
    role = db.Column(db.String(20), nullable=False, default='user')

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)


@app.route('/api/register', methods=['POST'])
def register():
    data = request.json
    if Usuario.query.filter_by(username=data['username']).first():
        return jsonify({"msg": "Username already exists"}), 400

    new_user = Usuario(username=data['username'])
    new_user.set_password(data['password'])
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"msg": "User created successfully"}), 201


@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    user = Usuario.query.filter_by(username=data['username']).first()
    if user and user.check_password(data['password']):
        access_token = create_access_token(identity=user.id, additional_claims={'role': user.role})
        return jsonify(access_token=access_token), 200
    return jsonify({"msg": "Bad username or password"}), 401


@app.route('/api/protected', methods=['GET'])
@jwt_required()
def protected():
    current_user_id = get_jwt_identity()
    return jsonify(logged_in_as=current_user_id), 200


@app.route('/api/login', methods=['POST'])
def login():
    if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"}), 400

    username = request.json.get('username', None)
    password = request.json.get('password', None)

    if not username or not password:
        return jsonify({"msg": "Missing username or password"}), 400

    user = Usuario.query.filter_by(username=username).first()
    if user and user.check_password(password):
        access_token = create_access_token(identity=username)
        return jsonify(access_token=access_token), 200
    else:
        return jsonify({"msg": "Bad username or password"}), 401

@app.route('/api/empresas', methods=['GET', 'POST'])
@jwt_required()
def empresas():
    if request.method == 'POST':
        data = request.json
        nova_empresa = Empresa(nome=data['nome'], cnpj=data['cnpj'])
        db.session.add(nova_empresa)
        db.session.commit()
        return jsonify({"message": "Empresa criada com sucesso", "id": nova_empresa.id}), 201
    else:
        page = request.args.get('page', 1, type=int)
        per_page = request.args.get('per_page', 10, type=int)
        empresas = Empresa.query.paginate(page=page, per_page=per_page, error_out=False)
        return jsonify({
            'items': [e.to_dict() for e in empresas.items],
            'total': empresas.total,
            'pages': empresas.pages,
            'page': page
        })

@app.route('/api/plano-contas', methods=['GET', 'POST'])
@jwt_required()
def plano_contas():
    if request.method == 'POST':
        data = request.json
        novo_plano = PlanoContas(
            empresa_id=data['empresa_id'],
            codigo=data['codigo'],
            descricao=data['descricao'],
            tipo=data['tipo']
        )
        db.session.add(novo_plano)
        db.session.commit()
        return jsonify({"message": "Plano de contas criado com sucesso", "id": novo_plano.id}), 201
    else:
        page = request.args.get('page', 1, type=int)
        per_page = request.args.get('per_page', 10, type=int)
        planos = PlanoContas.query.paginate(page=page, per_page=per_page, error_out=False)
        return jsonify({
            'items': [p.to_dict() for p in planos.items],
            'total': planos.total,
            'pages': planos.pages,
            'page': page
        })

@app.route('/api/transacoes', methods=['GET', 'POST'])
@jwt_required()
def transacoes():
    if request.method == 'POST':
        data = request.json
        nova_transacao = Transacao(
            empresa_id=data['empresa_id'],
            plano_contas_id=data['plano_contas_id'],
            data=data['data'],
            valor=data['valor'],
            descricao=data.get('descricao', '')
        )
        db.session.add(nova_transacao)
        db.session.commit()
        return jsonify({"message": "Transação registrada com sucesso", "id": nova_transacao.id}), 201
    else:
        page = request.args.get('page', 1, type=int)
        per_page = request.args.get('per_page', 10, type=int)
        transacoes = Transacao.query.paginate(page=page, per_page=per_page, error_out=False)
        return jsonify({
            'items': [t.to_dict() for t in transacoes.items],
            'total': transacoes.total,
            'pages': transacoes.pages,
            'page': page
        })

@app.route('/api/relatorios/balanco', methods=['GET'])
@jwt_required()
def balanco():
    empresa_id = request.args.get('empresa_id', type=int)
    data = request.args.get('data')
    if not empresa_id:
        return jsonify({"error": "Empresa ID é obrigatório"}), 400
    balanco = gerar_balanco(empresa_id, data)
    return jsonify(balanco)

@app.route('/api/relatorios/dre', methods=['GET'])
@jwt_required()
def dre():
    empresa_id = request.args.get('empresa_id', type=int)
    data_inicio = request.args.get('data_inicio')
    data_fim = request.args.get('data_fim')
    if not all([empresa_id, data_inicio, data_fim]):
        return jsonify({"error": "Empresa ID, data de início e data de fim são obrigatórios"}), 400
    dre = gerar_dre(empresa_id, data_inicio, data_fim)
    return jsonify(dre)

@app.route('/api/relatorios/fluxo-caixa', methods=['GET'])
@jwt_required()
def fluxo_caixa():
    empresa_id = request.args.get('empresa_id', type=int)
    data_inicio = request.args.get('data_inicio')
    data_fim = request.args.get('data_fim')
    if not all([empresa_id, data_inicio, data_fim]):
        return jsonify({"error": "Empresa ID, data de início e data de fim são obrigatórios"}), 400
    fluxo_caixa = gerar_fluxo_caixa(empresa_id, data_inicio, data_fim)
    return jsonify(fluxo_caixa)

@app.errorhandler(404)
def not_found(error):
    return jsonify({"error": "Recurso não encontrado"}), 404

@app.errorhandler(500)
def internal_error(error):
    return jsonify({"error": "Erro interno do servidor"}), 500

if __name__ == '__main__':
    debug_mode = os.getenv('FLASK_DEBUG', 'False').lower() in ['true', '1', 't']
    app.run(debug=debug_mode)
