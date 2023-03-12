import { IpcMainInvokeEvent } from 'electron'
import fs from 'fs'
import path from 'path'
import { CreateDocumentParam, UpdateDocumentParam } from '~~/models/document'
import { DocumentItem } from '~~/models/document-item'
import { GetPageInfoParam } from '~~/models/page'
import { DocumentIndex, PageData } from '~~/models/storage'
//import { MenuData } from '~~/models/menu'

const DOCUMENT_INDEX_FILE_NAME = 'document.json'
const CONTENT_FILE_NAME = 'content.json'

/**
 * ドキュメントリスト取得
 * @param event イベント
 * @param folderPath フォルダパス
 * @returns ドキュメントリスト
 */
export const getDocumentList = (event: IpcMainInvokeEvent, folderPath: string): Array<DocumentItem> => {
  const allDirents = fs.readdirSync(folderPath)

  const documents = allDirents.filter((file) =>
    fs.statSync(path.join(folderPath, file)).isDirectory())
    .map(fileName => toDocumentItem(folderPath, fileName))

//    console.log(`documents=${documents}`)
    console.log(documents)

    return documents
}

const toDocumentItem = (folder: string, fileName: string): DocumentItem => {
  const documentFolderPath = path.join(folder, fileName)
  const documentIndexPath = path.join(documentFolderPath, DOCUMENT_INDEX_FILE_NAME)
  const documentIndexJson = fs.readFileSync(documentIndexPath, 'utf-8')
  const documentIndex = JSON.parse(documentIndexJson) as DocumentIndex

  return { title: documentIndex.title, id: documentIndex.documentId, createdAt: '2000/01/01 00:00', updatedAt: '2020/01/01 00:00' }
}

// TODO ドキュメント新規作成
export const createDocument = (event: IpcMainInvokeEvent, param: CreateDocumentParam): void => {
  const documentFolderPath = path.join(param.folder, param.documentId)
  const documentIndexPath = path.join(documentFolderPath, DOCUMENT_INDEX_FILE_NAME)
  const pageFolderPath = path.join(documentFolderPath, param.documentId)
  const pageDataPath = path.join(pageFolderPath, CONTENT_FILE_NAME)

  // 新規ドキュメントフォルダ作成 (folder/documentId)
  if (!fs.existsSync(documentFolderPath)) { // TODO 本来は既存フォルダへの書き込みはだめなのでガードする必要がある
    fs.mkdirSync(documentFolderPath);
  }

  // ドキュメントインデックス書き込み (folder/documentId/document.json)
  const documentIndex: DocumentIndex = {
    documentId: param.documentId,
    title: param.title,
    createdAt: param.createdAt,
    updatedAt: param.createdAt,
    temp: true,
  }

  fs.writeFileSync(documentIndexPath, JSON.stringify(documentIndex, null, 2))

  // ページフォルダ作成 (folder/documentId/documentId)
  if (!fs.existsSync(pageFolderPath)) {
    fs.mkdirSync(pageFolderPath)
  }

  // ページデータ書き込み (folder/documentId/documentId/page.json)
  const pageData: PageData = {
    documentId: param.documentId,
    pageId: param.documentId,
    title: param.title,
    data: param.data,
    createdAt: param.createdAt,
    updatedAt: param.createdAt,
    temp: true,
  }

  fs.writeFileSync(pageDataPath, JSON.stringify(pageData, null, 2))
}


// TODO ドキュメント削除

// ページ情報取得(ドキュメントも共用)
export const getPageInfo = (event: IpcMainInvokeEvent, param: GetPageInfoParam) => {
  const documentFolderPath = path.join(param.folder, param.documentId)
  const pageFolderPath = path.join(documentFolderPath, param.documentId)
  const pageDataPath = path.join(pageFolderPath, CONTENT_FILE_NAME)

  try {
    fs.statSync(pageDataPath)
    const json = fs.readFileSync(pageDataPath, 'utf-8')
    const content = JSON.parse(json) as PageData
    console.log(content)
    return content
  } catch(err) {
    console.log(err)
    return null
  }
}

// ドキュメント更新
export const updateDocumentInfo = (event: IpcMainInvokeEvent, param: UpdateDocumentParam) => {
  const documentFolderPath = path.join(param.folder, param.documentId)
  const documentIndexPath = path.join(documentFolderPath, DOCUMENT_INDEX_FILE_NAME)
  const pageFolderPath = path.join(documentFolderPath, param.documentId)
  const pageDataPath = path.join(pageFolderPath, CONTENT_FILE_NAME)

  try {
    fs.statSync(documentIndexPath)
    fs.statSync(pageDataPath)

    console.log('ドキュメントインデックス読み込み')
    const documentIndexJson = fs.readFileSync(documentIndexPath, 'utf-8')
    const documentIndex = JSON.parse(documentIndexJson) as DocumentIndex
    documentIndex.title = param.title
    documentIndex.updatedAt = param.updatedAt
    fs.writeFileSync(documentIndexPath, JSON.stringify(documentIndex, null, 2))

    console.log('ページデータ読み込み')
    const getPageInfoParam: GetPageInfoParam = {
      folder: param.folder,
      documentId: param.documentId,
      pageId: param.documentId,
    }
    const pageData = getPageInfo(event, getPageInfoParam)
    if (!pageData) throw new Error('ファイル未発見')
    pageData.title = param.title
    pageData.data = param.data
    pageData.updatedAt = param.updatedAt
    fs.writeFileSync(pageDataPath, JSON.stringify(pageData, null, 2))
  } catch(err) {
    console.log(err)
  }
}


// TODO ページ作成

// TODO ページ更新

// TODO ページ削除

// TODO メニュー階層変更

// TODO 画像アップロード

// TODO 画像削除

// TODO 検索データ取得

// TODO メニューデータ取得

// TODO ZIPデータ取得 (これは要検討)
