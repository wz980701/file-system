import { app, BrowserWindow } from 'electron';
import * as path from 'path';
import * as url from 'url';
import CommonWindow from './CommonWindow';

let mainWindow: Electron.BrowserWindow | null;

function createWindow() {
  if (process.env.NODE_ENV === 'development') {
    mainWindow = new CommonWindow('/login');
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
}

app.on('ready', createWindow);
app.allowRendererProcessReuse = true;