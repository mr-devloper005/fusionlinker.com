import Link from 'next/link'
import { ArrowRight, Search } from 'lucide-react'
import type { SitePost } from '@/lib/site-connector'
import type { HomeTimeSection } from '@/lib/task-data'
import type { TaskKey } from '@/lib/site-config'
import { SITE_CONFIG } from '@/lib/site-config'
import { pagesContent } from '@/editable/content/pages.content'
import { globalContent } from '@/editable/content/global.content'
import { getEditableCategory, getEditableExcerpt, getEditablePostImage, postHref } from '@/editable/cards/PostCards'
import { EditableHeroCollage } from '@/editable/sections/EditableHeroCollage'

type HomeSectionProps = {
  primaryTask: TaskKey
  primaryRoute: string
  posts: SitePost[]
  timeSections: HomeTimeSection[]
}

const container = 'mx-auto w-full max-w-[var(--editable-container)] px-4 sm:px-6 lg:px-8'

function allPosts(posts: SitePost[], timeSections: HomeTimeSection[]) {
  const seen = new Set<string>()
  const merged: SitePost[] = []
  for (const post of [...posts, ...timeSections.flatMap((section) => section.posts)]) {
    const key = post.slug || post.id || post.title
    if (!key || seen.has(key)) continue
    seen.add(key)
    merged.push(post)
  }
  return merged
}

function isRealImage(src: string) {
  return Boolean(src && !src.includes('favicon.png'))
}

function PostImage({ post, className = '', priority = false }: { post: SitePost; className?: string; priority?: boolean }) {
  const src = getEditablePostImage(post)
  if (!isRealImage(src)) {
    return (
      <div className={`flex h-full w-full items-center justify-center bg-[var(--slot4-media-bg)] p-6 text-center ${className}`}>
        <span className="editable-display max-w-[16rem] text-2xl font-semibold leading-tight text-black/75">{post.title}</span>
      </div>
    )
  }
  return <img src={src} alt={post.title} className={`h-full w-full object-cover ${className}`} loading={priority ? 'eager' : 'lazy'} />
}

function SectionHeading({ label, title, actionHref, actionLabel }: { label: string; title?: string; actionHref?: string; actionLabel?: string }) {
  return (
    <div className="fusion-section-rule">
      <span className="fusion-section-label">{label}</span>
      <div className="mt-5 flex flex-wrap items-end justify-between gap-4">
        {title ? <h2 className="editable-display text-4xl font-semibold leading-none sm:text-5xl">{title}</h2> : <span />}
        {actionHref ? (
          <Link href={actionHref} className="border-b border-[var(--slot4-accent)] pb-1 text-sm font-semibold transition hover:text-[var(--slot4-accent)]">
            {actionLabel || 'See all'}
          </Link>
        ) : null}
      </div>
    </div>
  )
}

function MiniColumnCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link href={href} className="group block min-w-[220px] max-w-[280px] shrink-0">
      <div className="aspect-[2/1] overflow-hidden bg-[var(--slot4-media-bg)]">
        <PostImage post={post} className="transition duration-700 group-hover:scale-[1.04]" />
      </div>
      <p className="mt-2 text-sm font-bold leading-snug group-hover:text-[var(--slot4-accent)]">{post.title}</p>
      <p className="mt-1 text-xs font-semibold uppercase text-black/55">No. {String(index + 1).padStart(2, '0')}</p>
    </Link>
  )
}

function FeaturedCard({ post, href }: { post: SitePost; href: string }) {
  return (
    <Link href={href} className="group grid gap-6 lg:grid-cols-[1.28fr_0.72fr]">
      <div className="min-h-[420px] overflow-hidden bg-[var(--slot4-media-bg)] sm:min-h-[520px]">
        <PostImage post={post} priority className="transition duration-700 group-hover:scale-[1.035]" />
      </div>
      <div className="flex flex-col justify-end border-t-4 border-black pb-4 lg:border-t-0 lg:pb-8">
        <p className="mt-4 text-xs font-black uppercase tracking-[0.18em] text-[var(--slot4-accent)]">{getEditableCategory(post)}</p>
        <h2 className="editable-display mt-3 text-4xl font-semibold leading-[1.02] sm:text-5xl lg:text-6xl">{post.title}</h2>
        <p className="mt-5 max-w-xl text-base leading-7 text-[var(--slot4-muted-text)]">{getEditableExcerpt(post, 210)}</p>
      </div>
    </Link>
  )
}

function EditorialCard({ post, href }: { post: SitePost; href: string }) {
  return (
    <Link href={href} className="group fusion-card-hover block">
      <div className="aspect-[16/10] overflow-hidden bg-[var(--slot4-media-bg)]">
        <PostImage post={post} className="transition duration-700 group-hover:scale-[1.04]" />
      </div>
      <p className="mt-3 text-[11px] font-black uppercase tracking-[0.14em] text-black/55">{getEditableCategory(post)}</p>
      <h3 className="mt-1 text-xl font-black leading-snug group-hover:text-[var(--slot4-accent)]">{post.title}</h3>
      <p className="mt-2 line-clamp-2 text-sm leading-6 text-[var(--slot4-muted-text)]">{getEditableExcerpt(post, 120)}</p>
    </Link>
  )
}

