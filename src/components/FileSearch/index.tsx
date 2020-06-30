import React, { useState, useEffect, ChangeEvent } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core';
import useKeyEnter from '../../hooks/useKeyEnter';

const useStyles = makeStyles((theme) => ({
    text: {
        width: '90%'
    }
}));

interface PropsInfo {
    handleSearch: (val: string) => void
}

const FileSearch = ({ handleSearch }: PropsInfo) => {
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
        }
    }, [isActive, isEnter]);

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