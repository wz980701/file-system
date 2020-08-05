import React, { useState, MouseEvent, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles, Collapse, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import ListIcon from '@material-ui/icons/ListOutlined';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ExpandLess from '@material-ui/icons/ExpandLess';
import Item from 'components/Item/index';
import useContextMenu from '../../hooks/useContextMenu';
import { getParentNode } from 'helpers/fun';
import UploadDialog from 'components/UploadDialog/index';

interface PropsInfo {
    list: FileCatalog[],
    handleItemClick: (id: number) => void
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
    }
}));

const NavSideList = ({ list, handleItemClick }: PropsInfo) => {
    const classes = useStyles();

    const openList: any[] = Array.from({length: list.length}).fill(false);
    const [opens, setOpens] = useState<Array<boolean>>(openList);
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const [currentId, setCurrentId] = useState<number>(0);

    const clickedItem = useContextMenu([
        {
            label: '上传',
            click: () => {
                const parentElement = getParentNode(clickedItem.current, 'catalogItem');
                if (parentElement) {
                    setCurrentId(parentElement.dataset.id);
                    setOpenDialog(true);
                }
            }
        }
    ], '.catalogList', [list]);

    const handleClick = (e: MouseEvent<HTMLDivElement>, index: number) => {
        const arr = [...opens];
        arr[index] = !arr[index];
        setOpens(arr);
    }

    return (
        <Grid container className={classes.root}>
            <Grid xs={12} item>
                <List className="catalogList">
                    {
                        list.map((catalogItem, catalogIndex) => (
                            <>
                                <ListItem
                                className="catalogItem" 
                                button 
                                key={catalogIndex}
                                data-id={catalogItem.fileCatalogId}
                                onClick={(e) => { handleClick(e, catalogIndex); }}
                                >
                                    <ListItemIcon>
                                        <ListIcon fontSize="small" />
                                    </ListItemIcon>
                                    <ListItemText primary={catalogItem.fileCatalogName} />
                                    { opens[catalogIndex] ? <ExpandLess fontSize="small" /> : <ExpandMore fontSize="small" /> }
                                </ListItem>
                                <Collapse in={opens[catalogIndex]}>
                                    <List component="div">
                                        {catalogItem.fileList && catalogItem.fileList.map((fileItem: any, fileIndex: number) => (
                                            <Item fileItem={fileItem} fileIndex={fileIndex} key={fileIndex} handleClick={handleItemClick} />
                                        ))}
                                    </List>
                                </Collapse>
                            </>
                        ))
                    }
                </List>
                <UploadDialog open={openDialog} onClose={() => {setOpenDialog(false)}} id={currentId} />
            </Grid>
        </Grid>
    )
}

export default NavSideList;