import leonardo from "../assets/leonardo.png"
import canva from "../assets/canva.png"
import removebg from "../assets/removebg.png"
import midjourney from "../assets/midjourney.png"
import adobe from "../assets/adobe.png"
import playground from "../assets/playground.png"

const icon = (emoji) =>
  `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="128" height="128">
      <rect width="100%" height="100%" rx="28" fill="white"/>
      <text x="50%" y="58%" font-size="58" text-anchor="middle" dominant-baseline="middle">${emoji}</text>
    </svg>
  `)}`

const tools = [
  {
    slug: "leonardo-ai",
    name: "Leonardo AI",
    category: "AI Image Generator",
    rating: "4.9",
    users: "2M+",
    pricing: "Free + Paid",
    description: "Create stunning AI-generated artwork and assets.",
    fullDescription:
      "Leonardo AI is useful for creating AI art, game assets, character concepts, product visuals, and creative image generations.",
    bestFor: "AI art, game assets, concept design",
    link: "https://leonardo.ai",
    image: leonardo,
  },

  {
    slug: "canva-ai",
    name: "Canva AI",
    category: "AI Design",
    rating: "4.8",
    users: "10M+",
    pricing: "Free + Paid",
    description: "Design social posts, thumbnails, and graphics easily.",
    fullDescription:
      "Canva AI helps creators make social media graphics, YouTube thumbnails, posters, presentations, and marketing designs.",
    bestFor: "Social media design, thumbnails, posters",
    link: "https://www.canva.com",
    image: canva,
  },

  {
    slug: "remove-bg",
    name: "Remove.bg",
    category: "Background Remover",
    rating: "4.7",
    users: "5M+",
    pricing: "Free + Paid",
    description: "Remove image backgrounds instantly using AI.",
    fullDescription:
      "Remove.bg is useful for removing backgrounds from product images, profile photos, thumbnails, and e-commerce visuals.",
    bestFor: "Background removal, product photos",
    link: "https://www.remove.bg",
    image: removebg,
  },

  {
    slug: "midjourney",
    name: "Midjourney",
    category: "AI Art",
    rating: "4.9",
    users: "3M+",
    pricing: "Paid",
    description: "Generate cinematic AI art and creative visuals.",
    fullDescription:
      "Midjourney is known for high-quality AI artwork, cinematic images, fantasy art, concept visuals, and creative image generation.",
    bestFor: "Cinematic art, fantasy images, concept visuals",
    link: "https://www.midjourney.com",
    image: midjourney,
  },

  {
    slug: "adobe-firefly",
    name: "Adobe Firefly",
    category: "AI Image Editor",
    rating: "4.8",
    users: "1M+",
    pricing: "Free + Paid",
    description: "Professional AI image editing tools from Adobe.",
    fullDescription:
      "Adobe Firefly provides AI image generation and editing features for designers, marketers, and professional creators.",
    bestFor: "Professional editing, generative fill, design",
    link: "https://firefly.adobe.com",
    image: adobe,
  },

  {
    slug: "playground-ai",
    name: "Playground AI",
    category: "AI Generator",
    rating: "4.6",
    users: "800K+",
    pricing: "Free + Paid",
    description: "Generate realistic AI images in seconds.",
    fullDescription:
      "Playground AI is an AI image generation platform for creating realistic images, artwork, and design visuals.",
    bestFor: "Realistic images, AI artwork, quick generations",
    link: "https://playgroundai.com",
    image: playground,
  },

  {
    slug: "ideogram",
    name: "Ideogram",
    category: "AI Image Generator",
    rating: "4.7",
    users: "900K+",
    pricing: "Free + Paid",
    description: "Create AI images with strong text and typography support.",
    fullDescription:
      "Ideogram is useful for creating posters, logos, typography-based visuals, social media graphics, and creative AI-generated images.",
    bestFor: "Posters, typography, logo concepts",
    link: "https://ideogram.ai",
    image: icon("🧠"),
  },

  {
    slug: "bing-image-creator",
    name: "Bing Image Creator",
    category: "AI Image Generator",
    rating: "4.5",
    users: "20M+",
    pricing: "Free",
    description: "Generate AI images using Microsoft’s image creation tool.",
    fullDescription:
      "Bing Image Creator helps users generate images from text prompts for creative projects, social posts, and visual ideas.",
    bestFor: "Free AI image generation",
    link: "https://www.bing.com/images/create",
    image: icon("🖼️"),
  },

  {
    slug: "stable-diffusion",
    name: "Stable Diffusion",
    category: "AI Image Generator",
    rating: "4.9",
    users: "15M+",
    pricing: "Free + Paid",
    description: "Open-source AI image generation technology.",
    fullDescription:
      "Stable Diffusion is widely used for generating AI art, realistic images, concept designs, and custom creative workflows.",
    bestFor: "Open-source AI art generation",
    link: "https://stability.ai",
    image: icon("⚡"),
  },

  {
    slug: "clipdrop",
    name: "Clipdrop",
    category: "AI Image Editor",
    rating: "4.6",
    users: "700K+",
    pricing: "Free + Paid",
    description: "AI editing tools for cleanup, upscaling, and image generation.",
    fullDescription:
      "Clipdrop offers practical AI tools for image cleanup, background changes, relighting, upscaling, and creative editing.",
    bestFor: "Image cleanup, upscaling, editing",
    link: "https://clipdrop.co",
    image: icon("✨"),
  },

  {
    slug: "photoroom",
    name: "PhotoRoom",
    category: "AI Image Editor",
    rating: "4.8",
    users: "6M+",
    pricing: "Free + Paid",
    description: "Create product photos and remove backgrounds quickly.",
    fullDescription:
      "PhotoRoom helps businesses and creators make professional product photos, remove backgrounds, and create branded visuals.",
    bestFor: "Product photos, e-commerce images",
    link: "https://www.photoroom.com",
    image: icon("📸"),
  },

  {
    slug: "cleanup-pictures",
    name: "Cleanup.pictures",
    category: "AI Image Editor",
    rating: "4.5",
    users: "400K+",
    pricing: "Free + Paid",
    description: "Remove unwanted objects from photos using AI.",
    fullDescription:
      "Cleanup.pictures is useful for removing objects, distractions, people, or marks from photos.",
    bestFor: "Object removal, photo cleanup",
    link: "https://cleanup.pictures",
    image: icon("🧽"),
  },
]

export default tools