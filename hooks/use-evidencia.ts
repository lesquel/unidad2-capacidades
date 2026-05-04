import { useCallback, useEffect, useState } from 'react';
import { Alert, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import {
  EvidenciaGuardada,
  eliminarEvidencia as removeFromStorage,
  listarEvidencias,
  persistirEvidencia,
} from '@/lib/evidencia-storage';
import { OBSERVACION_MAX } from '@/constants/evidencia-theme';

export type EvidenciaState = {
  imageUri: string | null;
  observacion: string;
  tieneImagen: boolean;
  tieneObservacion: boolean;
  observacionMax: number;
  evidencias: EvidenciaGuardada[];
  cargandoLista: boolean;
  cameraOpen: boolean;
};

export type EvidenciaActions = {
  abrirCamara: () => void;
  cerrarCamara: () => void;
  confirmarFoto: (uri: string) => void;
  seleccionarImagen: () => Promise<void>;
  quitarImagen: () => void;
  setObservacion: (texto: string) => void;
  guardar: () => Promise<void>;
  eliminarEvidencia: (id: string) => Promise<void>;
};

export function useEvidencia(): EvidenciaState & EvidenciaActions {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [observacion, setObservacionRaw] = useState('');
  const [evidencias, setEvidencias] = useState<EvidenciaGuardada[]>([]);
  const [cargandoLista, setCargandoLista] = useState(true);
  const [cameraOpen, setCameraOpen] = useState(false);

  useEffect(() => {
    listarEvidencias()
      .then(setEvidencias)
      .finally(() => setCargandoLista(false));
  }, []);

  const abrirCamara = useCallback(() => setCameraOpen(true), []);
  const cerrarCamara = useCallback(() => setCameraOpen(false), []);

  const confirmarFoto = useCallback((uri: string) => {
    setImageUri(uri);
    setCameraOpen(false);
  }, []);

  const seleccionarImagen = useCallback(async () => {
    try {
      if (Platform.OS !== 'web') {
        const permiso = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permiso.granted) {
          Alert.alert('Permiso denegado', 'Necesitamos acceso a la galería.');
          return;
        }
      }

      const resultado = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: 'images',
        quality: 0.7,
      });

      if (!resultado.canceled) setImageUri(resultado.assets[0].uri);
    } catch (e: any) {
      Alert.alert('Error con la galería', String(e?.message ?? e));
    }
  }, []);

  const quitarImagen = useCallback(() => setImageUri(null), []);

  const setObservacion = useCallback((texto: string) => {
    if (texto.length <= OBSERVACION_MAX) setObservacionRaw(texto);
  }, []);

  const guardar = useCallback(async () => {
    if (!imageUri) {
      Alert.alert('Falta la imagen', 'Capturá o seleccioná una imagen antes de guardar.');
      return;
    }
    if (!observacion.trim()) {
      Alert.alert('Falta la observación', 'Escribí una observación sobre la tarea.');
      return;
    }

    try {
      const nueva = await persistirEvidencia({
        imageUri,
        observacion: observacion.trim(),
      });
      setEvidencias((prev) => [nueva, ...prev]);
      setImageUri(null);
      setObservacionRaw('');
      Alert.alert('Evidencia guardada', 'La evidencia se guardó correctamente.');
    } catch (e: any) {
      Alert.alert('Error al guardar', String(e?.message ?? e));
    }
  }, [imageUri, observacion]);

  const eliminarEvidencia = useCallback(async (id: string) => {
    try {
      await removeFromStorage(id);
      setEvidencias((prev) => prev.filter((e) => e.id !== id));
    } catch (e: any) {
      Alert.alert('Error al eliminar', String(e?.message ?? e));
    }
  }, []);

  return {
    imageUri,
    observacion,
    tieneImagen: !!imageUri,
    tieneObservacion: observacion.trim().length > 0,
    observacionMax: OBSERVACION_MAX,
    evidencias,
    cargandoLista,
    cameraOpen,
    abrirCamara,
    cerrarCamara,
    confirmarFoto,
    seleccionarImagen,
    quitarImagen,
    setObservacion,
    guardar,
    eliminarEvidencia,
  };
}
