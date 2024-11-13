from backend.app import db

class CentroCusto(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(100), nullable=False, unique=True)
    descricao = db.Column(db.Text)
    ativo = db.Column(db.Boolean, default=True)

    def __repr__(self):
        return f'<CentroCusto {self.nome}>'
