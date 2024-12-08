// Fonction pour générer des couleurs aléatoires pour les graphiques
export const generateRandomColors = (count: number): string[] => {
  return Array.from({ length: count }, () => {
    const hue = Math.floor(Math.random() * 360);
    return `hsl(${hue}, 70%, 50%)`;
  });
};

// Fonction pour formater les données de l'éditeur
export const formatEditorData = (data: any) => {
  return {
    time: new Date().getTime(),
    blocks: data.blocks || [],
    version: '2.28.2'
  };
};

// Fonction pour valider les URLs
export const validateUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

// Fonction pour sanitizer le HTML
export const sanitizeHtml = (html: string): string => {
  return html
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
};
