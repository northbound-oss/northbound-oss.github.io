export function GET({ site }) {
  const root = site ? site.href.replace(/\/$/, '') : 'https://oss.northbound.sh';
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url>
    <loc>${root}/</loc>
    <xhtml:link rel="alternate" hreflang="en" href="${root}/"/>
    <xhtml:link rel="alternate" hreflang="ru" href="${root}/ru/"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${root}/"/>
  </url>
  <url>
    <loc>${root}/ru/</loc>
    <xhtml:link rel="alternate" hreflang="en" href="${root}/"/>
    <xhtml:link rel="alternate" hreflang="ru" href="${root}/ru/"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${root}/"/>
  </url>
</urlset>
`;
  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml' }
  });
}
