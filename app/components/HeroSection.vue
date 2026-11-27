<script setup lang="ts">
import { profile } from '~/data/profile'

type Tok = { t: string; c?: 'k' | 's' | 'n' | 'f' | 'c' }
const str = (s: string): Tok => ({ t: `'${s}'`, c: 's' })

const lines: Tok[][] = [
  [{ t: '// nice to meet you', c: 'c' }],
  [{ t: 'const ', c: 'k' }, { t: 'zul = {' }],
  [{ t: '  role: ' }, str(profile.role), { t: ',' }],
  [{ t: '  based: ' }, str(profile.location), { t: ',' }],
  [
    { t: '  stack: [' },
    ...profile.heroStack.flatMap((s, i) => (i ? [{ t: ', ' }, str(s)] : [str(s)])),
    { t: '],' },
  ],
  [{ t: '  focus: ' }, str('docs & approvals'), { t: ',' }],
  [{ t: '  yearsOfCode: ' }, { t: '4', c: 'n' }, { t: ',' }],
  [{ t: '}' }],
]

// Rotating words at the end of the headline
const words = profile.heroWords
const idx = ref(0)
const prev = ref(-1)
let timer: ReturnType<typeof setInterval> | undefined

onMounted(() => {
  if (words.length < 2) return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  timer = setInterval(() => {
    if (document.hidden) return
    prev.value = idx.value
    idx.value = (idx.value + 1) % words.length
  }, 2600)
})
onBeforeUnmount(() => clearInterval(timer))
</script>

<template>
  <section id="top" v-tilt="0" class="hero">
    <div class="deco deco-a" aria-hidden="true" />
    <div class="deco deco-b" aria-hidden="true" />

    <div class="container hero-grid">
      <div>
        <p v-if="profile.available" class="status rise">
          <span class="dot" aria-hidden="true" />
          {{ profile.availableText }}
        </p>

        <p class="site-name rise" style="--d: 40ms">Hi, I'm {{ profile.name }}</p>

        <h1 class="rise" style="--d: 100ms">
          I build web apps that turn paperwork into
          <span class="sr-only">{{ words[0] }}.</span>
          <span class="rotator" aria-hidden="true">
            <span
              v-for="(w, i) in words"
              :key="w"
              :class="{ on: i === idx, out: i === prev }"
            >{{ w }}.</span>
          </span>
        </h1>

        <p class="lead rise" style="--d: 160ms">{{ profile.tagline }}</p>

        <div class="cta rise" style="--d: 240ms">
          <a href="#projects" class="btn btn-primary">
            View my work <AppIcon name="arrow-right" :size="18" />
          </a>
          <a v-if="profile.resumeUrl" :href="profile.resumeUrl" class="btn" download>
            <AppIcon name="download" :size="18" /> Download CV
          </a>
          <a v-else href="#contact" class="btn">Contact me</a>
        </div>

        <ul class="socials rise" style="--d: 320ms">
          <li v-for="s in profile.socials" :key="s.label">
            <a :href="s.href" class="icon-btn" target="_blank" rel="noopener" :aria-label="s.label">
              <AppIcon :name="s.icon" :size="18" />
            </a>
          </li>
        </ul>
      </div>

      <div v-tilt="5" class="visual rise" style="--d: 220ms">
        <figure class="code card" aria-label="A short code snippet describing me">
          <div class="win-bar" aria-hidden="true">
            <i /><i /><i />
            <span class="file">about-me.ts</span>
          </div>
          <pre><code><span v-for="(line, i) in lines" :key="i" class="line"><span v-for="(tok, j) in line" :key="j" :class="tok.c">{{ tok.t }}</span></span></code></pre>
        </figure>

        <div class="chip card">
          <AppIcon name="map-pin" :size="16" />
          <span>{{ profile.location }}</span>
        </div>
      </div>
    </div>
  </section>

  <!-- Stats card that overlaps the bottom of the hero -->
  <div class="container offer-wrap">
    <ul class="offer rise" style="--d: 360ms">
      <li v-for="s in profile.stats" :key="s.label" class="offer-item">
        <span class="offer-icon"><AppIcon :name="s.icon" :size="22" /></span>
        <span class="offer-text">
          <CountUp :value="s.value" class="offer-value" />
          <span class="offer-label">{{ s.label }}</span>
        </span>
      </li>
    </ul>
  </div>

  <TechStrip />
</template>

<style scoped>
.hero {
  position: relative;
  margin-top: calc(-1 * var(--header-h));
  padding-top: var(--header-h);
  overflow: hidden;
  background: linear-gradient(180deg, var(--hero-top) 0%, var(--bg) 100%);
}

.deco {
  position: absolute;
  z-index: 0;
  border-radius: 50%;
  pointer-events: none;
  transition: translate 1.2s var(--ease);
}

.deco-a {
  top: 60px;
  right: -120px;
  width: 420px;
  height: 420px;
  border: 60px solid color-mix(in srgb, var(--accent) 6%, transparent);
  translate: calc(var(--px, 0) * 40px) calc(var(--py, 0) * 40px);
}

.deco-b {
  bottom: 60px;
  left: -60px;
  width: 140px;
  height: 140px;
  background: color-mix(in srgb, var(--orange) 14%, transparent);
  translate: calc(var(--px, 0) * -40px) calc(var(--py, 0) * -40px);
}

.hero-grid {
  position: relative;
  z-index: 1;
  display: grid;
  gap: 48px;
  align-items: center;
  padding-block: 40px 120px;
}

