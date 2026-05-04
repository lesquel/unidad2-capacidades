import { StyleSheet, View } from 'react-native';

import { StatusPill } from './status-pill';

type Props = {
  tieneImagen: boolean;
  tieneObservacion: boolean;
};

export function StatusRow({ tieneImagen, tieneObservacion }: Props) {
  return (
    <View style={styles.row}>
      <StatusPill
        icon={tieneImagen ? 'checkmark-circle' : 'image-outline'}
        label="Imagen"
        done={tieneImagen}
      />
      <StatusPill
        icon={tieneObservacion ? 'checkmark-circle' : 'create-outline'}
        label="Observación"
        done={tieneObservacion}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'center',
    marginBottom: 16,
  },
});
