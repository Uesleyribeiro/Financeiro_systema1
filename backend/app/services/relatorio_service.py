from backend.app.models.lancamento import Lancamento
from sqlalchemy import func
from datetime import datetime, timedelta
from backend.app.models.conta_bancaria import ContaBancaria


def gerar_dre(inicio, fim):
    lancamentos = Lancamento.query.filter(Lancamento.data.between(inicio, fim)).all()

    receitas = sum(l.valor for l in lancamentos if l.tipo == 'Receita')
    custos = sum(l.valor for l in lancamentos if l.categoria.nome == 'Custo dos Produtos Vendidos')
    despesas_operacionais = sum(
        l.valor for l in lancamentos if l.tipo == 'Despesa' and l.categoria.nome != 'Custo dos Produtos Vendidos')

    lucro_bruto = receitas - custos
    lucro_operacional = lucro_bruto - despesas_operacionais

    return {
        'receitas': receitas,
        'custos': custos,
        'lucro_bruto': lucro_bruto,
        'despesas_operacionais': despesas_operacionais,
        'lucro_operacional': lucro_operacional
    }


def gerar_fluxo_caixa(inicio, fim):
    lancamentos = Lancamento.query.filter(Lancamento.data.between(inicio, fim)).all()

    entradas = sum(l.valor for l in lancamentos if l.tipo == 'Receita')
    saidas = sum(l.valor for l in lancamentos if l.tipo == 'Despesa')

    saldo_inicial = 0  # Implemente a lógica para obter o saldo inicial
    saldo_final = saldo_inicial + entradas - saidas

    return {
        'saldo_inicial': saldo_inicial,
        'entradas': entradas,
        'saidas': saidas,
        'saldo_final': saldo_final
    }

def gerar_balanco_patrimonial(data=None):
    if data is None:
        data = datetime.now().date()

    # Ativo
    disponibilidades = ContaBancaria.query.with_entities(func.sum(ContaBancaria.saldo)).scalar() or 0
    contas_receber = Lancamento.query.filter(
        Lancamento.tipo == 'Receita',
        Lancamento.data <= data,
        Lancamento.status != 'Pago'
    ).with_entities(func.sum(Lancamento.valor)).scalar() or 0

    # Passivo
    contas_pagar = Lancamento.query.filter(
        Lancamento.tipo == 'Despesa',
        Lancamento.data <= data,
        Lancamento.status != 'Pago'
    ).with_entities(func.sum(Lancamento.valor)).scalar() or 0

    # Patrimônio Líquido (simplificado)
    patrimonio_liquido = disponibilidades + contas_receber - contas_pagar

    return {
        'ativo': {
            'disponibilidades': float(disponibilidades),
            'contas_receber': float(contas_receber),
            'total_ativo': float(disponibilidades + contas_receber)
        },
        'passivo': {
            'contas_pagar': float(contas_pagar),
            'patrimonio_liquido': float(patrimonio_liquido),
            'total_passivo': float(contas_pagar + patrimonio_liquido)
        }
    }

def gerar_fluxo_caixa_projetado(meses=3):
    hoje = datetime.now().date()
    projecao = []

    for i in range(meses):
        inicio_mes = (hoje + timedelta(days=30*i)).replace(day=1)
        fim_mes = (inicio_mes + timedelta(days=32)).replace(day=1) - timedelta(days=1)

        receitas_previstas = Lancamento.query.filter(
            Lancamento.tipo == 'Receita',
            Lancamento.data.between(inicio_mes, fim_mes)
        ).with_entities(func.sum(Lancamento.valor)).scalar() or 0

        despesas_previstas = Lancamento.query.filter(
            Lancamento.tipo == 'Despesa',
            Lancamento.data.between(inicio_mes, fim_mes)
        ).with_entities(func.sum(Lancamento.valor)).scalar() or 0

        saldo_projetado = receitas_previstas - despesas_previstas

        projecao.append({
            'mes': inicio_mes.strftime('%Y-%m'),
            'receitas_previstas': float(receitas_previstas),
            'despesas_previstas': float(despesas_previstas),
            'saldo_projetado': float(saldo_projetado)
        })

    return projecao
