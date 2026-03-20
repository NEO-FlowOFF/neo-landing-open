const site = "https://neo-landing-open.vercel.app";

const routes = [
  "/",
  "/obrigado",
  "/privacidade",
  "/termos",
  "/cookies",
  "/seguranca",
  "/vejacomo",
];

export function GET() {
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (route) => `  <url>
    <loc>${site}${route}</loc>
  </url>`,
  )
  .join("\n")}
</urlset>`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
