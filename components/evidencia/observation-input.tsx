import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import { EVIDENCIA_COLORS } from '@/constants/evidencia-theme';
import { Card } from './card';
import { StatusPill } from './status-pill';

type Props = {
  value: string;
  max: number;
  onChange: (texto: string) => void;
  observacionLista: boolean;
};

/** Quita tab al final de línea (sin texto debajo en esa línea) y deja como máximo un tab en todo el texto. */
function sanitizarTabulaciones(texto: string): string {
  const lineas = texto.split('\n');
  const sinTabAlFinal = lineas.map((linea) => linea.replace(/\t+$/g, ''));
  let unido = sinTabAlFinal.join('\n');
  const primera = unido.indexOf('\t');
  if (primera !== -1) {
    unido = unido.slice(0, primera + 1) + unido.slice(primera + 1).replace(/\t/g, '');
  }
  return unido;
}

export function ObservationInput({ value, max, onChange, observacionLista }: Props) {
  const trailing = (
    <View style={styles.trailing}>
      <StatusPill
        icon={observacionLista ? 'checkmark-circle' : 'create-outline'}
        label="Observación"
        done={observacionLista}
      />
      <Text style={styles.contador}>{`${value.length}/${max}`}</Text>
    </View>
  );

  return (
    <Card title="3. Observación" trailing={trailing}>
      <ScrollView
        style={styles.inputScroll}
        nestedScrollEnabled
        showsVerticalScrollIndicator
        keyboardShouldPersistTaps="handled"
      >
        <TextInput
          style={styles.input}
          placeholder="Describí brevemente la tarea o evidencia..."
          placeholderTextColor={EVIDENCIA_COLORS.textMuted}
          value={value}
          onChangeText={(t) => onChange(sanitizarTabulaciones(t))}
          multiline
          textAlignVertical="top"
          scrollEnabled={false}
        />
      </ScrollView>
    </Card>
  );
}

const styles = StyleSheet.create({
  trailing: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 8,
    justifyContent: 'flex-end',
    maxWidth: '100%',
  },
  contador: {
    fontSize: 12,
    fontWeight: '600',
    color: EVIDENCIA_COLORS.textMuted,
  },
  inputScroll: {
    maxHeight: 176,
    borderWidth: 1,
    borderColor: EVIDENCIA_COLORS.border,
    borderRadius: 12,
    backgroundColor: EVIDENCIA_COLORS.surface,
  },
  input: {
    padding: 12,
    minHeight: 100,
    fontSize: 14,
    color: EVIDENCIA_COLORS.text,
    backgroundColor: 'transparent',
  },
});
