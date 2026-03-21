function regionNameFromCode(code: string | null) {
  if (!code) return null;

  try {
    return (
      new Intl.DisplayNames(["pt-BR", "en"], { type: "region" }).of(
        code.toUpperCase(),
      ) ?? code.toUpperCase()
    );
  } catch {
    return code.toUpperCase();
  }
}

function json(data: unknown, cacheControl = "private, no-store") {
  return new Response(JSON.stringify(data), {
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": cacheControl,
    },
  });
}

function preferredLanguage(header: string | null) {
  if (!header) return null;

  const [first] = header.split(",");
  return first?.trim() || null;
}

export async function GET(request: Request) {
  const headers = request.headers;
  const language = preferredLanguage(headers.get("accept-language"));

  const cloudflareCity = headers.get("cf-ipcity");
  const cloudflareCountry = headers.get("cf-ipcountry");
  const cloudflareTimezone = headers.get("cf-timezone");

  if (cloudflareCity && cloudflareCountry) {
    return json({
      city: cloudflareCity,
      country: regionNameFromCode(cloudflareCountry),
      timezone: cloudflareTimezone,
      language,
      source: "edge.cloudflare",
      mode: "same-origin",
    });
  }

  const vercelCity = headers.get("x-vercel-ip-city");
  const vercelCountry = headers.get("x-vercel-ip-country");
  const vercelTimezone = headers.get("x-vercel-ip-timezone");

  if (vercelCity && vercelCountry) {
    return json({
      city: vercelCity,
      country: regionNameFromCode(vercelCountry),
      timezone: vercelTimezone,
      language,
      source: "edge.vercel",
      mode: "same-origin",
    });
  }

  const countryName =
    regionNameFromCode(cloudflareCountry) || regionNameFromCode(vercelCountry);

  if ((cloudflareCity || vercelCity) && countryName) {
    return json({
      city: cloudflareCity || vercelCity,
      country: countryName,
      timezone: cloudflareTimezone || vercelTimezone,
      language,
      source: "edge.partial",
      mode: "same-origin",
    });
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 2500);

  try {
    const response = await fetch("https://free.freeipapi.com/api/json", {
      signal: controller.signal,
      headers: {
        accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Geo fallback failed with ${response.status}`);
    }

    const data = await response.json();

    return json({
      city: data?.cityName ?? null,
      country: data?.countryName ?? null,
      timezone: data?.timeZones?.[0] ?? null,
      language,
      source: "fallback.freeipapi",
      mode: "same-origin",
    });
  } catch {
    return json({
      city: "GYN",
      country: "BRASIL",
      timezone: null,
      language,
      source: "fallback.local",
      mode: "same-origin",
    });
  } finally {
    clearTimeout(timeoutId);
  }
}
