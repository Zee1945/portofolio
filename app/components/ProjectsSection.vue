<script setup lang="ts">
import { profile, type Project } from '~/data/profile'

const matches = (p: Project, f: string) =>
  f === 'All' || p.tags.some((t) => t.toLowerCase().startsWith(f.toLowerCase()))

const filter = ref('All')
const filters = computed(() =>
  ['All', ...profile.projectFilters]
    .map((name) => ({ name, count: profile.projects.filter((p) => matches(p, name)).length }))
    .filter((f) => f.count > 0),
)
const visible = computed(() => profile.projects.filter((p) => matches(p, filter.value)))

// Detail popup (native <dialog> handles focus trapping and Esc)
const dialog = ref<HTMLDialogElement>()
const selected = ref<Project | null>(null)

function openProject(p: Project) {
  selected.value = p
  nextTick(() => dialog.value?.showModal())
}
function closeProject() {
  dialog.value?.close()
}
function onDialogClick(e: MouseEvent) {
  if (e.target === dialog.value) closeProject()
}
</script>

<template>
  <section id="projects" class="section projects-section">
    <div class="container">
      <SectionHeading
        kicker="Selected work"
        title="Projects I've built"
        subtitle="Most of my work is for clients and companies, so the code and live apps are private. Click a project to see what I did."
      />

      <div v-reveal class="filters" role="group" aria-label="Filter projects by technology">
        <button
          v-for="f in filters"
          :key="f.name"
          type="button"
          class="filter"
          :class="{ active: filter === f.name }"
          :aria-pressed="filter === f.name"
          @click="filter = f.name"
        >
          {{ f.name }} <span class="count">{{ f.count }}</span>
        </button>
      </div>
      <p class="sr-only" aria-live="polite">Showing {{ visible.length }} projects</p>

      <Transition name="swap" mode="out-in">
        <div :key="filter" class="projects">
          <article
            v-for="(p, i) in visible"
            :key="p.title"
            v-reveal="(i % 2) * 100"
            v-spotlight
            class="card card-hover project"
            :class="{ featured: p.featured }"
            :style="{ '--tc': p.color }"
          >
            <div class="thumb">
              <img v-if="p.image" :src="p.image" :alt="`Screenshot of ${p.title}`" loading="lazy">
              <span v-else class="thumb-title" aria-hidden="true">{{ p.title }}</span>
            </div>

            <div class="body">
              <div class="meta">
                <span class="client">{{ p.client }}</span>
                <span v-if="p.featured" class="badge">Featured</span>
              </div>
              <h3>{{ p.title }}</h3>
              <p class="desc">{{ p.description }}</p>
              <ul class="tags" aria-label="Tech stack">
                <li v-for="t in p.tags" :key="t" class="tag">{{ t }}</li>
              </ul>
              <button
                type="button"
                class="details-btn"
                :aria-label="`View details: ${p.title}`"
                @click="openProject(p)"
              >
                View details <AppIcon name="arrow-right" :size="16" />
              </button>
            </div>
          </article>
        </div>
      </Transition>
    </div>

    <dialog
      ref="dialog"
      class="modal"
      aria-labelledby="modal-title"
      @click="onDialogClick"
    >
      <div v-if="selected" class="modal-inner" :style="{ '--tc': selected.color }">
        <div class="modal-thumb">
          <img v-if="selected.image" :src="selected.image" :alt="`Screenshot of ${selected.title}`">
          <span v-else class="thumb-title" aria-hidden="true">{{ selected.title }}</span>
          <button type="button" class="icon-btn close" aria-label="Close" @click="closeProject">
            <AppIcon name="x" :size="18" />
          </button>
        </div>

        <div class="modal-body">
          <span class="client">{{ selected.client }}</span>
          <h3 id="modal-title">{{ selected.title }}</h3>

          <dl class="facts">
            <div>
              <dt>My role</dt>
              <dd>{{ selected.role }}</dd>
            </div>
            <div>
              <dt>Built for</dt>
              <dd>{{ selected.client }}</dd>
            </div>
          </dl>

          <p class="desc">{{ selected.description }}</p>

          <h4>What I did</h4>
          <ul class="highlights">
            <li v-for="(h, i) in selected.highlights" :key="i">{{ h }}</li>
          </ul>

          <h4>Tech stack</h4>
          <ul class="tags">
            <li v-for="t in selected.tags" :key="t" class="tag">{{ t }}</li>
          </ul>

          <div v-if="selected.demo || selected.repo" class="links">
            <a v-if="selected.demo" :href="selected.demo" target="_blank" rel="noopener" class="btn btn-primary">
              Live demo <AppIcon name="arrow-up-right" :size="16" />
            </a>
            <a v-if="selected.repo" :href="selected.repo" target="_blank" rel="noopener" class="btn">
              <AppIcon name="github" :size="16" /> Source code
            </a>
          </div>
          <p v-else class="private">Private client project · code and live app are not public</p>
        </div>
      </div>
    </dialog>
  </section>
