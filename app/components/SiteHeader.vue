<script setup lang="ts">
import { profile } from '~/data/profile'

const { theme, toggle } = useTheme()
const open = ref(false)
const scrolled = ref(false)

const links = [
  { href: '#about', label: 'About' },
  { href: '#projects', label: 'Projects' },
  { href: '#experience', label: 'Experience' },
  { href: '#contact', label: 'Contact' },
]

// Highlight the nav link of the section currently in the middle of the screen
const active = ref('')
let io: IntersectionObserver | undefined

function onScroll() {
  scrolled.value = window.scrollY > 8
  if (window.scrollY < 200) active.value = ''
}
function onKey(e: KeyboardEvent) {
  if (e.key === 'Escape') open.value = false
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('keydown', onKey)

  io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) if (e.isIntersecting) active.value = `#${e.target.id}`
    },
    { rootMargin: '-45% 0px -50% 0px' },
  )
  for (const l of links) {
    const el = document.querySelector(l.href)
    if (el) io.observe(el)
  }
})
onBeforeUnmount(() => {
  io?.disconnect()
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('keydown', onKey)
})
</script>

<template>
  <header class="header" :class="{ 'is-scrolled': scrolled || open }">
    <div class="container bar">
      <a href="#top" class="logo">
        <span class="logo-mark" aria-hidden="true">{{ profile.initials }}</span>
        <span class="logo-text">
          <span class="logo-name">{{ profile.name }}</span>
          <span class="logo-role">{{ profile.role }}</span>
        </span>
      </a>

      <nav class="nav" aria-label="Main">
        <a
          v-for="l in links"
          :key="l.href"
          :href="l.href"
          :class="{ active: active === l.href }"
          :aria-current="active === l.href ? 'true' : undefined"
        >{{ l.label }}</a>
      </nav>

      <div class="actions">
        <button
          type="button"
          class="icon-btn"
          :aria-label="theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'"
          @click="toggle"
        >
          <AppIcon :name="theme === 'dark' ? 'sun' : 'moon'" :size="18" />
        </button>
        <a href="#contact" class="btn btn-primary hire">Hire me</a>
        <button
          type="button"
          class="icon-btn menu-btn"
          aria-controls="mobile-nav"
          :aria-expanded="open"
          :aria-label="open ? 'Close menu' : 'Open menu'"
          @click="open = !open"
        >
          <AppIcon :name="open ? 'x' : 'menu'" :size="18" />
        </button>
      </div>
    </div>

    <nav v-show="open" id="mobile-nav" class="mobile-nav" aria-label="Mobile">
      <a
        v-for="l in links"
        :key="l.href"
        :href="l.href"
        :class="{ active: active === l.href }"
        @click="open = false"
      >{{ l.label }}</a>
    </nav>
  </header>
</template>

<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 50;
  background: transparent;
  transition:
    background-color 0.15s linear,
    box-shadow 0.15s linear;
}

.header.is-scrolled {
  background: var(--card);
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.2);
}

.bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  height: var(--header-h);
  transition: height 0.15s linear;
}

.is-scrolled .bar {
  height: 68px;
}

.logo {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  min-height: 44px;
  text-decoration: none;
}

.logo-mark {
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  font-size: 0.9375rem;
  font-weight: 700;
  color: #fff;
  background: var(--accent);
  border-radius: 10px;
  box-shadow: inset 0 -3px 0 var(--orange);
  transition:
    width 0.15s linear,
    height 0.15s linear;
}

.is-scrolled .logo-mark {
  width: 38px;
  height: 38px;
}

.logo-text {
  display: grid;
  line-height: 1.25;
}

.logo-name {
  font-weight: 700;
  font-size: 1rem;
  color: var(--heading);
}

.logo-role {
  font-size: 0.75rem;
  color: var(--muted-fg);
}

.nav {
  display: none;
  gap: 32px;
}

.nav a {
  position: relative;
  padding: 10px 2px;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--fg);
  text-decoration: none;
  transition: color 0.2s var(--ease);
}

.nav a::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: 2px;
  height: 3px;
  background: var(--accent-2);
  border-radius: 2px;
  transform: scaleX(0);
  transition: transform 0.25s var(--ease);
}

.nav a:hover,
.nav a.active {
  color: var(--accent-text);
}

.nav a:hover::after,
.nav a.active::after {
  transform: scaleX(1);
}

.actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

.hire {
  display: none;
  min-height: 44px;
}

.mobile-nav {
  display: flex;
  flex-direction: column;
  padding: 4px 16px 20px;
  background: var(--card);
}

.mobile-nav a {
  padding: 14px 4px;
  font-weight: 500;
  text-decoration: none;
  border-bottom: 1px solid var(--line);
}

.mobile-nav a.active {
  color: var(--accent-text);
  box-shadow: inset 3px 0 0 var(--accent-2);
  padding-left: 14px;
}

@media (min-width: 900px) {
  .nav {
    display: flex;
  }
  .hire {
    display: inline-flex;
  }
  .menu-btn {
    display: none;
  }
  .mobile-nav {
    display: none !important;
  }
}

@media (max-width: 420px) {
  .logo-role {
    display: none;
  }
}

@media (max-width: 360px) {
  .logo-text {
    display: none;
  }
}
</style>
