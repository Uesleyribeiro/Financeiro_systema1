import csv
import io
from datetime import datetime
from backend.app.models.lancamento import Lancamento
from backend.app.models.categoria import Categoria
from backend.app.models.conta_bancaria import ContaBancaria
from backend.app import db

def importar_extrato():
    from backend.app import db

def importar_extrato(arquivo, conta_bancaria_id):
    conta = ContaBancaria.query.get_or_404(conta_bancaria_id)

    # Lê o arquivo CSV
    stream = io.StringIO(arquivo.stream.read().decode("UTF8"), newline=None)
    csv_reader = csv.DictReader(stream)

    lancamentos_importados = []

    for row in csv_reader:
        data = datetime.strptime(row['Data'], '%d/%m/%Y').date()
        descricao = row['Descrição']
        valor = float(row['Valor'].replace(',', '.'))

        # Determina se é uma receita ou despesa
        tipo = 'Receita' if valor > 0 else 'Despesa'
        valor = abs(valor)

        # Tenta encontrar uma categoria existente ou cria uma nova
        categoria = Categoria.query.filter_by(nome='Não categorizado').first()
        if not categoria:
            categoria = Categoria(nome='Não categorizado', tipo=tipo)
            db.session.add(categoria)

        # Cria o novo lançamento
        lancamento = Lancamento(
            data=data,
            descricao=descricao,
            valor=valor,
            tipo=tipo,
            categoria=categoria,
            conta_bancaria=conta,
            status='Conciliado'  # Marca como conciliado automaticamente
        )

        db.session.add(lancamento)
        lancamentos_importados.append(lancamento)

    db.session.commit()

    return lancamentos_importados