</template>

<style scoped>
.projects-section {
  background: var(--bg-alt);
}

/* Filters */
/* Underline tabs; the grey baseline is an inset shadow so it isn't clipped by overflow */
.filters {
  display: flex;
  gap: 28px;
  margin-bottom: 36px;
  overflow-x: auto;
  scrollbar-width: none;
  box-shadow: inset 0 -3px 0 var(--line);
}

.filters::-webkit-scrollbar {
  display: none;
}

.filter {
  position: relative;
  display: inline-flex;
  flex: none;
  align-items: center;
  gap: 8px;
  min-height: 50px;
  padding: 0 4px;
  font: inherit;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--muted-fg);
  background: none;
  border: none;
  cursor: pointer;
  transition: color 0.2s var(--ease);
}

.filter::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 3px;
  background: var(--accent-2);
  border-radius: 2px;
  transform: scaleX(0);
  transition: transform 0.25s var(--ease);
}

.filter:hover {
  color: var(--accent-text);
}

.filter.active {
  color: var(--heading);
  font-weight: 600;
}

.filter.active::after {
  transform: scaleX(1);
}

.count {
  min-width: 22px;
  padding: 0 6px;
  font-size: 0.6875rem;
  font-weight: 600;
  line-height: 20px;
  text-align: center;
  color: var(--muted-fg);
  background: var(--muted);
  border-radius: 999px;
}

.filter.active .count {
  color: var(--on-accent);
  background: var(--accent);
}

.swap-enter-active,
.swap-leave-active {
  transition:
    opacity 0.25s var(--ease),
    transform 0.25s var(--ease);
}

.swap-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.swap-leave-to {
  opacity: 0;
}

/* Grid */
.projects {
  display: grid;
  gap: 24px;
}

@media (min-width: 900px) {
  .projects {
    grid-template-columns: 1fr 1fr;
  }
}

.project {
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  overflow: hidden;
  cursor: pointer;
}

.thumb,
.modal-thumb {
  position: relative;
  display: grid;
  place-items: center;
  overflow: hidden;
  background:
    radial-gradient(circle at 85% 15%, color-mix(in srgb, var(--tc) 22%, transparent), transparent 55%),
    linear-gradient(140deg, color-mix(in srgb, var(--tc) 14%, var(--card)), color-mix(in srgb, var(--tc) 5%, var(--card)));
}

.thumb {
  aspect-ratio: 16 / 9;
  margin: 10px 10px 0;
  border-radius: 10px;
}

.thumb img,
.modal-thumb img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s var(--ease);
}

.thumb-title {
  padding: 24px;
  font-size: clamp(1.75rem, 3.5vw, 2.5rem);
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -0.03em;
  text-align: center;
  color: var(--tc);
  transition: transform 0.6s var(--ease);
}

