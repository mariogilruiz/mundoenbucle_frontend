import { buildAssetsUrl, buildContentUrl, CONTENT_SLUGS } from "@/lib/project";

function buildFallbackResponse(slug) {
  return {
    ok: true,
    fallback: true,
    slug,
    content: {},
  };
}

function buildFallbackAssetsResponse() {
  return {
    ok: true,
    fallback: true,
    assets: {},
  };
}

export async function getContentBySlug(slug) {
  const url = buildContentUrl(slug);

  try {
    const res = await fetch(url, {
      method: "GET",
      cache: "no-store",
    });

    if (!res.ok) {
      console.warn(`Ruta no encontrada en backend: ${url} (${res.status})`);
      return buildFallbackResponse(slug);
    }

    return res.json();
  } catch (error) {
    console.warn(`Error cargando contenido desde ${url}:`, error);
    return buildFallbackResponse(slug);
  }
}

export async function getHeaderContent() {
  return getContentBySlug(CONTENT_SLUGS.header);
}

export async function getFooterContent() {
  return getContentBySlug(CONTENT_SLUGS.footer);
}

// export async function getHomeContent() {
//   return getContentBySlug(CONTENT_SLUGS.home);
// }

// export async function getServiciosContent() {
//   return getContentBySlug(CONTENT_SLUGS.servicios);
// }

// export async function getProyectosContent() {
//   return getContentBySlug(CONTENT_SLUGS.proyectos);
// }

// export async function getContactoContent() {
//   return getContentBySlug(CONTENT_SLUGS.contacto);
// }

// export async function getLegalContent() {
//   return getContentBySlug(CONTENT_SLUGS.legal);
// }

export async function getAssetsContent() {
  const url = buildAssetsUrl();

  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      cache: "no-store",
    });

    if (!res.ok) {
      console.warn(
        `Ruta de assets no encontrada en backend: ${url} (${res.status})`,
      );
      return buildFallbackAssetsResponse();
    }

    return res.json();
  } catch (error) {
    console.warn(`Error cargando assets desde ${url}:`, error);
    return buildFallbackAssetsResponse();
  }
}
