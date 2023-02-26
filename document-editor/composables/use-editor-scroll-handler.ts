import * as monacoEditor from 'monaco-editor'
import { Ref } from 'nuxt/dist/app/compat/capi'
import IStandaloneCodeEditor = monacoEditor.editor.IStandaloneCodeEditor
import { debounce } from 'lodash'
import { useContentScrollPosition } from './use-content-scroll-position'
import { useScrollDelay } from './use-scroll-delay'

export const useEditorScrollHandler = (
  windowHeight: Ref<number>,
  isEnableScrollSync: Ref<boolean>,
) => {
  let editor: IStandaloneCodeEditor | null = null
  let isScrollRecieved = false

  const {
    editorScrollPosition,
    updateViewerScrollPosition,
  } = useContentScrollPosition()

  const {
    scrollDelay,
  } = useScrollDelay()

  const handleScroll = () => {
    if (!editor) return
    if (!isEnableScrollSync.value) return
    if (isScrollRecieved) return
    if (scrollDelay.value) return
    const scrollTop = editor.getScrollTop()
    const topEnd = editor.getScrollHeight() - windowHeight.value
    if (topEnd > 0){
      nextTick(() => {
        updateViewerScrollPosition(scrollTop / topEnd)
      })
    }
  }

//  const debouncedHadleScroll = debounce(handleScroll, 200)
  const debouncedHadleScroll = debounce(handleScroll)

  const setEditor = (codeEditor: IStandaloneCodeEditor) => {
    editor = codeEditor
    editor.onDidScrollChange(debouncedHadleScroll)
  }

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
    if (!editor) return
    isScrollRecieved = true
    setTimeout()
    const topEnd = editor.getScrollHeight() - windowHeight.value
    nextTick(() => {
      editor?.setScrollTop(topEnd * v)
    })
  }

//  const debouncedSetScrollTop = debounce(setScrollTop, 200)
  const debouncedSetScrollTop = debounce(setScrollTop)

  watch(
    () => editorScrollPosition.value,
    (newVal, oldVal) => {
      if (newVal !== oldVal) {
        debouncedSetScrollTop(newVal)
      }
    }
  )

  return {
    setEditor,
  }
}
