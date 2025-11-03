"use client"

import { useState, useEffect } from "react"
import { LeLoLogo } from "./lelo-logo"
import { Button } from "./ui/button"
import Link from "next/link"
import { Menu, X, User, LogOut } from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { user, logout } = useAuth()

  const handleLogout = async () => {
    await logout()
    setIsMobileMenuOpen(false)
  }

  const getUserInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      setIsScrolled(currentScrollY > 50)

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  return (
    <header
      className={`
        fixed top-4  left-4 right-4 z-50 transition-all duration-300 ease-in-out
        ${isVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}
      `}
    >
      <div className="max-w-7xl mx-auto">
        <div
          className={`
            flex items-center h-[75px] gap-2 md:gap-3 lg:gap-6 px-4 md:px-6 py-3 rounded-2xl border transition-all duration-300
            ${
              isScrolled
                ? "bg-background/90 backdrop-blur-xl border-border/40 shadow-2xl"
                : "bg-background/95 backdrop-blur-lg border-border/30 shadow-lg"
            }
          `}
        >
          <div className="flex items-center shrink-0">
            <div className="transform transition-transform duration-200 hover:scale-105">
              <LeLoLogo />
            </div>
          </div>

          <button
            className="md:hidden ml-auto shrink-0"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center gap-2 md:gap-3 lg:gap-6 flex-1 justify-center min-w-0">
            <a
              href="#features"
              className="relative text-xs md:text-sm lg:text-base text-foreground/80 hover:text-foreground transition-all duration-300 group px-1 md:px-2 lg:px-3 py-1 rounded-lg hover:bg-foreground/5 whitespace-nowrap"
            >
              Features
              <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-primary transition-all duration-200 group-hover:w-4"></span>
            </a>
            <a
              href="#pricing"
              className="relative text-xs md:text-sm lg:text-base text-foreground/80 hover:text-foreground transition-all duration-300 group px-1 md:px-2 lg:px-3 py-1 rounded-lg hover:bg-foreground/5 whitespace-nowrap"
            >
              Pricing
              <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-primary transition-all duration-200 group-hover:w-4"></span>
            </a>
            <a
              href="#about"
              className="relative text-xs md:text-sm lg:text-base text-foreground/80 hover:text-foreground transition-all duration-300 group px-1 md:px-2 lg:px-3 py-1 rounded-lg hover:bg-foreground/5 whitespace-nowrap"
            >
              About
            </a>
            <a
              href="#about"
              className="relative text-xs md:text-sm lg:text-base text-foreground/80 hover:text-foreground transition-all duration-300 group px-1 md:px-2 lg:px-3 py-1 rounded-lg hover:bg-foreground/5 whitespace-nowrap"
            >
              Testimonials
            </a>
          </nav>

          <div className="hidden md:flex items-center gap-1 md:gap-2 lg:gap-3 shrink-0 ml-auto">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex items-center gap-2 h-9 px-2 rounded-xl hover:bg-foreground/10"
                  >
                    <Avatar className="h-7 w-7">
                      <AvatarImage src={user.image} alt={user.name} />
                      <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                        {getUserInitials(user.name)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium hidden lg:block">{user.name}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard" className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/profile" className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600">
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs md:text-sm lg:text-base text-foreground/80 hover:text-foreground hover:bg-foreground/10 transition-all duration-200 rounded-xl px-2 md:px-3 lg:px-4"
                >
                  <Link href="/login">Sign In</Link>
                </Button>
                <Button
                  size="sm"
                  className="text-xs md:text-sm lg:text-base bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-200 rounded-xl whitespace-nowrap px-2 md:px-3 lg:px-4"
                >
                  <Link href="/signup">Get Started</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 mt-2 bg-background/95 backdrop-blur-lg border border-border/40 rounded-2xl p-4 space-y-3 mx-4">
          <a
            href="#features"
            className="block text-foreground/80 hover:text-foreground py-2 px-3 rounded hover:bg-foreground/5"
          >
            Features
          </a>
          <a
            href="#pricing"
            className="block text-foreground/80 hover:text-foreground py-2 px-3 rounded hover:bg-foreground/5"
          >
            Pricing
          </a>
          <a
            href="#about"
            className="block text-foreground/80 hover:text-foreground py-2 px-3 rounded hover:bg-foreground/5"
          >
            About
          </a>
          <a
            href="#about"
            className="block text-foreground/80 hover:text-foreground py-2 px-3 rounded hover:bg-foreground/5"
          >
            Testimonials
          </a>
          <div className="flex flex-col gap-2 pt-2 border-t border-border/40">
            {user ? (
              <>
                <div className="flex items-center gap-3 px-3 py-2 bg-foreground/5 rounded-lg">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={user.image} alt={user.name} />
                    <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                      {getUserInitials(user.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{user.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="w-full justify-start" asChild>
                  <Link href="/dashboard" onClick={() => setIsMobileMenuOpen(false)}>
                    <User className="mr-2 h-4 w-4" />
                    Dashboard
                  </Link>
                </Button>
                <Button variant="ghost" size="sm" className="w-full justify-start" asChild>
                  <Link href="/dashboard/profile" onClick={() => setIsMobileMenuOpen(false)}>
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Link>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" size="sm" className="w-full justify-center">
                  <Link href="/login">Sign In</Link>
                </Button>
                <Button size="sm" className="w-full justify-center bg-primary hover:bg-primary/90 text-primary-foreground">
                  <Link href="/signup">Get Started</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  )
}

