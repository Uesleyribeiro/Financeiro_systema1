from flask import Blueprint, request, jsonify
from backend.app.services.extrato_service import importar_extrato
from backend.app.schemas.lancamento import lancamentos_schema

extratos_bp = Blueprint('extratos', __name__, url_prefix='/api/extratos')


@extratos_bp.route('/importar/<int:conta_bancaria_id>', methods=['POST'])
def importar(conta_bancaria_id):
    if 'arquivo' not in request.files:
        return jsonify({'error': 'Nenhum arquivo enviado'}), 400

    arquivo = request.files['arquivo']

    if arquivo.filename == '':
        return jsonify({'error': 'Nenhum arquivo selecionado'}), 400

    if arquivo and arquivo.filename.endswith('.csv'):
        try:
            lancamentos = importar_extrato(arquivo, conta_bancaria_id)
            return jsonify({
                'message': f'{len(lancamentos)} lançamentos importados com sucesso',
                'lancamentos': lancamentos_schema.dump(lancamentos)
            }), 201
        except Exception as e:
            return jsonify({'error': str(e)}), 500
    else:
        return jsonify({'error': 'Formato de arquivo inválido. Por favor, envie um arquivo CSV.'}), 400
