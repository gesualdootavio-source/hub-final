/**
 * TROQUE pela URL do seu domínio personalizado (Entrega 2)
 * Exemplo: https://moleculas.seudominio.com.br
 */
export const API_BASE_URL = 'https://SEU-DOMINIO.com.br';

export const ENDPOINTS = {
  health: `${API_BASE_URL}/health`,
  login: `${API_BASE_URL}/auth/login`,
  validar: `${API_BASE_URL}/auth/validate`,
  busca: `${API_BASE_URL}/busca`,
  buscaPorId: (id) => `${API_BASE_URL}/busca/${id}`,
  buscaPorVestibular: (v) => `${API_BASE_URL}/busca/vestibular/${encodeURIComponent(v)}`,
  buscaPorAno: (ano) => `${API_BASE_URL}/busca/ano/${ano}`,
  buscaPorPalavra: (p) => `${API_BASE_URL}/busca/palavra-chave/${encodeURIComponent(p)}`,
};
