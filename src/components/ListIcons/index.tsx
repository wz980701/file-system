import React from 'react';
import ListIcon from '@material-ui/icons/ListOutlined';
import ZipIcon from '@material-ui/icons/Description';
import FileIcon from '@material-ui/icons/Attachment';
import ImgIcon from '@material-ui/icons/Image';
import MediaIcon from '@material-ui/icons/PlayCircleFilled';
import SettingsApplicationsIcon from '@material-ui/icons/SettingsApplications';
import TimeIcon from '@material-ui/icons/timer';
import { green, blue, orange, yellow, purple, red, brown } from '@material-ui/core/colors';

interface PropsInfo {
    type: string
}

const ListIcons = ({ type }: PropsInfo) => {
    return (
        <>
            {
                ( () => {
                    switch (type) {
                        case 'zip' || 'rar': // 压缩包
                            return <ZipIcon fontSize="small" style={{ color: blue[500] }} />;
                            break;
                        case 'txt' || 'doc' || 'docx' || 'html' || 'pdf':
                            return <FileIcon fontSize="small" style={{ color: green[500] }} />;
                            break;
                        case 'gif' || 'jpg' || 'png':
                            return <ImgIcon fontSize="small" style={{ color: yellow[500] }} />;
                            break;
                        case 'mp3' || 'avi' || 'mp4':
                            return <MediaIcon fontSize="small" style={{ color: orange[500] }} />;
                            break;
                        case 'exe':
                            return <SettingsApplicationsIcon fontSize="small" style={{ color: purple[500] }} />;
                            break;
                        case 'tmp':
                            return <TimeIcon fontSize="small" style={{ color: red[500] }} />;
                            break;
                        default:
                            return <ListIcon fontSize="small" style={{ color: brown[500] }} />;
                    }
                })()
            }
        </>
    )
}

export default ListIcons;