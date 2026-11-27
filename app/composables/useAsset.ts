import { joinURL } from 'ufo'

/**
 * Prefix a /public path with the app base URL, so assets still load when the
 * site is served from a subpath (e.g. GitHub Pages at /portofolio/).
 * External URLs and empty values are returned unchanged.
 */
export function useAsset() {
  const base = useRuntimeConfig().app.baseURL
  return (path?: string) => (!path || /^[a-z]+:/i.test(path) ? path : joinURL(base, path))
}
