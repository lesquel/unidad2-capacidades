# Registro de Evidencia Educativa

Mini app móvil/web hecha con **React Native + Expo Router** que permite a estudiantes registrar evidencia fotográfica de tareas, deberes o prácticas. Cada registro incluye una imagen (cámara o galería) y una observación, y se persiste localmente con `AsyncStorage`.

## Capacidades híbridas

- **Cámara embebida** con `expo-camera` (`<CameraView>`) — preview en vivo dentro de la app, MISMO componente en mobile y web (en web usa `getUserMedia` por debajo)
- **Galería** cross-platform vía `expo-image-picker`
- **Persistencia** local con `@react-native-async-storage/async-storage` (localStorage en web, almacenamiento nativo en mobile)
- **Layout responsive** con `maxWidth` centrado: en mobile llena la pantalla, en desktop queda en 600px centrados

## Stack

- Expo SDK 54
- React Native 0.81 + React 19
- Expo Router 6 (file-based routing)
- TypeScript estricto
- `expo-camera`, `expo-image-picker`, `@expo/vector-icons`, `@react-native-async-storage/async-storage`

## Arquitectura

Separación por responsabilidad, no por capa:

```
app/index.tsx                    Composición — solo dibuja el árbol
hooks/use-evidencia.ts           Estado + acciones (lógica de negocio)
lib/evidencia-storage.ts         Capa de persistencia (AsyncStorage)
constants/evidencia-theme.ts     Design tokens B&W
components/evidencia/            Presentacionales puros
  ├── card.tsx                   Primitive reutilizable
  ├── camera-modal.tsx           Overlay con CameraView (mobile + web)
  ├── evidencia-header.tsx
  ├── status-row.tsx + status-pill.tsx
  ├── capture-actions.tsx
  ├── image-preview.tsx
  ├── observation-input.tsx
  ├── save-button.tsx
  └── saved-list.tsx
```

Principios:
- **Container/Presentational**: el hook tiene el estado, los componentes solo reciben props
- **Side-effects aislados**: la manipulación de DOM y el storage viven en `lib/`, nunca dentro de un componente
- **Single Responsibility**: cada archivo tiene un solo trabajo
- **Tokens centralizados**: una sola paleta B&W, los componentes la consumen

## Cómo correr

```bash
bun install
bun start
```

Después:
- Apretá `w` para abrir en web
- Escaneá el QR con Expo Go en el celular
- Apretá `a` o `i` para emulador Android/iOS

## Rúbrica cumplida

1. Abre sin errores en Expo Go ✓
2. Selecciona imagen desde galería ✓
3. Toma foto desde la cámara ✓
4. Muestra la imagen capturada ✓
5. Relacionada con un proyecto educativo ✓
6. Campo de texto para observación con contador ✓

Plus:
- Persistencia local de evidencias guardadas (no se pierden al recargar)
- Lista de evidencias guardadas con thumbnail, fecha y opción de eliminar
- UI responsive (mobile + web desktop)
- Cámara embebida con `<CameraView>` — mismo UX en mobile y web (preview en vivo + capturar)
