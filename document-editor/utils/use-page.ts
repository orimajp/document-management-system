import { GetPageInfoParam } from "~~/models/page"

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




  return {
    getPageInfo,
  }
}