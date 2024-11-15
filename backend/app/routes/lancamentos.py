from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from ..models.lancamento import Lancamento
from ..schemas.lancamento import lancamento_schema, lancamentos_schema
from ..services.lancamento_service import criar_lancamento, atualizar_lancamento, deletar_lancamento

bp = Blueprint('lancamentos', __name__, url_prefix='/api/lancamentos')

@bp.route('', methods=['GET'])
@jwt_required()
def listar_lancamentos():
    lancamentos = Lancamento.query.all()
    return jsonify(lancamentos_schema.dump(lancamentos)), 200

@bp.route('', methods=['POST'])
@jwt_required()
def criar():
    data = request.json
    novo_lancamento = criar_lancamento(data)
    return jsonify(lancamento_schema.dump(novo_lancamento)), 201

@bp.route('/<int:id>', methods=['GET'])
@jwt_required()
def obter_lancamento(id):
    lancamento = Lancamento.query.get_or_404(id)
    return jsonify(lancamento_schema.dump(lancamento)), 200

@bp.route('/<int:id>', methods=['PUT'])
@jwt_required()
def atualizar(id):
    data = request.json
    lancamento_atualizado = atualizar_lancamento(id, data)
    return jsonify(lancamento_schema.dump(lancamento_atualizado)), 200

@bp.route('/<int:id>', methods=['DELETE'])
@jwt_required()
def deletar(id):
    deletar_lancamento(id)
    return '', 204

@bp.route('/filtrar', methods=['GET'])
@jwt_required()
def filtrar_lancamentos():
    data_inicio = request.args.get('data_inicio')
    data_fim = request.args.get('data_fim')
    tipo = request.args.get('tipo')
    categoria = request.args.get('categoria')

    query = Lancamento.query

    if data_inicio and data_fim:
        query = query.filter(Lancamento.data.between(data_inicio, data_fim))
    if tipo:
        query = query.filter(Lancamento.tipo == tipo)
    if categoria:
        query = query.filter(Lancamento.categoria.has(nome=categoria))

    lancamentos = query.all()
    return jsonify(lancamentos_schema.dump(lancamentos)), 200
