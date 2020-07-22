import React, { useState, MouseEvent } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles, Collapse } from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListIcon from '@material-ui/icons/ListOutlined';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import Item from 'components/Item/index';

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

    const handleClick = (e: MouseEvent<HTMLDivElement>, index: number) => {
        const arr = [...opens];
        arr[index] = !arr[index];
        setOpens(arr);
    }

    return (
        <Grid container className={classes.root}>
            <Grid xs={12} item>
                <List>
                    {
                        list.map((catalogItem, catalogIndex) => (
                            <>
                                <ListItem button key={catalogIndex} onClick={(e) => { handleClick(e, catalogIndex); }}>
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
            </Grid>
        </Grid>
    )
}

export default NavSideList;