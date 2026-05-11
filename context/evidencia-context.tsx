import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { Alert, Platform } from 'react-native';
import { router } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';

import { OBSERVACION_MAX } from '@/constants/evidencia-theme';
import {
  EvidenciaGuardada,
  eliminarEvidencia as removeFromStorage,
  listarEvidencias,
  persistirEvidencia,
} from '@/lib/evidencia-storage';

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

type EvidenciaContextValue = EvidenciaState & EvidenciaActions;

const EvidenciaContext = createContext<EvidenciaContextValue | null>(null);

export function EvidenciaProvider({ children }: { children: ReactNode }) {
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
    } catch (e: unknown) {
      Alert.alert('Error con la galería', String(e instanceof Error ? e.message : e));
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
      router.push('/evidencias');
    } catch (e: unknown) {
      Alert.alert('Error al guardar', String(e instanceof Error ? e.message : e));
    }
  }, [imageUri, observacion]);

  const eliminarEvidencia = useCallback(async (id: string) => {
    try {
      await removeFromStorage(id);
      setEvidencias((prev) => prev.filter((e) => e.id !== id));
    } catch (e: unknown) {
      Alert.alert('Error al eliminar', String(e instanceof Error ? e.message : e));
    }
  }, []);

  const value = useMemo<EvidenciaContextValue>(
    () => ({
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
    }),
    [
      imageUri,
      observacion,
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
    ],
  );

  return <EvidenciaContext.Provider value={value}>{children}</EvidenciaContext.Provider>;
}

export function useEvidencia(): EvidenciaContextValue {
  const ctx = useContext(EvidenciaContext);
  if (!ctx) {
    throw new Error('useEvidencia debe usarse dentro de EvidenciaProvider');
  }
  return ctx;
}
