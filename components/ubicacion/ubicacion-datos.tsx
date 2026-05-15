import { StyleSheet, Text, View } from 'react-native';

import { EVIDENCIA_COLORS } from '@/constants/evidencia-theme';
import { Card } from '@/components/evidencia/card';
import type { DatosUbicacion } from '@/hooks/use-ubicacion';

type Props = {
  datos: DatosUbicacion | null;
};

function metros(valor: number | null): string {
  if (valor === null) return 'No disponible';
  return `${valor.toFixed(2)} m`;
}

export function UbicacionDatos({ datos }: Props) {
  return (
    <Card title="2. Datos obtenidos">
      {!datos ? (
        <Text style={styles.placeholder}>
          Tocá “Obtener mi ubicación” para ver latitud, longitud, precisión y
          altitud del dispositivo.
        </Text>
      ) : (
        <View style={styles.lista}>
          <View style={styles.fila}>
            <Text style={styles.label}>Latitud</Text>
            <Text style={styles.valor}>{datos.latitud.toFixed(6)}</Text>
          </View>
          <View style={[styles.fila, styles.filaAlt]}>
            <Text style={styles.label}>Longitud</Text>
            <Text style={styles.valor}>{datos.longitud.toFixed(6)}</Text>
          </View>
          <View style={styles.fila}>
            <Text style={styles.label}>Precisión</Text>
            <Text style={styles.valor}>{metros(datos.precision)}</Text>
          </View>
          <View style={[styles.fila, styles.filaAlt]}>
            <Text style={styles.label}>Altitud</Text>
            <Text style={styles.valor}>{metros(datos.altitud)}</Text>
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
  lista: {
    borderWidth: 1,
    borderColor: EVIDENCIA_COLORS.border,
    borderRadius: 12,
    overflow: 'hidden',
  },
  fila: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 13,
    paddingHorizontal: 14,
    backgroundColor: EVIDENCIA_COLORS.card,
  },
  filaAlt: {
    backgroundColor: EVIDENCIA_COLORS.surface,
  },
  label: {
    fontSize: 13,
    fontWeight: '700',
    color: EVIDENCIA_COLORS.textMuted,
    letterSpacing: 0.3,
  },
  valor: {
    fontSize: 15,
    fontWeight: '800',
    color: EVIDENCIA_COLORS.text,
    letterSpacing: -0.2,
    fontVariant: ['tabular-nums'],
  },
});
