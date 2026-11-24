import AsyncStorage from '@react-native-async-storage/async-storage';
import { ENDPOINTS } from '../constants/api';

const TOKEN_KEY = '@hub_token';

export async function salvarToken(token) {
  await AsyncStorage.setItem(TOKEN_KEY, token);
}
export async function obterToken() {
  return AsyncStorage.getItem(TOKEN_KEY);
}
export async function removerToken() {
  await AsyncStorage.removeItem(TOKEN_KEY);
}

async function request(url, options = {}) {
  const token = await obterToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };
  const response = await fetch(url, { ...options, headers });
  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    throw new Error(body.mensagem || body.message || body.erro || `Erro ${response.status}`);
  }
  return response.json();
}

export async function login(email, password) {
  const data = await request(ENDPOINTS.login, {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
  if (data.token) await salvarToken(data.token);
  return data;
}

export async function listarQuestoes() {
  return request(ENDPOINTS.busca);
}
export async function buscarPorId(id) {
  return request(ENDPOINTS.buscaPorId(id));
}
export async function buscarPorVestibular(v) {
  return request(ENDPOINTS.buscaPorVestibular(v));
}
export async function buscarPorAno(ano) {
  return request(ENDPOINTS.buscaPorAno(ano));
}
export async function buscarPorPalavraChave(p) {
  return request(ENDPOINTS.buscaPorPalavra(p));
}
