import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { EvidenciaProvider } from '@/context/evidencia-context';
import { EVIDENCIA_COLORS } from '@/constants/evidencia-theme';

export default function TabsLayout() {
  return (
    <EvidenciaProvider>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: EVIDENCIA_COLORS.primary,
          tabBarInactiveTintColor: EVIDENCIA_COLORS.textMuted,
          tabBarStyle: {
            backgroundColor: EVIDENCIA_COLORS.card,
            borderTopColor: EVIDENCIA_COLORS.border,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '600',
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Nueva evidencia',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="add-circle-outline" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="evidencias"
          options={{
            title: 'Mis evidencias',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="albums-outline" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="sensores"
          options={{
            title: 'Sensores',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="pulse-outline" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="ubicacion"
          options={{
            title: 'Ubicación',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="location-outline" size={size} color={color} />
            ),
          }}
        />
      </Tabs>
    </EvidenciaProvider>
  );
}
