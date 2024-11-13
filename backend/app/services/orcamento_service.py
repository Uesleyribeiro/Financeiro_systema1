from backend.app import db
from backend.app.models.orcamento import Orcamento
from backend.app.models.lancamento import Lancamento
from sqlalchemy import func
from datetime import datetime


def criar_orcamento(ano, mes, categoria_id, valor_previsto):
    orcamento = Orcamento(ano=ano, mes=mes, categoria_id=categoria_id, valor_previsto=valor_previsto)
    db.session.add(orcamento)
    db.session.commit()
    return orcamento


def atualizar_orcamento(id, valor_previsto):
    orcamento = Orcamento.query.get_or_404(id)
    orcamento.valor_previsto = valor_previsto
    db.session.commit()
    return orcamento


def obter_orcamento(ano, mes):
    orcamentos = Orcamento.query.filter_by(ano=ano, mes=mes).all()
    return orcamentos


def comparar_orcamento_realizado(ano, mes):
    orcamentos = obter_orcamento(ano, mes)

    inicio_mes = datetime(ano, mes, 1)
    fim_mes = datetime(ano, mes + 1, 1) if mes < 12 else datetime(ano + 1, 1, 1)

    resultados = []
    for orcamento in orcamentos:
        realizado = Lancamento.query.filter(
            Lancamento.data.between(inicio_mes, fim_mes),
            Lancamento.categoria_id == orcamento.categoria_id
        ).with_entities(func.sum(Lancamento.valor)).scalar() or 0

        resultados.append({
            'categoria': orcamento.categoria.nome,
            'previsto': orcamento.valor_previsto,
            'realizado': float(realizado),
            'diferenca': orcamento.valor_previsto - float(realizado)
        })

    return resultados
