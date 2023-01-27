import { DocumentItem } from "~~/models/document-item";

export interface IElectronAPI {
  openFile: () => Promise<{ filePath: string; textData: string; }>,
  selectDirectory: () => Promise<{ dirPath: string }>,
  selectDirectory: () => Promise<{ dirPath: string }>,
  getDocumentList: (filePath: string) => Array<DocumentItem>,
}

declare global {
  interface Window {
    electronAPI: IElectronAPI
  }
}