function HorizontalCard({ post, href }: { post: SitePost; href: string }) {
  return (
    <Link href={href} className="group grid gap-4 sm:grid-cols-[170px_minmax(0,1fr)]">
      <div className="aspect-[16/9] overflow-hidden bg-[var(--slot4-media-bg)] sm:aspect-auto sm:min-h-[116px]">
        <PostImage post={post} className="transition duration-700 group-hover:scale-[1.04]" />
      </div>
      <div>
        <p className="text-[11px] font-black uppercase tracking-[0.14em] text-[var(--slot4-accent)]">{getEditableCategory(post)}</p>
        <h3 className="mt-1 text-lg font-black leading-snug group-hover:text-[var(--slot4-accent)]">{post.title}</h3>
        <p className="mt-2 line-clamp-2 text-sm leading-6 text-[var(--slot4-muted-text)]">{getEditableExcerpt(post, 100)}</p>
      </div>
    </Link>
  )
}

function ImageFirstCard({ post, href }: { post: SitePost; href: string }) {
  return (
    <Link href={href} className="group relative block min-h-[360px] overflow-hidden bg-black text-white fusion-card-hover">
      <PostImage post={post} className="absolute inset-0 opacity-78 transition duration-700 group-hover:scale-[1.04] group-hover:opacity-65" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_35%,rgba(0,0,0,0.9))]" />
      <div className="absolute inset-x-0 bottom-0 p-5">
        <p className="text-[11px] font-black uppercase tracking-[0.16em] text-white/70">{getEditableCategory(post)}</p>
        <h3 className="editable-display mt-2 text-3xl font-semibold leading-tight">{post.title}</h3>
      </div>
    </Link>
  )
}

function CompactTextCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link href={href} className="group grid grid-cols-[44px_minmax(0,1fr)] gap-4 border-t border-black/25 py-4">
      <span className="editable-display text-3xl font-semibold text-[var(--slot4-accent)]">{String(index + 1).padStart(2, '0')}</span>
      <span>
        <span className="text-[11px] font-black uppercase tracking-[0.14em] text-black/45">{getEditableCategory(post)}</span>
        <span className="mt-1 block text-base font-black leading-snug group-hover:text-[var(--slot4-accent)]">{post.title}</span>
      </span>
    </Link>
  )
}

export function EditableHomeHero({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const pool = allPosts(posts, timeSections)
  const heroImages = pool.map(getEditablePostImage).filter(isRealImage).slice(0, 8)
  const heroPost = pool[0]
  const title = pagesContent.home.hero.title?.join(' ') || SITE_CONFIG.name

  return (
    <section className="bg-[var(--slot4-accent)] text-white">
      <div className="relative overflow-hidden border-t border-white/45">
        <div className="absolute inset-0 opacity-25">
          <EditableHeroCollage images={heroImages} />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(213,54,43,0.98)_0%,rgba(213,54,43,0.88)_48%,rgba(213,54,43,0.72)_100%)]" />
        <div className={`relative grid min-h-[520px] items-center gap-10 py-16 lg:grid-cols-[0.75fr_1.25fr] ${container}`}>
          <div>
            <p className="max-w-xs text-sm font-bold italic leading-6 text-white/90">{globalContent.nav?.tagline || 'Stories, profiles, and useful reading.'}</p>
            <h1 className="mt-8 text-5xl font-black uppercase leading-[0.9] tracking-[0.08em] sm:text-7xl lg:text-8xl">{SITE_CONFIG.name}</h1>
            <div className="fusion-pulse-line mt-5 h-1 w-56 bg-white" />
            <p className="mt-6 max-w-xl text-lg font-medium leading-8 text-white/92">{title}</p>
            <form action="/search" className="mt-8 flex max-w-xl border-2 border-white bg-white text-black shadow-[12px_12px_0_rgba(0,0,0,0.24)]">
              <div className="flex min-w-0 flex-1 items-center gap-3 px-4">
                <Search className="h-5 w-5 shrink-0" />
                <input name="q" placeholder={pagesContent.home.hero.searchPlaceholder} className="min-w-0 flex-1 bg-transparent py-4 text-sm font-bold outline-none placeholder:text-black/45" />
              </div>
              <button className="bg-black px-5 text-sm font-black uppercase tracking-[0.12em] text-white sm:px-7">Search</button>
            </form>
          </div>
          <div className="fusion-float hidden lg:block">
            {heroPost ? <FeaturedCard post={heroPost} href={postHref(primaryTask, heroPost, primaryRoute)} /> : null}
          </div>
        </div>
      </div>
    </section>
  )
}

