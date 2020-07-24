import React, { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import InputGroups from 'components/InputGroups/index';
import { makeStyles } from '@material-ui/core';
import useDocumentTitle from '../../hooks/useDocumentTitle';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        height: '100%'
    },
    link: {
        textAlign: 'center'
    }
}));

const Login = () => {
    const classes = useStyles();

    useDocumentTitle('登录');

    return (
        <Grid container justify="center" alignItems="center" className={classes.root}>
            <Grid item xs={8}>
                <InputGroups type="login" />
                <Grid item className={classes.link}>
                    <Link href='/regist'>注册</Link>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Login;