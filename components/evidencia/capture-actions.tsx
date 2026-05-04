import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { EVIDENCIA_COLORS } from '@/constants/evidencia-theme';
import { Card } from './card';

type Props = {
  onTomarFoto: () => void;
  onSeleccionarImagen: () => void;
};

export function CaptureActions({ onTomarFoto, onSeleccionarImagen }: Props) {
  return (
    <Card title="1. Capturá la evidencia">
      <View style={styles.row}>
        <TouchableOpacity style={styles.btnSolid} onPress={onTomarFoto} activeOpacity={0.85}>
          <Ionicons name="camera" size={20} color={EVIDENCIA_COLORS.textInverse} />
          <Text style={styles.btnSolidTexto}>Cámara</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btnOutline}
          onPress={onSeleccionarImagen}
          activeOpacity={0.85}
        >
          <Ionicons name="images" size={20} color={EVIDENCIA_COLORS.text} />
          <Text style={styles.btnOutlineTexto}>Galería</Text>
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
