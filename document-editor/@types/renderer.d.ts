import { CreateDocumentParam, DocumentListItem, UpdateDocumentParam } from "~~/models/document";
import { DocumentItem } from "~~/models/document-item";
import { GetPageInfoParam, PageInfo } from "~~/models/page";

export interface IElectronAPI {
  openFile: () => Promise<{ filePath: string; textData: string; }>,
  selectDirectory: () => Promise<{ dirPath: string }>,
  selectDirectory: () => Promise<{ dirPath: string }>,
  getDocumentList: (filePath: string) => Array<DocumentListItem>,
  noticeDirty: (dirty: boolean) => void,
  createDocument: (param: CreateDocumentParam) => void,
  getPageInfo: (param: GetPageInfoParam) => PageInfo | null,
  updateDocumentInfo: (param: UpdateDocumentParam) => void,
}

declare global {
  interface Window {
    electronAPI: IElectronAPI
  }
}
