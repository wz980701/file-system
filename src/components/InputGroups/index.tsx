import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core';
import api from 'helpers/api';
import { getFormdata } from 'helpers/fun';
import { ipcRenderer } from 'electron';

import Toast from 'components/Toast/index';

import Store from 'electron-store';

import useEntered from '../../hooks/useKeyEnter';

const store = new Store();

const useStyles = makeStyles((theme) => ({
    title: {
        textAlign: 'center',
        letterSpacing: 10,
        color: '#3f51b5',
        fontSize: 30
    },
    form: {
        marginTop: theme.spacing(3)
    },
    btn: {
        marginTop: theme.spacing(2)
    },
    formBox: {
        textAlign: 'center'
    }
}));

interface propInfo {
    type: string
}

const InputGroups = ({ type }: propInfo) => {
    const classes = useStyles();
    const isEnter = useEntered();
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [dialogInfo, setDialogInfo] = useState<object>({
        open: false,
        text: '',
        type: '' 
    });

    const handleClick = () => {
        if (type === 'login') {
            getLogin();
        } else {
            getRegist();
        }
    }

    useEffect(() => {
        if (isEnter) {
            handleClick();
        }
    }, [isEnter]);

    const getLogin = () => {
        const formdata = getFormdata({
            'userName': username,
            'userPassword': password
        });
        api.userLogin({
            data: formdata
        }).then((data: object) => {
            setDialogInfo({
                open: true,
                text: '登录成功',
                type: 'success'
            });
            store.set({
                userInfo: Object.assign({}, data)
            });
            sendMessage();
        }).catch((err: any) => {
            console.log(err);
            setDialogInfo({
                open: true,
                text: '登录失败，请确认输入信息有否有误',
                type: 'error'
            });
        })
    }

    const getRegist = () => {
        const formdata = getFormdata({
            'userName': username,
            'userPassword': password
        });
        api.userRegister({
            data: formdata
        }).then(() => {
            setDialogInfo({
                open: true,
                text: '注册成功，请跳转至登录页重新登录',
                type: 'success'
            });
        }).catch((err: any) => {
            console.log(err);
            setDialogInfo({
                open: true,
                text: '注册失败',
                type: 'error'
            });
        });
    }

    const sendMessage = () => {
        ipcRenderer.send('open-home');
    }

    return (
        <>
            <Grid item xs={12} className={classes.title}>
                    FILE SYSTEM
            </Grid>
            <Grid item className={classes.formBox}>
                <form className={classes.form} noValidate autoComplete="off">
                    <TextField 
                        variant="outlined" 
                        margin="normal"
                        size="small"
                        required
                        fullWidth
                        id="username"
                        label="用户名"
                        name="username"
                        autoFocus
                        value={username}
                        onChange={(e) => {setUsername(e.target.value)}}
                    />
                    <TextField 
                        variant="outlined"
                        margin="normal"
                        type="password"
                        size="small"
                        required
                        fullWidth
                        id="password"
                        label="密码"
                        name="password"
                        value={password}
                        onChange={(e) => {setPassword(e.target.value)}}
                    />
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.btn}
                        onClick={handleClick}
                    >
                        { type === 'login' ? '登录' : '注册' }
                    </Button>
                </form>
            </Grid>
            <Toast dialogInfo={dialogInfo} handleClose={ () => { setDialogInfo({...dialogInfo, open: false}) } } />
        </>
    )
}

export default InputGroups;