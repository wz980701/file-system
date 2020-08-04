import { app, shell, ipcMain } from 'electron';
import api from '../helpers/api';

let template: any = [{
    label: '文件',
    submenu: [{
        label: '新建',
        accelerator: 'CmdOrCtrl+N',
        click: (menuItem: any, browserWindow: any, event: any) => {
            browserWindow.webContents.send('create-new-file')
        }
    }, {
        label: '保存',
        accelerator: 'CmdOrCtrl+S',
        click: (menuItem: any, browserWindow: any, event: any) => {
            browserWindow.webContents.send('save-edit-file')
        }
    }, {
        label: '搜索',
        accelerator: 'CmdOrCtrl+F',
        click: (menuItem: any, browserWindow: any, event: any) => {
            browserWindow.webContents.send('search-file')
        }
    }, {
        label: '导入',
        accelerator: 'CmdOrCtrl+O',
        click: (menuItem: any, browserWindow: any, event: any) => {
            browserWindow.webContents.send('import-file')
        }
    }]
},
{
    label: '编辑',
    submenu: [
        {
            label: '撤销',
            accelerator: 'CmdOrCtrl+Z',
            role: 'undo'
        }, {
            label: '重做',
            accelerator: 'Shift+CmdOrCtrl+Z',
            role: 'redo'
        }, {
            type: 'separator'
        }, {
            label: '剪切',
            accelerator: 'CmdOrCtrl+X',
            role: 'cut'
        }, {
            label: '复制',
            accelerator: 'CmdOrCtrl+C',
            role: 'copy'
        }, {
            label: '粘贴',
            accelerator: 'CmdOrCtrl+V',
            role: 'paste'
        }, {
            label: '全选',
            accelerator: 'CmdOrCtrl+A',
            role: 'selectall'
        }
    ]
},
{
    label: '排行榜',
    submenu: [
        {
            label: '下载排行榜',
            click: () => {
                ipcMain.emit('open-rank', 'download');
            }
        },
        {
            label: '热度排行榜',
            click: () => {
                ipcMain.emit('open-rank', 'hot');
            }
        }
    ]
},
{
    label: '设置',
    click: () => {
        ipcMain.emit('open-setting');
    }
},
{
    label: '视图',
    submenu: [
        {
            label: '刷新当前页面',
            accelerator: 'CmdOrCtrl+R',
            click: (item: any, focusedWindow: any) => {
                if (focusedWindow)
                    focusedWindow.reload();
            }
        },
        {
            label: '切换全屏幕',
            accelerator: (() => {
                if (process.platform === 'darwin')
                    return 'Ctrl+Command+F';
                else
                    return 'F11';
            })(),
            click: (item: any, focusedWindow: any) => {
                if (focusedWindow)
                    focusedWindow.setFullScreen(!focusedWindow.isFullScreen());
            }
        },
        {
            label: '切换开发者工具',
            accelerator: (function () {
                if (process.platform === 'darwin')
                    return 'Alt+Command+I';
                else
                    return 'Ctrl+Shift+I';
            })(),
            click: (item: any, focusedWindow: any) => {
                if (focusedWindow)
                    focusedWindow.toggleDevTools();
            }
        },
    ]
},
{
    label: '窗口',
    role: 'window',
    submenu: [{
        label: '最小化',
        accelerator: 'CmdOrCtrl+M',
        role: 'minimize'
    }, {
        label: '关闭',
        accelerator: 'CmdOrCtrl+W',
        role: 'close'
    }]
},
{
    label: '帮助',
    role: 'help',
    submenu: [
        {
            label: '学习更多',
            click: () => { shell.openExternal('http://electron.atom.io') }
        },
    ]
},
{
    label: '退出登录',
    click: () => {
        ipcMain.emit('logout');
    }
}
]

export default template;