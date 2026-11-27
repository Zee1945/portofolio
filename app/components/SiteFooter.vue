<script setup lang="ts">
import { profile } from '~/data/profile'

const year = new Date().getFullYear()

const links = [
  { href: '#about', label: 'About' },
  { href: '#projects', label: 'Projects' },
  { href: '#experience', label: 'Experience' },
  { href: '#contact', label: 'Contact' },
]
</script>

<template>
  <footer class="footer">
    <div class="container cols">
      <div class="brand">
        <div class="brand-row">
          <span class="mark" aria-hidden="true">{{ profile.initials }}</span>
          <span class="name">{{ profile.name }}</span>
        </div>
        <p class="summary">{{ profile.tagline }}</p>
      </div>

      <nav class="block" aria-label="Footer">
        <h2 class="title">Navigate</h2>
        <ul>
          <li v-for="l in links" :key="l.href"><a :href="l.href">{{ l.label }}</a></li>
        </ul>
      </nav>

      <div class="block">
        <h2 class="title">Get in touch</h2>
        <ul>
          <li><a :href="`mailto:${profile.email}`">{{ profile.email }}</a></li>
          <li>{{ profile.location }}</li>
        </ul>
        <ul class="socials">
          <li v-for="s in profile.socials" :key="s.label">
            <a :href="s.href" target="_blank" rel="noopener" :aria-label="s.label">
              <AppIcon :name="s.icon" :size="18" />
            </a>
          </li>
        </ul>
      </div>
    </div>

    <div class="container credit">
      <p>© {{ year }} {{ profile.name }}. All rights reserved.</p>
      <p>Built with Nuxt</p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  color: rgba(255, 255, 255, 0.85);
  background: var(--footer-bg);
}

.cols {
  display: grid;
  gap: 36px;
  padding-block: 56px 40px;
}

@media (min-width: 768px) {
  .cols {
    grid-template-columns: 2fr 1fr 1.4fr;
    gap: 48px;
  }
}

.brand-row {
  display: flex;
  align-items: center;
  gap: 12px;
}

.mark {
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  font-size: 0.875rem;
  font-weight: 700;
  color: var(--footer-bg);
  background: #fff;
  border-radius: 10px;
  box-shadow: inset 0 -3px 0 var(--orange);
}

.name {
  font-weight: 600;
  color: #fff;
}

.summary {
  max-width: 40ch;
  margin-top: 14px;
  font-size: 0.8125rem;
}

.title {
  margin-bottom: 12px;
  font-size: 0.875rem;
  font-weight: 600;
  color: #fff;
}

.block ul {
  display: grid;
  gap: 4px;
  margin: 0;
  padding: 0;
  list-style: none;
  font-size: 0.8125rem;
}

.block a {
  display: inline-flex;
  align-items: center;
  min-height: 32px;
  text-decoration: none;
  overflow-wrap: anywhere;
  transition: color 0.2s var(--ease);
}

.block a:hover {
  color: var(--orange);
}

.socials {
  display: flex !important;
  gap: 8px !important;
  margin-top: 14px !important;
}

.socials a {
  justify-content: center;
  width: 40px;
  min-height: 40px;
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.35);
  border-radius: 50%;
}

.socials a:hover {
  color: var(--footer-bg);
  background: #fff;
}

.credit {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 4px 24px;
  padding-block: 18px;
  font-size: 0.75rem;
  border-top: 1px solid rgba(255, 255, 255, 0.3);
}

.footer :focus-visible {
  outline-color: var(--orange);
}
</style>
