import React from 'react';
import Item from 'components/Item/index';
import { makeStyles, Grid, List } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: 140,
        marginBottom: 70,
        overflow: 'auto'
    }
}));

interface PropsInfo {
    list: any[],
    handleItemClick: (id: number) => void
}

const ToggleList = ({ list, handleItemClick }: PropsInfo) => {
    const classes = useStyles();

    return (
        <Grid container className={classes.root}>
            <Grid xs={12} item>
                <List component="div">
                    {list.map((fileItem: any, fileIndex: number) => (
                        <Item fileItem={fileItem} fileIndex={fileIndex} key={fileIndex} handleClick={handleItemClick} />
                    ))}
                </List>
            </Grid>
        </Grid>
    )
}

export default ToggleList;