export interface CreateDocumentParam {
  folder: string
  documentId: string
  title: string
  data: string
  createdAt: number
}

export interface UpdateDocumentParam {
  folder: string
  documentId: string
  title: string
  data: string
  updatedAt: number
}

export interface DeleteDocumentParam {
  folder: string
  documentId: string
}

/*
export interface GetDocumentInfoParam {
  directory: string
  documentId: string
}
*/

// GetDocumentInfo()の返値
export interface DocumentInfo {
  documentId: string
  title: string
  data: string
  createdAt: number
  updatedAt: number
}

export interface DocumentListItem {
  documentId: string
  title: string
  createdAt: number
  updatedAt: number
}

/*
export interface CreateDocumentParam {
  title: string
  body: string
}

export interface CreateDocumentResult {
  documentId: string
  createdAt: string
}
*/