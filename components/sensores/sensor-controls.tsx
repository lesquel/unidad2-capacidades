import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { EVIDENCIA_COLORS } from '@/constants/evidencia-theme';
import { Card } from '@/components/evidencia/card';
import { StatusPill } from '@/components/evidencia/status-pill';

type Props = {
  activo: boolean;
  disponible: boolean | null;
  onIniciar: () => void;
  onDetener: () => void;
};

export function SensorControls({ activo, disponible, onIniciar, onDetener }: Props) {
  const sensorInaccesible = disponible === false;
  const iniciarDeshabilitado = activo || sensorInaccesible;
  const detenerDeshabilitado = !activo || sensorInaccesible;

  const trailing = (
    <StatusPill
      icon={
        sensorInaccesible
          ? 'alert-circle'
          : activo
            ? 'radio-button-on'
            : 'radio-button-off'
      }
      label={sensorInaccesible ? 'No disponible' : activo ? 'Capturando' : 'En pausa'}
      done={activo && !sensorInaccesible}
    />
  );

  return (
    <Card title="1. Controlá el sensor" trailing={trailing}>
      <View style={styles.row}>
        <TouchableOpacity
          style={[styles.btnSolid, iniciarDeshabilitado && styles.btnDisabled]}
          onPress={onIniciar}
          activeOpacity={0.85}
          disabled={iniciarDeshabilitado}
        >
          <Ionicons name="play" size={20} color={EVIDENCIA_COLORS.textInverse} />
          <Text style={styles.btnSolidTexto}>Iniciar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.btnOutline, detenerDeshabilitado && styles.btnDisabled]}
          onPress={onDetener}
          activeOpacity={0.85}
          disabled={detenerDeshabilitado}
        >
          <Ionicons name="stop" size={20} color={EVIDENCIA_COLORS.text} />
          <Text style={styles.btnOutlineTexto}>Detener</Text>
        </TouchableOpacity>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 10,
  },
  btnSolid: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: EVIDENCIA_COLORS.primary,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: EVIDENCIA_COLORS.primary,
  },
  btnOutline: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: EVIDENCIA_COLORS.card,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: EVIDENCIA_COLORS.text,
  },
  btnDisabled: {
    opacity: 0.4,
  },
  btnSolidTexto: {
    color: EVIDENCIA_COLORS.textInverse,
    fontSize: 14,
    fontWeight: '700',
  },
  btnOutlineTexto: {
    color: EVIDENCIA_COLORS.text,
    fontSize: 14,
    fontWeight: '700',
  },
});
