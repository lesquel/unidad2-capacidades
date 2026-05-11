import { ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';

import { SavedList } from '@/components/evidencia/saved-list';
import { CONTENT_MAX_WIDTH, EVIDENCIA_COLORS } from '@/constants/evidencia-theme';
import { useEvidencia } from '@/context/evidencia-context';

export default function EvidenciasScreen() {
  const evidencia = useEvidencia();

  return (
    <View style={styles.root}>
      <ScrollView
        style={styles.flex}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          <View style={styles.pageTitleBlock}>
            <Text style={styles.pageTitle}>Mis evidencias</Text>
            <Text style={styles.pageSubtitle}>
              Registros guardados en este dispositivo. Tocá una fila para ver el detalle.
            </Text>
          </View>

          <SavedList
            evidencias={evidencia.evidencias}
            cargando={evidencia.cargandoLista}
            onEliminar={evidencia.eliminarEvidencia}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: EVIDENCIA_COLORS.bg },
  flex: { flex: 1 },
  scrollContent: {
    flexGrow: 1,
    paddingTop: (StatusBar.currentHeight ?? 0) + 16,
    paddingBottom: 40,
    paddingHorizontal: 16,
  },
  container: {
    width: '100%',
    maxWidth: CONTENT_MAX_WIDTH,
    alignSelf: 'center',
  },
  pageTitleBlock: {
    marginBottom: 16,
    marginTop: 8,
  },
  pageTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: EVIDENCIA_COLORS.text,
    letterSpacing: -0.4,
    marginBottom: 6,
  },
  pageSubtitle: {
    fontSize: 13,
    color: EVIDENCIA_COLORS.textMuted,
    lineHeight: 19,
  },
});
