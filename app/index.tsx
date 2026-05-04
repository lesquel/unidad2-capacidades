import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';

import { CameraModal } from '@/components/evidencia/camera-modal';
import { CaptureActions } from '@/components/evidencia/capture-actions';
import { EvidenciaHeader } from '@/components/evidencia/evidencia-header';
import { ImagePreview } from '@/components/evidencia/image-preview';
import { ObservationInput } from '@/components/evidencia/observation-input';
import { SaveButton } from '@/components/evidencia/save-button';
import { SavedList } from '@/components/evidencia/saved-list';
import { StatusRow } from '@/components/evidencia/status-row';
import { CONTENT_MAX_WIDTH, EVIDENCIA_COLORS } from '@/constants/evidencia-theme';
import { useEvidencia } from '@/hooks/use-evidencia';

export default function RegistroEvidenciaScreen() {
  const evidencia = useEvidencia();

  return (
    <View style={styles.root}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          style={styles.flex}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.container}>
            <EvidenciaHeader />

            <StatusRow
              tieneImagen={evidencia.tieneImagen}
              tieneObservacion={evidencia.tieneObservacion}
            />

            <CaptureActions
              onTomarFoto={evidencia.abrirCamara}
              onSeleccionarImagen={evidencia.seleccionarImagen}
            />

            <ImagePreview imageUri={evidencia.imageUri} onQuitar={evidencia.quitarImagen} />

            <ObservationInput
              value={evidencia.observacion}
              max={evidencia.observacionMax}
              onChange={evidencia.setObservacion}
            />

            <SaveButton onPress={evidencia.guardar} />

            <View style={styles.spacer} />

            <SavedList
              evidencias={evidencia.evidencias}
              cargando={evidencia.cargandoLista}
              onEliminar={evidencia.eliminarEvidencia}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <CameraModal
        visible={evidencia.cameraOpen}
        onClose={evidencia.cerrarCamara}
        onCapture={evidencia.confirmarFoto}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: EVIDENCIA_COLORS.bg },
  flex: { flex: 1 },
  scrollContent: {
    flexGrow: 1,
    paddingTop: (StatusBar.currentHeight ?? 0) + 16,
    paddingBottom: 40,
    paddingHorizontal: 16,
  },
  container: {
    width: '100%',
    maxWidth: CONTENT_MAX_WIDTH,
    alignSelf: 'center',
  },
  spacer: {
    height: 24,
  },
});
