from flask import Blueprint, jsonify
from backend.app.services.dashboard_service import get_dashboard_data

dashboard_bp = Blueprint('dashboard', __name__, url_prefix='/api/dashboard')

@dashboard_bp.route('', methods=['GET'])
def get_dashboard():
    data = get_dashboard_data()
    return jsonify(data), 200
