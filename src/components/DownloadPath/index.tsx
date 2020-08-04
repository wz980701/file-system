import React, { useState, useEffect } from 'react';
import { remote } from 'electron';
import { makeStyles, TextField, Button } from '@material-ui/core';
import Store from 'electron-store';

const store = new Store();

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center'
    },
    button: {
        marginTop: theme.spacing(2)
    }
}));

const DownloadPath = () => {
    const classes = useStyles();
    const [path, setPath] = useState<string>('');

    useEffect(() => {
        setPath(store.get('fileCatalogPath'));
    }, []);

    const selectDialog = () => {
        remote.dialog.showOpenDialog({
            properties: ['openDirectory'],
            message: '选择文件的存储路径'
        }).then(path => {
            const paths = path.filePaths;
            if (Array.isArray(paths)) {
                setPath(paths[0]);
                store.set({
                    fileCatalogPath: paths[0]
                });
            }
        });
    }

    return (
        <div className={classes.root}>
            <TextField fullWidth label="文件夹名" value={path} onChange={e => {setPath(e.target.value)}} />
            <Button variant="contained" color="primary" size="small" onClick={selectDialog}>选择</Button>
        </div>
    )
}

export default DownloadPath;