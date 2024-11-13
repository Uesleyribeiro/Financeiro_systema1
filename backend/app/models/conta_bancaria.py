from backend.app import db

class ContaBancaria(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(100), nullable=False, unique=True)
    saldo = db.Column(db.Float, default=0.0)
