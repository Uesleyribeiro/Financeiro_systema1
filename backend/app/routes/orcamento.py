from flask import Blueprint, request, jsonify
from backend.app.services.orcamento_service import criar_orcamento, atualizar_orcamento, obter_orcamento, comparar_orcamento_realizado

orcamento_bp = Blueprint('orcamento', __name__, url_prefix='/api/orcamento')

@orcamento_bp.route('', methods=['POST'])
def criar():
    data = request.json
    orcamento = criar_orcamento(data['ano'], data['mes'], data['categoria_id'], data['valor_previsto'])
    return jsonify({'id': orcamento.id, 'message': 'Orçamento criado com sucesso'}), 201

@orcamento_bp.route('/<int:id>', methods=['PUT'])
def atualizar(id):
    data = request.json
    orcamento = atualizar_orcamento(id, data['valor_previsto'])
    return jsonify({'message': 'Orçamento atualizado com sucesso'}), 200

@orcamento_bp.route('', methods=['GET'])
def listar():
    ano = request.args.get('ano', type=int)
    mes = request.args.get('mes', type=int)
    orcamentos = obter_orcamento(ano, mes)
    return jsonify([{
        'id': o.id,
        'ano': o.ano,
        'mes': o.mes,
        'categoria': o.categoria.nome,
        'valor_previsto': o.valor_previsto
    } for o in orcamentos]), 200

@orcamento_bp.route('/comparativo', methods=['GET'])
def comparativo():
    ano = request.args.get('ano', type=int)
    mes = request.args.get('mes', type=int)
    resultados = comparar_orcamento_realizado(ano, mes)
    return jsonify(resultados), 200
