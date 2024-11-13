from backend.app.models.lancamento import Lancamento
from backend.app.models.categoria import Categoria
from sqlalchemy import func
from datetime import datetime, timedelta
from backend.app import db

def get_dashboard_data():
    hoje = datetime.now().date()
    inicio_mes = hoje.replace(day=1)
    fim_mes = (inicio_mes + timedelta(days=32)).replace(day=1) - timedelta(days=1)

    # Receitas e despesas do mês atual
    receitas_mes = Lancamento.query.filter(
        Lancamento.data.between(inicio_mes, fim_mes),
        Lancamento.tipo == 'Receita'
    ).with_entities(func.sum(Lancamento.valor)).scalar() or 0

    despesas_mes = Lancamento.query.filter(
        Lancamento.data.between(inicio_mes, fim_mes),
        Lancamento.tipo == 'Despesa'
    ).with_entities(func.sum(Lancamento.valor)).scalar() or 0

    # Saldo do mês
    saldo_mes = receitas_mes - despesas_mes

    margem_lucro = (saldo_mes / receitas_mes) * 100 if receitas_mes > 0 else 0
    retorno_investimento = 0  # Implemente o cálculo real do ROI
    liquidez_corrente = 0  # Implemente o cálculo real da liquidez corrente

    # Top 5 categorias de despesas
    top_despesas = db.session.query(
        Categoria.nome,
        func.sum(Lancamento.valor).label('total')
    ).join(Lancamento).filter(
        Lancamento.data.between(inicio_mes, fim_mes),
        Lancamento.tipo == 'Despesa'
    ).group_by(Categoria.nome).order_by(func.sum(Lancamento.valor).desc()).limit(5).all()

    # Evolução de receitas e despesas nos últimos 6 meses
    evolucao = []
    for i in range(5, -1, -1):
        mes = hoje.replace(day=1) - timedelta(days=i * 30)
        fim_mes = (mes + timedelta(days=32)).replace(day=1) - timedelta(days=1)

        receitas = Lancamento.query.filter(
            Lancamento.data.between(mes, fim_mes),
            Lancamento.tipo == 'Receita'
        ).with_entities(func.sum(Lancamento.valor)).scalar() or 0

        despesas = Lancamento.query.filter(
            Lancamento.data.between(mes, fim_mes),
            Lancamento.tipo == 'Despesa'
        ).with_entities(func.sum(Lancamento.valor)).scalar() or 0

        evolucao.append({
            'mes': mes.strftime('%Y-%m'),
            'receitas': float(receitas),
            'despesas': float(despesas)
        })

    return {
        'receitas_mes': float(receitas_mes),
        'despesas_mes': float(despesas_mes),
        'saldo_mes': float(saldo_mes),
        'top_despesas': [{'categoria': cat, 'total': float(total)} for cat, total in top_despesas],
        'evolucao': evolucao
    }
