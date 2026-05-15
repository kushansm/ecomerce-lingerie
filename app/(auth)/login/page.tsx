"use client"

import { useState } from "react"
import Link from "next/link"
import { login } from "@/lib/actions/login"
import { Heart } from "lucide-react"

export default function LoginPage() {
  const [error, setError] = useState<string | undefined>("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    try {
      const data = await login({ email, password })
      if (data?.error) {
        setError(data.error)
      }
    } catch (err) {
      setError("Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-[40px] shadow-2xl overflow-hidden border border-rose/10 p-10">
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-wine/5 mb-4">
          <Heart className="w-6 h-6 text-wine fill-wine" />
        </div>
        <h1 className="text-3xl font-serif italic text-wine">Welcome Back</h1>
        <p className="text-rose text-sm font-light mt-2 italic">Enter your details to sign in to your atelier account</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-[10px] uppercase tracking-[0.2em] font-bold text-rose mb-2 ml-4">Email Address</label>
          <input 
            name="email"
            type="email" 
            required
            placeholder="your@intimate.email"
            className="w-full bg-ivory/30 border border-rose/10 rounded-2xl px-6 py-4 text-charcoal placeholder:text-rose/40 focus:outline-none focus:ring-2 focus:ring-wine/20 transition-all italic text-sm"
          />
        </div>
        <div>
          <label className="block text-[10px] uppercase tracking-[0.2em] font-bold text-rose mb-2 ml-4">Password</label>
          <input 
            name="password"
            type="password" 
            required
            placeholder="••••••••"
            className="w-full bg-ivory/30 border border-rose/10 rounded-2xl px-6 py-4 text-charcoal placeholder:text-rose/40 focus:outline-none focus:ring-2 focus:ring-wine/20 transition-all italic text-sm"
          />
        </div>

        {error && (
          <div className="bg-red-50 text-red-500 text-xs py-3 px-4 rounded-xl text-center font-medium">
            {error}
          </div>
        )}

        <button 
          disabled={loading}
          type="submit" 
          className="w-full bg-wine text-white py-4 rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-charcoal transition-all shadow-xl disabled:opacity-50"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>

      <div className="mt-10 text-center">
        <p className="text-rose text-sm font-light italic">
          New to the hub?{" "}
          <Link href="/register" className="text-wine font-bold hover:underline">Create an account</Link>
        </p>
      </div>
    </div>
  )
}
