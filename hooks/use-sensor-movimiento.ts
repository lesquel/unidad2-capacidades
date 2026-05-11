import { useEffect, useMemo, useRef, useState } from 'react';
import { Accelerometer } from 'expo-sensors';

type Subscription = { remove: () => void };

export type SensorEstado =
  | 'sin-iniciar'
  | 'quieto'
  | 'leve'
  | 'fuerte'
  | 'detenido'
  | 'no-disponible';

type Lectura = { x: number; y: number; z: number } | null;

const UMBRAL_LEVE = 1.2;
const UMBRAL_FUERTE = 2.0;
const INTERVALO_MS = 300;

function calcularEstadoMovimiento(lectura: NonNullable<Lectura>): Exclude<SensorEstado, 'sin-iniciar' | 'detenido'> {
  const { x, y, z } = lectura;
  const intensidad = Math.abs(x) + Math.abs(y) + Math.abs(z);

  if (intensidad < UMBRAL_LEVE) return 'quieto';
  if (intensidad < UMBRAL_FUERTE) return 'leve';
  return 'fuerte';
}

function redondear(valor: number): number {
  return Math.round(valor * 100) / 100;
}

export function useSensorMovimiento() {
  const [activo, setActivo] = useState(false);
  const [seInicioAlgunaVez, setSeInicioAlgunaVez] = useState(false);
  const [lectura, setLectura] = useState<Lectura>(null);
  const [disponible, setDisponible] = useState<boolean | null>(null);
  const subRef = useRef<Subscription | null>(null);

  useEffect(() => {
    let cancelado = false;
    (async () => {
      try {
        const ok = await Accelerometer.isAvailableAsync();
        if (!cancelado) setDisponible(ok);
      } catch {
        if (!cancelado) setDisponible(false);
      }
    })();
    return () => {
      cancelado = true;
      subRef.current?.remove();
      subRef.current = null;
    };
  }, []);

  function iniciar() {
    if (subRef.current) return;
    if (disponible === false) return;
    try {
      Accelerometer.setUpdateInterval(INTERVALO_MS);
      subRef.current = Accelerometer.addListener((data) => {
        setLectura({
          x: redondear(data.x),
          y: redondear(data.y),
          z: redondear(data.z),
        });
      });
      setActivo(true);
      setSeInicioAlgunaVez(true);
    } catch {
      setDisponible(false);
    }
  }

  function detener() {
    subRef.current?.remove();
    subRef.current = null;
    setActivo(false);
    setLectura(null);
  }

  const estado: SensorEstado = useMemo(() => {
    if (disponible === false) return 'no-disponible';
    if (activo && lectura) return calcularEstadoMovimiento(lectura);
    if (seInicioAlgunaVez) return 'detenido';
    return 'sin-iniciar';
  }, [activo, lectura, seInicioAlgunaVez, disponible]);

  return {
    activo,
    x: lectura?.x ?? null,
    y: lectura?.y ?? null,
    z: lectura?.z ?? null,
    estado,
    disponible,
    iniciar,
    detener,
  };
}
