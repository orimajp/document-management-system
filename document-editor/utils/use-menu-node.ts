import { MenuInfo, MenuNode } from "~~/models/menu"

export const useMenuNode = () => {
  const toMenuNode = (documentId: string, pageId: string, menuInfo: MenuInfo): MenuNode => {
    const menuNode = createSingleMenuNode(documentId, pageId, menuInfo)
    for (const menu of menuInfo.menus) {
      menuNode.nodes.push(toMenuNode(documentId, pageId, menu))
    }
    return menuNode
  }

  const createSingleMenuNode = (documentId: string, pageId: string, menuInfo: MenuInfo): MenuNode => {
    return {
      title: menuInfo.title,
      documentId: documentId,
      pageId: menuInfo.pageId,
      expand: false,
      select: menuInfo.pageId === pageId,
      nodes: [],
    }
  }

  return {
    toMenuNode,
  }
}
