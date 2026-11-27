<script setup lang="ts">
const progress = ref(0)
const show = ref(false)
const R = 20
const C = 2 * Math.PI * R
let frame = 0

function update() {
  cancelAnimationFrame(frame)
  frame = requestAnimationFrame(() => {
    const max = document.documentElement.scrollHeight - window.innerHeight
    progress.value = max > 0 ? Math.min(1, window.scrollY / max) : 0
    show.value = window.scrollY > 600
  })
}

onMounted(() => {
  update()
  window.addEventListener('scroll', update, { passive: true })
  window.addEventListener('resize', update, { passive: true })
})
onBeforeUnmount(() => {
  cancelAnimationFrame(frame)
  window.removeEventListener('scroll', update)
  window.removeEventListener('resize', update)
})
</script>

<template>
  <a href="#top" class="to-top" :class="{ show }" aria-label="Back to top">
    <svg class="ring" viewBox="0 0 48 48" aria-hidden="true">
      <circle cx="24" cy="24" :r="R" class="track" />
      <circle
        cx="24"
        cy="24"
        :r="R"
        class="bar"
        :stroke-dasharray="C"
        :stroke-dashoffset="C * (1 - progress)"
      />
    </svg>
    <AppIcon name="arrow-up" :size="18" />
  </a>
</template>

<style scoped>
.to-top {
  position: fixed;
  right: 24px;
  bottom: 24px;
  z-index: 40;
  display: grid;
  place-items: center;
  width: 56px;
  height: 56px;
  color: #fff;
  background: var(--accent);
  border-radius: 50%;
  box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.25);
  opacity: 0;
  visibility: hidden;
  transform: translateY(12px);
  transition:
    opacity 0.3s var(--ease),
    transform 0.3s var(--ease),
    visibility 0.3s;
}

.to-top.show {
  opacity: 1;
  visibility: visible;
  transform: none;
}

.to-top:hover {
  background: var(--accent-hover);
  transform: translateY(-2px);
}

.ring {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
}

circle {
  fill: none;
  stroke-width: 2.5;
}

.track {
  stroke: rgba(255, 255, 255, 0.25);
}

.bar {
  stroke: var(--orange);
  stroke-linecap: round;
  transition: stroke-dashoffset 0.1s linear;
}
</style>
