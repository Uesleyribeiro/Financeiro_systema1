from flask import Blueprint, request, jsonify
from backend.app.services.relatorio_service import gerar_dre, gerar_fluxo_caixa, gerar_balanco_patrimonial, gerar_fluxo_caixa_projetado
from backend.app.services.rentabilidade_service import calcular_rentabilidade
from backend.app.services.projecao_service import gerar_projecao_financeira
from datetime import datetime
relatorios_bp = Blueprint('relatorios', __name__, url_prefix='/api/relatorios')

@relatorios_bp.route('/dre', methods=['GET'])
def get_dre():
    inicio = request.args.get('inicio')
    fim = request.args.get('fim')
    dre = gerar_dre(inicio, fim)
    return jsonify(dre), 200

@relatorios_bp.route('/fluxo-caixa', methods=['GET'])
def get_fluxo_caixa():
    inicio = request.args.get('inicio')
    fim = request.args.get('fim')
    fluxo_caixa = gerar_fluxo_caixa(inicio, fim)
    return jsonify(fluxo_caixa), 200

@relatorios_bp.route('/balanco-patrimonial', methods=['GET'])
def get_balanco_patrimonial():
    data = request.args.get('data')
    if data:
        data = datetime.strptime(data, '%Y-%m-%d').date()
    balanco = gerar_balanco_patrimonial(data)
    return jsonify(balanco), 200

@relatorios_bp.route('/fluxo-caixa-projetado', methods=['GET'])
def get_fluxo_caixa_projetado():
    meses = int(request.args.get('meses', 3))
    projecao = gerar_fluxo_caixa_projetado(meses)
    return jsonify(projecao), 200

@relatorios_bp.route('/rentabilidade', methods=['GET'])
def get_rentabilidade():
    inicio = request.args.get('inicio')
    fim = request.args.get('fim')
    rentabilidade = calcular_rentabilidade(inicio, fim)
    return jsonify(rentabilidade), 200

@relatorios_bp.route('/projecao-financeira', methods=['GET'])
def get_projecao_financeira():
    meses = int(request.args.get('meses', 12))
    projecao = gerar_projecao_financeira(meses)
    return jsonify(projecao), 200
