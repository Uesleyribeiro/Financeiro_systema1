from backend.app import ma
from backend.app.models.centro_custo import CentroCusto

class CentroCustoSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = CentroCusto

centro_custo_schema = CentroCustoSchema()
centros_custo_schema = CentroCustoSchema(many=True)
