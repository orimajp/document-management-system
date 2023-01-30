import { Ref } from "nuxt/dist/app/compat/capi"
import { debounce } from 'lodash'
import { useContentScrollPosition } from './use-content-scroll-position'

export const useViewerScrollHandler = (
  viewer: Ref<HTMLElement | null>,
  isEnableScrollSync: Ref<boolean>,
) => {
  const {
    viewerScrollPosition,
    updateEditorScrollPosition,
  } = useContentScrollPosition()
  const handleScroll = (e: Event) => {
    if (!isEnableScrollSync.value) return
    if (isScrollRecieved) return
    const el = e.target as Element
    if (el && el.clientHeight && el.scrollHeight) {
      const topEnd = el.scrollHeight - el.clientHeight
      if (topEnd > 0) {
        nextTick(() => {
          updateEditorScrollPosition(el.scrollTop / topEnd)
        })
      }
    }
  }

//  const debouncedHandleScroll = debounce(handleScroll, 200)
  const debouncedHandleScroll = debounce(handleScroll)

  onMounted(() => {
    viewer.value?.addEventListener('scroll', debouncedHandleScroll)
  })

  onBeforeMount(() => {
    viewer.value?.removeEventListener('scroll', debouncedHandleScroll)
  })

  let isScrollRecieved = false
  let timeoutId: null | number = null
  const setTimeout = () => {
    if (timeoutId) {
      window.clearTimeout(timeoutId)
      timeoutId = null
    }
    timeoutId = window.setTimeout(() => {
      isScrollRecieved = false
      timeoutId = null
    }, 200)
  }

  const setScrollTop = (v: number) => {
    if (!viewer.value) return
    isScrollRecieved = true
    setTimeout()
    const topEnd =
      (viewer.value as HTMLElement).scrollHeight -
      (viewer.value as HTMLElement).clientHeight
    nextTick(() => {
      (viewer.value as HTMLElement).scrollTop = topEnd * v
    })
  }

//  const debouncedSetScrollTop = debounce(setScrollTop, 200)
  const debouncedSetScrollTop = debounce(setScrollTop)

  watch(
    () => viewerScrollPosition.value,
    (newVal) => {
      debouncedSetScrollTop(newVal)
    }
  )
}
