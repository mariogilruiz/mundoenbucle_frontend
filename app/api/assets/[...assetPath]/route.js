import { API_BASE_URL } from "@/lib/project";

export async function GET(_request, { params }) {
  const { assetPath } = await params;

  if (!Array.isArray(assetPath) || assetPath.length === 0) {
    return new Response("Asset path is required", { status: 400 });
  }

  const remotePath = assetPath.join("/");
  const remoteUrl = `${API_BASE_URL}/${remotePath}`;

  try {
    const upstreamResponse = await fetch(remoteUrl, {
      cache: "no-store",
    });

    if (!upstreamResponse.ok) {
      return new Response("Asset not found", {
        status: upstreamResponse.status,
      });
    }

    const headers = new Headers();
    const contentType = upstreamResponse.headers.get("content-type");
    const cacheControl = upstreamResponse.headers.get("cache-control");

    if (contentType) {
      headers.set("content-type", contentType);
    }

    if (cacheControl) {
      headers.set("cache-control", cacheControl);
    }

    return new Response(upstreamResponse.body, {
      status: upstreamResponse.status,
      headers,
    });
  } catch {
    return new Response("Error loading asset", { status: 502 });
  }
}
