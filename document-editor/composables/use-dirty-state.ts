export const useDirtyState = () => {
  const _originalVersionId = useState('originalVersion', () => 1)
  const _currentVersioId = useState('currentVersionId', () => 1)
  const _titleDirtiyState = useState('documentTitle', () => false)

  const initilizeVersionId = (versionId: number) => {
    _originalVersionId.value = versionId
    updateCurrentVersionId(versionId)
  }

  const initilizeTitleDirtyState = () => {
    clearEditorDirtyState()
  }

  const clearEditorDirtyState = () => {
    _originalVersionId.value = _currentVersioId.value
  }

  const clearTitleDitryState = () => {
    _titleDirtiyState.value = false
  }

  const clearDirtyState = () => {
    clearEditorDirtyState()
    clearTitleDitryState()
  }

  const updateTitleDirtyState = (state: boolean) => {
    _titleDirtiyState.value = state
  }

  const updateCurrentVersionId = (versionId: number) => {
    _currentVersioId.value = versionId
  }

  const isDirty = computed(() =>  _originalVersionId.value !== _currentVersioId.value
    || _titleDirtiyState.value
  )

  watch(
    () => isDirty.value,
    (val) => {
      console.log(`isDirty=${val}`)
    }
  )

  return {
    initilizeVersionId,
    initilizeTitleDirtyState,
    clearEditorDirtyState,
    clearTitleDitryState,
    clearDirtyState,
    updateTitleDirtyState,
    updateCurrentVersionId,
    isDirty,
  }
}
