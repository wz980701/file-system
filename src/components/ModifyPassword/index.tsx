import React, { useState } from 'react';
import { makeStyles, Button, TextField } from '@material-ui/core';
import api from 'helpers/api';
import { getFormdata } from 'helpers/fun';

const useStyles = makeStyles((theme) => ({
    root: {  
    },
    button: {
        marginTop: theme.spacing(2)
    }
}));

interface propInfo {
    onShow: (text: string, type: string) => void 
}

const ModifyPassword = ({ onShow }: propInfo) => {
    const classes = useStyles();

    const [prePassword, setPrePassword] = useState<string>('');
    const [newPassword, setNewPassword]= useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');

    const modifyPassword = () => {
        if (newPassword !== confirmPassword) {
            onShow('输入密码不一致', 'error');
            return;
        }
        const formdata = getFormdata({
            prePassword,
            newPassword
        });
        api.userModifyPassword({
            data: formdata
        }).then((data: object) => {
            onShow('修改密码成功', 'success');
        }).catch(err => {
            console.log(err);
            onShow('修改密码失败，请重新输入', 'error');
        });
    }

    return (
        <div className={classes.root}>
            <TextField fullWidth label="原密码" value={prePassword} onChange={e => {setPrePassword(e.target.value)}} />
            <TextField fullWidth label="新密码" value={newPassword} onChange={e => {setNewPassword(e.target.value)}} />
            <TextField fullWidth label="再输一遍新密码" value={confirmPassword} onChange={e => {setConfirmPassword(e.target.value)}} />
            <Button 
            variant="contained" 
            color="primary" 
            className={classes.button}
            onClick={modifyPassword}
            >提交</Button>
        </div>
    )
}

export default ModifyPassword;