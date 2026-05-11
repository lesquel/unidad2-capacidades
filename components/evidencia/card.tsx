import type { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { EVIDENCIA_COLORS } from '@/constants/evidencia-theme';

type Props = {
  title: string;
  trailing?: ReactNode;
  children: ReactNode;
};

export function Card({ title, trailing, children }: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        {trailing}
      </View>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: EVIDENCIA_COLORS.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 10,
  },
  title: {
    flexShrink: 1,
    fontSize: 14,
    fontWeight: '700',
    color: EVIDENCIA_COLORS.text,
  },
});
