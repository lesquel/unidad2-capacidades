import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { EVIDENCIA_COLORS } from '@/constants/evidencia-theme';
import { Card } from './card';
import { StatusPill } from './status-pill';

type Props = {
  imageUri: string | null;
  onQuitar: () => void;
  imagenLista: boolean;
};

export function ImagePreview({ imageUri, onQuitar, imagenLista }: Props) {
  const estadoImagen = (
    <StatusPill
      icon={imagenLista ? 'checkmark-circle' : 'image-outline'}
      label="Imagen"
      done={imagenLista}
    />
  );

  return (
    <Card title="2. Vista previa" trailing={estadoImagen}>
      <View style={styles.contenedor}>
        {imageUri ? <ImagenCargada uri={imageUri} onQuitar={onQuitar} /> : <Vacio />}
      </View>
    </Card>
  );
}

function ImagenCargada({ uri, onQuitar }: { uri: string; onQuitar: () => void }) {
  return (
    <>
      <Image source={{ uri }} style={styles.imagen} resizeMode="cover" />
      <TouchableOpacity style={styles.quitarBtn} onPress={onQuitar} activeOpacity={0.85}>
        <Ionicons name="close" size={18} color="#fff" />
      </TouchableOpacity>
    </>
  );
}

function Vacio() {
  return (
    <View style={styles.empty}>
      <Ionicons name="cloud-upload-outline" size={40} color={EVIDENCIA_COLORS.textMuted} />
      <Text style={styles.emptyText}>Tomá una foto o elegí una imagen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    width: '100%',
    aspectRatio: 4 / 3,
    backgroundColor: EVIDENCIA_COLORS.surface,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: EVIDENCIA_COLORS.border,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  imagen: {
    width: '100%',
    height: '100%',
  },
  empty: {
    alignItems: 'center',
    gap: 8,
  },
  emptyText: {
    color: EVIDENCIA_COLORS.textMuted,
    fontSize: 13,
    fontWeight: '500',
  },
  quitarBtn: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: EVIDENCIA_COLORS.overlay,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
