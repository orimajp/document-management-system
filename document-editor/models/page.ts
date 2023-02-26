export interface CreatePageParam {
  directory: string
  documentId: string
  pageId: string
  title: string
  data: string
  createdAt: string
}

export interface UpdatePageParam {
  directory: string
  documentId: string
  pageId: string
  title: string
  data: string
  createdAt: string
  updatedAt: string
}

export interface DeletePageParam {
  directory: string
  documentId: string
  pageId: string
}

export interface GetPageInfoParam {
  directory: string
  documentId: string
  pageId: string
}

export interface PageInfo {
  title: string
  data: string
  createdAt: string
  updatedAt: string
}

