from flask import Blueprint, request, jsonify
from backend.app import db
from backend.app.models.centro_custo import CentroCusto
from backend.app.schemas.centro_custo import centro_custo_schema, centros_custo_schema

centros_custo_bp = Blueprint('centros_custo', __name__, url_prefix='/api/centros-custo')

@centros_custo_bp.route('', methods=['GET'])
def listar_centros_custo():
    centros_custo = CentroCusto.query.all()
    return jsonify(centros_custo_schema.dump(centros_custo)), 200

@centros_custo_bp.route('', methods=['POST'])
def criar_centro_custo():
    data = request.json
    novo_centro_custo = CentroCusto(
        nome=data['nome'],
        descricao=data.get('descricao', ''),
        ativo=data.get('ativo', True)
    )
    db.session.add(novo_centro_custo)
    db.session.commit()
    return jsonify(centro_custo_schema.dump(novo_centro_custo)), 201

@centros_custo_bp.route('/<int:id>', methods=['GET'])
def obter_centro_custo(id):
    centro_custo = CentroCusto.query.get_or_404(id)
    return jsonify(centro_custo_schema.dump(centro_custo)), 200

@centros_custo_bp.route('/<int:id>', methods=['PUT'])
def atualizar_centro_custo(id):
    centro_custo = CentroCusto.query.get_or_404(id)
    data = request.json
    centro_custo.nome = data.get('nome', centro_custo.nome)
    centro_custo.descricao = data.get('descricao', centro_custo.descricao)
    centro_custo.ativo = data.get('ativo', centro_custo.ativo)
    db.session.commit()
    return jsonify(centro_custo_schema.dump(centro_custo)), 200

@centros_custo_bp.route('/<int:id>', methods=['DELETE'])
def deletar_centro_custo(id):
    centro_custo = CentroCusto.query.get_or_404(id)
    db.session.delete(centro_custo)
    db.session.commit()
    return '', 204
