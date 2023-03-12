import { IpcMainInvokeEvent } from 'electron'
import fs from 'fs'
import path from 'path'
import { CreateDocumentParam } from '~~/models/document'
//import { MenuData } from '~~/models/menu'

// TODO ドキュメント新規保存
// * 格納フォルダ作成(ドキュメントID)
// * index.json作成
// * menu.json作成
// * ドキュメントフォルダ作成(ページID)
// * content.md作成
const createDocument = (param: CreateDocumentParam) => {
  // index.jsonデータ作成
  /*
  const index: DocumentData = {
    documentId: param.documentId,
    title: param.title,
    createdAt: param.createdAt,
    updatedAt: param.createdAt,
  }*/

  // menu.jsoデータ作成
  /*
  const menu: MenuData = {
    title: param.title,
    id: param.documentId,
    menus: [],
  }*/

  // 作成パス
  // TODO 環境依存のパス区切り文字に置換
  const createDirectoryPath = `${param.folder}/${param.documentId}`
  const indexPath = `${createDirectoryPath}/index.json`
  const menuPath = `${createDirectoryPath}/menu.json`
  const documentPath = `${createDirectoryPath}/${param.documentId}/contentmd`
  const imagePath = `${createDirectoryPath}/images`


  // markdownデータ
  const data = param.data

  // TODO
}






// TODO ドキュメント更新

// TODO ドキュメント削除
