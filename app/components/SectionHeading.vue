<script setup lang="ts">
defineProps<{ kicker: string; title: string; subtitle?: string }>()
</script>

<template>
  <div v-reveal class="heading">
    <span class="eyebrow">{{ kicker }}</span>
    <h2>{{ title }}</h2>
    <span class="bar" aria-hidden="true" />
    <p v-if="subtitle" class="subtitle">{{ subtitle }}</p>
  </div>
</template>

<style scoped>
.heading {
  display: grid;
  justify-items: start;
  gap: 10px;
  max-width: 640px;
  margin-bottom: 44px;
}

h2 {
  font-size: clamp(1.75rem, 3.8vw, 2.5rem);
}

/* Orange underline accent */
.bar {
  width: 64px;
  height: 3px;
  margin-top: 4px;
  background: var(--orange);
  border-radius: 2px;
}

.subtitle {
  margin-top: 6px;
  font-size: 0.9375rem;
  color: var(--muted-fg);
}

@media (min-width: 1024px) {
  .heading {
    margin-bottom: 56px;
  }
}
</style>
