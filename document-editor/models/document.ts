export interface CreateDocumentParam {
  directory: string
  documentId: string
  title: string
  data: string
  createdAt: string
}

export interface UpdateDocumentParam {
  directory: string
  documentId: string
  title: string
  data: string
  createdAt: string
  updatedAt: string
}

export interface DeleteDocumentParam {
  directory: string
  documentId: string
}

export interface GetDocumentInfoParam {
  directory: string
  documentId: string
}

// GetDocumentInfo()の返値
export interface DocumentInfo {
  documentId: string
  title: string
  data: string
  createdAt: string
  updatedAt: string
}

export interface DocumentListItem {
  documentId: string
  title: string
  createdAt: string
  updatedAt: string
}

// index.jsonのデータフォーマット
export interface DocumentData {
  documentId: string
  title: string
  createdAt: string
  updatedAt: string
}