import { ScrollView, StatusBar, StyleSheet, View } from 'react-native';

import { UbicacionControls } from '@/components/ubicacion/ubicacion-controls';
import { UbicacionDatos } from '@/components/ubicacion/ubicacion-datos';
import { UbicacionEstadoCard } from '@/components/ubicacion/ubicacion-estado';
import { UbicacionHeader } from '@/components/ubicacion/ubicacion-header';
import { CONTENT_MAX_WIDTH, EVIDENCIA_COLORS } from '@/constants/evidencia-theme';
import { useUbicacion } from '@/hooks/use-ubicacion';

export default function MiUbicacionScreen() {
  const ubicacion = useUbicacion();

  return (
    <View style={styles.root}>
      <ScrollView
        style={styles.flex}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          <UbicacionHeader />

          <UbicacionControls
            estado={ubicacion.estado}
            cargando={ubicacion.cargando}
            tieneDatos={ubicacion.datos !== null}
            onObtener={ubicacion.obtener}
            onAbrirMapa={ubicacion.abrirEnMapa}
            onLimpiar={ubicacion.limpiar}
          />

          <UbicacionDatos datos={ubicacion.datos} />

          <UbicacionEstadoCard estado={ubicacion.estado} />
        </View>
      </ScrollView>
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
});
