import { useEffect, useState } from "react"
import {
  Routes,
  Route,
  Link,
  useParams,
  Navigate,
  useNavigate,
} from "react-router-dom"

import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore"

import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth"

import { db, auth } from "./firebase"
import toolsData from "./data/tools"

function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
}

function getFallbackImage(name = "AI") {
  return `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200">
      <rect width="100%" height="100%" rx="40" fill="white"/>
      <text x="50%" y="55%" font-size="56" text-anchor="middle" dominant-baseline="middle">🤖</text>
      <text x="50%" y="78%" font-size="18" text-anchor="middle" fill="black">${name}</text>
    </svg>
  `)}`
}

function normalizeFirebaseTool(item) {
  const data = item.data()

  return {
    id: item.id,
    source: "firebase",
    slug: data.slug || slugify(data.name || "tool"),
    name: data.name || "Untitled Tool",
    category: data.category || "AI Tool",
    description: data.description || "AI tool added from admin dashboard.",
    fullDescription:
      data.fullDescription ||
      data.description ||
      "AI tool added from admin dashboard.",
    image: data.image || getFallbackImage(data.name || "AI"),
    link: data.link || "https://google.com",
    pricing: data.pricing || "Free + Paid",
    rating: data.rating || "4.5",
    users: data.users || "New",
    bestFor: data.bestFor || data.category || "AI creators",
  }
}

async function fetchFirebaseTools() {
  const querySnapshot = await getDocs(collection(db, "tools"))
  return querySnapshot.docs.map((item) => normalizeFirebaseTool(item))
}

function HomePage() {
  const [search, setSearch] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [firebaseTools, setFirebaseTools] = useState([])
  const [loadingTools, setLoadingTools] = useState(true)

  useEffect(() => {
    loadTools()
  }, [])

  const loadTools = async () => {
    try {
      const fetchedTools = await fetchFirebaseTools()
      setFirebaseTools(fetchedTools)
    } catch (error) {
      console.error(error)
    } finally {
      setLoadingTools(false)
    }
  }

  const staticTools = toolsData.map((tool) => ({
    ...tool,
    source: "static",
  }))

  const allTools = [...firebaseTools, ...staticTools]

  const categories = [
    "All",
    ...new Set(allTools.map((tool) => tool.category).filter(Boolean)),
  ]

  const featuredTools = allTools.slice(0, 3)

  const filteredTools = allTools.filter((tool) => {
    const query = search.toLowerCase()

    const matchesSearch =
      tool.name?.toLowerCase().includes(query) ||
      tool.category?.toLowerCase().includes(query) ||
      tool.description?.toLowerCase().includes(query)

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

            <h1 className="text-6xl md:text-8xl font-black leading-tight">
              Discover The Best <br />
              <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                AI Image Tools
              </span>
            </h1>

            <p className="text-gray-400 mt-8 text-xl leading-relaxed max-w-2xl">
              Explore AI image generators, photo editors, background removers,
              logo makers, anime creators, and creative AI platforms.
            </p>

            <div className="mt-12 flex flex-wrap gap-5">
              <a
                href="#featured"
                className="bg-cyan-500 hover:bg-cyan-400 text-black px-8 py-4 rounded-2xl font-bold text-lg shadow-lg shadow-cyan-500/30 hover:scale-105 inline-block transition-all duration-300"
              >
                View Featured Tools
              </a>

              <a
                href="#tools"
                className="border border-white/10 hover:border-cyan-400 px-8 py-4 rounded-2xl font-bold text-lg hover:scale-105 inline-block transition-all duration-300"
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
          <StatCard value={`${allTools.length}+`} label="AI Tools Listed" />
          <StatCard value={`${categories.length - 1}+`} label="AI Categories" />
          <StatCard value="20M+" label="Combined Users" />
        </div>
      </section>
            <section id="featured" className="relative px-8 pb-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-cyan-400 font-bold mb-3">EDITOR PICKS</p>

            <h2 className="text-5xl font-black">
              Featured AI Tools
            </h2>

            <p className="text-gray-400 mt-5 text-lg">
              Our top selected AI tools for creators, designers, and businesses.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {featuredTools.map((tool, index) => (
              <ToolCard
                key={`${tool.source}-${tool.id || tool.slug}`}
                tool={tool}
                featured
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      <section id="categories" className="relative px-8 pb-24">
        <h2 className="text-5xl font-black text-center mb-14">
          Categories
        </h2>

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
        <h2 className="text-5xl font-black text-center mb-8">
          Trending AI Tools
        </h2>

        <div className="max-w-2xl mx-auto mb-14">
          <input
            type="text"
            placeholder="Search AI tools..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="w-full bg-white/5 backdrop-blur-2xl border border-white/10 focus:border-cyan-400 outline-none px-6 py-5 rounded-2xl text-white text-lg"
          />

          <div className="flex flex-wrap items-center justify-between mt-5 gap-4">
            <p className="text-gray-400">
              Found{" "}
              <span className="text-cyan-400 font-bold">
                {filteredTools.length}
              </span>{" "}
              tools
            </p>

            <div className="flex gap-3 flex-wrap">
              {["AI", "Image", "Editor"].map((keyword) => (
                <button
                  key={keyword}
                  onClick={() => setSearch(keyword)}
                  className="bg-white/5 border border-white/10 hover:border-cyan-400 px-4 py-2 rounded-full text-sm transition-all duration-300"
                >
                  {keyword}
                </button>
              ))}
            </div>
          </div>
        </div>

        {loadingTools ? (
          <p className="text-center text-cyan-400 text-xl">
            Loading tools...
          </p>
        ) : (
          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {filteredTools.length === 0 ? (
              <div className="col-span-full text-center py-20">
                <h3 className="text-4xl font-black mb-4">
                  No AI Tools Found
                </h3>

                <p className="text-gray-400 text-lg">
                  Try searching for another keyword.
                </p>
              </div>
            ) : (
              filteredTools.map((tool) => (
                <ToolCard
                  key={`${tool.source}-${tool.id || tool.slug}`}
                  tool={tool}
                />
              ))
            )}
          </div>
        )}
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

      <p className="text-gray-400 text-xl">
        {label}
      </p>
    </div>
  )
}
function ToolCard({ tool, featured = false, index = 0 }) {
  return (
    <div
      className={`group relative overflow-hidden rounded-[34px] border p-[1px] transition-all duration-500 hover:-translate-y-3 ${
        featured
          ? "border-cyan-400/40 bg-gradient-to-br from-cyan-400/40 via-purple-500/30 to-pink-500/30 shadow-2xl shadow-cyan-500/20"
          : "border-white/10 bg-gradient-to-br from-white/20 via-white/5 to-transparent hover:border-cyan-400/60 hover:shadow-2xl hover:shadow-cyan-500/20"
      }`}
    >
      <div className="relative h-full rounded-[33px] bg-slate-950/90 p-7 backdrop-blur-2xl">
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-transparent" />

        {featured && (
          <div className="absolute top-5 right-5 z-10 rounded-full bg-cyan-400 px-4 py-2 text-xs font-black text-black shadow-lg shadow-cyan-400/30">
            TOP #{index + 1}
          </div>
        )}

        <div className="relative z-10 mb-6 flex items-center gap-5">
          <div className="h-24 w-24 rounded-3xl bg-white p-4 shadow-xl shadow-black/30 transition duration-500 group-hover:scale-110">
            <img
              src={tool.image || getFallbackImage(tool.name)}
              alt={tool.name}
              onError={(event) => {
                event.currentTarget.src = getFallbackImage(tool.name)
              }}
              className="h-full w-full object-contain"
            />
          </div>

          <div>
            <p className="mb-2 text-sm font-bold uppercase tracking-widest text-cyan-400">
              {tool.category}
            </p>

            <h3 className="text-3xl font-black leading-tight text-white">
              {tool.name}
            </h3>
          </div>
        </div>

        <div className="relative z-10 mb-5 flex flex-wrap gap-2">
          <span className="rounded-full border border-yellow-400/20 bg-yellow-400/10 px-3 py-1 text-sm font-semibold text-yellow-300">
            ⭐ {tool.rating}
          </span>

          <span className="rounded-full border border-purple-400/20 bg-purple-400/10 px-3 py-1 text-sm font-semibold text-purple-300">
            👥 {tool.users}
          </span>

          <span className="rounded-full border border-green-400/20 bg-green-400/10 px-3 py-1 text-sm font-semibold text-green-300">
            {tool.pricing}
          </span>
        </div>

        <p className="relative z-10 mb-8 line-clamp-3 text-base leading-relaxed text-gray-400">
          {tool.description}
        </p>

        <Link
          to={`/tool/${tool.slug}`}
          className="relative z-10 block rounded-2xl bg-cyan-400 px-6 py-4 text-center text-lg font-black text-black transition-all duration-300 hover:scale-105 hover:bg-cyan-300"
        >
          {featured ? "Explore Tool" : "View Details"}
        </Link>
      </div>
    </div>
  )
}
function ToolDetailPage() {
  const { slug } = useParams()

  const [firebaseTools, setFirebaseTools] = useState([])
  const [loadingTools, setLoadingTools] = useState(true)

  useEffect(() => {
    loadTools()
  }, [])

  const loadTools = async () => {
    try {
      const fetchedTools = await fetchFirebaseTools()
      setFirebaseTools(fetchedTools)
    } catch (error) {
      console.error(error)
    } finally {
      setLoadingTools(false)
    }
  }

  const staticTools = toolsData.map((tool) => ({
    ...tool,
    source: "static",
  }))

  const allTools = [...firebaseTools, ...staticTools]

  const tool = allTools.find((item) => item.slug === slug)

  if (loadingTools) {
    return (
      <section className="min-h-screen flex items-center justify-center px-6">
        <p className="text-cyan-400 text-xl">Loading tool...</p>
      </section>
    )
  }

  if (!tool) {
    return (
      <section className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="text-5xl font-black mb-6">Tool Not Found</h1>

          <Link
            to="/"
            className="inline-block bg-cyan-500 hover:bg-cyan-400 text-black px-8 py-4 rounded-2xl font-bold"
          >
            Back Home
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className="min-h-screen px-6 pt-40 pb-24">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-block bg-cyan-500/10 border border-cyan-500/30 px-5 py-2 rounded-full text-cyan-300 mb-8">
              {tool.category}
            </div>

            <h1 className="text-6xl font-black leading-tight mb-8">
              {tool.name}
            </h1>

            <p className="text-xl text-gray-400 leading-relaxed mb-10">
              {tool.fullDescription || tool.description}
            </p>

            <div className="flex flex-wrap gap-4 mb-10">
              <div className="bg-white/5 border border-white/10 px-5 py-3 rounded-2xl">
                ⭐ {tool.rating}
              </div>

              <div className="bg-white/5 border border-white/10 px-5 py-3 rounded-2xl">
                👥 {tool.users}
              </div>

              <div className="bg-white/5 border border-white/10 px-5 py-3 rounded-2xl">
                {tool.pricing}
              </div>
            </div>

            <a
              href={tool.link}
              target="_blank"
              rel="noreferrer"
              className="inline-block bg-cyan-500 hover:bg-cyan-400 text-black px-8 py-5 rounded-2xl font-black text-lg transition-all duration-300 hover:scale-105"
            >
              Visit Official Website
            </a>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-[40px] p-10 backdrop-blur-2xl">
            <img
              src={tool.image || getFallbackImage(tool.name)}
              alt={tool.name}
              onError={(event) => {
                event.currentTarget.src = getFallbackImage(tool.name)
              }}
              className="w-full h-[420px] object-contain"
            />
          </div>
        </div>
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
  const [firebaseTools, setFirebaseTools] = useState([])

  const [toolName, setToolName] = useState("")
  const [toolCategory, setToolCategory] = useState("")
  const [toolDescription, setToolDescription] = useState("")
  const [toolImage, setToolImage] = useState("")
  const [toolLink, setToolLink] = useState("")
  const [toolPricing, setToolPricing] = useState("Free + Paid")
  const [message, setMessage] = useState("")
  const [uploading, setUploading] = useState(false)
  const [editingToolId, setEditingToolId] = useState(null)

  useEffect(() => {
    fetchSubscribers()
    fetchAdminTools()
  }, [])

  const fetchSubscribers = async () => {
    try {
      const querySnapshot = await getDocs(
        collection(db, "newsletterSubscribers")
      )

      const subscriberList = querySnapshot.docs.map((item) => ({
        id: item.id,
        ...item.data(),
      }))

      setSubscribers(subscriberList)
    } catch (error) {
      console.error(error)
    }
  }

  const fetchAdminTools = async () => {
    try {
      const fetchedTools = await fetchFirebaseTools()
      setFirebaseTools(fetchedTools)
    } catch (error) {
      console.error(error)
    }
  }
 const handleImageUpload = async (event) => {
  const file = event.target.files[0]

  if (!file) return

  setUploading(true)

  const formData = new FormData()
  formData.append("file", file)
  formData.append("upload_preset", "ai-tools-upload")

  try {
    const response = await fetch(
      "https://api.cloudinary.com/v1_1/dshoaekpd/image/upload",
      {
        method: "POST",
        body: formData,
      }
    )

    const data = await response.json()

    setToolImage(data.secure_url)
    setMessage("Image uploaded successfully!")
  } catch (error) {
    console.error(error)
    setMessage("Image upload failed.")
  } finally {
    setUploading(false)
  }
}

  const handleAddTool = async (event) => {
  event.preventDefault()
  setMessage("")

  if (!toolName || !toolCategory || !toolDescription || !toolLink) {
    setMessage("Please fill all required fields.")
    return
  }

  try {
    if (editingToolId) {
      await updateDoc(doc(db, "tools", editingToolId), {
        name: toolName,
        slug: slugify(toolName),
        category: toolCategory,
        description: toolDescription,
        fullDescription: toolDescription,
        image: toolImage || getFallbackImage(toolName),
        link: toolLink,
        pricing: toolPricing,
        bestFor: toolCategory,
      })

      setMessage("Tool updated successfully!")
      setEditingToolId(null)
    } else {
      await addDoc(collection(db, "tools"), {
        name: toolName,
        slug: slugify(toolName),
        category: toolCategory,
        description: toolDescription,
        fullDescription: toolDescription,
        image: toolImage || getFallbackImage(toolName),
        link: toolLink,
        pricing: toolPricing,
        rating: "4.5",
        users: "New",
        bestFor: toolCategory,
        createdAt: serverTimestamp(),
      })

      setMessage("Tool added successfully!")
    }

    setToolName("")
    setToolCategory("")
    setToolDescription("")
    setToolImage("")
    setToolLink("")
    setToolPricing("Free + Paid")

    fetchAdminTools()
  } catch (error) {
    console.error(error)
    setMessage("Something went wrong while saving the tool.")
  }
}
  const handleEditTool = (tool) => {
  setEditingToolId(tool.id)

  setToolName(tool.name)
  setToolCategory(tool.category)
  setToolDescription(tool.description)
  setToolImage(tool.image)
  setToolLink(tool.link)
  setToolPricing(tool.pricing)
}

  const handleDeleteTool = async (toolId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this tool?"
    )

    if (!confirmDelete) return

    try {
      await deleteDoc(doc(db, "tools", toolId))
      setMessage("Tool deleted successfully!")
      fetchAdminTools()
    } catch (error) {
      console.error(error)
      setMessage("Something went wrong while deleting the tool.")
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
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12">
          <div>
            <h1 className="text-5xl md:text-6xl font-black mb-4">
              Admin Dashboard
            </h1>

            <p className="text-gray-400 text-xl">
              Manage tools and newsletter subscribers.
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-400 text-white px-6 py-4 rounded-2xl font-bold transition-all duration-300"
          >
            Logout
          </button>
        </div>

        {message && (
          <p className="mb-8 text-cyan-400 font-semibold">
            {message}
          </p>
        )}

        <div className="grid lg:grid-cols-2 gap-10">
          <div className="bg-white/5 border border-white/10 rounded-[36px] p-8 backdrop-blur-2xl">
            <h2 className="text-4xl font-black mb-8">
              Add New Tool
            </h2>

            <form onSubmit={handleAddTool} className="space-y-5">
              <input
                type="text"
                placeholder="Tool Name"
                value={toolName}
                onChange={(event) => setToolName(event.target.value)}
                className="w-full bg-black/30 border border-white/10 focus:border-cyan-400 outline-none px-5 py-4 rounded-2xl text-white"
              />

              <input
                type="text"
                placeholder="Category"
                value={toolCategory}
                onChange={(event) => setToolCategory(event.target.value)}
                className="w-full bg-black/30 border border-white/10 focus:border-cyan-400 outline-none px-5 py-4 rounded-2xl text-white"
              />

              <textarea
                placeholder="Description"
                value={toolDescription}
                onChange={(event) => setToolDescription(event.target.value)}
                className="w-full bg-black/30 border border-white/10 focus:border-cyan-400 outline-none px-5 py-4 rounded-2xl text-white h-32"
              />

             <div className="space-y-3">
  <input
    type="text"
    placeholder="Image URL optional"
    value={toolImage}
    onChange={(event) => setToolImage(event.target.value)}
    className="w-full bg-black/30 border border-white/10 focus:border-cyan-400 outline-none px-5 py-4 rounded-2xl text-white"
  />

  <input
    type="file"
    accept="image/*"
    onChange={handleImageUpload}
    className="w-full bg-black/30 border border-white/10 px-5 py-4 rounded-2xl text-white"
  />

  {uploading && (
    <p className="text-cyan-400 font-semibold">Uploading image...</p>
  )}

  {toolImage && (
    <img
      src={toolImage}
      alt="Tool preview"
      className="w-24 h-24 object-contain bg-white rounded-2xl p-3"
    />
  )}
</div>

              <input
                type="text"
                placeholder="Official Tool Link"
                value={toolLink}
                onChange={(event) => setToolLink(event.target.value)}
                className="w-full bg-black/30 border border-white/10 focus:border-cyan-400 outline-none px-5 py-4 rounded-2xl text-white"
              />

              <select
                value={toolPricing}
                onChange={(event) => setToolPricing(event.target.value)}
                className="w-full bg-black/30 border border-white/10 focus:border-cyan-400 outline-none px-5 py-4 rounded-2xl text-white"
              >
                <option>Free</option>
                <option>Paid</option>
                <option>Free + Paid</option>
              </select>

              <button
                type="submit"
                className="w-full bg-cyan-500 hover:bg-cyan-400 text-black py-4 rounded-2xl font-bold transition-all duration-300"
              >
                {editingToolId ? "Update Tool" : "Add Tool"}
              </button>
            </form>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-[36px] p-8 backdrop-blur-2xl">
            <h2 className="text-4xl font-black mb-8">
              Firebase Tools
            </h2>

            <div className="space-y-4 max-h-[520px] overflow-auto">
              {firebaseTools.length === 0 ? (
                <p className="text-gray-400">
                  No Firebase tools added yet.
                </p>
              ) : (
                firebaseTools.map((tool) => (
                  <div
                    key={tool.id}
                    className="bg-black/30 border border-white/10 rounded-2xl p-5"
                  >
                    <h3 className="text-2xl font-bold text-cyan-400">
                      {tool.name}
                    </h3>

                    <p className="text-gray-400 mt-2">
                      {tool.category}
                    </p>

                    <p className="text-gray-500 mt-2 text-sm">
                      {tool.link}
                    </p>

                    <div className="flex gap-3 mt-5">
  <button
    onClick={() => handleEditTool(tool)}
    className="bg-cyan-500 hover:bg-cyan-400 text-black px-5 py-3 rounded-2xl font-bold transition-all duration-300"
  >
    Edit
  </button>

  <button
    onClick={() => handleDeleteTool(tool.id)}
    className="bg-red-500 hover:bg-red-400 text-white px-5 py-3 rounded-2xl font-bold transition-all duration-300"
  >
    Delete
  </button>
</div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-[36px] p-8 backdrop-blur-2xl mt-10">
          <h2 className="text-4xl font-black mb-8">
            Subscribers
          </h2>

          <div className="space-y-4 max-h-[400px] overflow-auto">
            {subscribers.length === 0 ? (
              <p className="text-gray-400">
                No subscribers yet.
              </p>
            ) : (
              subscribers.map((subscriber) => (
                <div
                  key={subscriber.id}
                  className="bg-black/30 border border-white/10 rounded-2xl p-4"
                >
                  <p className="text-cyan-400 font-bold">
                    {subscriber.email}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")

  const handleSubscribe = async (event) => {
    event.preventDefault()

    if (!email.includes("@") || !email.includes(".")) {
      setMessage("Please enter a valid email address.")
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
            <p className="text-cyan-400 font-bold mb-4">
              JOIN THE FUTURE OF AI
            </p>

            <h2 className="text-5xl md:text-6xl font-black mb-6">
              Get Weekly AI Tool Updates
            </h2>

            <p className="text-gray-400 text-xl leading-relaxed mb-10">
              Discover trending AI tools, design apps, and creator platforms
              every week.
            </p>

            <form
              onSubmit={handleSubscribe}
              className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto"
            >
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="flex-1 bg-black/30 border border-white/10 focus:border-cyan-400 outline-none px-6 py-5 rounded-2xl text-white"
              />

              <button
                type="submit"
                className="bg-cyan-500 hover:bg-cyan-400 text-black px-8 py-5 rounded-2xl font-bold transition-all duration-300"
              >
                Subscribe
              </button>
            </form>

            {message && (
              <p className="mt-5 text-cyan-400 font-semibold">
                {message}
              </p>
            )}
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 text-center text-gray-500">
          © 2026 AI Image Tools — All Rights Reserved
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