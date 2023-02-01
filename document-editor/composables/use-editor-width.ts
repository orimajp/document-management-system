import { Ref } from "nuxt/dist/app/compat/capi";

export const useEditorWidth =  (
  splitMode: Ref<number>
) => {
  const editorWidth = computed(() => transferWidth(splitMode.value))

  const transferWidth = (splitMode: number): number => {
    if (splitMode === 0) return 100
    if (splitMode === 1) return 50
    return 0
  }

  return {
    editorWidth,
  }
}
