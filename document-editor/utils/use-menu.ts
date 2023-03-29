import { GetMenuInfoParam, MenuInfo, UpdateMenuIntoParam } from "~~/models/menu"
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
    expandNode,
  } = useMenuNode()

  const getMenuNode = async (documentId: string, pageId: string) => {
    const menu = await getMenuInfo(documentId)
    if (!menu) return null
    const node = toMenuNode(documentId, pageId, menu)
    expandNode(node)
    return node
  }

  const updateMenuData = async (documentId: string, menuInfo: MenuInfo) => {
    console.log('updateMenuData(): called.')
    const now = (new Date()).getTime()
    const param: UpdateMenuIntoParam = {
      folder: documentFolder.value,
      documentId: documentId,
      menuInfo: menuInfo,
      updatedAt: now,
    }
    console.log(param)
    await window.electronAPI.updateMenuData(param)
  }

  return {
    getMenuInfo,
    getMenuNode,
    updateMenuData,
  }
}
