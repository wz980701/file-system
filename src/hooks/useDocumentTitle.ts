import React, { useEffect } from 'react';

const useDocumentTitle = (title: string) => { // 修改html标题
    useEffect(() => {
        document.title = title;
    },
    [title]);
}

export default useDocumentTitle;