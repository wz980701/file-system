import { app, BrowserWindow, Menu, ipcMain } from 'electron';
import * as path from 'path';
import * as url from 'url';
import CommonWindow from './CommonWindow';
import menuTemplate from './menuTemplate';

let mainWindow: Electron.BrowserWindow | null;
let rankWindow: Electron.BrowserWindow | null;

function createWindow() {
  if (process.env.NODE_ENV === 'development') {
    mainWindow = new CommonWindow('/login', { width: 800, height: 600 });
    // mainWindow = new CommonWindow('/');
  } else {
    mainWindow = new CommonWindow(url.format({
        pathname: path.join(__dirname, '../index.html'),
        protocol: 'file:',
        slashes: true
    }));
  }
  
  mainWindow.on('closed', () => {
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
    rankWindow = new CommonWindow(`/${arg}Rank`, config);
    rankWindow.on('closed', () => {
      rankWindow = null;
    });
  });

  let menu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(menu);
}

app.on('ready', createWindow);
app.allowRendererProcessReuse = true;