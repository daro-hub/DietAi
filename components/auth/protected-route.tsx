"use client"

import { useAuth } from "@/components/auth/auth-context"
import { useRouter } from "next/navigation"
import { useEffect, ReactNode } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { aiTheme, getCyclicColor } from "@/lib/ai-theme"
import { Loader2, LogIn, UserPlus } from "lucide-react"

interface ProtectedRouteProps {
  children: ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, isLoading, login, signup } = useAuth()
  const router = useRouter()
  const [isLoginMode, setIsLoginMode] = useState(true)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    if (!isLoading && user) {
      // User is authenticated, show protected content
    }
  }, [user, isLoading])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    try {
      let success = false
      
      if (isLoginMode) {
        success = await login(formData.email, formData.password)
      } else {
        if (!formData.name.trim()) {
          setError("Name is required")
          return
        }
        success = await signup(formData.name, formData.email, formData.password)
      }

      if (!success) {
        setError(isLoginMode ? "Invalid email or password" : "Signup failed. Please try again.")
      }
    } catch (error) {
      setError("An error occurred. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (user) {
    return <>{children}</>
  }

  return (
    <div className={`min-h-screen ${aiTheme.primaryGradientBg} flex items-center justify-center p-4`}>
      <Card className={`w-full max-w-md ${aiTheme.aiCard} ${aiTheme.aiCardHover} border border-gray-200`}>
        <CardContent className="p-8">
          <div className="text-center mb-6">
            <div className={`p-3 ${getCyclicColor(0, aiTheme.cardGradients)} rounded-full w-fit mx-auto mb-4`}>
              {isLoginMode ? (
                <LogIn className={`h-8 w-8 ${getCyclicColor(0, aiTheme.accentColors)}`} />
              ) : (
                <UserPlus className={`h-8 w-8 ${getCyclicColor(0, aiTheme.accentColors)}`} />
              )}
            </div>
            <h1 className={`text-2xl font-bold ${getCyclicColor(0, aiTheme.textColors)}`}>
              {isLoginMode ? "Welcome Back" : "Create Account"}
            </h1>
            <p className="text-muted-foreground mt-2">
              {isLoginMode 
                ? "Sign in to access your personalized diet plans" 
                : "Sign up to start your nutrition journey"
              }
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLoginMode && (
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your name"
                  required={!isLoginMode}
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter your password"
                required
              />
            </div>

            {error && (
              <div className="text-red-500 text-sm text-center">
                {error}
              </div>
            )}

            <Button 
              type="submit" 
              className={`w-full ${aiTheme.aiButton}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  {isLoginMode ? "Signing In..." : "Creating Account..."}
                </>
              ) : (
                isLoginMode ? "Sign In" : "Create Account"
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => {
                setIsLoginMode(!isLoginMode)
                setError("")
                setFormData({ name: "", email: "", password: "" })
              }}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {isLoginMode 
                ? "Don't have an account? Sign up" 
                : "Already have an account? Sign in"
              }
            </button>
          </div>

          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={() => router.push('/')}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              ← Back to Home
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
