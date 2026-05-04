import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { EVIDENCIA_COLORS } from '@/constants/evidencia-theme';

type Props = {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  done: boolean;
};

export function StatusPill({ icon, label, done }: Props) {
  return (
    <View style={[styles.pill, done && styles.pillDone]}>
      <Ionicons
        name={icon}
        size={14}
        color={done ? EVIDENCIA_COLORS.textInverse : EVIDENCIA_COLORS.textMuted}
      />
      <Text style={[styles.text, done && styles.textDone]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: EVIDENCIA_COLORS.card,
    borderWidth: 1,
    borderColor: EVIDENCIA_COLORS.border,
  },
  pillDone: {
    backgroundColor: EVIDENCIA_COLORS.pillDoneBg,
    borderColor: EVIDENCIA_COLORS.pillDoneBg,
  },
  text: {
    fontSize: 12,
    fontWeight: '600',
    color: EVIDENCIA_COLORS.textMuted,
  },
  textDone: {
    color: EVIDENCIA_COLORS.textInverse,
  },
});
