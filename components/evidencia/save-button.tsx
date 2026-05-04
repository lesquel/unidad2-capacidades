import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { EVIDENCIA_COLORS } from '@/constants/evidencia-theme';

type Props = {
  onPress: () => void;
};

export function SaveButton({ onPress }: Props) {
  return (
    <TouchableOpacity style={styles.btn} onPress={onPress} activeOpacity={0.85}>
      <Ionicons name="save" size={20} color={EVIDENCIA_COLORS.textInverse} />
      <Text style={styles.texto}>Guardar evidencia</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: EVIDENCIA_COLORS.primary,
    paddingVertical: 16,
    borderRadius: 14,
    marginTop: 8,
  },
  texto: {
    color: EVIDENCIA_COLORS.textInverse,
    fontSize: 16,
    fontWeight: '700',
  },
});
