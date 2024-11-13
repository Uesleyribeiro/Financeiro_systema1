from flask import Blueprint, request, jsonify
from backend.app import db
from backend.app.models.categoria import Categoria
from backend.app.schemas.categoria import categoria_schema, categorias_schema

categorias_bp = Blueprint('categorias', __name__, url_prefix='/api/categorias')

@categorias_bp.route('', methods=['GET'])
def listar_categorias():
    categorias = Categoria.query.all()
    return jsonify(categorias_schema.dump(categorias)), 200

@categorias_bp.route('', methods=['POST'])
def criar_categoria():
    data = request.json
    nova_categoria = Categoria(nome=data['nome'], tipo=data['tipo'])
    db.session.add(nova_categoria)
    db.session.commit()
    return jsonify(categoria_schema.dump(nova_categoria)), 201

@categorias_bp.route('/<int:id>', methods=['GET'])
def obter_categoria(id):
    categoria = Categoria.query.get_or_404(id)
    return jsonify(categoria_schema.dump(categoria)), 200

@categorias_bp.route('/<int:id>', methods=['PUT'])
def atualizar_categoria(id):
    categoria = Categoria.query.get_or_404(id)
    data = request.json
    categoria.nome = data.get('nome', categoria.nome)
    categoria.tipo = data.get('tipo', categoria.tipo)
    db.session.commit()
    return jsonify(categoria_schema.dump(categoria)), 200

@categorias_bp.route('/<int:id>', methods=['DELETE'])
def deletar_categoria(id):
    categoria = Categoria.query.get_or_404(id)
    db.session.delete(categoria)
    db.session.commit()
    return '', 204
