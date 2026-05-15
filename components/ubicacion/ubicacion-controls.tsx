import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { EVIDENCIA_COLORS } from '@/constants/evidencia-theme';
import { Card } from '@/components/evidencia/card';
import { StatusPill } from '@/components/evidencia/status-pill';
import type { UbicacionEstado } from '@/hooks/use-ubicacion';

type Props = {
  estado: UbicacionEstado;
  cargando: boolean;
  tieneDatos: boolean;
  onObtener: () => void;
  onAbrirMapa: () => void;
  onLimpiar: () => void;
};

function pill(estado: UbicacionEstado, cargando: boolean, tieneDatos: boolean) {
  if (cargando) return { icon: 'sync' as const, label: 'Buscando…', done: false };
  if (tieneDatos) return { icon: 'checkmark-circle' as const, label: 'Localizado', done: true };
  if (estado === 'permiso-denegado' || estado === 'gps-apagado' || estado === 'error' || estado === 'no-disponible') {
    return { icon: 'alert-circle' as const, label: 'Sin ubicación', done: false };
  }
  return { icon: 'navigate-outline' as const, label: 'En espera', done: false };
}

export function UbicacionControls({
  estado,
  cargando,
  tieneDatos,
  onObtener,
  onAbrirMapa,
  onLimpiar,
}: Props) {
  const p = pill(estado, cargando, tieneDatos);
  const trailing = <StatusPill icon={p.icon} label={p.label} done={p.done} />;

  const accionesDeshabilitadas = !tieneDatos;
  const limpiarDeshabilitado = !tieneDatos && estado === 'sin-iniciar';

  return (
    <Card title="1. Obtené tu ubicación" trailing={trailing}>
      <TouchableOpacity
        style={[styles.btnSolid, cargando && styles.btnDisabled]}
        onPress={onObtener}
        activeOpacity={0.85}
        disabled={cargando}
      >
        <Ionicons name="locate" size={20} color={EVIDENCIA_COLORS.textInverse} />
        <Text style={styles.btnSolidTexto}>
          {cargando ? 'Obteniendo…' : 'Obtener mi ubicación'}
        </Text>
      </TouchableOpacity>

      <View style={styles.row}>
        <TouchableOpacity
          style={[styles.btnOutline, accionesDeshabilitadas && styles.btnDisabled]}
          onPress={onAbrirMapa}
          activeOpacity={0.85}
          disabled={accionesDeshabilitadas}
        >
          <Ionicons name="map" size={18} color={EVIDENCIA_COLORS.text} />
          <Text style={styles.btnOutlineTexto}>Abrir en Maps</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.btnOutline, limpiarDeshabilitado && styles.btnDisabled]}
          onPress={onLimpiar}
          activeOpacity={0.85}
          disabled={limpiarDeshabilitado}
        >
          <Ionicons name="trash-outline" size={18} color={EVIDENCIA_COLORS.text} />
          <Text style={styles.btnOutlineTexto}>Limpiar</Text>
        </TouchableOpacity>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
  },
  btnSolid: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: EVIDENCIA_COLORS.primary,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: EVIDENCIA_COLORS.primary,
  },
  btnOutline: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: EVIDENCIA_COLORS.card,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: EVIDENCIA_COLORS.text,
  },
  btnDisabled: {
    opacity: 0.4,
  },
  btnSolidTexto: {
    color: EVIDENCIA_COLORS.textInverse,
    fontSize: 14,
    fontWeight: '700',
  },
  btnOutlineTexto: {
    color: EVIDENCIA_COLORS.text,
    fontSize: 14,
    fontWeight: '700',
  },
});
