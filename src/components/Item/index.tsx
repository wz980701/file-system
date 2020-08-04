import React from 'react';
import FileIcon from '@material-ui/icons/FileCopyOutlined';
import { makeStyles, ListItemText, ListItem, ListItemIcon } from '@material-ui/core';
// import ListIcons from 'components/ListIcons/index';

const useStyles = makeStyles((theme) => ({
    item: {
        wordWrap: 'break-word',
        wordBreak: 'break-all',
        overflow: 'hidden'
    }
}));

interface PropsInfo {
    fileItem: any,
    fileIndex: number,
    handleClick: (id: number) => void
}

const Item = ({ fileItem, fileIndex, handleClick }: PropsInfo) => {
    const classes = useStyles();

    return (
        <ListItem button key={fileIndex} onClick={e => { handleClick(fileItem.fileId); }}>
            <ListItemIcon>
                <FileIcon />
            </ListItemIcon>
            <ListItemText primary={fileItem.fileName} className={classes.item} />
        </ListItem>
    )
}

export default Item;