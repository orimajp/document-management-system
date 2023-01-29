export const useContentScrollPosition = () => {
  const _viewerScrollPosition = useState('viewerScrollPosition', () => 0)
  const _editorScrollPosition = useState('editorScrollPosition', () => 0)

  const initializeScrollPosition = () => {
    _viewerScrollPosition.value = 0
    _editorScrollPosition.value = 0
  }

  const updateViewerScrollPosition = (position: number) => {
    _viewerScrollPosition.value = position
  }

  const updateEditorScrollPosition = (position: number) => {
    _editorScrollPosition.value = position
  }

  const viewerScrollPosition = computed(() =>
    _viewerScrollPosition.value > 1 ? 1 : _viewerScrollPosition.value
  )

  const editorScrollPosition = computed(() =>
    _editorScrollPosition.value > 1 ? 1 : _editorScrollPosition.value
  )

  return {
    initializeScrollPosition,
    updateViewerScrollPosition,
    updateEditorScrollPosition,
    viewerScrollPosition,
    editorScrollPosition,
  }
}