@media (min-width: 1024px) {
  .hero-grid {
    grid-template-columns: 1.15fr 1fr;
    gap: 64px;
    padding-block: 64px 150px;
  }
}

.status {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
  padding: 5px 14px;
  font-size: 0.8125rem;
  font-weight: 500;
  color: var(--sage-text);
  background: var(--sage-soft);
  border-radius: 999px;
}

.dot {
  position: relative;
  width: 8px;
  height: 8px;
  background: #34a37a;
  border-radius: 50%;
}

.dot::after {
  content: '';
  position: absolute;
  inset: 0;
  background: #34a37a;
  border-radius: 50%;
  animation: ping 2s var(--ease) infinite;
}

@keyframes ping {
  to {
    transform: scale(2.4);
    opacity: 0;
  }
}

.site-name {
  margin-bottom: 8px;
  font-size: clamp(1.125rem, 2vw, 1.5rem);
  font-weight: 500;
  color: var(--accent-2);
}

h1 {
  font-size: clamp(1.75rem, 4.2vw, 3rem);
  font-weight: 700;
  line-height: 1.25;
}

/* Rotating words: all stacked in one grid cell so the width never jumps */
.rotator {
  display: inline-grid;
  color: var(--accent-2);
  background: linear-gradient(var(--orange), var(--orange)) 0 100% / 100% 4px no-repeat;
  padding-bottom: 2px;
}

.rotator > span {
  grid-area: 1 / 1;
  white-space: nowrap;
  opacity: 0;
  transform: translateY(0.4em);
  transition:
    opacity 0.5s var(--ease),
    transform 0.5s var(--ease);
}

.rotator > span.on {
  opacity: 1;
  transform: none;
}

.rotator > span.out {
  transform: translateY(-0.4em);
}

.lead {
  max-width: 54ch;
  margin-top: 20px;
  font-size: clamp(1rem, 1.4vw, 1.125rem);
  color: var(--muted-fg);
}

.cta {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 32px;
}

.cta .btn-primary svg {
  transition: transform 0.25s var(--ease);
}

.cta .btn-primary:hover svg {
  transform: translateX(3px);
}

.socials {
  display: flex;
  gap: 10px;
  margin: 28px 0 0;
  padding: 0;
  list-style: none;
}

/* Visual */
.visual {
  position: relative;
  min-width: 0;
  padding-bottom: 24px;
  perspective: 1000px;
}

.code {
  margin: 0;
  overflow: hidden;
  box-shadow: var(--shadow-lg);
  transform: rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg));
  transition: transform 0.4s var(--ease);
}

.win-bar {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 14px 18px;
  color: #fff;
  background: var(--accent);
}

.win-bar i {
  width: 11px;
  height: 11px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.35);
}

.win-bar i:nth-child(1) { background: #ff9b00; }

.file {
  margin-left: 8px;
  font-family: var(--font-mono);
  font-size: 0.8125rem;
  color: rgba(255, 255, 255, 0.85);
}

pre {
  margin: 0;
  padding: 22px 0;
  overflow-x: auto;
  font-family: var(--font-mono);
  font-size: 0.8125rem;
  line-height: 1.9;
  counter-reset: ln;
}

@media (min-width: 768px) {
  pre {
    font-size: 0.875rem;
  }
}

.line {
  display: block;
  padding-inline: 18px 24px;
  white-space: pre;
  counter-increment: ln;
  transition: background-color 0.2s;
}

.line:hover {
  background: var(--accent-soft);
}

.line::before {
  content: counter(ln);
  display: inline-block;
  width: 2ch;
  margin-right: 18px;
  text-align: right;
  color: var(--muted-fg);
  opacity: 0.5;
}

.k { color: var(--accent-2); font-weight: 500; }
.s { color: var(--code-str); }
.n { color: var(--code-num); }
.f { color: var(--code-fn); }
.c { color: var(--muted-fg); font-style: italic; }

.chip {
  position: absolute;
  bottom: 0;
  left: 16px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--accent-text);
  border-radius: var(--radius);
  box-shadow: var(--shadow-md);
  animation: float 6s ease-in-out infinite;
  translate: calc(var(--px, 0) * -24px) calc(var(--py, 0) * -24px);
  transition: translate 0.6s var(--ease);
}

@keyframes float {
  50% {
    transform: translateY(-6px);
  }
}

/* Overlapping stats card */
.offer-wrap {
  position: relative;
  z-index: 2;
  margin-top: -80px;
}

.offer {
  display: grid;
  margin: 0;
  padding: 8px 24px;
  list-style: none;
  background: color-mix(in srgb, var(--card) 85%, transparent);
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  border: 1px solid var(--card-border);
  border-radius: var(--radius-lg);
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.12);
}

.offer-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 18px 0;
}

.offer-item + .offer-item {
  border-top: 1px solid var(--line-strong);
}

@media (min-width: 768px) {
  .offer {
    grid-template-columns: repeat(3, 1fr);
    padding: 12px 8px;
  }

  .offer-item {
    justify-content: center;
    padding: 16px 24px;
  }

  .offer-item + .offer-item {
    border-top: none;
    border-left: 1px solid var(--line-strong);
  }
}

.offer-icon {
  display: grid;
  place-items: center;
  flex: none;
  width: 50px;
  height: 50px;
  color: var(--accent-text);
  background: var(--accent-soft);
  border-radius: 14px;
}

.offer-text {
  display: grid;
  line-height: 1.3;
}

.offer-value {
  font-size: 1.625rem;
  font-weight: 700;
  color: var(--heading);
}

.offer-label {
  font-size: 0.875rem;
  color: var(--muted-fg);
}
</style>
