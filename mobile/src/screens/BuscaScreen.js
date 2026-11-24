import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { buscarPorVestibular, buscarPorAno, buscarPorPalavraChave } from '../services/api';

const TIPOS = [
  { id: 'vestibular', label: 'Vestibular' },
  { id: 'ano', label: 'Ano' },
  { id: 'palavra', label: 'Palavra' },
];

function titulo(q) { return q?.nome_q || q?.titulo || q?.nome || `Questão #${q?.id_q || q?.id_questao}`; }

export default function BuscaScreen({ navigation }) {
  const [tipo, setTipo] = useState('vestibular');
  const [termo, setTermo] = useState('');
  const [resultados, setResultados] = useState([]);
  const [loading, setLoading] = useState(false);

  async function buscar() {
    if (!termo.trim()) { Alert.alert('Atenção', 'Digite um termo.'); return; }
    setLoading(true);
    setResultados([]);
    try {
      let data;
      if (tipo === 'vestibular') data = await buscarPorVestibular(termo.trim());
      else if (tipo === 'ano') data = await buscarPorAno(parseInt(termo.trim(), 10));
      else data = await buscarPorPalavraChave(termo.trim());
      setResultados(Array.isArray(data) ? data : []);
    } catch (e) {
      Alert.alert('Erro', e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={s.container}>
      <View style={s.tipos}>
        {TIPOS.map((t) => (
          <TouchableOpacity key={t.id} style={[s.tipoBtn, tipo === t.id && s.tipoActive]} onPress={() => setTipo(t.id)}>
            <Text style={[s.tipoText, tipo === t.id && { color: '#fff' }]}>{t.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TextInput
        style={s.input}
        placeholder={tipo === 'ano' ? 'Ex: 2021' : tipo === 'vestibular' ? 'Ex: ENEM' : 'Ex: estequiometria'}
        placeholderTextColor="#94a3b8"
        value={termo}
        onChangeText={setTermo}
        keyboardType={tipo === 'ano' ? 'numeric' : 'default'}
      />
      <TouchableOpacity style={[s.btn, loading && { opacity: 0.7 }]} onPress={buscar} disabled={loading}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={s.btnText}>Buscar</Text>}
      </TouchableOpacity>
      <FlatList
        data={resultados}
        keyExtractor={(item, i) => String(item.id_q || item.id_questao || i)}
        ListEmptyComponent={!loading ? <Text style={{ textAlign: 'center', color: '#94a3b8', marginTop: 30 }}>Nenhum resultado.</Text> : null}
        renderItem={({ item }) => (
          <TouchableOpacity style={s.card} onPress={() => navigation.navigate('DetalheQuestao', { questao: item })}>
            <Text style={s.cardTitle} numberOfLines={2}>{titulo(item)}</Text>
            <Text style={s.meta}>{[item.vestibular, item.ano].filter(Boolean).join(' • ')}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f8fafc' },
  tipos: { flexDirection: 'row', marginBottom: 12, gap: 8 },
  tipoBtn: { flex: 1, paddingVertical: 10, borderRadius: 8, backgroundColor: '#e2e8f0', alignItems: 'center' },
  tipoActive: { backgroundColor: '#3b82f6' },
  tipoText: { fontSize: 13, color: '#475569', fontWeight: '600' },
  input: { backgroundColor: '#fff', borderRadius: 10, padding: 14, borderWidth: 1, borderColor: '#e2e8f0', marginBottom: 12, color: '#0f172a' },
  btn: { backgroundColor: '#3b82f6', borderRadius: 10, padding: 14, alignItems: 'center', marginBottom: 16 },
  btnText: { color: '#fff', fontWeight: 'bold' },
  card: { backgroundColor: '#fff', borderRadius: 10, padding: 14, marginBottom: 10, borderWidth: 1, borderColor: '#e2e8f0' },
  cardTitle: { fontSize: 14, fontWeight: '600', color: '#0f172a' },
  meta: { fontSize: 12, color: '#64748b', marginTop: 4 },
});
