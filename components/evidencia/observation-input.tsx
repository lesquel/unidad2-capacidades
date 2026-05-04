import { StyleSheet, Text, TextInput } from 'react-native';

import { EVIDENCIA_COLORS } from '@/constants/evidencia-theme';
import { Card } from './card';

type Props = {
  value: string;
  max: number;
  onChange: (texto: string) => void;
};

export function ObservationInput({ value, max, onChange }: Props) {
  const contador = <Text style={styles.contador}>{`${value.length}/${max}`}</Text>;

  return (
    <Card title="3. Observación" trailing={contador}>
      <TextInput
        style={styles.input}
        placeholder="Describí brevemente la tarea o evidencia..."
        placeholderTextColor={EVIDENCIA_COLORS.textMuted}
        value={value}
        onChangeText={onChange}
        multiline
        textAlignVertical="top"
      />
    </Card>
  );
}

const styles = StyleSheet.create({
  contador: {
    fontSize: 12,
    fontWeight: '600',
    color: EVIDENCIA_COLORS.textMuted,
  },
  input: {
    borderWidth: 1,
    borderColor: EVIDENCIA_COLORS.border,
    borderRadius: 12,
    padding: 12,
    minHeight: 100,
    fontSize: 14,
    color: EVIDENCIA_COLORS.text,
    backgroundColor: EVIDENCIA_COLORS.surface,
  },
});
