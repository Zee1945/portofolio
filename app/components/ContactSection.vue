<script setup lang="ts">
import { profile } from '~/data/profile'

const copied = ref(false)
let timer: ReturnType<typeof setTimeout> | undefined

async function copyEmail() {
  try {
    await navigator.clipboard.writeText(profile.email)
    copied.value = true
    clearTimeout(timer)
    timer = setTimeout(() => (copied.value = false), 2000)
  } catch {
    window.location.href = `mailto:${profile.email}`
  }
}

onBeforeUnmount(() => clearTimeout(timer))
</script>

<template>
  <section id="contact" class="section contact">
    <div class="container inner">
      <div v-reveal class="copy">
        <span class="eyebrow">Contact</span>
        <h2>Let's work together</h2>
        <span class="bar" aria-hidden="true" />
        <p class="lead">
          Looking for a developer who can turn manual, paper-heavy processes into a clean
          digital workflow? I'm open to full-time roles, freelance projects, and collaborations.
        </p>
      </div>

      <div v-reveal="100" class="card box">
        <span class="box-label">Email me at</span>
        <a :href="`mailto:${profile.email}`" class="email">{{ profile.email }}</a>

        <div class="actions">
          <a :href="`mailto:${profile.email}`" class="btn btn-primary">
            <AppIcon name="mail" :size="18" /> Send an email
          </a>
          <button type="button" class="btn" @click="copyEmail">
            <AppIcon :name="copied ? 'check' : 'copy'" :size="18" />
            {{ copied ? 'Copied' : 'Copy email' }}
          </button>
          <span class="sr-only" aria-live="polite">{{ copied ? 'Email copied to clipboard' : '' }}</span>
        </div>

        <div class="socials">
          <span class="box-label">Or find me on</span>
          <ul>
            <li v-for="s in profile.socials" :key="s.label">
              <a :href="s.href" target="_blank" rel="noopener" class="icon-btn" :aria-label="s.label">
                <AppIcon :name="s.icon" :size="18" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.contact {
  background: var(--beige);
}

.inner {
  display: grid;
  gap: 40px;
  align-items: center;
}

@media (min-width: 900px) {
  .inner {
    grid-template-columns: 1.1fr 1fr;
    gap: 64px;
  }
}

.copy {
  display: grid;
  justify-items: start;
  gap: 10px;
}

h2 {
  font-size: clamp(1.75rem, 4vw, 2.75rem);
}

.bar {
  width: 64px;
  height: 3px;
  margin-top: 4px;
  background: var(--orange);
  border-radius: 2px;
}

.lead {
  max-width: 50ch;
  margin-top: 8px;
  color: var(--muted-fg);
}

.box {
  display: grid;
  gap: 14px;
  padding: 28px;
}

@media (min-width: 768px) {
  .box {
    padding: 36px;
  }
}

.box-label {
  font-size: 0.8125rem;
  color: var(--muted-fg);
}

.email {
  font-size: clamp(1.125rem, 2.4vw, 1.5rem);
  font-weight: 600;
  color: var(--heading);
  text-decoration: none;
  overflow-wrap: anywhere;
}

.email:hover {
  text-decoration: underline;
  text-decoration-color: var(--orange);
  text-decoration-thickness: 3px;
  text-underline-offset: 6px;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 6px;
}

.socials {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px 16px;
  margin-top: 8px;
  padding-top: 18px;
  border-top: 1px solid var(--line);
}

.socials ul {
  display: flex;
  gap: 10px;
  margin: 0;
  padding: 0;
  list-style: none;
}
</style>
