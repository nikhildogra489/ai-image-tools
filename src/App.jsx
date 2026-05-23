import { useState } from "react"
import { Routes, Route, Link, useParams } from "react-router-dom"
import tools from "./data/tools"

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

  const featuredTools = tools.slice(0, 3)

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

            <div className="mt-12 flex flex-wrap gap-5">
              <a
                href="#featured"
                className="bg-cyan-500 hover:bg-cyan-400 transition-all duration-300 text-black px-8 py-4 rounded-2xl font-bold text-lg shadow-lg shadow-cyan-500/30 hover:scale-105 inline-block"
              >
                View Featured Tools
              </a>

              <a
                href="#tools"
                className="border border-white/10 hover:border-cyan-400 transition-all duration-300 px-8 py-4 rounded-2xl font-bold text-lg hover:scale-105 inline-block"
              >
                Browse All Tools
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

      <section id="featured" className="relative px-8 pb-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-cyan-400 font-bold mb-3">EDITOR PICKS</p>
            <h3 className="text-5xl font-black">Featured AI Tools</h3>
            <p className="text-gray-400 mt-5 text-lg">
              Our top selected AI tools for creators, designers, and businesses.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {featuredTools.map((tool, index) => (
              <div
                key={tool.slug}
                className="relative bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-cyan-400/30 rounded-[36px] p-8 hover:-translate-y-4 transition-all duration-500 shadow-2xl shadow-cyan-500/10"
              >
                <div className="absolute top-6 right-6 bg-cyan-500 text-black px-4 py-2 rounded-full text-sm font-black">
                  Top #{index + 1}
                </div>

                <div className="w-24 h-24 bg-white rounded-3xl p-4 flex items-center justify-center mb-7">
                  <img
                    src={tool.image}
                    alt={tool.name}
                    className="w-full h-full object-contain"
                  />
                </div>

                <div className="flex items-center gap-3 mb-4 flex-wrap">
                  <span className="bg-cyan-500/10 text-cyan-400 px-4 py-2 rounded-full text-sm font-semibold border border-cyan-500/20">
                    {tool.category}
                  </span>

                  <span className="bg-yellow-500/10 text-yellow-400 px-4 py-2 rounded-full text-sm font-semibold border border-yellow-500/20">
                    ⭐ {tool.rating}
                  </span>

                  <span className="bg-purple-500/10 text-purple-400 px-4 py-2 rounded-full text-sm font-semibold border border-purple-500/20">
                    👥 {tool.users}
                  </span>
                </div>

                <h4 className="text-3xl font-black mb-4">{tool.name}</h4>

                <p className="text-gray-400 leading-relaxed mb-8">
                  {tool.description}
                </p>

                <Link
                  to={`/tool/${tool.slug}`}
                  className="block text-center bg-cyan-500 hover:bg-cyan-400 transition-all duration-300 text-black py-4 rounded-2xl font-bold text-lg"
                >
                  View Tool
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="categories" className="relative px-8 pb-24">
        <h3 className="text-5xl font-black text-center mb-14">Categories</h3>

        <div className="flex flex-wrap justify-center gap-5">
          {categories.map((category) => (
            <button
              key={category}
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
            onChange={(event) => setSearch(event.target.value)}
            className="w-full bg-white/5 backdrop-blur-2xl border border-white/10 focus:border-cyan-400 outline-none px-6 py-5 rounded-2xl text-white text-lg"
          />
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {filteredTools.map((tool) => (
            <div
              key={tool.slug}
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

              <div className="flex items-center gap-3 mb-4 flex-wrap">
                <span className="bg-cyan-500/10 text-cyan-400 px-4 py-2 rounded-full text-sm font-semibold border border-cyan-500/20">
                  {tool.category}
                </span>

                <span className="bg-yellow-500/10 text-yellow-400 px-4 py-2 rounded-full text-sm font-semibold border border-yellow-500/20">
                  ⭐ {tool.rating}
                </span>

                <span className="bg-purple-500/10 text-purple-400 px-4 py-2 rounded-full text-sm font-semibold border border-purple-500/20">
                  👥 {tool.users}
                </span>
              </div>

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
            <div className="flex items-center gap-3 mb-5 flex-wrap">
              <span className="bg-cyan-500/10 text-cyan-400 px-4 py-2 rounded-full text-sm font-semibold border border-cyan-500/20">
                {tool.category}
              </span>

              <span className="bg-yellow-500/10 text-yellow-400 px-4 py-2 rounded-full text-sm font-semibold border border-yellow-500/20">
                ⭐ {tool.rating}
              </span>

              <span className="bg-purple-500/10 text-purple-400 px-4 py-2 rounded-full text-sm font-semibold border border-purple-500/20">
                👥 {tool.users}
              </span>
            </div>

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
            <a href="/#featured" className="hover:text-cyan-400 transition">
              Featured
            </a>

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