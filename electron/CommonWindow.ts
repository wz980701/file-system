const { BrowserWindow } = require('electron');

class CommonWindow extends BrowserWindow {
    constructor (route: string, config: object = {}) { // 传入route为路由路径，config为自主添加配置
        const basicConfig = {
            width: 800,
            height: 600,
            webPreferences: {
                nodeIntegration: true
            },
            show: false
        }
        const finalConfig = { ...basicConfig, ...config }
        super(finalConfig);
        this.loadURL(`http://localhost:4000${route}`);
        this.once('ready-to-show', () => {
            this.show();
        });
    }
}

export default CommonWindow;
