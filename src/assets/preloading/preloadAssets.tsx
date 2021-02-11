import { initialImages, initialAudios } from './constants';

export async function preloadImages(images: any[]) {
  const promises = images.map(src => new Promise<void>((resolve, reject) => {
    const img = new Image();
    img.src = src;
    img.onload = () => resolve();
    img.onerror = (...e) => { console.error(src, ...e); reject() };
  }));

  await Promise.all(promises);
}

async function preloadAudios(audios: any[]) {
  const promises = audios.map(src => new Promise<void>((resolve, reject) => {
    const audio = new Audio(src);
    audio.oncanplaythrough = () => resolve();
    audio.onerror = (...e) => { console.error(src, ...e); reject() };
  }));

  await Promise.all(promises);
}

export async function preloadInitialAssets(...callbacks: (() => void)[]) {
  let tierIndex = 0;

  await Promise.all([
    preloadImages(initialImages[tierIndex]),
    preloadAudios(initialAudios[tierIndex]),
  ]);

  callbacks[tierIndex] && callbacks[tierIndex]();
  tierIndex++;

  if (tierIndex < initialImages.length) {
    preloadInitialAssets(...callbacks);
  }
}
