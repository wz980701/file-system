import React, { useState } from 'react';
import { makeStyles, Button, Avatar } from '@material-ui/core';
import { getFormdata } from 'helpers/fun';
import api from 'helpers/api';
import SelectFile from 'components/SelectFile/index';

const useStyles = makeStyles((theme) => ({
    root: {
        textAlign: 'center'
    },
    img: {
        width: 100,
        height: 100,
        left: '50%',
        marginLeft: -50,
        marginBottom: theme.spacing(2)
    }
}));

interface propInfo {
    onShow: (text: string, type: string) => void 
}

const ModifyPortrait = ({ onShow }: propInfo) => {
    const classes = useStyles();
    const [imgInfo, setImgInfo] = useState<any>({});
    const [loading, setLoading] = useState<boolean>(false);

    const getUploadImgInfo = (e: any) => {
        const file = e.target.files[0];
        setImgInfo(file);
        setLoading(true);
    }

    const onUpload = (e: any) => {
        const formdata = getFormdata({
            portrait: imgInfo
        });
        api.modifyUserPortrait({
            data: formdata
        }).then(res => {
            console.log(res);
            onShow('上传成功', 'success');
            setLoading(false);
        }).catch(err => {
            console.log(err);
            onShow('上传失败', 'error');
        })
    }

    return (
        <div className={classes.root}>
            <Avatar src={imgInfo.path} className={classes.img} />
            {
                loading ? (
                    <Button onClick={onUpload}>
                        上传
                    </Button>
                ) : (
                    <SelectFile id="portrait-btn" onSelect={getUploadImgInfo} btnText="选择图片" />
                )
            }
        </div>
    )
}

export default ModifyPortrait;