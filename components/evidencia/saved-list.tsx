import { useState } from 'react';
import {
  Alert,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { EVIDENCIA_COLORS } from '@/constants/evidencia-theme';
import type { EvidenciaGuardada } from '@/lib/evidencia-storage';
import { Card } from './card';
import { EvidenciaDetailModal } from './evidencia-detail-modal';

type Props = {
  evidencias: EvidenciaGuardada[];
  cargando: boolean;
  onEliminar: (id: string) => void;
};

export function SavedList({ evidencias, cargando, onEliminar }: Props) {
  const [detalle, setDetalle] = useState<EvidenciaGuardada | null>(null);

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
        evidencias.map((ev) => (
          <SavedItem
            key={ev.id}
            evidencia={ev}
            onEliminar={onEliminar}
            onVerDetalle={() => setDetalle(ev)}
          />
        ))
      )}
      <EvidenciaDetailModal
        evidencia={detalle}
        visible={detalle !== null}
        onClose={() => setDetalle(null)}
      />
    </Card>
  );
}

function SavedItem({
  evidencia,
  onEliminar,
  onVerDetalle,
}: {
  evidencia: EvidenciaGuardada;
  onEliminar: (id: string) => void;
  onVerDetalle: () => void;
}) {
  const solicitarEliminar = () => {
    Alert.alert(
      'Eliminar evidencia',
      '¿Seguro que querés eliminar este registro? Esta acción no se puede deshacer.',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => onEliminar(evidencia.id),
        },
      ],
    );
  };

  return (
    <View style={styles.item}>
      <Pressable
        style={styles.itemMain}
        onPress={onVerDetalle}
        accessibilityRole="button"
        accessibilityLabel="Ver detalle de la evidencia"
      >
        <Image source={{ uri: evidencia.imageUri }} style={styles.thumb} resizeMode="cover" />
        <View style={styles.itemBody}>
          <Text style={styles.observacion} numberOfLines={3}>
            {evidencia.observacion}
          </Text>
          <Text style={styles.fecha}>{formatearFecha(evidencia.fecha)}</Text>
        </View>
      </Pressable>
      <TouchableOpacity
        style={styles.btnEliminar}
        onPress={solicitarEliminar}
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
    alignItems: 'flex-start',
    gap: 12,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: EVIDENCIA_COLORS.border,
  },
  itemMain: {
    flex: 1,
    flexDirection: 'row',
    gap: 12,
    minWidth: 0,
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