:root[data-theme='dark'] .thumb-title {
  color: color-mix(in srgb, var(--tc) 50%, #fff);
}

.project:hover .thumb-title,
.project:hover .thumb img {
  transform: scale(1.05);
}

.body {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 12px;
  padding: 22px 24px 20px;
}

.meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.client {
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--accent-2);
}

.badge {
  padding: 3px 10px;
  font-size: 0.75rem;
  font-weight: 600;
  color: #3b2a00;
  background: color-mix(in srgb, var(--orange) 30%, #fff);
  border-radius: 6px;
}

h3 {
  font-size: clamp(1.25rem, 2vw, 1.5rem);
}

.desc {
  color: var(--muted-fg);
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 4px 0 0;
  padding: 0;
  list-style: none;
}

/* The whole card is clickable through this button's stretched hit area */
.details-btn {
  display: inline-flex;
  align-items: center;
  align-self: flex-start;
  gap: 6px;
  min-height: 44px;
  margin-top: auto;
  padding: 0 16px;
  font: inherit;
  font-size: 0.8125rem;
  font-weight: 500;
  color: var(--on-accent);
  background: var(--accent);
  border: none;
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: background-color 0.2s var(--ease);
}

.project:hover .details-btn {
  background: var(--accent-hover);
}

.details-btn::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
}

.details-btn svg {
  transition: transform 0.25s var(--ease);
}

.project:hover .details-btn svg {
  transform: translateX(4px);
}

.details-btn:focus-visible {
  outline: none;
}

.details-btn:focus-visible::after {
  outline: 2px solid var(--orange);
  outline-offset: -2px;
  border-radius: var(--radius-lg);
}

@media (min-width: 900px) {
  .project.featured {
    grid-column: 1 / -1;
    display: grid;
    grid-template-columns: 1.2fr 1fr;
  }

  .featured .thumb {
    aspect-ratio: auto;
    min-height: 340px;
    margin: 10px 0 10px 10px;
  }

  .featured .body {
    justify-content: center;
    padding: 40px;
  }

  .featured .details-btn {
    margin-top: 8px;
  }

  .featured h3 {
    font-size: clamp(1.75rem, 3vw, 2.25rem);
  }
}

/* Modal */
.modal {
  width: min(720px, calc(100% - 32px));
  max-height: calc(100dvh - 48px);
  padding: 0;
  color: var(--fg);
  background: var(--card);
  border: 1px solid var(--line);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
  overflow: auto;
  overscroll-behavior: contain;
}

.modal[open] {
  animation: pop 0.35s var(--ease);
}

.modal::backdrop {
  background: rgba(15, 18, 24, 0.45);
  -webkit-backdrop-filter: blur(4px);
  backdrop-filter: blur(4px);
}

.modal[open]::backdrop {
  animation: fade 0.35s var(--ease);
}

@keyframes pop {
  from {
    opacity: 0;
    transform: translateY(16px) scale(0.98);
  }
}

@keyframes fade {
  from {
    opacity: 0;
  }
}

.modal-thumb {
  min-height: 200px;
}

.close {
  position: absolute;
  top: 14px;
  right: 14px;
  box-shadow: var(--shadow-sm);
}

.modal-body {
  display: grid;
  gap: 14px;
  padding: 28px 24px 32px;
}

@media (min-width: 768px) {
  .modal-body {
    padding: 32px 40px 40px;
  }
}

.modal-body h3 {
  font-size: clamp(1.5rem, 3vw, 2rem);
}

.facts {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 12px;
  margin: 4px 0;
}

.facts div {
  padding: 12px 16px;
  background: var(--muted);
  border-radius: var(--radius);
}

.facts dt {
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--accent-2);
}

.facts dd {
  margin: 2px 0 0;
  font-weight: 600;
}

.modal-body h4 {
  margin-top: 8px;
  font-size: 1rem;
}

.highlights {
  display: grid;
  gap: 8px;
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
}

.links {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 8px;
}

.private {
  margin-top: 8px;
  font-size: 0.875rem;
  color: var(--muted-fg);
}
</style>
