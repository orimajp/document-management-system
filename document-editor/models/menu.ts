export interface GetMenuInfoParam {
  folder: string
  documentId: string
}

export interface MenuInfo {
  title: string,
  pageId: string,
  menus: Array<MenuInfo>,
}
