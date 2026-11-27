<script setup lang="ts">
import { profile } from '~/data/profile'

const items = Object.values(profile.stack).flat()
</script>

<template>
  <div class="strip">
    <div class="container inner">
      <span class="label">Tech I work with</span>
      <ul class="list">
        <li v-for="item in items" :key="item">{{ item }}</li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.strip {
  padding-block: 40px 8px;
}

.inner {
  display: grid;
  gap: 14px;
}

@media (min-width: 900px) {
  .inner {
    grid-template-columns: auto 1fr;
    align-items: center;
    gap: 32px;
  }
}

.label {
  font-size: 0.8125rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--accent-2);
  white-space: nowrap;
}

.list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 22px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.list li {
  font-size: 0.9375rem;
  font-weight: 500;
  color: var(--muted-fg);
  transition:
    opacity 0.2s var(--ease),
    color 0.2s var(--ease),
    transform 0.2s var(--ease);
}

.list:hover li {
  opacity: 0.5;
}

.list li:hover {
  opacity: 1;
  color: var(--accent-text);
  transform: translateY(-2px);
}
</style>
