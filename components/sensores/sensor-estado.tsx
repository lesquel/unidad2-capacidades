import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { EVIDENCIA_COLORS } from '@/constants/evidencia-theme';
import { Card } from '@/components/evidencia/card';
import type { SensorEstado } from '@/hooks/use-sensor-movimiento';

type Props = {
  estado: SensorEstado;
};

type EstadoMeta = {
  label: string;
  descripcion: string;
  icon: keyof typeof Ionicons.glyphMap;
  resaltado: boolean;
};

const ESTADO_META: Record<SensorEstado, EstadoMeta> = {
  'sin-iniciar': {
    label: 'Sin iniciar',
    descripcion: 'El sensor aún no fue activado en esta sesión.',
    icon: 'ellipse-outline',
    resaltado: false,
  },
  quieto: {
    label: 'Celular quieto',
    descripcion: 'Movimiento prácticamente nulo respecto a la gravedad.',
    icon: 'pause-circle',
    resaltado: false,
  },
  leve: {
    label: 'Movimiento leve',
    descripcion: 'Vibraciones o desplazamientos suaves del dispositivo.',
    icon: 'walk',
    resaltado: true,
  },
  fuerte: {
    label: 'Movimiento fuerte',
    descripcion: 'Sacudidas o cambios bruscos de aceleración.',
    icon: 'flash',
    resaltado: true,
  },
  detenido: {
    label: 'Sensor detenido',
    descripcion: 'La captura fue detenida. Los valores fueron limpiados.',
    icon: 'stop-circle',
    resaltado: false,
  },
  'no-disponible': {
    label: 'Sensor no disponible',
    descripcion:
      'Este dispositivo no expone acelerómetro (probá la app en un celular con Expo Go).',
    icon: 'alert-circle',
    resaltado: false,
  },
};

export function SensorEstadoCard({ estado }: Props) {
  const meta = ESTADO_META[estado];

  return (
    <Card title="3. Estado interpretado">
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
            style={[
              styles.descripcion,
              meta.resaltado && styles.descripcionResaltado,
            ]}
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
