import { useState } from "react"
import { Routes, Route, Link, useParams } from "react-router-dom"

import leonardo from "./assets/leonardo.png"
import canva from "./assets/canva.png"
import removebg from "./assets/removebg.png"
import midjourney from "./assets/midjourney.png"
import adobe from "./assets/adobe.png"
import playground from "./assets/playground.png"

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
      "Adobe Firefly provides AI image generation and editing features for designers, marketers, and professional creators. It works well with Adobe creative workflows.",
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
      "Playground AI is an AI image generation platform for creating realistic images, artwork, and design visuals with simple prompts.",
    pricing: "Free + Paid",
    bestFor: "Realistic images, AI artwork, quick generations",
    link: "https://playgroundai.com",
    image: playground,
  },
]

function HomePage() {
  const [search, setSearch] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  const categories = [
    "All",
    "AI Image Generator",
    "AI Design",
    "Background Remover",
    "AI Art",
    "AI Image Editor",
    "AI Generator",
  ]

  const filteredTools = tools.filter((tool) => {
    const matchesSearch =
      tool.name.toLowerCase().includes(search.toLowerCase()) ||
      tool.category.toLowerCase().includes(search.toLowerCase())

    const matchesCategory =
      selectedCategory === "All" || tool.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  return (
    <>
      <section className="relative min-h-screen flex items-center px-6 pt-32">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
          <div>
            <div className="inline-block bg-cyan-500/10 border border-cyan-500/30 px-6 py-2 rounded-full text-cyan-300 mb-8">
              🚀 Discover The Future Of AI
            </div>

            <h2 className="text-6xl md:text-8xl font-black leading-tight">
              Discover The Best <br />
              <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                AI Image Tools
              </span>
            </h2>

            <p className="text-gray-400 mt-8 text-xl leading-relaxed max-w-2xl">
              Explore top AI image generators, photo enhancers, anime creators,
              logo makers, and next-generation design tools.
            </p>

            <div className="mt-12 flex gap-5 flex-wrap">
              <a
                href="#tools"
                className="bg-cyan-500 hover:bg-cyan-400 transition-all duration-300 text-black px-8 py-4 rounded-2xl font-bold text-lg shadow-lg shadow-cyan-500/30 hover:scale-105"
              >
                Start Exploring
              </a>
            </div>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="w-[400px] h-[400px] rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 blur-3xl opacity-30 absolute"></div>

            <div className="relative w-[320px] h-[320px] bg-white/5 border border-white/10 rounded-[40px] backdrop-blur-2xl flex items-center justify-center text-8xl shadow-2xl">
              🤖
            </div>
          </div>
        </div>
      </section>

      <section id="categories" className="relative px-8 pb-24">
        <h3 className="text-5xl font-black text-center mb-14">Categories</h3>

        <div className="flex flex-wrap justify-center gap-5">
          {categories.map((category, index) => (
            <button
              key={index}
              onClick={() => setSelectedCategory(category)}
              className={`px-7 py-4 rounded-2xl transition-all duration-300 font-semibold ${
                selectedCategory === category
                  ? "bg-cyan-500 text-black scale-105"
                  : "bg-white/5 border border-white/10 hover:border-cyan-400 hover:scale-105"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      <section id="tools" className="relative px-8 pb-24">
        <h3 className="text-5xl font-black text-center mb-8">
          Trending AI Tools
        </h3>

        <div className="max-w-2xl mx-auto mb-14">
          <input
            type="text"
            placeholder="Search AI tools..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white/5 backdrop-blur-2xl border border-white/10 focus:border-cyan-400 outline-none px-6 py-5 rounded-2xl text-white text-lg"
          />
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {filteredTools.map((tool, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-2xl border border-white/10 hover:border-cyan-400 rounded-[32px] p-8 transition-all duration-500 hover:-translate-y-4 hover:shadow-2xl hover:shadow-cyan-500/10"
            >
              <div className="w-24 h-24 bg-white rounded-3xl p-4 flex items-center justify-center mb-6">
                <img
                  src={tool.image}
                  alt={tool.name}
                  className="w-full h-full object-contain"
                />
              </div>

              <h4 className="text-3xl font-black mb-3">{tool.name}</h4>

              <p className="text-cyan-400 font-semibold mb-4">
                {tool.category}
              </p>

              <p className="text-gray-400 leading-relaxed mb-8">
                {tool.description}
              </p>

              <Link
                to={`/tool/${tool.slug}`}
                className="block text-center bg-cyan-500 hover:bg-cyan-400 transition-all duration-300 text-black py-4 rounded-2xl font-bold text-lg hover:scale-105"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}

function ToolDetailPage() {
  const { slug } = useParams()
  const tool = tools.find((item) => item.slug === slug)

  if (!tool) {
    return (
      <section className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center">
          <h2 className="text-5xl font-black mb-6">Tool Not Found</h2>
          <Link
            to="/"
            className="inline-block bg-cyan-500 text-black px-8 py-4 rounded-2xl font-bold"
          >
            Back Home
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className="min-h-screen px-6 pt-40 pb-24">
      <div className="max-w-5xl mx-auto bg-white/5 border border-white/10 rounded-[40px] p-10 md:p-14 backdrop-blur-2xl">
        <Link to="/" className="text-cyan-400 font-semibold">
          ← Back to all tools
        </Link>

        <div className="grid md:grid-cols-[140px_1fr] gap-10 mt-10 items-start">
          <div className="w-32 h-32 bg-white rounded-3xl p-5 flex items-center justify-center">
            <img
              src={tool.image}
              alt={tool.name}
              className="w-full h-full object-contain"
            />
          </div>

          <div>
            <p className="text-cyan-400 font-semibold mb-3">
              {tool.category}
            </p>

            <h1 className="text-5xl md:text-7xl font-black mb-6">
              {tool.name}
            </h1>

            <p className="text-gray-300 text-xl leading-relaxed mb-8">
              {tool.fullDescription}
            </p>

            <div className="grid md:grid-cols-2 gap-5 mb-10">
              <div className="bg-black/30 border border-white/10 rounded-3xl p-6">
                <p className="text-gray-500 mb-2">Pricing</p>
                <p className="text-2xl font-bold">{tool.pricing}</p>
              </div>

              <div className="bg-black/30 border border-white/10 rounded-3xl p-6">
                <p className="text-gray-500 mb-2">Best For</p>
                <p className="text-2xl font-bold">{tool.bestFor}</p>
              </div>
            </div>

            <a
              href={tool.link}
              target="_blank"
              rel="noreferrer"
              className="inline-block bg-cyan-500 hover:bg-cyan-400 transition-all duration-300 text-black px-8 py-4 rounded-2xl font-bold text-lg"
            >
              Visit Official Website
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

function Layout() {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden scroll-smooth">
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-cyan-500/20 blur-[160px] rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-purple-500/20 blur-[160px] rounded-full"></div>

      <nav className="fixed top-5 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-6xl">
        <div className="backdrop-blur-2xl bg-white/5 border border-white/10 rounded-3xl px-8 py-5 flex items-center justify-between shadow-2xl">
          <Link
            to="/"
            className="text-3xl font-black bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent"
          >
            AI Image Tools
          </Link>

          <div className="hidden md:flex items-center gap-8 text-gray-300">
            <Link to="/" className="hover:text-cyan-400 transition">
              Home
            </Link>

            <a href="/#tools" className="hover:text-cyan-400 transition">
              Tools
            </a>
          </div>

          <a
            href="/#tools"
            className="bg-cyan-500 hover:bg-cyan-400 transition-all duration-300 text-black px-6 py-3 rounded-2xl font-bold shadow-lg shadow-cyan-500/20"
          >
            Explore
          </a>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/tool/:slug" element={<ToolDetailPage />} />
      </Routes>

      <footer className="border-t border-white/10 py-10 text-center text-gray-500">
        © 2026 AI Image Tools — Premium AI Discovery Platform
      </footer>
    </div>
  )
}

export default function App() {
  return <Layout />
}