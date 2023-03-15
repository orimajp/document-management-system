import { CreatePageParam, GetPageInfoParam, UpdatePageParam } from "~~/models/page"
import { ulid } from 'ulid'

export const usePage = () => {
  const {
    documentFolder,
  } = useDocumentFolder()

  const getPageInfo =  async (documentId: string, pageId: string) => {
    console.log('getPageInfo()')
    const param: GetPageInfoParam = {
      folder: documentFolder.value,
      documentId: documentId, 
      pageId: pageId,
    }
    const content = await window.electronAPI.getPageInfo(param)
    console.log(content)

    return content
  }

  const createPage = async (documentId: string, title: string, data: string) => {
    const now = (new Date()).getTime()
    const pageId = ulid()
    const param: CreatePageParam = {
      folder: documentFolder.value,
      documentId: documentId,
      pageId: pageId,
      title: title,
      data: data,
      createdAt: now,
    }

    await window.electronAPI.createPage(param)

    return pageId
  }

  const updatePage = async (documentId: string, pageId: string, title: string, data: string) => {
    const now = (new Date()).getTime()
    const param: UpdatePageParam = {
      folder: documentFolder.value,
      documentId: documentId,
      pageId: pageId,
      title: title,
      data: data,
      updatedAt: now,
    }

    await window.electronAPI.updatePage(param)
  }

  return {
    getPageInfo,
    createPage,
    updatePage,
  }
}