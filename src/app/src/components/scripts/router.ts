import { useRoute, useRouter } from 'vue-router'

export function useRouting() {
  const router = useRouter()
  const route = useRoute()

  function go(path: string) { return router.push(path) }

  return { router, route, go }
}