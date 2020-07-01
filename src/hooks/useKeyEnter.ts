import React, { useState, useEffect, KeyboardEvent } from 'react';

const useKeyEnter = () => {
    const [keyEntered, setKeyEntered] = useState<boolean>(false);

    const keyDownHandler = ({ keyCode }: any) => {
        if (keyCode === 13) {
            setKeyEntered(true);
        }
    }

    const keyUpHandler = ({ keyCode }: any) => {
        if (keyCode === 13) {
            setKeyEntered(false);
        }
    }

    useEffect(() => {
        document.addEventListener('keydown', keyDownHandler);
        document.addEventListener('keyup', keyUpHandler);
        return () => {
            document.removeEventListener('keydown', keyDownHandler);
            document.removeEventListener('keyup', keyUpHandler);
        }
    }, []);
    return keyEntered;
}

export default useKeyEnter;