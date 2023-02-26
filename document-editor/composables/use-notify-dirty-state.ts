/**
 * 変更ステータス管理
 */
export const useNotifyDirtyState = (
  isDirty: ComputedRef<boolean>,
) => {
  const initDirtyState = () => {
    noticeDirtyState(isDirty.value)
  }

  watch(
    () => isDirty.value,
    (newVal, oldVal) => {
      if (newVal !== oldVal) {
        noticeDirtyState(newVal)
      }
    }
  )

  const noticeDirtyState = (sate: boolean) => {
    window.electronAPI.noticeDirty(sate)
  }

  return {
    initDirtyState,
  }
}
