import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { removerToken } from '../services/api';

export default function HomeScreen({ navigation }) {
  return (
    <View style={s.container}>
      <Text style={s.welcome}>Bem-vindo ao Hub do Conhecimento</Text>
      <Text style={s.desc}>Questões de Química para vestibular</Text>
      <TouchableOpacity style={s.card} onPress={() => navigation.navigate('ListaQuestoes')}>
        <Text style={s.cardTitle}>📋 Todas as Questões</Text>
        <Text style={s.cardDesc}>Listagem completa</Text>
      </TouchableOpacity>
      <TouchableOpacity style={s.card} onPress={() => navigation.navigate('Busca')}>
        <Text style={s.cardTitle}>🔍 Buscar Questões</Text>
        <Text style={s.cardDesc}>Por vestibular, ano ou palavra-chave</Text>
      </TouchableOpacity>
      <TouchableOpacity style={s.logout} onPress={async () => { await removerToken(); navigation.replace('Login'); }}>
        <Text style={s.logoutText}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f8fafc' },
  welcome: { fontSize: 22, fontWeight: 'bold', color: '#0f172a', marginBottom: 8 },
  desc: { fontSize: 14, color: '#64748b', marginBottom: 24 },
  card: { backgroundColor: '#fff', borderRadius: 12, padding: 20, marginBottom: 14, borderWidth: 1, borderColor: '#e2e8f0' },
  cardTitle: { fontSize: 17, fontWeight: '600', color: '#0f172a' },
  cardDesc: { fontSize: 13, color: '#64748b', marginTop: 4 },
  logout: { marginTop: 'auto', padding: 14, alignItems: 'center' },
  logoutText: { color: '#ef4444', fontWeight: '600' },
});
