import React from 'react';
import Button from '@material-ui/core/Button';

interface propInfo {
    id: string,
    onSelect: (e: any) => void,
    btnText: string
}

const SelectFile = ({id, onSelect, btnText}: propInfo) => {
    return (
        <>
            <input
                style={{ display: 'none' }}
                onChange={onSelect}
                id={id}
                multiple
                type="file"
            />
            <label htmlFor={id}>
                <Button component="span" variant="contained" color="primary" size="small" style={{marginTop: 10, marginBottom: 10}}>
                    {btnText}
                </Button>
            </label>
        </>
    )
}

export default SelectFile;