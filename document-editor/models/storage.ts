export interface DocumentIndex {
  documentId: string
  title: string
  createdAt: number
  updatedAt: number
  temp?: boolean
}

export interface PageData {
  documentId: string
  pageId: string
  title: string
  data: string
  createdAt: number
  updatedAt: number
  temp?: boolean
  delete?: boolean
}

export interface MenuData {
  pageId: string
  title: string
  menus: Array<MenuData>
}



