interface FormdataType {
    [key: string]: any
}

export default {
    getFormdata (data: object): FormData {
        let formdata = new FormData();
        const _formdata: FormdataType = data;
        for (let key in _formdata) {
            formdata.append(key, _formdata[key]);
        }
        return formdata;
    }
}