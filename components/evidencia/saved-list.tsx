import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { EVIDENCIA_COLORS } from '@/constants/evidencia-theme';
import type { EvidenciaGuardada } from '@/lib/evidencia-storage';
import { Card } from './card';

type Props = {
  evidencias: EvidenciaGuardada[];
  cargando: boolean;
  onEliminar: (id: string) => void;
};

export function SavedList({ evidencias, cargando, onEliminar }: Props) {
  const trailing = (
    <Text style={styles.contador}>
      {evidencias.length} {evidencias.length === 1 ? 'guardada' : 'guardadas'}
    </Text>
  );

  return (
    <Card title="Evidencias guardadas" trailing={trailing}>
      {cargando ? (
        <Text style={styles.muted}>Cargando...</Text>
      ) : evidencias.length === 0 ? (
        <Text style={styles.muted}>
          Todavía no guardaste ninguna evidencia. Capturá una imagen, escribí una observación
          y tocá &quot;Guardar evidencia&quot;.
        </Text>
      ) : (
        evidencias.map((ev) => <SavedItem key={ev.id} evidencia={ev} onEliminar={onEliminar} />)
      )}
    </Card>
  );
}

function SavedItem({
  evidencia,
  onEliminar,
}: {
  evidencia: EvidenciaGuardada;
  onEliminar: (id: string) => void;
}) {
  return (
    <View style={styles.item}>
      <Image source={{ uri: evidencia.imageUri }} style={styles.thumb} resizeMode="cover" />
      <View style={styles.itemBody}>
        <Text style={styles.observacion} numberOfLines={3}>
          {evidencia.observacion}
        </Text>
        <Text style={styles.fecha}>{formatearFecha(evidencia.fecha)}</Text>
      </View>
      <TouchableOpacity
        style={styles.btnEliminar}
        onPress={() => onEliminar(evidencia.id)}
        activeOpacity={0.7}
        accessibilityLabel="Eliminar evidencia"
      >
        <Ionicons name="trash-outline" size={18} color={EVIDENCIA_COLORS.text} />
      </TouchableOpacity>
    </View>
  );
}

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

const styles = StyleSheet.create({
  contador: {
    fontSize: 12,
    fontWeight: '600',
    color: EVIDENCIA_COLORS.textMuted,
  },
  muted: {
    fontSize: 13,
    color: EVIDENCIA_COLORS.textMuted,
    lineHeight: 19,
  },
  item: {
    flexDirection: 'row',
    gap: 12,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: EVIDENCIA_COLORS.border,
  },
  thumb: {
    width: 64,
    height: 64,
    borderRadius: 8,
    backgroundColor: EVIDENCIA_COLORS.surface,
  },
  itemBody: {
    flex: 1,
    gap: 4,
  },
  observacion: {
    fontSize: 14,
    color: EVIDENCIA_COLORS.text,
    fontWeight: '500',
  },
  fecha: {
    fontSize: 12,
    color: EVIDENCIA_COLORS.textMuted,
  },
  btnEliminar: {
    width: 36,
    height: 36,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: EVIDENCIA_COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
  },
});
