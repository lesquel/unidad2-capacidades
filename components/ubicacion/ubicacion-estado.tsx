import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { EVIDENCIA_COLORS } from '@/constants/evidencia-theme';
import { Card } from '@/components/evidencia/card';
import type { UbicacionEstado } from '@/hooks/use-ubicacion';

type Props = {
  estado: UbicacionEstado;
};

type EstadoMeta = {
  label: string;
  descripcion: string;
  icon: keyof typeof Ionicons.glyphMap;
  resaltado: boolean;
};

const ESTADO_META: Record<UbicacionEstado, EstadoMeta> = {
  'sin-iniciar': {
    label: 'Sin iniciar',
    descripcion: 'Tocá el botón para obtener la ubicación actual del dispositivo.',
    icon: 'navigate-circle-outline',
    resaltado: false,
  },
  cargando: {
    label: 'Buscando ubicación',
    descripcion: 'Consultando el GPS del dispositivo. Esto puede tardar unos segundos.',
    icon: 'sync',
    resaltado: false,
  },
  obtenida: {
    label: 'Ubicación obtenida',
    descripcion: 'Coordenadas capturadas correctamente. Ya podés abrirlas en Maps.',
    icon: 'checkmark-circle',
    resaltado: true,
  },
  'permiso-denegado': {
    label: 'Permiso denegado',
    descripcion:
      'No se puede acceder a la ubicación. Habilitá el permiso de localización para esta app.',
    icon: 'lock-closed',
    resaltado: false,
  },
  'gps-apagado': {
    label: 'GPS desactivado',
    descripcion:
      'El servicio de ubicación del dispositivo está apagado. Activá el GPS y volvé a intentar.',
    icon: 'warning',
    resaltado: false,
  },
  error: {
    label: 'Error al obtener',
    descripcion: 'Ocurrió un problema al consultar la ubicación. Intentá de nuevo.',
    icon: 'alert-circle',
    resaltado: false,
  },
  'no-disponible': {
    label: 'Ubicación no disponible',
    descripcion:
      'Este dispositivo no expone servicios de ubicación (probá la app en un celular con Expo Go).',
    icon: 'cloud-offline',
    resaltado: false,
  },
};

export function UbicacionEstadoCard({ estado }: Props) {
  const meta = ESTADO_META[estado];

  return (
    <Card title="3. Estado">
      <View style={[styles.contenedor, meta.resaltado && styles.contenedorResaltado]}>
        <View style={[styles.iconoWrap, meta.resaltado && styles.iconoWrapResaltado]}>
          <Ionicons
            name={meta.icon}
            size={22}
            color={meta.resaltado ? EVIDENCIA_COLORS.textInverse : EVIDENCIA_COLORS.text}
          />
        </View>
        <View style={styles.textoWrap}>
          <Text style={[styles.label, meta.resaltado && styles.labelResaltado]}>
            {meta.label}
          </Text>
          <Text
            style={[styles.descripcion, meta.resaltado && styles.descripcionResaltado]}
          >
            {meta.descripcion}
          </Text>
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 12,
    borderRadius: 12,
    backgroundColor: EVIDENCIA_COLORS.surface,
    borderWidth: 1,
    borderColor: EVIDENCIA_COLORS.border,
  },
  contenedorResaltado: {
    backgroundColor: EVIDENCIA_COLORS.primary,
    borderColor: EVIDENCIA_COLORS.primary,
  },
  iconoWrap: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: EVIDENCIA_COLORS.card,
    borderWidth: 1,
    borderColor: EVIDENCIA_COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconoWrapResaltado: {
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderColor: 'rgba(255,255,255,0.18)',
  },
  textoWrap: {
    flex: 1,
  },
  label: {
    fontSize: 15,
    fontWeight: '800',
    color: EVIDENCIA_COLORS.text,
    letterSpacing: -0.2,
    marginBottom: 2,
  },
  labelResaltado: {
    color: EVIDENCIA_COLORS.textInverse,
  },
  descripcion: {
    fontSize: 12,
    color: EVIDENCIA_COLORS.textMuted,
    lineHeight: 17,
  },
  descripcionResaltado: {
    color: 'rgba(255,255,255,0.85)',
  },
});
