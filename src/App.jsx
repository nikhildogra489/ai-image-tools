import { useEffect, useState } from "react"
import { Routes, Route, Link, useParams, Navigate, useNavigate } from "react-router-dom"
import { collection, addDoc, serverTimestamp, getDocs } from "firebase/firestore"
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth"

import { db, auth } from "./firebase"
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

      <section className="relative px-8 pb-24">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
          <StatCard value="12+" label="AI Tools Listed" />
          <StatCard value="6" label="AI Categories" />
          <StatCard value="20M+" label="Combined Users" />
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
              <ToolCard key={tool.slug} tool={tool} featured index={index} />
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
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
      </section>
    </>
  )
}

function StatCard({ value, label }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-[36px] p-10 text-center backdrop-blur-2xl hover:border-cyan-400 transition-all duration-500">
      <h3 className="text-6xl font-black bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent mb-4">
        {value}
      </h3>

      <p className="text-gray-400 text-xl">{label}</p>
    </div>
  )
}

function ToolCard({ tool, featured = false, index = 0 }) {
  return (
    <div
      className={`relative ${
        featured
          ? "bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border-cyan-400/30 shadow-2xl shadow-cyan-500/10"
          : "bg-white/5 border-white/10 hover:shadow-2xl hover:shadow-cyan-500/10"
      } backdrop-blur-2xl border hover:border-cyan-400 rounded-[32px] p-8 transition-all duration-500 hover:-translate-y-4`}
    >
      {featured && (
        <div className="absolute top-6 right-6 bg-cyan-500 text-black px-4 py-2 rounded-full text-sm font-black">
          Top #{index + 1}
        </div>
      )}

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
      </div>

      <p className="text-gray-400 leading-relaxed mb-8">{tool.description}</p>

      <Link
        to={`/tool/${tool.slug}`}
        className="block text-center bg-cyan-500 hover:bg-cyan-400 transition-all duration-300 text-black py-4 rounded-2xl font-bold text-lg"
      >
        View Details
      </Link>
    </div>
  )
}

function ToolDetailPage() {
  const { slug } = useParams()
  const tool = tools.find((item) => item.slug === slug)

  if (!tool) {
    return (
      <section className="min-h-screen flex items-center justify-center">
        Tool Not Found
      </section>
    )
  }

  return (
    <section className="min-h-screen px-6 pt-40 pb-24">
      <div className="max-w-5xl mx-auto bg-white/5 border border-white/10 rounded-[40px] p-10 backdrop-blur-2xl">
        <Link to="/" className="text-cyan-400 font-semibold">
          ← Back
        </Link>

        <h1 className="text-6xl font-black mt-8 mb-6">{tool.name}</h1>

        <p className="text-gray-300 text-xl leading-relaxed mb-10">
          {tool.fullDescription}
        </p>

        <a
          href={tool.link}
          target="_blank"
          rel="noreferrer"
          className="inline-block bg-cyan-500 hover:bg-cyan-400 transition-all duration-300 text-black px-8 py-4 rounded-2xl font-bold text-lg"
        >
          Visit Official Website
        </a>
      </div>
    </section>
  )
}

