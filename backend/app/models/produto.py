from backend.app import db

class Produto(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(100), nullable=False)
    preco_venda = db.Column(db.Float, nullable=False)
    custo = db.Column(db.Float, nullable=False)

    def __repr__(self):
        return f'<Produto {self.nome}>'
