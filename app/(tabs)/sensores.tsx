import { ScrollView, StatusBar, StyleSheet, View } from 'react-native';

import { SensorControls } from '@/components/sensores/sensor-controls';
import { SensorEstadoCard } from '@/components/sensores/sensor-estado';
import { SensorHeader } from '@/components/sensores/sensor-header';
import { SensorReadings } from '@/components/sensores/sensor-readings';
import { CONTENT_MAX_WIDTH, EVIDENCIA_COLORS } from '@/constants/evidencia-theme';
import { useSensorMovimiento } from '@/hooks/use-sensor-movimiento';

export default function SensorMovimientoScreen() {
  const sensor = useSensorMovimiento();

  return (
    <View style={styles.root}>
      <ScrollView
        style={styles.flex}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          <SensorHeader />

          <SensorControls
            activo={sensor.activo}
            disponible={sensor.disponible}
            onIniciar={sensor.iniciar}
            onDetener={sensor.detener}
          />

          <SensorReadings
            x={sensor.x}
            y={sensor.y}
            z={sensor.z}
            activo={sensor.activo}
          />

          <SensorEstadoCard estado={sensor.estado} />
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
