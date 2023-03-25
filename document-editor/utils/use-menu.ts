import { GetMenuInfoParam } from "~~/models/menu"
import { useMenuNode } from "./use-menu-node"

export const useMenu = () => {
  const {
    documentFolder,
  } = useDocumentFolder()

  const getMenuInfo = async (documentId: string) => {
    const param: GetMenuInfoParam = {
      folder: documentFolder.value,
      documentId: documentId,
    }
    const menu = await window.electronAPI.getMenuData(param)
    console.log(menu)
    return menu
  }

  const {
    toMenuNode,
  } = useMenuNode()

  const getMenuNode = async (documentId: string, pageId: string) => {
    const menu = await getMenuInfo(documentId)
    if (!menu) return null
    return toMenuNode(documentId, pageId, menu)
  }

  return {
    getMenuInfo,
    getMenuNode,
  }
}
