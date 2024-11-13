import axios from 'axios';
import { Lancamento, Categoria } from '../types';

const api = axios.create({
  baseURL: 'http://localhost:5000/api'
});

export const getLancamentos = () => api.get<Lancamento[]>('/lancamentos');
export const createLancamento = (lancamento: Lancamento) => api.post<Lancamento>('/lancamentos', lancamento);
export const updateLancamento = (id: number, lancamento: Lancamento) => api.put<Lancamento>(`/lancamentos/${id}`, lancamento);
export const deleteLancamento = (id: number) => api.delete(`/lancamentos/${id}`);

export const getCategorias = () => api.get<Categoria[]>('/categorias');
export const createCategoria = (categoria: Categoria) => api.post<Categoria>('/categorias', categoria);
export const updateCategoria = (id: number, categoria: Categoria) => api.put<Categoria>(`/categorias/${id}`, categoria);
export const deleteCategoria = (id: number) => api.delete(`/categorias/${id}`);

export const getFluxoCaixa = (inicio: string, fim: string) => api.get('/relatorios/fluxo-caixa', { params: { inicio, fim } });
export const getDRE = (inicio: string, fim: string) => api.get('/relatorios/dre', { params: { inicio, fim } });
export const getLancamentosPorCategoria = (inicio: string, fim: string) => api.get('/relatorios/lancamentos-por-categoria', { params: { inicio, fim } });

// ... (código existente)

export const getCategorias = async (): Promise<Categoria[]> => {
  const response = await axios.get(`${API_URL}/categorias`);
  return response.data;
};

export const createCategoria = async (categoria: Categoria): Promise<Categoria> => {
  const response = await axios.post(`${API_URL}/categorias`, categoria);
  return response.data;
};

export const getDRE = async (dataInicio: string, dataFim: string): Promise<any> => {
  const response = await axios.get(`${API_URL}/relatorios/dre`, {
    params: { inicio: dataInicio, fim: dataFim }
  });
  return response.data;
};

export const getFluxoCaixa = async (dataInicio: string, dataFim: string): Promise<any> => {
  const response = await axios.get(`${API_URL}/relatorios/fluxo-caixa`, {
    params: { inicio: dataInicio, fim: dataFim }
  });
  return response.data;
};

export const importarExtrato = async (contaBancariaId: number, formData: FormData): Promise<any> => {
  const response = await axios.post(`${API_URL}/extratos/importar/${contaBancariaId}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return response.data;
};

// ... (código existente)

export const getCentrosCusto = async (): Promise<CentroCusto[]> => {
  const response = await axios.get(`${API_URL}/centros-custo`);
  return response.data;
};

export const createCentroCusto = async (centroCusto: CentroCusto): Promise<CentroCusto> => {
  const response = await axios.post(`${API_URL}/centros-custo`, centroCusto);
  return response.data;
};

export const updateCentroCusto = async (id: number, centroCusto: CentroCusto): Promise<CentroCusto> => {
  const response = await axios.put(`${API_URL}/centros-custo/${id}`, centroCusto);
  return response.data;
};

export const deleteCentroCusto = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/centros-custo/${id}`);
};

export const getDashboardData = async (): Promise<any> => {
  const response = await axios.get(`${API_URL}/dashboard`);
  return response.data;
};

export const getBalancoPatrimonial = async (data?: string): Promise<any> => {
  const response = await axios.get(`${API_URL}/relatorios/balanco-patrimonial`, {
    params: { data }
  });
  return response.data;
};

export const getFluxoCaixaProjetado = async (meses: number = 3): Promise<any> => {
  const response = await axios.get(`${API_URL}/relatorios/fluxo-caixa-projetado`, {
    params: { meses }
  });
  return response.data;
};

export const criarOrcamento = async (orcamento: any): Promise<any> => {
  const response = await axios.post(`${API_URL}/orcamento`, orcamento);
  return response.data;
};

export const atualizarOrcamento = async (id: number, valorPrevisto: number): Promise<any> => {
  const response = await axios.put(`${API_URL}/orcamento/${id}`, { valor_previsto: valorPrevisto });
  return response.data;
};

export const obterOrcamentos = async (ano: number, mes: number): Promise<any> => {
  const response = await axios.get(`${API_URL}/orcamento`, { params: { ano, mes } });
  return response.data;
};

export const obterComparativoOrcamento = async (ano: number, mes: number): Promise<any> => {
  const response = await axios.get(`${API_URL}/orcamento/comparativo`, { params: { ano, mes } });
  return response.data;
};

