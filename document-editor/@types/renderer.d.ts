import { CreateDocumentParam, DocumentListItem, UpdateDocumentParam } from "~~/models/document";
import { DocumentItem } from "~~/models/document-item";
import { GetMenuInfoParam, MenuInfo } from "~~/models/menu";
import { CreatePageParam, GetPageInfoParam, PageInfo, UpdatePageParam } from "~~/models/page";

export interface IElectronAPI {
  openFile: () => Promise<{ filePath: string; textData: string; }>,
  selectDirectory: () => Promise<{ dirPath: string }>,
  selectDirectory: () => Promise<{ dirPath: string }>,
  getDocumentList: (filePath: string) => Array<DocumentListItem>,
  noticeDirty: (dirty: boolean) => void,
  createDocument: (param: CreateDocumentParam) => void,
  getPageInfo: (param: GetPageInfoParam) => PageInfo | null,
  updateDocument: (param: UpdateDocumentParam) => void,
  createPage: (param: CreatePageParam) => void,
  updatePage: (param: UpdatePageParam) => void,
  getMenuData: (param: GetMenuInfoParam) => MenuInfo | null,
}

declare global {
  interface Window {
    electronAPI: IElectronAPI
  }
}
