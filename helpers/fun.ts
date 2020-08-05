interface FormdataType {
    [key: string]: any
}


export const getFormdata = (data: object): FormData => {
    let formdata = new FormData();
    const _formdata: FormdataType = data;
    for (let key in _formdata) {
        formdata.append(key, _formdata[key]);
    }
    return formdata;
}

export const isObjEmpty = (data: object): boolean => {
    return Object.keys(data).length === 0 ? true : false;
}

export const timestampToTime = (timestamp: number): string => {
    var date = new Date(timestamp);
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1): date.getMonth() + 1) + '-';
    var D = date.getDate() + '  ';
    var h = date.getHours() + ':';
    var m = date.getMinutes() + ':';
    var s = date.getSeconds();
    return Y + M + D + h+ m + s;
}

export const getParentNode = (node: HTMLElement | null, parentClassName: string) => {
    let current:any = node;
    while (current !== null) {
        if (current.classList.contains(parentClassName)) {
            return current;
        }
        current = current.parentNode;
    }
    return false;
}
