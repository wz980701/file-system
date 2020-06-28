import React from 'react';
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';

interface DialogInfo {
    open?: boolean,
    text?: string,
    type?: "success" | "error" | "info" | "warning" | undefined
}

interface PropsInfo {
    dialogInfo: DialogInfo,
    handleClose: () => void
}

const Toast = (props: PropsInfo) => {
    const { dialogInfo, handleClose } = props;
    return (
        <Snackbar 
            open={dialogInfo.open}
            autoHideDuration={3000} 
            onClose={handleClose}
        >
            <Alert onClose={handleClose} severity={dialogInfo.type}>
                {dialogInfo.text}
            </Alert>
        </Snackbar>
    )
}

export default Toast;