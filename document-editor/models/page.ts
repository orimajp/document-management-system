export interface CreatePageParam {
  folder: string
  documentId: string
  pageId: string
  title: string
  data: string
  createdAt: string
}

export interface UpdatePageParam {
  folder: string
  documentId: string
  pageId: string
  title: string
  data: string
  createdAt: string
  updatedAt: string
}

export interface DeletePageParam {
  folder: string
  documentId: string
  pageId: string
}

export interface GetPageInfoParam {
  folder: string
  documentId: string
  pageId: string
}

export interface PageInfo {
  /*
  title: string
  data: string
  createdAt: string
  updatedAt: string
  */
  documentId: string
  pageId: string
  title: string
  data: string
  createdAt: number
  updatedAt: number
  temp?: boolean
  delete?: boolean
}

