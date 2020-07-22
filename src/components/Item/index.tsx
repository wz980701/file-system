import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import FileIcon from '@material-ui/icons/FileCopyOutlined';
import { makeStyles } from '@material-ui/core/styles';
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