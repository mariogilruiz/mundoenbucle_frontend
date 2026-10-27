const resolvedApiBaseUrl = (
  process.env.NEXT_PUBLIC_API_URL || "https://api.websnomadas.com"
).trim();

export const API_BASE_URL = resolvedApiBaseUrl.replace(/\/+$/, "");
export const API_CONTENT_BASE = `${API_BASE_URL}/mundoenbucle`;
export const API_ASSETS_BASE = `${API_BASE_URL}/content-assets/mundoenbucle`;

export function buildAssetProxyUrl(assetPath) {
  const cleanAssetPath = String(assetPath || "").replace(/^\/+/, "");

  return cleanAssetPath ? `/api/assets/${cleanAssetPath}` : "";
}

// "local" sirve desde public/assets; "api" desde el proxy /api/assets
const ASSETS_SOURCE = (process.env.NEXT_PUBLIC_ASSETS_SOURCE || "local").trim();

// Ruta relativa igual en ambos orígenes, p. ej. getAssetUrl("logos/logo.svg")
export function getAssetUrl(relativePath) {
  const cleanPath = String(relativePath || "").replace(/^\/+/, "");

  if (!cleanPath) return "";

  return ASSETS_SOURCE === "api"
    ? buildAssetProxyUrl(`content-assets/mundoenbucle/${cleanPath}`)
    : `/assets/${cleanPath}`;
}

export const CONTENT_SLUGS = {
  header: "header",
  footer: "footer",
  home: "home",
  assets: "assets",
  // servicios: "servicios",
  // proyectos: "proyectos",
  // contacto: "contacto",
  // legal: "legal",
};

export function buildContentUrl(slug) {
  const cleanSlug = String(slug || "")
    .replace(/^\/+/, "")
    .replace(/\/+$/, "");

  return cleanSlug ? `${API_CONTENT_BASE}/${cleanSlug}` : API_CONTENT_BASE;
}

export function buildAssetsUrl() {
  return API_ASSETS_BASE;
}
