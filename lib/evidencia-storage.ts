import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = '@evidencias/v1';

export type EvidenciaGuardada = {
  id: string;
  imageUri: string;
  observacion: string;
  fecha: string;
};

export async function listarEvidencias(): Promise<EvidenciaGuardada[]> {
  try {
    const raw = await AsyncStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as EvidenciaGuardada[]) : [];
  } catch (e) {
    console.error('[evidencia-storage] listar falló:', e);
    return [];
  }
}

export async function persistirEvidencia(
  data: Pick<EvidenciaGuardada, 'imageUri' | 'observacion'>,
): Promise<EvidenciaGuardada> {
  const evidencia: EvidenciaGuardada = {
    id: String(Date.now()),
    imageUri: data.imageUri,
    observacion: data.observacion,
    fecha: new Date().toISOString(),
  };
  const lista = await listarEvidencias();
  lista.unshift(evidencia);
  await AsyncStorage.setItem(KEY, JSON.stringify(lista));
  return evidencia;
}

export async function eliminarEvidencia(id: string): Promise<void> {
  const lista = await listarEvidencias();
  await AsyncStorage.setItem(KEY, JSON.stringify(lista.filter((e) => e.id !== id)));
}
