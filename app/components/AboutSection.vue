<script setup lang="ts">
import { profile } from '~/data/profile'

const asset = useAsset()
</script>

<template>
  <section id="about" class="section">
    <div class="container">
      <SectionHeading kicker="About me" title="A bit about me" />

      <div class="bento">
        <article v-reveal class="card bio">
          <p v-for="(p, i) in profile.about" :key="i">{{ p }}</p>
        </article>

        <div v-reveal="80" class="card mono">
          <img
            v-if="profile.avatar"
            :src="asset(profile.avatar)"
            :alt="`Photo of ${profile.name}`"
            class="avatar"
            loading="lazy"
          >
          <span v-else class="initials" aria-hidden="true">{{ profile.initials }}</span>
          <span class="loc">
            <AppIcon name="map-pin" :size="15" /> {{ profile.location }}
          </span>
        </div>

        <div v-reveal="120" class="card now">
          <span class="now-label">Currently</span>
          <p>{{ profile.currently }}</p>
        </div>
      </div>

      <h3 v-reveal class="toolbox-title">Skills & tools</h3>
      <div class="toolbox">
        <div
          v-for="(items, group, i) in profile.stack"
          :key="group"
          v-reveal="i * 80"
          v-spotlight
          class="card card-hover tool"
        >
          <span class="tool-title">{{ group }}</span>
          <ul class="tags">
            <li v-for="t in items" :key="t" class="tag">{{ t }}</li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.bento {
  display: grid;
  gap: 20px;
}

.bento > * {
  min-width: 0;
}

@media (min-width: 768px) {
  .bento {
    grid-template-columns: repeat(12, 1fr);
    gap: 24px;
  }
  .bio { grid-column: span 8; }
  .mono { grid-column: span 4; }
  .now { grid-column: span 12; }
}

.bio {
  display: grid;
  gap: 16px;
  align-content: center;
  padding: 28px;
  font-size: 0.9375rem;
  color: var(--muted-fg);
}

.bio p:first-child {
  color: var(--fg);
  font-size: 1.0625rem;
}

@media (min-width: 1024px) {
  .bio {
    padding: 36px 40px;
  }
}

.mono {
  position: relative;
  display: grid;
  place-items: center;
  min-height: 240px;
  overflow: hidden;
  background: var(--accent);
}

.mono::before {
  content: '';
  position: absolute;
  top: -40px;
  right: -40px;
  width: 180px;
  height: 180px;
  border: 30px solid rgba(255, 255, 255, 0.08);
  border-radius: 50%;
}

.avatar {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.initials {
  position: relative;
  font-size: clamp(4rem, 9vw, 6rem);
  font-weight: 700;
  line-height: 1;
  color: #fff;
  transition: transform 0.6s var(--ease);
}

.initials::after {
  content: '';
  display: block;
  width: 40%;
  height: 5px;
  margin: 10px auto 0;
  background: var(--orange);
  border-radius: 3px;
}

.mono:hover .initials {
  transform: scale(1.06);
}

.loc {
  position: absolute;
  left: 14px;
  bottom: 14px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 5px 12px;
  font-size: 0.8125rem;
  font-weight: 500;
  color: var(--accent-text);
  background: var(--card);
  border-radius: 999px;
}

.now {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px 20px;
  padding: 20px 28px;
  background: var(--beige);
  box-shadow: none;
}

.now-label {
  padding: 3px 12px;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #fff;
  background: var(--accent);
  border-radius: 6px;
}

.now p {
  font-weight: 500;
  color: var(--fg);
}

.toolbox-title {
  margin: 64px 0 24px;
  font-size: clamp(1.375rem, 2.6vw, 1.75rem);
}

.toolbox {
  display: grid;
  gap: 20px;
}

@media (min-width: 768px) {
  .toolbox {
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
  }
}

.tool {
  display: grid;
  gap: 16px;
  align-content: start;
  padding: 24px;
  border-top: 3px solid var(--accent);
}

.tool-title {
  font-weight: 600;
  color: var(--heading);
}

.tool .tag {
  transition:
    color 0.2s var(--ease),
    background-color 0.2s var(--ease);
}

.tool .tag:hover {
  color: var(--on-accent);
  background: var(--accent);
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 0;
  padding: 0;
  list-style: none;
}
</style>
