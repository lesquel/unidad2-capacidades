import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { EVIDENCIA_COLORS } from '@/constants/evidencia-theme';

export function EvidenciaHeader() {
  return (
    <View style={styles.header}>
      <View style={styles.icon}>
        <Ionicons name="school" size={28} color="#fff" />
      </View>
      <Text style={styles.titulo}>Registro de Evidencia</Text>
      <Text style={styles.subtitulo}>Educativa</Text>
      <Text style={styles.descripcion}>
        Capturá la evidencia fotográfica de tareas, deberes o prácticas y agregá una
        observación breve.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    marginBottom: 16,
    marginTop: 8,
  },
  icon: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: EVIDENCIA_COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: EVIDENCIA_COLORS.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
  },
  titulo: {
    fontSize: 24,
    fontWeight: '800',
    color: EVIDENCIA_COLORS.text,
    letterSpacing: -0.5,
  },
  subtitulo: {
    fontSize: 24,
    fontWeight: '800',
    color: EVIDENCIA_COLORS.textMuted,
    letterSpacing: -0.5,
    marginBottom: 8,
  },
  descripcion: {
    fontSize: 13,
    color: EVIDENCIA_COLORS.textMuted,
    textAlign: 'center',
    lineHeight: 19,
    paddingHorizontal: 16,
  },
});
