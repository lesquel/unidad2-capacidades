import { useEffect, useState } from 'react';
import { Linking } from 'react-native';
import * as Location from 'expo-location';

export type UbicacionEstado =
  | 'sin-iniciar'
  | 'cargando'
  | 'obtenida'
  | 'permiso-denegado'
  | 'gps-apagado'
  | 'error'
  | 'no-disponible';

export type DatosUbicacion = {
  latitud: number;
  longitud: number;
  precision: number | null;
  altitud: number | null;
};

export function useUbicacion() {
  const [datos, setDatos] = useState<DatosUbicacion | null>(null);
  const [estado, setEstado] = useState<UbicacionEstado>('sin-iniciar');
  const [disponible, setDisponible] = useState<boolean | null>(null);

  useEffect(() => {
    let cancelado = false;
    (async () => {
      try {
        const ok = await Location.hasServicesEnabledAsync();
        if (!cancelado) setDisponible(ok);
      } catch {
        if (!cancelado) setDisponible(false);
      }
    })();
    return () => {
      cancelado = true;
    };
  }, []);

  async function obtener() {
    try {
      setEstado('cargando');

      const serviciosActivos = await Location.hasServicesEnabledAsync();
      if (!serviciosActivos) {
        setDisponible(false);
        setEstado('gps-apagado');
        return;
      }
      setDisponible(true);

      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setEstado('permiso-denegado');
        return;
      }

      const posicion = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      setDatos({
        latitud: posicion.coords.latitude,
        longitud: posicion.coords.longitude,
        precision: posicion.coords.accuracy ?? null,
        altitud: posicion.coords.altitude ?? null,
      });
      setEstado('obtenida');
    } catch (error) {
      console.log('Error al obtener ubicación:', error);
      setEstado('error');
    }
  }

  async function abrirEnMapa() {
    if (!datos) return;
    const url = `https://www.google.com/maps?q=${datos.latitud},${datos.longitud}`;
    try {
      await Linking.openURL(url);
    } catch (error) {
      console.log('Error al abrir el mapa:', error);
    }
  }

  function limpiar() {
    setDatos(null);
    setEstado('sin-iniciar');
  }

  return {
    datos,
    estado,
    disponible,
    cargando: estado === 'cargando',
    obtener,
    abrirEnMapa,
    limpiar,
  };
}
