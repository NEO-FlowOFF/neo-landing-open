import { statSync } from "node:fs";
import { resolve } from "node:path";

const site = import.meta.env.SITE?.replace(/\/$/, "");

const routes = [
  {
    path: "/",
    source: "src/pages/index.astro",
    changefreq: "weekly",
    priority: "1.0",
  },
  {
    path: "/vejacomo",
    source: "src/pages/vejacomo.astro",
    changefreq: "weekly",
    priority: "0.9",
  },
  {
    path: "/privacidade",
    source: "src/pages/privacidade.astro",
    changefreq: "yearly",
    priority: "0.4",
  },
  {
    path: "/termos",
    source: "src/pages/termos.astro",
    changefreq: "yearly",
    priority: "0.4",
  },
  {
    path: "/cookies",
    source: "src/pages/cookies.astro",
    changefreq: "yearly",
    priority: "0.4",
  },
  {
    path: "/seguranca",
    source: "src/pages/seguranca.astro",
    changefreq: "yearly",
    priority: "0.4",
  },
] as const;

function getLastModified(relativeSourcePath: string) {
  const absolutePath = resolve(process.cwd(), relativeSourcePath);
  const { mtime } = statSync(absolutePath);
  return mtime.toISOString();
}

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export function GET() {
  if (!site) {
    throw new Error("Astro site URL is required to generate sitemap.xml");
  }

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(({ path, source, changefreq, priority }) => {
    const loc = `${site}${path}`;
    const lastmod = getLastModified(source);

    return `  <url>
    <loc>${escapeXml(loc)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
  })
  .join("\n")}
</urlset>`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
