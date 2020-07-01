import React, { useState, MouseEvent } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles, Collapse } from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import ListIcon from '@material-ui/icons/ListOutlined';
import FileIcon from '@material-ui/icons/FileCopyOutlined';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';

interface PropsInfo {
    list: FileCatalog[]
}

interface FileCatalog {
    fileCatalogId: number,
    fileCatalogName: string,
    fileList: any[]
}

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: 140,
        marginBottom: 70,
        overflow: 'auto'
    },
    item: {
        wordWrap: 'break-word',
        wordBreak: 'break-all',
        overflow: 'hidden'
    }
}));

const NavSideList = ({ list }: PropsInfo) => {
    const classes = useStyles();

    const openList: any[] = Array.from({length: list.length}).fill(false);
    const [opens, setOpens] = useState<Array<boolean>>(openList);

    const handleClick = (e: MouseEvent<HTMLDivElement>, index: number) => {
        const arr = [...opens];
        arr[index] = !arr[index];
        setOpens(arr);
    }

    return (
        <Grid container className={classes.root}>
            <Grid xs={12} item>
                <List>
                    {list.map((catalogItem, catalogIndex) => (
                        <>
                            <ListItem button key={catalogIndex} onClick={(e) => { handleClick(e, catalogIndex); }}>
                                <ListItemIcon>
                                    <ListIcon fontSize="small" />
                                </ListItemIcon>
                                <ListItemText primary={catalogItem.fileCatalogName} className={classes.item} />
                                { opens[catalogIndex] ? <ExpandLess fontSize="small" /> : <ExpandMore fontSize="small" /> }
                            </ListItem>
                            <Collapse in={opens[catalogIndex]}>
                                <List component="div">
                                    {catalogItem.fileList && catalogItem.fileList.map((fileItem, fileIndex) => (
                                        <ListItem button key={fileIndex} data-id={fileItem.fileId}>
                                            <ListItemIcon>
                                                <FileIcon fontSize="small" />
                                            </ListItemIcon>
                                            <ListItemText primary={fileItem.fileName} className={classes.item} />
                                        </ListItem>
                                    ))}
                                </List>
                            </Collapse>
                        </>
                    ))}
                </List>
            </Grid>
        </Grid>
    )
}

export default NavSideList;