export function EditableStoryRail({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const rail = allPosts(posts, timeSections).slice(0, 12)
  if (!rail.length) return null
  const doubled = [...rail, ...rail]

  return (
    <section className="bg-white">
      <div className={`py-12 ${container}`}>
        <SectionHeading label="Most Popular Columns" />
        <div className="mt-6 overflow-hidden">
          <div className="fusion-auto-rail gap-6">
            {doubled.map((post, index) => (
              <MiniColumnCard key={`${post.id || post.slug}-${index}`} post={post} href={postHref(primaryTask, post, primaryRoute)} index={index % rail.length} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export function EditableMagazineSplit({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const pool = allPosts(posts, timeSections)
  if (!pool.length) return null
  const feature = pool[1] || pool[0]
  const grid = pool.slice(2, 8)
  const side = pool.slice(8, 13)

  return (
    <section className="bg-white">
      <div className={`grid gap-12 py-10 lg:grid-cols-[minmax(0,1fr)_340px] ${container}`}>
        <div>
          <FeaturedCard post={feature} href={postHref(primaryTask, feature, primaryRoute)} />
          <div className="mt-14">
            <SectionHeading label="Featured Reads" title="Articles worth opening next" actionHref={primaryRoute} actionLabel="See all features" />
            <div className="mt-6 grid gap-7 sm:grid-cols-2 xl:grid-cols-3">
              {grid.map((post, index) => index === 2 ? (
                <ImageFirstCard key={post.id || post.slug} post={post} href={postHref(primaryTask, post, primaryRoute)} />
              ) : (
                <EditorialCard key={post.id || post.slug} post={post} href={postHref(primaryTask, post, primaryRoute)} />
              ))}
            </div>
          </div>
        </div>
        <aside className="lg:pt-[560px]">
          <SectionHeading label="Latest Discussions" />
          <div className="mt-5">
            {side.map((post, index) => <CompactTextCard key={post.id || post.slug} post={post} href={postHref(primaryTask, post, primaryRoute)} index={index} />)}
          </div>
          <Link href={primaryRoute} className="mt-7 inline-flex w-full items-center justify-center gap-2 bg-black px-5 py-4 text-sm font-black text-white transition hover:bg-[var(--slot4-accent)]">
            See All Discussions <ArrowRight className="h-4 w-4" />
          </Link>
        </aside>
      </div>
    </section>
  )
}

export function EditableTimeCollections({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const sections = timeSections.length
    ? timeSections
    : ([
        { key: 'news', posts: posts.slice(0, 3), href: primaryRoute },
        { key: 'books', posts: posts.slice(3, 7), href: primaryRoute },
      ] as Pick<HomeTimeSection, 'key' | 'posts' | 'href'>[])
  const visible = sections.filter((section) => section.key !== 'profiles' && section.posts.length).slice(0, 3)
  if (!visible.length) return null

  return (
    <>
      {visible.map((section, sectionIndex) => (
        <section key={section.key} className={sectionIndex === 1 ? 'fusion-dark bg-black text-white' : 'bg-white text-black'}>
          <div className={`py-14 ${container}`}>
            <SectionHeading label={section.key === 'news' ? 'News' : section.key === 'books' ? 'Books' : 'Original Profiles'} actionHref={section.href || primaryRoute} actionLabel="See all" />
            <div className={`mt-6 grid gap-8 ${sectionIndex === 0 ? 'lg:grid-cols-3' : 'sm:grid-cols-2 lg:grid-cols-4'}`}>
              {section.posts.slice(0, sectionIndex === 0 ? 3 : 4).map((post, index) => sectionIndex === 0 ? (
                <EditorialCard key={post.id || post.slug} post={post} href={postHref(primaryTask, post, primaryRoute)} />
              ) : sectionIndex === 1 ? (
                <ImageFirstCard key={post.id || post.slug} post={post} href={postHref(primaryTask, post, primaryRoute)} />
              ) : (
                <HorizontalCard key={post.id || post.slug} post={post} href={postHref(primaryTask, post, primaryRoute)} />
              ))}
            </div>
          </div>
        </section>
      ))}
    </>
  )
}

export function EditableHomeCta() {
  return (
    <section className="bg-[#98d9bd] text-black">
      <div className={`flex min-h-[360px] items-center justify-center py-16 text-center ${container}`}>
        <div>
          <h2 className="editable-display mx-auto max-w-3xl text-4xl font-semibold leading-tight sm:text-5xl">Keep useful ideas, profiles, and resources moving.</h2>
          <p className="mx-auto mt-5 max-w-2xl text-base font-medium leading-8">FusionLinker brings articles and public profiles into one readable discovery surface for readers, professionals, creators, and teams.</p>
        </div>
      </div>
    </section>
  )
}
