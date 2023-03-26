export interface GetMenuInfoParam {
  folder: string
  documentId: string
}

export interface UpdateMenuIntoParam {
  folder: string
  documentId: string
  menuInfo: MenuInfo
}

export interface MenuInfo {
  title: string
  pageId: string
  menus: Array<MenuInfo>
}

export interface MenuNode {
  title: string
  documentId: string
  pageId: string
  expand: boolean
  select: boolean
  nodes: Array<MenuNode>
}
