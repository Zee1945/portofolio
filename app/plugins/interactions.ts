// Pointer-driven effects. Both are skipped on touch devices and for
// people who prefer reduced motion, so the page stays calm for them.
//
//   v-tilt        → sets --rx / --ry (deg) on the element as the pointer moves
//   v-spotlight   → sets --mx / --my (px) so CSS can draw a soft glow under the cursor
type FxEl = HTMLElement & { _fxCleanup?: () => void }

const canHover = () =>
  window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
  !window.matchMedia('(prefers-reduced-motion: reduce)').matches

function track(el: FxEl, onMove: (e: PointerEvent, r: DOMRect) => void, onLeave: () => void) {
  let frame = 0
  const move = (e: PointerEvent) => {
    cancelAnimationFrame(frame)
    frame = requestAnimationFrame(() => onMove(e, el.getBoundingClientRect()))
  }
  const leave = () => {
    cancelAnimationFrame(frame)
    onLeave()
  }
  el.addEventListener('pointermove', move)
  el.addEventListener('pointerleave', leave)
  el._fxCleanup = () => {
    cancelAnimationFrame(frame)
    el.removeEventListener('pointermove', move)
    el.removeEventListener('pointerleave', leave)
  }
}

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive<FxEl, number | undefined>('tilt', {
    getSSRProps: () => ({}),
    mounted(el, binding) {
      if (!canHover()) return
      const max = binding.value ?? 6
      track(
        el,
        (e, r) => {
          const x = (e.clientX - r.left) / r.width - 0.5
          const y = (e.clientY - r.top) / r.height - 0.5
          el.style.setProperty('--ry', `${(x * max * 2).toFixed(2)}deg`)
          el.style.setProperty('--rx', `${(-y * max * 2).toFixed(2)}deg`)
          el.style.setProperty('--px', x.toFixed(3))
          el.style.setProperty('--py', y.toFixed(3))
        },
        () => {
          for (const v of ['--rx', '--ry']) el.style.setProperty(v, '0deg')
          for (const v of ['--px', '--py']) el.style.setProperty(v, '0')
        },
      )
    },
    unmounted(el) {
      el._fxCleanup?.()
    },
  })

  nuxtApp.vueApp.directive<FxEl>('spotlight', {
    getSSRProps: () => ({}),
    mounted(el) {
      if (!canHover()) return
      el.classList.add('spotlight')
      track(
        el,
        (e, r) => {
          el.style.setProperty('--mx', `${e.clientX - r.left}px`)
          el.style.setProperty('--my', `${e.clientY - r.top}px`)
        },
        () => {
          el.style.removeProperty('--mx')
          el.style.removeProperty('--my')
        },
      )
    },
    unmounted(el) {
      el._fxCleanup?.()
    },
  })
})
