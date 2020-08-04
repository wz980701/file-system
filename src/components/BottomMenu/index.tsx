import React, { MouseEvent } from 'react';
import UploadIcon from '@material-ui/icons/BackUp';
import CollectionIcon from '@material-ui/icons/Collections';
import { green, blue } from '@material-ui/core/colors';
import { makeStyles, Grid, Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        position: 'absolute',
        width: '100%',
        bottom: 0
    },
    text: {
        color: '#fff',
        fontSize: 10
    },
    item: {
        display: 'flex',
        width: '100%',
        flexDirection: 'column',
        paddingTop: theme.spacing(1)
    }
}));

interface PropsInfo {
    handleClick: (e: MouseEvent<HTMLDivElement>, type: string) => void
}

const BottomMenu = ({ handleClick }: PropsInfo) => {
    const classes = useStyles();
    return (
        <Grid container className={classes.root}>
            <Grid item xs={6}  style={{ backgroundColor: green[500] }} onClick={(e) => { handleClick(e, 'upload'); }} >
                <Button className={classes.item} size="small">
                    <div>
                        <UploadIcon style={{ color: '#fff'}} fontSize="small" />
                        <p className={classes.text}>查看上传文件</p>
                    </div>
                </Button>
            </Grid>
            <Grid item xs={6} style={{ backgroundColor: blue[500] }} onClick={(e) => { handleClick(e, 'collect'); }}>
                <Button className={classes.item} size="small">
                    <div>
                        <CollectionIcon style={{ color: '#fff' }} fontSize="small" />
                        <p className={classes.text}>查看收藏文件</p>
                    </div>
                </Button>
            </Grid>
        </Grid>
    )
}

export default BottomMenu;