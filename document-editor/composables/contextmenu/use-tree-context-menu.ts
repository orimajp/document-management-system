import { TreeContextMenuProps } from "./use-tree-context-menu-controll";

export const useTreeContextMenu = (
  props: TreeContextMenuProps,
  closeContextMenu: () => void,
) => {
  const showContextMenu = computed<boolean>({
    get: () => props.treeContextMenuParam.showContextMenu,
    set: () => closeContextMenu()
  })

  const openDocumentId = computed(() => props.treeContextMenuParam.openDocumentId)

  const openPageId = computed(() => props.treeContextMenuParam.openPageId)

  const openPageTitle = computed(() => props.treeContextMenuParam.openPageTitle)

  const contextMenuX = computed(() => props.treeContextMenuParam.contextMenuX)

  const contextMenuY = computed(() => props.treeContextMenuParam.contextMenuY)

  const top = computed(() => props.treeContextMenuParam.top)

  return {
    showContextMenu,
    openDocumentId,
    openPageId,
    openPageTitle,
    contextMenuX,
    contextMenuY,
    top
  }
}
