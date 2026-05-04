import { useRef, useState } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';

type Props = {
  visible: boolean;
  onClose: () => void;
  onCapture: (uri: string) => void;
};

export function CameraModal({ visible, onClose, onCapture }: Props) {
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView | null>(null);
  const [capturando, setCapturando] = useState(false);

  const capturar = async () => {
    if (!cameraRef.current || capturando) return;
    setCapturando(true);
    try {
      const foto = await cameraRef.current.takePictureAsync({ quality: 0.7 });
      if (foto?.uri) onCapture(foto.uri);
    } catch (e: any) {
      console.error('[camera-modal] takePictureAsync falló:', e);
    } finally {
      setCapturando(false);
    }
  };

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <View style={styles.root}>
        {!permission ? (
          <Placeholder mensaje="Cargando..." onCancel={onClose} />
        ) : !permission.granted ? (
          <Placeholder
            mensaje="Necesitamos permiso para usar la cámara"
            primary={{ label: 'Permitir cámara', onPress: requestPermission }}
            onCancel={onClose}
          />
        ) : (
          <>
            <CameraView ref={cameraRef} style={styles.camera} facing="back" />
            <View style={styles.controles}>
              <TouchableOpacity
                style={styles.btnOutline}
                onPress={onClose}
                disabled={capturando}
                activeOpacity={0.85}
              >
                <Ionicons name="close" size={20} color="#fff" />
                <Text style={styles.btnOutlineText}>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.btnSolid, capturando && styles.disabled]}
                onPress={capturar}
                disabled={capturando}
                activeOpacity={0.85}
              >
                <Ionicons name="camera" size={20} color="#0A0A0A" />
                <Text style={styles.btnSolidText}>
                  {capturando ? 'Capturando…' : 'Capturar'}
                </Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    </Modal>
  );
}

function Placeholder({
  mensaje,
  primary,
  onCancel,
}: {
  mensaje: string;
  primary?: { label: string; onPress: () => void };
  onCancel: () => void;
}) {
  return (
    <View style={styles.center}>
      <Ionicons name="camera-outline" size={48} color="#fff" />
      <Text style={styles.mensaje}>{mensaje}</Text>
      {primary && (
        <TouchableOpacity style={styles.btnSolid} onPress={primary.onPress} activeOpacity={0.85}>
          <Text style={styles.btnSolidText}>{primary.label}</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity style={styles.btnOutline} onPress={onCancel} activeOpacity={0.85}>
        <Text style={styles.btnOutlineText}>Cerrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#000' },
  camera: { flex: 1 },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    padding: 24,
  },
  mensaje: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 22,
  },
  controles: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    gap: 12,
    padding: 20,
    paddingBottom: 32,
    justifyContent: 'center',
  },
  btnSolid: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#fff',
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 12,
  },
  btnSolidText: { color: '#0A0A0A', fontWeight: '700', fontSize: 16 },
  btnOutline: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#fff',
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 12,
  },
  btnOutlineText: { color: '#fff', fontWeight: '700', fontSize: 16 },
  disabled: { opacity: 0.6 },
});
