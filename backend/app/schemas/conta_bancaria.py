from backend.app import ma
from backend.app.models.conta_bancaria import ContaBancaria

class ContaBancariaSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = ContaBancaria

conta_bancaria_schema = ContaBancariaSchema()
contas_bancarias_schema = ContaBancariaSchema(many=True)