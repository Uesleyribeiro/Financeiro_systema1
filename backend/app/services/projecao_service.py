from backend.app.models.lancamento import Lancamento
from backend.app.models.categoria import Categoria
from sqlalchemy import func
from datetime import datetime, timedelta

def gerar_projecao_financeira(meses=12):
    hoje = datetime.now().date()
    categorias = Categoria.query.all()
    projecao = []

    for i in range(meses):
        mes = hoje + timedelta(days=30*i)
        inicio_mes = mes.replace(day=1)
        fim_mes = (inicio_mes + timedelta(days=32)).replace(day=1) - timedelta(days=1)

        receitas = {}
        despesas = {}

        for categoria in categorias:
            valor = Lancamento.query.filter(
                Lancamento.data.between(inicio_mes, fim_mes),
                Lancamento.categoria_id == categoria.id
            ).with_entities(func.avg(Lancamento.valor)).scalar() or 0

            if categoria.tipo == 'Receita':
                receitas[categoria.nome] = float(valor)
            else:
                despesas[categoria.nome] = float(valor)

        total_receitas = sum(receitas.values())
        total_despesas = sum(despesas.values())
        saldo = total_receitas - total_despesas

        projecao.append({
            'mes': mes.strftime('%Y-%m'),
            'receitas': receitas,
            'total_receitas': total_receitas,
            'despesas': despesas,
            'total_despesas': total_despesas,
            'saldo': saldo
        })

    return projecao
