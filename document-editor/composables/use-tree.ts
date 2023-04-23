import { MenuNode } from "~~/models/menu"

interface Props {
  currentNode: MenuNode
  pageIdArray: Array<string>
}

export const useTree = (
  treeProps: Props,
  openContextMenu: (documentId: string, pageId: string, pageTitle: string, e: MouseEvent) => void,
) => {
  const iconText = computed(() => {
    if (!treeProps.currentNode.nodes
        || treeProps.currentNode.nodes.length === 0) {
      return ''
    }
    if (treeProps.currentNode.nodes && !treeProps.currentNode.expand) {
      return 'mdi-chevron-right'
    }
    return 'mdi-chevron-down'
  })

  const notDocument = computed(() =>
      treeProps.currentNode.documentId !== treeProps.currentNode.pageId)

  const firstNode = computed(() => treeProps.pageIdArray.length === 0)

  const currentDocumentId = computed(() => treeProps.currentNode.documentId)

  const currentPageId = computed(() => treeProps.currentNode.pageId)

  const currentPageTitle = computed(() => treeProps.currentNode.title)

  const addPageIdArray = computed(() =>
    treeProps.pageIdArray.concat(currentPageId.value)
  )

  const router = useRouter()
  const openPage = () => {
    return router.push(`/views/${currentDocumentId.value}/${currentPageId.value}`)
  }

  const openTreeContextMenu = (e: MouseEvent) => {
    openContextMenu(currentDocumentId.value, currentPageId.value, currentPageTitle.value, e)
  }

  return {
    iconText,
    notDocument,
    firstNode,
    currentPageId,
    addPageIdArray,
    openPage,
    openTreeContextMenu,
  }
}
