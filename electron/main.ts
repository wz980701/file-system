import { app, BrowserWindow, Menu, ipcMain } from 'electron';
import * as path from 'path';
import * as url from 'url';
import CommonWindow from './CommonWindow';
import menuTemplate from './menuTemplate';

let mainWindow: Electron.BrowserWindow | null;
let rankWindow: Electron.BrowserWindow | null;
let settingWindow: Electron.BrowserWindow | null;

function createWindow() {
  if (process.env.NODE_ENV === 'development') {
    mainWindow = new CommonWindow('/login', { width: 800, height: 600 });
  } else {
    mainWindow = new CommonWindow(url.format({
      pathname: path.join(__dirname, '../index.html'),
      protocol: 'file:',
      slashes: true
    }));
  }

  mainWindow.on('close', () => {
    mainWindow = null;
  });

  ipcMain.on('open-home', () => {
    (<Electron.BrowserWindow>mainWindow).close();
    mainWindow = new CommonWindow('/', {
      autoHideMenuBar: false
    });
  })

  ipcMain.on('open-rank', (arg) => { // 打开排行榜窗口
    const config = {
      width: 800,
      height: 700,
      parent: mainWindow
    }
    rankWindow = new CommonWindow(`/${arg}Rank?config=true`, config);
    rankWindow.on('close', () => {
      rankWindow = null;
    });
  });

  ipcMain.on('open-setting', () => { // 打开设置窗口
    const config = {
      width: 600,
      height: 400,
      parent: mainWindow
    }
    settingWindow = new CommonWindow('/setting', config);
    settingWindow.on('close', () => {
      settingWindow = null;
    });
  });

  ipcMain.on('logout', () => { // 退出登录
    (<Electron.BrowserWindow>mainWindow).close();
    mainWindow = new CommonWindow('/login', { width: 800, height: 600 });
  })

  let menu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(menu);
}

app.on('ready', createWindow);
app.allowRendererProcessReuse = true;