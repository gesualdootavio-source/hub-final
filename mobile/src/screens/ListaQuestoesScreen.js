import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator, RefreshControl } from 'react-native';
import { listarQuestoes } from '../services/api';

function titulo(q) { return q?.nome_q || q?.titulo || q?.nome || `Questão #${q?.id_q || q?.id_questao}`; }

export default function ListaQuestoesScreen({ navigation }) {
  const [questoes, setQuestoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  async function carregar() {
    try {
      setError(null);
      const data = await listarQuestoes();
      setQuestoes(Array.isArray(data) ? data : []);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  useEffect(() => { carregar(); }, []);

  if (loading) return (
    <View style={s.center}>
      <ActivityIndicator size="large" color="#3b82f6" />
      <Text style={{ marginTop: 12, color: '#64748b' }}>Carregando...</Text>
    </View>
  );

  if (error) return (
    <View style={s.center}>
      <Text style={{ color: '#ef4444', textAlign: 'center', marginBottom: 16 }}>{error}</Text>
      <TouchableOpacity style={s.retry} onPress={carregar}><Text style={{ color: '#fff', fontWeight: '600' }}>Tentar novamente</Text></TouchableOpacity>
    </View>
  );

  return (
    <FlatList
      data={questoes}
      keyExtractor={(item, i) => String(item.id_q || item.id_questao || i)}
      contentContainerStyle={{ padding: 16 }}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); carregar(); }} colors={['#3b82f6']} />}
      ListEmptyComponent={<Text style={{ textAlign: 'center', color: '#94a3b8', marginTop: 40 }}>Nenhuma questão.</Text>}
      renderItem={({ item }) => (
        <TouchableOpacity style={s.card} onPress={() => navigation.navigate('DetalheQuestao', { questao: item })}>
          <Text style={s.cardTitle} numberOfLines={2}>{titulo(item)}</Text>
          <Text style={s.meta}>{[item.vestibular, item.ano, item.topico || item.nome_t].filter(Boolean).join(' • ')}</Text>
        </TouchableOpacity>
      )}
    />
  );
}

const s = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
  retry: { backgroundColor: '#3b82f6', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 8 },
  card: { backgroundColor: '#fff', borderRadius: 12, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: '#e2e8f0' },
  cardTitle: { fontSize: 15, fontWeight: '600', color: '#0f172a' },
  meta: { fontSize: 12, color: '#64748b', marginTop: 6 },
});
