import leonardo from "../assets/leonardo.png"
import canva from "../assets/canva.png"
import removebg from "../assets/removebg.png"
import midjourney from "../assets/midjourney.png"
import adobe from "../assets/adobe.png"
import playground from "../assets/playground.png"

const tools = [
  {
    slug: "leonardo-ai",
    name: "Leonardo AI",
    category: "AI Image Generator",
    description: "Create stunning AI-generated artwork and assets.",
    fullDescription:
      "Leonardo AI is useful for creating AI art, game assets, character concepts, product visuals, and creative image generations. It is popular among designers, creators, and digital artists.",
    pricing: "Free + Paid",
    bestFor: "AI art, game assets, concept design",
    link: "https://leonardo.ai",
    image: leonardo,
  },

  {
    slug: "canva-ai",
    name: "Canva AI",
    category: "AI Design",
    description: "Design social posts, thumbnails, and graphics easily.",
    fullDescription:
      "Canva AI helps creators make social media graphics, YouTube thumbnails, posters, presentations, and marketing designs using AI-powered design features.",
    pricing: "Free + Paid",
    bestFor: "Social media design, thumbnails, posters",
    link: "https://www.canva.com",
    image: canva,
  },

  {
    slug: "remove-bg",
    name: "Remove.bg",
    category: "Background Remover",
    description: "Remove image backgrounds instantly using AI.",
    fullDescription:
      "Remove.bg is a simple AI tool for removing backgrounds from photos. It is useful for product images, profile photos, thumbnails, and e-commerce visuals.",
    pricing: "Free + Paid",
    bestFor: "Background removal, product photos",
    link: "https://www.remove.bg",
    image: removebg,
  },

  {
    slug: "midjourney",
    name: "Midjourney",
    category: "AI Art",
    description: "Generate cinematic AI art and creative visuals.",
    fullDescription:
      "Midjourney is known for high-quality AI artwork, cinematic images, fantasy art, concept visuals, and creative image generation.",
    pricing: "Paid",
    bestFor: "Cinematic art, fantasy images, concept visuals",
    link: "https://www.midjourney.com",
    image: midjourney,
  },

  {
    slug: "adobe-firefly",
    name: "Adobe Firefly",
    category: "AI Image Editor",
    description: "Professional AI image editing tools from Adobe.",
    fullDescription:
      "Adobe Firefly provides AI image generation and editing features for designers, marketers, and professional creators.",
    pricing: "Free + Paid",
    bestFor: "Professional editing, generative fill, design",
    link: "https://firefly.adobe.com",
    image: adobe,
  },

  {
    slug: "playground-ai",
    name: "Playground AI",
    category: "AI Generator",
    description: "Generate realistic AI images in seconds.",
    fullDescription:
      "Playground AI is an AI image generation platform for creating realistic images, artwork, and design visuals.",
    pricing: "Free + Paid",
    bestFor: "Realistic images, AI artwork, quick generations",
    link: "https://playgroundai.com",
    image: playground,
  },
]

export default tools