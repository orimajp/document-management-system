// https://github.com/ics-creative/150819_electron_text_editor/blob/maiin/src/preload.js
import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('electronAPI', {

    /**
   * 【プリロード（中継）】ファイルを開きます。
   * @returns {Promise<{filePath: string, textData:string}>}
   */
    openFile: async (): Promise<{ filePath: string; textData: string; }> => {
      // メインプロセスの関数を呼び出す
      const result = await ipcRenderer.invoke("openFile")
      return result;
    },
  
    selectDirectory: async (): Promise<{ dirPath: string }> => {
      const result = await ipcRenderer.invoke('selectDirectory')
      return result
    },

    getDocumentList: (folderPath: string) => {
      const result = ipcRenderer.invoke('getDocumentList', folderPath)
      return result
    }


})
