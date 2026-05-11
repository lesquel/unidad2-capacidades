import { StyleSheet, Text, View } from 'react-native';

import { EVIDENCIA_COLORS } from '@/constants/evidencia-theme';
import { Card } from '@/components/evidencia/card';

type Props = {
  x: number | null;
  y: number | null;
  z: number | null;
  activo: boolean;
};

function formatear(valor: number | null): string {
  if (valor === null) return '—';
  return valor.toFixed(2);
}

export function SensorReadings({ x, y, z, activo }: Props) {
  return (
    <Card title="2. Lectura del acelerómetro">
      {!activo && x === null ? (
        <Text style={styles.placeholder}>
          Iniciá la captura para ver los valores de cada eje en tiempo real.
        </Text>
      ) : (
        <View style={styles.grid}>
          <View style={styles.celda}>
            <Text style={styles.eje}>X</Text>
            <Text style={styles.valor}>{formatear(x)}</Text>
          </View>
          <View style={[styles.celda, styles.celdaMedio]}>
            <Text style={styles.eje}>Y</Text>
            <Text style={styles.valor}>{formatear(y)}</Text>
          </View>
          <View style={styles.celda}>
            <Text style={styles.eje}>Z</Text>
            <Text style={styles.valor}>{formatear(z)}</Text>
          </View>
        </View>
      )}
    </Card>
  );
}

const styles = StyleSheet.create({
  placeholder: {
    fontSize: 13,
    color: EVIDENCIA_COLORS.textMuted,
    lineHeight: 19,
  },
  grid: {
    flexDirection: 'row',
    gap: 10,
  },
  celda: {
    flex: 1,
    backgroundColor: EVIDENCIA_COLORS.surface,
    borderWidth: 1,
    borderColor: EVIDENCIA_COLORS.border,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  celdaMedio: {
    backgroundColor: EVIDENCIA_COLORS.card,
  },
  eje: {
    fontSize: 12,
    fontWeight: '700',
    color: EVIDENCIA_COLORS.textMuted,
    letterSpacing: 0.5,
    marginBottom: 6,
  },
  valor: {
    fontSize: 22,
    fontWeight: '800',
    color: EVIDENCIA_COLORS.text,
    letterSpacing: -0.4,
    fontVariant: ['tabular-nums'],
  },
});
