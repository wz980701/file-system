import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CheckCircle from '@material-ui/icons/CheckCircle';
import { green } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import api from 'helpers/api';
import { getFormdata } from 'helpers/fun';
import Toast from 'components/Toast/index';
import SelectFile from 'components/SelectFile/index';

interface propInfo {
    open: boolean,
    onClose: () => void,
    id: number
}

const useStyles = makeStyles((theme) => ({
    btn: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(1)
    },
    input: {
        width: 400
    }
}));

const UploadDialog = ({ open, onClose, id }:propInfo) => {
    const classes = useStyles();

    const [fileInfo, setFileInfo] = useState<object>({});
    const [fileLoading, setFileLoading] = useState<boolean>(false);
    const [imgInfo, setImgInfo] = useState<object>({});
    const [imgLoading, setImgLoading] = useState<boolean>(false);
    const [isUpload, setIsUpload] = useState<boolean>(false);
    const [desc, setDesc] = useState<string>('');
    const [dialogInfo, setDialogInfo] = useState<object>({
        open: false,
        text: '',
        type: ''
    });

    const handleClose = () => {
        onClose();
    };

    const handleUpload = () => {
        const formdata = getFormdata({
            fileCatalogId: id,
            fileDoc: fileInfo,
            descImage: imgInfo,
            fileDescription: desc
        });
        api.uploadFile({
            data: formdata
        }).then(res => {
            setDialogInfo({
                open: true,
                text: '上传成功',
                type: 'success'
            });
            restoreData();
        }).catch(err => {
            console.log(err);
            setDialogInfo({
                open: true,
                text: '上传失败',
                type: 'error'
            });
            restoreData();
        });
    }

    const restoreData = () => { // 清空数据和状态
        setDesc('');
        setDialogInfo({});
        setFileInfo({});
        setFileLoading(false);
        setImgLoading(false);
        setIsUpload(false);
    }

    const getUploadImgInfo = (e: any) => {
        const file = e.target.files[0];
        setImgInfo(file);
        setImgLoading(true);
    }

    const getUploadFileInfo = (e: any) => {
        const file = e.target.files[0];
        setFileInfo(file);
        setFileLoading(true);
    }

    return (
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">上传文件</DialogTitle>
            <DialogContent>
            <TextField
                autoFocus
                margin="dense"
                id="name"
                label="文件描述不少于10个字"
                type="email"
                className={classes.input}
                value={desc}
                onChange={e => {setDesc(e.target.value)}}
            />
            <div>
                <SelectFile id="img-btn" onSelect={getUploadImgInfo} btnText="选择描述图片" />
                {
                    imgLoading && (
                        <div style={{ color: green[500], display: 'flex', alignItems: 'center' }}>
                            <CheckCircle fontSize="small" />
                            选择图片成功
                        </div>
                    )
                }
            </div>
            <div>
                <SelectFile id="file-btn" onSelect={getUploadFileInfo} btnText="选择文件" />
                {
                    fileLoading && (
                        <div style={{ color: green[500], display: 'flex', alignItems: 'center' }}>
                            <CheckCircle fontSize="small" />
                            选择文件成功
                        </div>
                    )
                }
            </div>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose} color="primary">
                取消
            </Button>
            {
                isUpload ? (
                    <Button color="primary" disabled>上传中</Button>
                ) : (
                    <Button onClick={handleUpload} color="primary">
                        上传
                    </Button>
                )
            }
            </DialogActions>
            <Toast dialogInfo={dialogInfo} handleClose={() => { setDialogInfo({ ...dialogInfo, open: false }) }} />
        </Dialog>
    );
}

export default UploadDialog;