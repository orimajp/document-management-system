import { IpcMainInvokeEvent } from 'electron'
import fs from 'fs'
import path from 'path'
import { DocumentItem } from '~~/models/document-item'


export const getDocumentList = (event: IpcMainInvokeEvent, folderPath: string): Array<DocumentItem> => {
  const allDirents = fs.readdirSync(folderPath)

  const documents = allDirents.filter((file) =>
    fs.statSync(path.join(folderPath, file)).isDirectory())
    .map(fileName => toDocumentItem(fileName))

//    console.log(`documents=${documents}`)
    console.log(documents)

    return documents
}

const toDocumentItem = (fileName: string): DocumentItem => {
  return { title: fileName, fileName: fileName }
}

// TODO ドキュメント新規保存
// * 格納フォルダ作成(ドキュメントID)
// * index.json作成
// * menu.json作成
// * ドキュメントフォルダ作成(ページID)
// * content.md作成

// TODO ドキュメント更新

// TODO ドキュメント削除

// TODO ページ作成

// TODO ページ更新

// TODO ページ削除

// TODO メニュー階層変更

// TODO 画像アップロード

// TODO 画像削除

// TODO 検索データ取得

// TODO メニューデータ取得

// TODO ZIPデータ取得 (これは要検討)
