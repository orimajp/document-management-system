// https://gitlab.com/nikosdendrinos/electron-nuxt3-boilerplate/-/blob/main/electron/main/index.ts
// https://github.com/ics-creative/150819_electron_text_editor/blob/maiin/src/main.js
import { app, BrowserWindow, ipcMain, dialog } from 'electron'
import path from 'path'
import fs from 'fs'
import {getDocumentList} from './file'
import { createMenu } from './menu'

// The built directory structure
//
// ├─┬ dist-electron
// │ ├─┬ main
// │ │ └── index.js
// │ ├─┬ preload
// │ │ └── index.js
// │ ├─┬ renderer
// │ │ └── index.html

process.env.ROOT = path.join(__dirname, '../..')
//process.env.ROOT = path.join(__dirname, '..')
process.env.DIST = path.join(process.env.ROOT, 'dist-electron')
//process.env.DIST = path.join(process.env.ROOT, 'electron')
process.env.VITE_PUBLIC = process.env.VITE_DEV_SERVER_URL
  ? path.join(process.env.ROOT, 'public')
  : path.join(process.env.ROOT, '.output/public')
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'

const preload = path.join(process.env.DIST, 'preload.js')

const dirtyMap = new Map<BrowserWindow, boolean>()

// https://teratail.com/questions/189438
const option = {
  type: "warning",
  buttons: ["キャンセル", "終了する"],
  defaultId: 0,
  title: "閉じるボタンが押されました",
  message: "ファイルは保存しましたか？していなければキャンセルを押して下さい。"
}

const bootstrap = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 540,
    webPreferences: {
      preload,
    }
  })

  ipcMain.on('notice-dirty', (event, dirty) => {
    const webContents = event.sender
    const win = BrowserWindow.fromWebContents(webContents)
    if (win) {
      dirtyMap.set(win, dirty)
    }
  })

  if (process.env.VITE_DEV_SERVER_URL) {
    win.loadURL(process.env.VITE_DEV_SERVER_URL)
    win.webContents.openDevTools()
  } else {
    win.loadFile(path.join(process.env.VITE_PUBLIC!, 'index.html'))
  }

  win.on('close', (e) => {
    //@ts-ignore
    const win = e.sender
    const dirty = dirtyMap.get(win)
    if (process.env.VITE_DEV_SERVER_URL || !dirty) {
      dirtyMap.delete(win)
      return
    }
    const num = dialog.showMessageBoxSync(option)
    if (num === 0) {
      e.preventDefault()
    } else {
      dirtyMap.delete(win)
    }
  })

  win.on('resize', () => {
    const size =  win.getSize()
    const width = size[0]
    const height = size[1]
//    console.log(`window width:${width}, height=${height}`)
  })
  
}

app.whenReady().then(() => {
  bootstrap()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) bootstrap()
  })
})

/**
 * ウィンドウ前クローズ
 */
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

/**
 * 新規ウィンドウ作成
 */
const createWindowFunc = () => {
  console.log('createWindw menu click')
  bootstrap()
}


const openFileFunc = async () => {
  console.log('openFile menu click')
//  const result = await openFile()
//  const win = BrowserWindow.getFocusedWindow() as BrowserWindow
//  win.webContents.send('read-file', result)
}

const saveFileFunc = () => {
  console.log('saveFile menu click')

  // TODO 書き込み処理(非同期が絡むとシーケンシャルな処理にはならない可能性がある)
  // * レンダープロセスにデータ取得依頼
  const win = BrowserWindow.getFocusedWindow() as BrowserWindow
  win.webContents.send('get-data')
}

createMenu(createWindowFunc, openFileFunc, saveFileFunc)







/**
 * 【メインプロセス】ファイルを開きます。
 * @returns {Promise<null|{textData: string, filePath: string}>}
 */
const openFile = async (): Promise<null | { textData: string, filePath: string }> => {
  const win = BrowserWindow.getFocusedWindow() as BrowserWindow

  const result = await dialog.showOpenDialog(
    win,
    // どんなダイアログを出すかを指定するプロパティ
    {
      properties: ["openFile"],
      filters: [
        {
          name: "Documents",
          // 読み込み可能な拡張子を指定
          extensions: ["txt", "html", "md", "js", "ts"],
        },
      ],
    }
  )

  // [ファイル選択]ダイアログが閉じられた後の処理
  if (result.filePaths.length > 0) {
    const filePath = result.filePaths[0];

    // テキストファイルを読み込む
    const textData = fs.readFileSync(filePath, "utf8");
    // ファイルパスとテキストデータを返却
    return {
      filePath,
      textData,
    }
  }

  // ファイル選択ダイアログで何も選択しなかった場合は、nullを返しておく
  return null
}

const selectDirectory =async (): Promise<null | {dirPath: string}> => {
  const win = BrowserWindow.getFocusedWindow() as BrowserWindow
  const result = await dialog.showOpenDialog(
    win,
    {
      properties: ['openDirectory']
    },
  )
  // [ファイル選択]ダイアログが閉じられた後の処理
  if (result.filePaths.length > 0) {
    const dirPath = result.filePaths[0];
    return {
      dirPath: dirPath,
    }
  }

  return null
}

ipcMain.handle("openFile", openFile);

ipcMain.handle("selectDirectory", selectDirectory)

ipcMain.handle('getDocumentList', getDocumentList)
