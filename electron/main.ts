import { app, BrowserWindow, ipcMain } from 'electron';
import * as path from 'path';
import * as url from 'url';
import CommonWindow from './CommonWindow';

let mainWindow: Electron.BrowserWindow | null;

function createWindow() {
  if (process.env.NODE_ENV === 'development') {
    // mainWindow = new CommonWindow('/login', { width: 800, height: 600 });
    mainWindow = new CommonWindow('/');
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
    mainWindow = new CommonWindow('/');
  })
}

app.on('ready', createWindow);
app.allowRendererProcessReuse = true;