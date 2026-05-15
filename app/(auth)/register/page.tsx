"use client"

import { useState } from "react"
import Link from "next/link"
import { register } from "@/lib/actions/register"
import { Sparkles } from "lucide-react"
import { useRouter } from "next/navigation"

export default function RegisterPage() {
  const [error, setError] = useState<string | undefined>("")
  const [success, setSuccess] = useState<string | undefined>("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError("")
    setSuccess("")
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    try {
      const data = await register({ name, email, password })
      if (data?.error) {
        setError(data.error)
      } else {
        setSuccess("Account created successfully! Redirecting...")
        setTimeout(() => router.push("/login"), 2000)
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
          <Sparkles className="w-6 h-6 text-wine" />
        </div>
        <h1 className="text-3xl font-serif italic text-wine">Join the Atelier</h1>
        <p className="text-rose text-sm font-light mt-2 italic">Begin your journey with Lingerie Hub</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-[10px] uppercase tracking-[0.2em] font-bold text-rose mb-2 ml-4">Full Name</label>
          <input 
            name="name"
            type="text" 
            required
            placeholder="Your name"
            className="w-full bg-ivory/30 border border-rose/10 rounded-2xl px-6 py-4 text-charcoal placeholder:text-rose/40 focus:outline-none focus:ring-2 focus:ring-wine/20 transition-all italic text-sm"
          />
        </div>
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
        
        {success && (
          <div className="bg-green-50 text-green-600 text-xs py-3 px-4 rounded-xl text-center font-medium">
            {success}
          </div>
        )}

        <button 
          disabled={loading}
          type="submit" 
          className="w-full bg-wine text-white py-4 rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-charcoal transition-all shadow-xl disabled:opacity-50"
        >
          {loading ? "Creating account..." : "Join the Hub"}
        </button>
      </form>

      <div className="mt-10 text-center">
        <p className="text-rose text-sm font-light italic">
          Already a member?{" "}
          <Link href="/login" className="text-wine font-bold hover:underline">Sign in instead</Link>
        </p>
      </div>
    </div>
  )
}
