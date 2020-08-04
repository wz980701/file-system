import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import ModifyPassword from 'components/ModifyPassword/index';
import ModifyPortrait from 'components/ModifyPortrait/index';
import DownloadPath from 'components/DownloadPath/index';
import Toast from 'components/Toast/index';

function TabPanel(props: any) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
}));

const Setting = () => {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const [dialogInfo, setDialogInfo] = useState<object>({
        open: false,
        text: '',
        type: '' 
    });

    const handleChange = (event: any, newValue: number) => {
        setValue(newValue);
    };

    const handleShowToast = (text: string, type: string) => {
        setDialogInfo({
            open: true,
            text,
            type
        });
    }

    useDocumentTitle('设置');
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                    <Tab label="修改密码" />
                    <Tab label="修改头像" />
                    <Tab label="设置下载路径" />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                <ModifyPassword onShow={handleShowToast} />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <ModifyPortrait onShow={handleShowToast} />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <DownloadPath />
            </TabPanel>
            <Toast dialogInfo={dialogInfo} handleClose={ () => { setDialogInfo({...dialogInfo, open: false}) } } />
        </div>
    )
}



export default Setting;