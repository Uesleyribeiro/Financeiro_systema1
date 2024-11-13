# Em tests/test_lancamentos.py
import pytest
from backend.app import create_app, db
from backapp.models.lancamento import Lancamento

@pytest.fixture
def client():
    app = create_app('testing')
    with app.test_client() as client:
        with app.app_context():
            db.create_all()
            yield client
            db.session.remove()
            db.drop_all()

def test_criar_lancamento(client):
    response = client.post('/api/lancamentos', json={
        'descricao': 'Teste',
        'valor': 100,
        'tipo': 'Receita',
        'data': '2023-01-01'
    })
    assert response.status_code == 201
    assert 'id' in response.json