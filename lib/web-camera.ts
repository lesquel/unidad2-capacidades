type OnPhoto = (uri: string) => void;

export function abrirSelectorArchivoWeb(onFile: OnPhoto) {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'image/*';
  input.setAttribute('capture', 'environment');
  input.style.position = 'fixed';
  input.style.left = '-9999px';
  document.body.appendChild(input);

  const cleanup = () => {
    if (input.parentNode) input.parentNode.removeChild(input);
  };

  input.onchange = (e: Event) => {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (file) onFile(URL.createObjectURL(file));
    cleanup();
  };

  input.click();
  setTimeout(() => {
    if (!input.files || input.files.length === 0) cleanup();
  }, 60_000);
}

export function abrirCamaraWeb(onPhoto: OnPhoto) {
  if (!navigator.mediaDevices?.getUserMedia) {
    abrirSelectorArchivoWeb(onPhoto);
    return;
  }

  const overlay = crearOverlay();
  const video = crearVideo();
  const { row, btnCapturar, btnCancelar } = crearControles();

  overlay.appendChild(video);
  overlay.appendChild(row);
  document.body.appendChild(overlay);

  let stream: MediaStream | null = null;

  const cleanup = () => {
    stream?.getTracks().forEach((t) => t.stop());
    if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
  };

  pedirCamara()
    .then((s) => {
      stream = s;
      video.srcObject = s;
    })
    .catch((err) => {
      console.error('[web-camera] getUserMedia falló:', err);
      cleanup();
      abrirSelectorArchivoWeb(onPhoto);
    });

  btnCapturar.onclick = () => {
    if (!video.videoWidth) return;
    const dataUrl = capturarFrame(video);
    if (dataUrl) onPhoto(dataUrl);
    cleanup();
  };

  btnCancelar.onclick = cleanup;
}

function pedirCamara(): Promise<MediaStream> {
  return navigator.mediaDevices
    .getUserMedia({ video: { facingMode: 'environment' }, audio: false })
    .catch(() => navigator.mediaDevices.getUserMedia({ video: true, audio: false }));
}

function capturarFrame(video: HTMLVideoElement): string | null {
  const canvas = document.createElement('canvas');
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;
  ctx.drawImage(video, 0, 0);
  return canvas.toDataURL('image/jpeg', 0.85);
}

function crearOverlay(): HTMLDivElement {
  const overlay = document.createElement('div');
  overlay.style.cssText = [
    'position:fixed', 'inset:0',
    'background:rgba(0,0,0,0.95)', 'z-index:99999',
    'display:flex', 'flex-direction:column',
    'align-items:center', 'justify-content:center',
    'gap:16px', 'padding:20px', 'box-sizing:border-box',
  ].join(';');
  return overlay;
}

function crearVideo(): HTMLVideoElement {
  const video = document.createElement('video');
  video.autoplay = true;
  video.playsInline = true;
  video.muted = true;
  video.style.cssText = 'max-width:100%;max-height:70vh;border-radius:12px;background:#000';
  return video;
}

function crearControles() {
  const row = document.createElement('div');
  row.style.cssText = 'display:flex;gap:12px;flex-wrap:wrap;justify-content:center';

  const btnCapturar = crearBoton('Capturar', '#FFFFFF', '#0A0A0A', '#FFFFFF');
  const btnCancelar = crearBoton('Cancelar', 'transparent', '#FFFFFF', '#FFFFFF');
  row.appendChild(btnCapturar);
  row.appendChild(btnCancelar);

  return { row, btnCapturar, btnCancelar };
}

function crearBoton(label: string, bg: string, color: string, border: string): HTMLButtonElement {
  const b = document.createElement('button');
  b.textContent = label;
  b.style.cssText = [
    `background:${bg}`, `color:${color}`,
    `border:2px solid ${border}`,
    'padding:12px 24px', 'border-radius:12px',
    'font-size:16px', 'font-weight:700', 'cursor:pointer',
  ].join(';');
  return b;
}
