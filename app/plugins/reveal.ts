// v-reveal: fades an element up when it scrolls into view.
// Usage: <div v-reveal> or <div v-reveal="120"> (delay in ms).
// Content renders visible on the server and for reduced-motion users;
// only elements that start below the fold get hidden and animated.
type RevealEl = HTMLElement & { _revealIO?: IntersectionObserver }

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive<RevealEl, number | undefined>('reveal', {
    getSSRProps: () => ({}),
    mounted(el, binding) {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
      if (el.getBoundingClientRect().top < window.innerHeight * 0.92) return

      el.classList.add('reveal')
      if (binding.value) el.style.setProperty('--reveal-delay', `${binding.value}ms`)

      const io = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) {
            el.classList.add('is-visible')
            io.disconnect()
          }
        },
        { rootMargin: '0px 0px -8% 0px' },
      )
      io.observe(el)
      el._revealIO = io
    },
    unmounted(el) {
      el._revealIO?.disconnect()
    },
  })
})
