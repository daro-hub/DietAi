"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Home, Sparkles, Heart, BookOpen, User, Menu, Utensils, Settings, HelpCircle, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useAuth } from "@/components/auth/auth-context"

const mainNavigation = [
  { name: "Home", href: "/", icon: Home },
  { name: "Generate", href: "/generate", icon: Sparkles },
  { name: "Favorites", href: "/favorites", icon: Heart },
  { name: "Menu", href: "#", icon: Menu, isMenu: true },
]

const allNavigation = [
  { name: "Recipes", href: "/recipes", icon: BookOpen },
  { name: "Diets", href: "/diets", icon: Utensils },
  { name: "Profile", href: "/profile", icon: User },
  { name: "Settings", href: "/settings", icon: Settings },
  { name: "Help", href: "/help", icon: HelpCircle },
]

export function MobileNavigation() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user, logout } = useAuth()

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <>
      {/* Menu Overlay for Mobile */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/20 backdrop-blur-[0.5px]" onClick={closeMenu} />
          <div className="absolute bottom-20 left-4 right-4">
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="grid gap-1 p-2">
                  {allNavigation.map((item) => {
                    const Icon = item.icon
                    const isActive = pathname === item.href

                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={closeMenu}
                        className={cn(
                          "flex items-center gap-3 p-4 rounded-lg transition-colors",
                          isActive ? "text-primary bg-primary/10" : "text-foreground hover:bg-muted",
                        )}
                      >
                        <Icon className="h-5 w-5" />
                        <span className="font-medium">{item.name}</span>
                      </Link>
                    )
                  })}

                  <div className="border-t border-border my-2" />

                  {!user ? (
                    <>
                      <Link
                        href="/login"
                        onClick={closeMenu}
                        className="flex items-center gap-3 p-4 rounded-lg transition-colors text-foreground hover:bg-muted"
                      >
                        <User className="h-5 w-5" />
                        <span className="font-medium">Sign In</span>
                      </Link>
                      <Link
                        href="/register"
                        onClick={closeMenu}
                        className="flex items-center gap-3 p-4 rounded-lg transition-colors bg-primary text-primary-foreground"
                      >
                        <Sparkles className="h-5 w-5" />
                        <span className="font-medium">Sign Up</span>
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link
                        href="/onboarding"
                        onClick={closeMenu}
                        className="flex items-center gap-3 p-4 rounded-lg transition-colors text-foreground hover:bg-muted"
                      >
                        <Sparkles className="h-5 w-5" />
                        <span className="font-medium">Setup Profile</span>
                      </Link>
                      <button
                        onClick={() => {
                          logout()
                          closeMenu()
                        }}
                        className="flex items-center gap-3 p-4 rounded-lg transition-colors text-foreground hover:bg-muted w-full text-left"
                      >
                        <LogOut className="h-5 w-5" />
                        <span className="font-medium">Sign Out</span>
                      </button>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Bottom Navigation for Mobile */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-card/95 backdrop-blur-sm border-t border-border md:hidden">
        <div className="flex items-center justify-around py-2 px-4">
          {mainNavigation.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href && !item.isMenu

            if (item.isMenu) {
              return (
                <button
                  key={item.name}
                  onClick={handleMenuClick}
                  className={cn(
                    "flex flex-col items-center gap-1 py-2 px-3 rounded-lg transition-colors",
                    isMenuOpen ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  <Icon className="h-5 w-5" />
                  <span className="text-xs font-medium">{item.name}</span>
                </button>
              )
            }

            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex flex-col items-center gap-1 py-2 px-3 rounded-lg transition-colors",
                  isActive ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground",
                )}
              >
                <Icon className="h-5 w-5" />
                <span className="text-xs font-medium">{item.name}</span>
              </Link>
            )
          })}
        </div>
      </nav>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex fixed top-0 left-0 right-0 z-40 bg-card/95 backdrop-blur-sm border-b border-border">
        <div className="mobile-container flex items-center justify-between py-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Sparkles className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-heading font-bold text-xl">DietAI</span>
          </Link>

          <div className="flex items-center gap-6">
            {[...mainNavigation.slice(0, 3), ...allNavigation.slice(0, 2)].map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 rounded-lg transition-colors font-medium",
                    isActive
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted",
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.name}
                </Link>
              )
            })}

            {!user ? (
              <div className="flex items-center gap-2">
                <Button asChild variant="ghost">
                  <Link href="/login">Sign In</Link>
                </Button>
                <Button asChild>
                  <Link href="/register">Sign Up</Link>
                </Button>
              </div>
            ) : (
              <Button asChild variant="outline">
                <Link href="/onboarding">Setup Profile</Link>
              </Button>
            )}
          </div>
        </div>
      </nav>
    </>
  )
}
