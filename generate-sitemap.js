import fs from "fs"

const siteUrl = "https://ai-image-tools.vercel.app"

const staticPages = [
  "",
]

const toolSlugs = [
  "chatgpt",
  "midjourney",
  "leonardo-ai",
  "canva-ai",
]

const toolPages = toolSlugs.map(
  (slug) => `/tool/${slug}`
)

const allPages = [...staticPages, ...toolPages]

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages
  .map(
    (page) => `
  <url>
    <loc>${siteUrl}${page}</loc>
  </url>`
  )
  .join("")}
</urlset>
`

fs.writeFileSync("./public/sitemap.xml", sitemap)

console.log("Sitemap generated successfully!")