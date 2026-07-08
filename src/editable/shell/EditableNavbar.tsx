'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LogOut, Menu, Search, UserCircle2, UserPlus, LogIn, X, PlusCircle, type LucideIcon } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

const publicNavItems: Array<{ label: string; href: string; icon?: LucideIcon }> = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
  { label: 'Search', href: '/search', icon: Search },
]

export function EditableNavbar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const { session, logout } = useEditableLocalAuthSession()
  const mobileAuthItems: Array<{ label: string; href: string; icon?: LucideIcon }> = session
    ? [{ label: 'Create', href: '/create', icon: PlusCircle }]
    : [{ label: 'Sign in', href: '/login', icon: LogIn }, { label: 'Sign up', href: '/signup', icon: UserPlus }]

  return (
    <header className="sticky top-0 z-50 bg-[var(--editable-nav-bg)] text-[var(--editable-nav-text)] shadow-[0_1px_0_rgba(255,255,255,0.35)]">
      <nav className="mx-auto flex min-h-[88px] w-full max-w-[var(--editable-container)] items-center gap-5 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="group flex shrink-0 items-center gap-3 pr-5">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 transition group-hover:bg-white/20">
            <img src="/favicon.png?v=20260413" alt={SITE_CONFIG.name} className="h-8 w-8 object-contain" />
          </span>
          <span className="hidden min-w-0 xl:block">
            <span className="block max-w-[260px] truncate text-4xl font-black uppercase leading-none tracking-[0.08em]">{SITE_CONFIG.name}</span>
          </span>
        </Link>

        <div className="hidden items-stretch gap-0 lg:flex">
          {publicNavItems.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`)
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative flex items-center gap-2 px-4 text-sm font-extrabold transition ${
                  active ? 'text-white' : 'text-white/88 hover:text-white'
                }`}
              >
                {Icon ? <Icon className="h-4 w-4" /> : null}
                {item.label}
                {active ? <span className="absolute inset-x-3 bottom-0 h-[2px] bg-white" /> : null}
              </Link>
            )
          })}
        </div>

        <div className="ml-auto flex shrink-0 items-center gap-2">
          {session ? (
            <>
              <span className="hidden max-w-[170px] items-center gap-2 truncate text-sm font-bold text-white sm:inline-flex">
                <UserCircle2 className="h-5 w-5 shrink-0" /> {session.name || session.email}
              </span>
              <Link
                href="/create"
                className="hidden items-center gap-2 border border-white bg-black px-4 py-2 text-[12px] font-extrabold uppercase tracking-[0.12em] text-white transition hover:bg-white hover:text-black sm:inline-flex"
              >
                <PlusCircle className="h-3.5 w-3.5" /> Create
              </Link>
              <button
                type="button"
                onClick={logout}
                className="hidden items-center gap-2 px-3 py-2 text-[12px] font-extrabold uppercase tracking-[0.12em] text-white/90 transition hover:text-white sm:inline-flex"
              >
                <LogOut className="h-3.5 w-3.5" /> Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="hidden items-center gap-2 border border-white/60 px-3 py-2 text-[12px] font-extrabold uppercase tracking-[0.12em] text-white transition hover:bg-white hover:text-black sm:inline-flex"
              >
                <LogIn className="h-3.5 w-3.5" /> Sign in
              </Link>
              <Link
                href="/signup"
                className="hidden items-center gap-2 border border-white bg-white px-4 py-2 text-[12px] font-extrabold uppercase tracking-[0.12em] text-black transition hover:bg-black hover:text-white sm:inline-flex"
              >
                <UserPlus className="h-3.5 w-3.5" /> Sign up
              </Link>
            </>
          )}
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="border border-white/60 bg-white/10 p-2 text-white lg:hidden"
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <div className="h-px bg-white/45" />

      {open ? (
        <div className="border-t border-white/30 bg-[var(--editable-nav-bg)] px-4 py-5 lg:hidden">
          {session ? <p className="mb-3 px-4 text-sm font-bold text-white">Signed in as {session.name || session.email}</p> : null}
          <div className="grid gap-1">
            {[...publicNavItems, ...mobileAuthItems].map((item) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`)
              const Icon = item.icon
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`border-l-2 px-4 py-3 text-sm font-semibold uppercase tracking-[0.16em] ${
                    active
                      ? 'border-white bg-white text-black'
                      : 'border-transparent text-white hover:border-white/60 hover:bg-white/10'
                  }`}
                >
                  {Icon ? <Icon className="mr-2 inline h-4 w-4" /> : null}
                  {item.label}
                </Link>
              )
            })}
            {session ? (
              <button type="button" onClick={() => { logout(); setOpen(false) }} className="border-l-2 border-transparent px-4 py-3 text-left text-sm font-semibold uppercase tracking-[0.16em] text-white hover:border-white/60 hover:bg-white/10">
                Logout
              </button>
            ) : null}
          </div>
        </div>
      ) : null}
    </header>
  )
}
