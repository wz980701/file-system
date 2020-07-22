import React from 'react';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import FileIcon from '@material-ui/icons/FileCopyOutlined';
import Item from 'components/Item/index';
import { makeStyles } from '@material-ui/core/styles';

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