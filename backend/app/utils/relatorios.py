from models import Empresa, PlanoContas, Transacao
from sqlalchemy import func
from datetime import datetime

def gerar_balanco(empresa_id, data=None):
    if data is None:
        data = datetime.now().date()

    ativos = db.session.query(func.sum(Transacao.valor)).join(PlanoContas).filter(
        Transacao.empresa_id == empresa_id,
        PlanoContas.tipo == 'A',
        Transacao.data <= data
    ).scalar() or 0

    passivos = db.session.query(func.sum(Transacao.valor)).join(PlanoContas).filter(
        Transacao.empresa_id == empresa_id,
        PlanoContas.tipo == 'P',
        Transacao.data <= data
    ).scalar() or 0

    patrimonio_liquido = ativos - passivos

    return {
        'data': data.isoformat(),
        'ativo': ativos,
        'passivo': passivos,
        'patrimonio_liquido': patrimonio_liquido
    }

def gerar_dre(empresa_id, data_inicio, data_fim):
    receitas = db.session.query(func.sum(Transacao.valor)).join(PlanoContas).filter(
        Transacao.empresa_id == empresa_id,
        PlanoContas.tipo == 'R',
        Transacao.data.between(data_inicio, data_fim)
    ).scalar() or 0

    despesas = db.session.query(func.sum(Transacao.valor)).join(PlanoContas).filter(
        Transacao.empresa_id == empresa_id,
        PlanoContas.tipo == 'D',
        Transacao.data.between(data_inicio, data_fim)
    ).scalar() or 0

    resultado = receitas - despesas

    return {
        'periodo': {
            'inicio': data_inicio.isoformat(),
            'fim': data_fim.isoformat()
        },
        'receitas': receitas,
        'despesas': despesas,
        'resultado': resultado
    }

def gerar_fluxo_caixa(empresa_id, data_inicio, data_fim):
    entradas = db.session.query(func.sum(Transacao.valor)).join(PlanoContas).filter(
        Transacao.empresa_id == empresa_id,
        PlanoContas.tipo == 'R',
        Transacao.data.between(data_inicio, data_fim)
    ).scalar() or 0

    saidas = db.session.query(func.sum(Transacao.valor)).join(PlanoContas).filter(
        Transacao.empresa_id == empresa_id,
        PlanoContas.tipo == 'D',
        Transacao.data.between(data_inicio, data_fim)
    ).scalar() or 0

    saldo = entradas - saidas

    return {
        'periodo': {
            'inicio': data_inicio.isoformat(),
            'fim': data_fim.isoformat()
        },
        'entradas': entradas,
        'saidas': saidas,
        'saldo': saldo
    }
