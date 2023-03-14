import { CreateDocumentParam, UpdateDocumentParam } from "~~/models/document"
import { ulid } from 'ulid'

export const useDocument = () => {
  const {
    documentFolder
  } = useDocumentFolder()

  const createDocument = (title: string, data: string) => {

    const now = (new Date()).getTime()
    const documerntId = ulid()

    const param: CreateDocumentParam = {
      folder: documentFolder.value,
      documentId: documerntId,
      title: title,
      data: data,
      createdAt: now,
    }

    window.electronAPI.createDocument(param)

    return documerntId
  }

  const updateDocument = async (documentId: string, title: string, data: string) => {
    const now = (new Date()).getTime()

    const param: UpdateDocumentParam = {
      folder: documentFolder.value,
      documentId: documentId,
      title: title,
      data: data,
      updatedAt: now,
    }

    await window.electronAPI.updateDocument(param)
  }

  return {
    createDocument,
    updateDocument,
  }
}
