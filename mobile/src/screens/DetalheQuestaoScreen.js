import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

export default function DetalheQuestaoScreen({ route }) {
  const q = route.params?.questao || {};
  const titulo = q.nome_q || q.titulo || q.nome || `Questão #${q.id_q || q.id_questao}`;
  const enunciado = q.enunciado_q || q.enunciado || '';

  return (
    <ScrollView contentContainerStyle={s.container}>
      <Text style={s.title}>{titulo}</Text>
      <View style={s.meta}>
        {q.vestibular && <Text style={s.badge}>{q.vestibular}</Text>}
        {q.ano && <Text style={s.year}>{q.ano}</Text>}
        {(q.topico || q.nome_t) && <Text style={s.year}>{q.topico || q.nome_t}</Text>}
      </View>
      {enunciado ? (
        <View style={s.section}>
          <Text style={s.sectionTitle}>Enunciado</Text>
          <Text style={s.body}>{enunciado}</Text>
        </View>
      ) : null}
      {(q.palavra_chave_q || q.palavra_chave) && (
        <View style={s.section}>
          <Text style={s.sectionTitle}>Palavra-chave</Text>
          <Text style={s.body}>{q.palavra_chave_q || q.palavra_chave}</Text>
        </View>
      )}
      {(q.dificuldade || q.nome_d) && (
        <View style={s.section}>
          <Text style={s.sectionTitle}>Dificuldade</Text>
          <Text style={s.body}>{q.dificuldade || q.nome_d}</Text>
        </View>
      )}
    </ScrollView>
  );
}

const s = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 20, fontWeight: 'bold', color: '#0f172a', marginBottom: 12 },
  meta: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 20 },
  badge: { backgroundColor: '#dbeafe', color: '#1d4ed8', fontSize: 13, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6, overflow: 'hidden' },
  year: { fontSize: 13, color: '#64748b' },
  section: { marginBottom: 18 },
  sectionTitle: { fontSize: 14, fontWeight: '600', color: '#475569', marginBottom: 4 },
  body: { fontSize: 15, color: '#0f172a', lineHeight: 22 },
});
