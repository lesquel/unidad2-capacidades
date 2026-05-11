import {
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { EVIDENCIA_COLORS } from '@/constants/evidencia-theme';
import type { EvidenciaGuardada } from '@/lib/evidencia-storage';

type Props = {
  evidencia: EvidenciaGuardada | null;
  visible: boolean;
  onClose: () => void;
};

function formatearFecha(iso: string): string {
  const d = new Date(iso);
  const fecha = d.toLocaleDateString('es-AR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
  const hora = d.toLocaleTimeString('es-AR', {
    hour: '2-digit',
    minute: '2-digit',
  });
  return `${fecha} · ${hora}`;
}

export function EvidenciaDetailModal({ evidencia, visible, onClose }: Props) {
  if (!evidencia) return null;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
      accessibilityViewIsModal
    >
      <View style={styles.backdrop}>
        <TouchableOpacity
          style={styles.backdropDismiss}
          activeOpacity={1}
          onPress={onClose}
          accessibilityLabel="Cerrar modal"
        />
        <View style={styles.sheet}>
          <View style={styles.sheetHeader}>
            <Text style={styles.sheetTitle}>Detalle de evidencia</Text>
            <TouchableOpacity
              onPress={onClose}
              style={styles.closeBtn}
              hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
              accessibilityRole="button"
              accessibilityLabel="Cerrar"
            >
              <Ionicons name="close" size={24} color={EVIDENCIA_COLORS.text} />
            </TouchableOpacity>
          </View>

          <ScrollView
            style={styles.scroll}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <Image
              source={{ uri: evidencia.imageUri }}
              style={styles.fullImage}
              resizeMode="contain"
              accessibilityLabel="Imagen de la evidencia"
            />
            <Text style={styles.meta}>{formatearFecha(evidencia.fecha)}</Text>
            <Text style={styles.label}>Observación</Text>
            <Text style={styles.observacion}>{evidencia.observacion}</Text>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: EVIDENCIA_COLORS.overlay,
  },
  backdropDismiss: {
    flex: 1,
  },
  sheet: {
    maxHeight: '92%',
    backgroundColor: EVIDENCIA_COLORS.card,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 24,
  },
  sheetHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: EVIDENCIA_COLORS.border,
  },
  sheetTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: EVIDENCIA_COLORS.text,
  },
  closeBtn: {
    padding: 4,
  },
  scroll: {
    maxHeight: '100%',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  fullImage: {
    width: '100%',
    aspectRatio: 4 / 3,
    borderRadius: 12,
    backgroundColor: EVIDENCIA_COLORS.surface,
    marginBottom: 12,
  },
  meta: {
    fontSize: 13,
    color: EVIDENCIA_COLORS.textMuted,
    marginBottom: 16,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: EVIDENCIA_COLORS.textMuted,
    marginBottom: 6,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  observacion: {
    fontSize: 16,
    lineHeight: 24,
    color: EVIDENCIA_COLORS.text,
  },
});
