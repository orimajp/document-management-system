import { MenuInfo, MenuNode } from "~~/models/menu"

export const useMenuNode = () => {
  const toMenuNode = (documentId: string, pageId: string, menuInfo: MenuInfo): MenuNode => {
    const menuNode = createSingleMenuNode(documentId, pageId, menuInfo)
    for (const menu of menuInfo.menus) {
      menuNode.nodes.push(toMenuNode(documentId, pageId, menu))
    }
    return menuNode
  }

  const expandNode = (menuNode: MenuNode): boolean => {
    if (menuNode.select) {
      menuNode.expand = true
      return true
    }
    for (const node of menuNode.nodes) {
      const result = expandNode(node)
      if (result) {
        node.expand = true
        return true
      }
    }
    return false
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
    expandNode,
  }
}
