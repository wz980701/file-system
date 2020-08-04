import React, { useState, useEffect, ChangeEvent } from 'react';
import { makeStyles, TextField } from '@material-ui/core';
import useKeyEnter from '../../hooks/useKeyEnter';

const useStyles = makeStyles((theme) => ({
    text: {
        width: '90%'
    }
}));

interface PropsInfo {
    handleSearch: (val: string) => void
    handleToggleClose: () => void
}

const FileSearch = ({ handleSearch, handleToggleClose }: PropsInfo) => {
    const classes = useStyles();
    const [textVal, setTextVal] = useState<string>('');
    const [isActive, setActive] = useState<boolean>(false);

    const inputOnActive = () => { // 若输入框获得焦点
        setActive(true);
    }

    const inputOnBlur = () => { // 若输入框失去焦点
        setActive(false);
    }

    const inputOnChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setTextVal(e.target.value);
    }

    const isEnter = useKeyEnter();

    useEffect(() => {
        if (isActive && isEnter && textVal.length > 0) {
            handleSearch(textVal);
        } else {
            handleToggleClose();
        }
    }, [isActive, isEnter, textVal.length]);

    return (
        <TextField 
            placeholder="搜索"
            variant="outlined"
            className={classes.text}
            value={textVal}
            size="small"
            onFocus={inputOnActive}
            onBlur={inputOnBlur}
            onChange={inputOnChange}
        />
    )
}

export default FileSearch;