'use client'

import Link from 'next/link'
import { LogOut } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

export function EditableFooter() {
  const year = new Date().getFullYear()
  const { session, logout } = useEditableLocalAuthSession()

  return (
    <footer className="bg-[var(--editable-footer-bg)] text-[var(--editable-footer-text)]">
      <div className="h-1 bg-[var(--slot4-accent)]" />
      <div className="mx-auto grid max-w-[var(--editable-container)] gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.35fr_1fr] lg:px-8">
        <div>
          <Link href="/" className="inline-flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/30 bg-white/10">
              <img src="/favicon.png?v=20260413" alt={SITE_CONFIG.name} className="h-8 w-8 object-contain" />
            </span>
            <span className="text-2xl font-black uppercase tracking-[0.08em]">{SITE_CONFIG.name}</span>
          </Link>
          <form action="/search" className="mt-7 flex max-w-md border border-white/70">
            <input name="q" placeholder="Search the archive" className="min-w-0 flex-1 bg-transparent px-4 py-3 text-sm font-semibold text-white outline-none placeholder:text-white/55" />
            <button className="bg-[var(--slot4-accent)] px-5 text-sm font-extrabold text-white">Search</button>
          </form>
        </div>

        <div>
          <h3 className="editable-display text-3xl font-semibold text-white">Site</h3>
          <div className="mt-4 grid gap-2">
            {[
              ['About', '/about'],
              ['Contact', '/contact'],
              ...(session ? [['Create', '/create']] : [['Login', '/login'], ['Sign up', '/signup']]),
            ].map(([label, href]) => (
              <Link key={href} href={href} className="text-sm font-bold text-white/78 transition hover:text-white">{label}</Link>
            ))}
            {session ? (
              <button type="button" onClick={logout} className="mt-2 inline-flex w-fit items-center gap-2 border border-white/70 px-4 py-2 text-left text-sm font-extrabold text-white transition hover:bg-white hover:text-black">
                <LogOut className="h-4 w-4" /> Logout
              </button>
            ) : null}
          </div>
        </div>
      </div>
      <div className="border-t border-white/15 px-4 py-5 text-center text-xs font-bold tracking-[0.12em] text-white/55">
        &copy; {year} {SITE_CONFIG.name}. All rights reserved.
      </div>
    </footer>
  )
}
