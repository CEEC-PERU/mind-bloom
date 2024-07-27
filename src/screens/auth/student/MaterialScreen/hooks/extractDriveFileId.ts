// extractDriveFileId.ts
export const extractVideoSource = (url: string): string => {
  const driveMatch = url.match(/\/file\/d\/(.*?)\/(?:view|edit)/);
  if (driveMatch) {
    return `https://drive.google.com/uc?id=${driveMatch[1]}`;
  }

  const youtubeMatch = url.match(/(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  if (youtubeMatch) {
    return `https://www.youtube.com/watch?v=${youtubeMatch[1]}`;
  }

  // Si no coincide con ningún patrón, simplemente devuelve una cadena vacía
  return '';
};
