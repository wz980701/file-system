const { BrowserWindow } = require('electron');

class CommonWindow extends BrowserWindow {
    constructor (route: string, config: object = {}) { // 传入route为路由路径，config为自主添加配置
        const basicConfig = {
            width: 1200,
            height: 800,
            webPreferences: {
                nodeIntegration: true,
                webSecurity: false
            },
            show: false,
            autoHideMenuBar: true
        }
        const finalConfig = { ...basicConfig, ...config }
        super(finalConfig);
        this.loadURL(`http://localhost:8080${route}`);
        this.once('ready-to-show', () => {
            this.show();
        });
    }
    reloadURL (route: string) {
        this.loadURL(`http://localhost:8080${route}`);
    }
}

export default CommonWindow;
