import { GetMenuInfoParam } from "~~/models/menu"

export const useMenu = () => {
  const {
    documentFolder,
  } = useDocumentFolder()

  const getMenuInfo = async (documentId: string) => {
    const param: GetMenuInfoParam = {
      folder: documentFolder.value,
      documentId: documentId,
    }
    const menu = await window.electronAPI.getMenuData(param)
    console.log(menu)
    return menu
  }

  return {
    getMenuInfo
  }
}
