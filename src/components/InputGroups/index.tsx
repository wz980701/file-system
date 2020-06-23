import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    title: {
        textAlign: 'center',
        letterSpacing: 10,
        color: '#3f51b5',
        fontSize: 30,
        marginTop: theme.spacing(5)
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(3)
    },
    btn: {
        marginTop: theme.spacing(2)
    }
}));

const InputGroups = () => {
    const classes = useStyles();

    return (
        <Grid container direction="row" justify="center" className={classes.root}>
            <Grid xs={8} className={classes.title}>
                FILE SYSTEM
            </Grid>
            <Grid xs={6}>
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
                    />
                    <TextField 
                        variant="outlined"
                        margin="normal"
                        size="small"
                        required
                        fullWidth
                        id="password"
                        label="密码"
                        name="password"
                    />
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.btn}
                    >
                        登录
                    </Button>
                </form>
            </Grid>
        </Grid>
    )
}

export default InputGroups;