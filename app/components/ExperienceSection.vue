<script setup lang="ts">
import { profile } from '~/data/profile'
</script>

<template>
  <section id="experience" class="section">
    <div class="container">
      <SectionHeading kicker="Experience" title="Where I've worked" />

      <ol class="timeline">
        <li v-for="(e, i) in profile.experience" :key="i" v-reveal class="item">
          <span class="marker" :class="{ live: e.current }" aria-hidden="true" />
          <div v-spotlight class="card card-hover entry">
            <div class="entry-head">
              <div>
                <h3>{{ e.role }}</h3>
                <p class="company">{{ e.company }}</p>
              </div>
              <div class="when">
                <span class="period">{{ e.period }}</span>
                <span class="where">{{ e.type }} · {{ e.location }}</span>
              </div>
            </div>
            <ul class="highlights">
              <li v-for="(h, j) in e.highlights" :key="j">{{ h }}</li>
            </ul>
            <ul class="tags" aria-label="Tech used">
              <li v-for="t in e.tags" :key="t" class="tag">{{ t }}</li>
            </ul>
          </div>
        </li>
      </ol>

      <div class="extras">
        <div v-reveal class="card extra edu">
          <span class="extra-label">Education</span>
          <h3>{{ profile.education.degree }}</h3>
          <p class="school">{{ profile.education.school }}</p>
          <div class="edu-meta">
            <span class="tag">{{ profile.education.period }}</span>
            <span class="tag honor">{{ profile.education.note }}</span>
          </div>
        </div>

        <div v-reveal="100" class="card extra">
          <span class="extra-label">Certificates & awards</span>
          <ul class="awards">
            <li v-for="a in profile.achievements" :key="a.title">
              <span class="award-title">{{ a.title }}</span>
              <span class="award-meta">{{ a.issuer }}<template v-if="a.year"> · {{ a.year }}</template></span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.timeline {
  position: relative;
  display: grid;
  gap: 20px;
  margin: 0;
  padding: 0 0 0 28px;
  list-style: none;
}

.timeline::before {
  content: '';
  position: absolute;
  top: 12px;
  bottom: 12px;
  left: 6px;
  width: 2px;
  background: var(--line);
  border-radius: 2px;
}

.item {
  position: relative;
}

.marker {
  position: absolute;
  top: 30px;
  left: -28px;
  width: 14px;
  height: 14px;
  background: var(--card);
  border: 2px solid var(--line-strong);
  border-radius: 50%;
}

.marker {
  transition:
    transform 0.3s var(--ease),
    border-color 0.3s var(--ease);
}

.item:hover .marker {
  transform: scale(1.3);
  border-color: var(--accent);
}

.marker.live {
  background: var(--accent);
  border-color: var(--accent);
  box-shadow: 0 0 0 4px var(--accent-soft);
  animation: pulse 2.4s var(--ease) infinite;
}

@keyframes pulse {
  50% {
    box-shadow: 0 0 0 8px var(--accent-soft);
  }
}

.entry {
  display: grid;
  gap: 16px;
  padding: 24px;
}

@media (min-width: 1024px) {
  .entry {
    padding: 28px 32px;
  }
}

.entry-head {
  display: grid;
  gap: 8px;
}

@media (min-width: 768px) {
  .entry-head {
    grid-template-columns: 1fr auto;
    gap: 24px;
  }
  .when {
    text-align: right;
  }
}

h3 {
  font-size: clamp(1.125rem, 2vw, 1.375rem);
}

.company {
  margin-top: 2px;
  font-weight: 600;
  color: var(--accent-text);
}

.when {
  display: grid;
  gap: 2px;
  font-size: 0.875rem;
}

.period {
  font-weight: 600;
}

.where {
  color: var(--muted-fg);
}

.highlights {
  display: grid;
  gap: 8px;
  max-width: 72ch;
  margin: 0;
  padding: 0;
  list-style: none;
  color: var(--muted-fg);
}

.highlights li {
  position: relative;
  padding-left: 20px;
}

.highlights li::before {
  content: '';
  position: absolute;
  left: 2px;
  top: 0.7em;
  width: 6px;
  height: 6px;
  background: var(--accent);
  border-radius: 50%;
  opacity: 0.7;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 0;
  padding: 0;
  list-style: none;
}

/* Education + awards */
.extras {
  display: grid;
  gap: 20px;
  margin-top: 64px;
}

@media (min-width: 900px) {
  .extras {
    grid-template-columns: 1fr 1fr;
  }
}

.extra {
  display: grid;
  gap: 12px;
  align-content: start;
  padding: 28px;
}

.extra-label {
  font-size: 0.8125rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--accent-text);
}

.edu {
  background: var(--accent-soft);
  border-color: transparent;
}

.edu h3 {
  font-size: clamp(1.375rem, 2.5vw, 1.75rem);
}

.school {
  font-weight: 500;
}

.edu-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 4px;
}

.edu .tag {
  background: var(--card);
}

.edu .tag.honor {
  color: var(--on-accent);
  background: var(--accent);
  border-color: var(--accent);
}

.awards {
  display: grid;
  margin: 0;
  padding: 0;
  list-style: none;
}

.awards li {
  display: grid;
  gap: 2px;
  padding: 14px 0;
  border-bottom: 1px solid var(--line);
}

.awards li:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.award-title {
  font-weight: 600;
  line-height: 1.4;
}

.award-meta {
  font-size: 0.875rem;
  color: var(--muted-fg);
}
</style>
