import React from 'react';
import { useHistory, BrowserRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { BrowserWindow } from 'electron';

let win:BrowserWindow | null;

const Home = () => {
    const history = useHistory();

    function handleClick () {
        history.push('/login');
    }

    return (
        <>
            <div>home</div>
            <Button variant="contained" color="primary" onClick={handleClick}>link</Button>
        </>
    )
}

export default Home;
