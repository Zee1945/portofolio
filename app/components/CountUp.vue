<script setup lang="ts">
// Counts a value like "800+" up from 0 when it scrolls into view.
// The server renders the final value, so it's correct without JS.
const props = withDefaults(defineProps<{ value: string; duration?: number }>(), {
  duration: 1400,
})

const match = props.value.match(/^(\D*)(\d+)(.*)$/)
const display = ref(props.value)
const el = ref<HTMLElement>()
let io: IntersectionObserver | undefined
let frame = 0

onMounted(() => {
  if (!match || !el.value) return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  const [, prefix, num, suffix] = match
  const target = Number(num)

  io = new IntersectionObserver(
    (entries) => {
      if (!entries.some((e) => e.isIntersecting)) return
      io?.disconnect()
      const start = performance.now()
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / props.duration)
        const eased = 1 - Math.pow(1 - t, 3)
        display.value = `${prefix}${Math.round(target * eased)}${suffix}`
        if (t < 1) frame = requestAnimationFrame(tick)
      }
      display.value = `${prefix}0${suffix}`
      frame = requestAnimationFrame(tick)
    },
    { threshold: 0.5 },
  )
  io.observe(el.value)
})

onBeforeUnmount(() => {
  io?.disconnect()
  cancelAnimationFrame(frame)
})
</script>

<template>
  <span ref="el" class="count" :aria-label="value">{{ display }}</span>
</template>

<style scoped>
.count {
  font-variant-numeric: tabular-nums;
}
</style>
