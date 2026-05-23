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
  serverTimestamp,
  getDocs,
} from "firebase/firestore"

import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth"

import { db, auth } from "./firebase"
import toolsData from "./data/tools"

function HomePage() {
  const [search, setSearch] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [firebaseTools, setFirebaseTools] = useState([])

  useEffect(() => {
    fetchTools()
  }, [])

  const fetchTools = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "tools"))

      const fetchedTools = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))

      setFirebaseTools(fetchedTools)
    } catch (error) {
      console.error(error)
    }
  }

  const allTools = [...firebaseTools, ...toolsData]

  const categories = [
    "All",
    "AI Image Generator",
    "AI Design",
    "Background Remover",
    "AI Art",
    "AI Image Editor",
    "AI Generator",
  ]

  const filteredTools = allTools.filter((tool) => {
    const matchesSearch =
      tool.name?.toLowerCase().includes(search.toLowerCase()) ||
      tool.category?.toLowerCase().includes(search.toLowerCase())

    const matchesCategory =
      selectedCategory === "All" ||
      tool.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  return (
    <>
      <section className="relative min-h-screen flex items-center px-6 pt-32">

        <div className="max-w-7xl mx-auto">

          <div className="text-center max-w-4xl mx-auto">

            <div className="inline-block bg-cyan-500/10 border border-cyan-500/30 px-6 py-2 rounded-full text-cyan-300 mb-8">
              🚀 Discover The Future Of AI
            </div>

            <h1 className="text-6xl md:text-8xl font-black leading-tight mb-8">

              Discover The Best

              <span className="block bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                AI Image Tools
              </span>

            </h1>

            <p className="text-gray-400 text-xl leading-relaxed mb-12">
              Explore trending AI generators, editors,
              background removers, anime creators,
              and next-generation creative platforms.
            </p>

          </div>

        </div>

      </section>

      <section id="categories" className="relative px-8 pb-20">

        <div className="flex flex-wrap justify-center gap-4">

          {categories.map((category) => (

            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-2xl transition-all duration-300 font-semibold ${
                selectedCategory === category
                  ? "bg-cyan-500 text-black"
                  : "bg-white/5 border border-white/10 hover:border-cyan-400"
              }`}
            >
              {category}
            </button>

          ))}

        </div>

      </section>

      <section id="tools" className="relative px-8 pb-24">

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

          {filteredTools.map((tool, index) => (

            <div
              key={index}
              className="bg-white/5 border border-white/10 rounded-[32px] p-8 backdrop-blur-2xl hover:border-cyan-400 transition-all duration-500 hover:-translate-y-4"
            >

              <img
                src={tool.image}
                alt={tool.name}
                className="w-24 h-24 object-cover rounded-3xl mb-6 bg-white p-2"
              />

              <h3 className="text-3xl font-black mb-3">
                {tool.name}
              </h3>

              <p className="text-cyan-400 mb-3">
                {tool.category}
              </p>

              <p className="text-gray-400 leading-relaxed mb-8">
                {tool.description}
              </p>

              <a
                href={tool.link}
                target="_blank"
                rel="noreferrer"
                className="block text-center bg-cyan-500 hover:bg-cyan-400 transition-all duration-300 text-black py-4 rounded-2xl font-bold"
              >
                Visit Tool
              </a>

            </div>

          ))}

        </div>

      </section>
    </>
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

    try {
      await signInWithEmailAndPassword(auth, email, password)
      navigate("/admin")
    } catch (error) {
      console.error(error)
      setError("Invalid email or password.")
    }
  }

  return (
    <section className="min-h-screen flex items-center justify-center px-6">

      <div className="w-full max-w-md bg-white/5 border border-white/10 rounded-[36px] p-8 backdrop-blur-2xl">

        <h1 className="text-5xl font-black mb-6">
          Admin Login
        </h1>

        <form onSubmit={handleLogin} className="space-y-5">

          <input
            type="email"
            placeholder="Admin Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="w-full bg-black/30 border border-white/10 px-5 py-4 rounded-2xl text-white"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="w-full bg-black/30 border border-white/10 px-5 py-4 rounded-2xl text-white"
          />

          {error && (
            <p className="text-red-400">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-cyan-500 hover:bg-cyan-400 text-black py-4 rounded-2xl font-bold"
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

  const [toolName, setToolName] = useState("")
  const [toolCategory, setToolCategory] = useState("")
  const [toolDescription, setToolDescription] = useState("")
  const [toolImage, setToolImage] = useState("")
  const [toolLink, setToolLink] = useState("")

  const [message, setMessage] = useState("")

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
    } catch (error) {
      console.error(error)
    }
  }

  const handleAddTool = async (event) => {
    event.preventDefault()

    try {
      await addDoc(collection(db, "tools"), {
        name: toolName,
        category: toolCategory,
        description: toolDescription,
        image: toolImage,
        link: toolLink,
        createdAt: serverTimestamp(),
      })

      setMessage("Tool added successfully!")

      setToolName("")
      setToolCategory("")
      setToolDescription("")
      setToolImage("")
      setToolLink("")
    } catch (error) {
      console.error(error)
      setMessage("Something went wrong.")
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

        <div className="flex items-center justify-between mb-16">

          <div>

            <h1 className="text-6xl font-black mb-4">
              Admin Dashboard
            </h1>

            <p className="text-gray-400 text-xl">
              Manage AI tools and subscribers
            </p>

          </div>

          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-400 text-white px-6 py-4 rounded-2xl font-bold"
          >
            Logout
          </button>

        </div>

        <div className="grid lg:grid-cols-2 gap-12">

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
                className="w-full bg-black/30 border border-white/10 px-5 py-4 rounded-2xl text-white"
              />

              <input
                type="text"
                placeholder="Category"
                value={toolCategory}
                onChange={(event) => setToolCategory(event.target.value)}
                className="w-full bg-black/30 border border-white/10 px-5 py-4 rounded-2xl text-white"
              />

              <textarea
                placeholder="Description"
                value={toolDescription}
                onChange={(event) => setToolDescription(event.target.value)}
                className="w-full bg-black/30 border border-white/10 px-5 py-4 rounded-2xl text-white h-32"
              />

              <input
                type="text"
                placeholder="Image URL"
                value={toolImage}
                onChange={(event) => setToolImage(event.target.value)}
                className="w-full bg-black/30 border border-white/10 px-5 py-4 rounded-2xl text-white"
              />

              <input
                type="text"
                placeholder="Official Tool Link"
                value={toolLink}
                onChange={(event) => setToolLink(event.target.value)}
                className="w-full bg-black/30 border border-white/10 px-5 py-4 rounded-2xl text-white"
              />

              <button
                type="submit"
                className="w-full bg-cyan-500 hover:bg-cyan-400 text-black py-4 rounded-2xl font-bold"
              >
                Add Tool
              </button>

              {message && (
                <p className="text-cyan-400 font-semibold">
                  {message}
                </p>
              )}

            </form>

          </div>

          <div className="bg-white/5 border border-white/10 rounded-[36px] p-8 backdrop-blur-2xl">

            <h2 className="text-4xl font-black mb-8">
              Subscribers
            </h2>

            <div className="space-y-4 max-h-[600px] overflow-auto">

              {subscribers.map((subscriber) => (

                <div
                  key={subscriber.id}
                  className="bg-black/30 border border-white/10 rounded-2xl p-4"
                >

                  <p className="text-cyan-400 font-bold">
                    {subscriber.email}
                  </p>

                </div>

              ))}

            </div>

          </div>

        </div>

      </div>

    </section>
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
        Loading...
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

        <Route path="/login" element={<LoginPage user={user} />} />

        <Route path="/admin" element={<AdminPage user={user} />} />

      </Routes>

    </div>
  )
}

export default function App() {
  return <Layout />
}