function LoginPage({ user }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()

  if (user) {
    return <Navigate to="/admin" />
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    setError("")

    try {
      await signInWithEmailAndPassword(auth, email, password)
      navigate("/admin")
    } catch (error) {
      console.error(error)
      setError("Invalid email or password.")
    }
  }

  return (
    <section className="min-h-screen flex items-center justify-center px-6 pt-32">
      <div className="w-full max-w-md bg-white/5 border border-white/10 rounded-[36px] p-8 backdrop-blur-2xl">
        <h1 className="text-4xl font-black mb-3">Admin Login</h1>

        <p className="text-gray-400 mb-8">
          Login to access the private admin dashboard.
        </p>

        <form onSubmit={handleLogin} className="space-y-5">
          <input
            type="email"
            placeholder="Admin email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="w-full bg-black/30 border border-white/10 focus:border-cyan-400 outline-none px-5 py-4 rounded-2xl text-white"
          />

          <input
            type="password"
            placeholder="Admin password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="w-full bg-black/30 border border-white/10 focus:border-cyan-400 outline-none px-5 py-4 rounded-2xl text-white"
          />

          {error && (
            <p className="text-red-400 font-semibold">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-cyan-500 hover:bg-cyan-400 text-black px-6 py-4 rounded-2xl font-bold transition-all duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </section>
  )
}

function AdminPage({ user }) {
  const [subscribers, setSubscribers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchSubscribers()
  }, [])

  const fetchSubscribers = async () => {
    try {
      const querySnapshot = await getDocs(
        collection(db, "newsletterSubscribers")
      )

      const subscriberList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))

      setSubscribers(subscriberList)
      setLoading(false)
    } catch (error) {
      console.error(error)
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    await signOut(auth)
  }

  if (!user) {
    return <Navigate to="/login" />
  }

  return (
    <section className="min-h-screen px-6 pt-40 pb-24">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12">
          <div>
            <h1 className="text-6xl font-black mb-4">Admin Dashboard</h1>

            <p className="text-gray-400 text-xl">
              Newsletter Subscribers
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-400 text-white px-6 py-4 rounded-2xl font-bold transition-all duration-300"
          >
            Logout
          </button>
        </div>

        {loading ? (
          <div className="text-cyan-400 text-xl">Loading subscribers...</div>
        ) : (
          <div className="grid gap-6">
            {subscribers.length === 0 ? (
              <p className="text-gray-400 text-xl">No subscribers yet.</p>
            ) : (
              subscribers.map((subscriber) => (
                <div
                  key={subscriber.id}
                  className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-2xl"
                >
                  <p className="text-2xl font-bold text-cyan-400">
                    {subscriber.email}
                  </p>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </section>
  )
}

function Footer() {
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")

  const handleSubscribe = async (event) => {
    event.preventDefault()

    if (!email.includes("@")) {
      setMessage("Please enter valid email.")
      return
    }

    try {
      await addDoc(collection(db, "newsletterSubscribers"), {
        email,
        createdAt: serverTimestamp(),
      })

      setMessage("Subscribed successfully!")
      setEmail("")
    } catch (error) {
      console.error(error)
      setMessage("Something went wrong.")
    }
  }

  return (
    <footer className="relative border-t border-white/10 mt-20">
      <div className="max-w-7xl mx-auto px-8 py-20">
        <div className="bg-white/5 border border-white/10 rounded-[40px] p-10 md:p-16 backdrop-blur-2xl mb-20">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-5xl md:text-6xl font-black mb-6">
              Get Weekly AI Tool Updates
            </h3>

            <form
              onSubmit={handleSubscribe}
              className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto"
            >
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="flex-1 bg-black/30 border border-white/10 px-6 py-5 rounded-2xl text-white"
              />

              <button
                type="submit"
                className="bg-cyan-500 hover:bg-cyan-400 transition-all duration-300 text-black px-8 py-5 rounded-2xl font-bold"
              >
                Subscribe
              </button>
            </form>

            {message && (
              <p className="mt-5 text-cyan-400 font-semibold">{message}</p>
            )}
          </div>
        </div>
      </div>
    </footer>
  )
}

function Layout() {
  const [user, setUser] = useState(null)
  const [authLoading, setAuthLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      setAuthLoading(false)
    })

    return () => unsubscribe()
  }, [])

  if (authLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-cyan-400 text-xl">Loading...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <nav className="fixed top-5 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-6xl">
        <div className="backdrop-blur-2xl bg-white/5 border border-white/10 rounded-3xl px-8 py-5 flex items-center justify-between shadow-2xl">
          <Link
            to="/"
            className="text-3xl font-black bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent"
          >
            AI Image Tools
          </Link>

          <div className="flex items-center gap-8 text-gray-300">
            <Link to="/" className="hover:text-cyan-400 transition">
              Home
            </Link>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/tool/:slug" element={<ToolDetailPage />} />
        <Route path="/login" element={<LoginPage user={user} />} />
        <Route path="/admin" element={<AdminPage user={user} />} />
      </Routes>

      <Footer />
    </div>
  )
}

export default function App() {
  return <Layout />
}