import { useEffect, useRef } from 'react';

import { remote } from 'electron';

const { Menu, MenuItem } = remote;

const useContextMenu = (itemArr: Array<object>, targetSelector: string, dep: Array<any>) => {    // 右击显示菜单
    let clickedElement = useRef(null);
    useEffect(() => {
        const menu = new Menu();
        itemArr.forEach((item: any) => {
            menu.append(new MenuItem(item));
        })
        const handleContextMenu = (e:any) => {
            if (document.querySelector(targetSelector)?.contains(e.target)) {
                clickedElement.current = e.target;
                menu.popup({ window: remote.getCurrentWindow() });
            }
        }
        window.addEventListener('contextmenu', handleContextMenu);
        return () => {
            window.removeEventListener('contextmenu', handleContextMenu);
        }
    }, dep);
    return clickedElement;
}

export default useContextMenu;