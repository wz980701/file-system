import React, { useState, useEffect } from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DownloadIcon from '@material-ui/icons/GetApp';
import { makeStyles } from '@material-ui/core/styles';
import { green, blue, grey } from '@material-ui/core/colors';
import { fileBaseURL } from 'env/config';
import { timestampToTime } from 'helpers/fun';

interface PropsInfo {
    fileInfo: any
}

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: 56
    },
    fileImg: {
        width: '90%'
    },
    userInfo: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    userName: {
        marginLeft: theme.spacing(2)
    },
    small: {
        width: theme.spacing(4),
        height: theme.spacing(4)
    },
    buttonGroups: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: theme.spacing(2)
    },
    desc: {
        marginTop: theme.spacing(2)
    },
    downloadBtn: {
        width: '70%',
        marginTop: theme.spacing(4)
    },
    commentBox: {
        marginTop: theme.spacing(5),
        marginLeft: 40
    },
    inputBox: {
        display: 'flex',
        width: '100%'
    },
    commentText: {
        width: '100%',
        marginTop: 40
    },
    commentList: {
        width: '100%',
        marginTop: theme.spacing(3)
    },
    commentItem: {
        display: 'flex',
        width: '100%',
        position: 'relative',
        alignItems: 'center',
        '& p': {
            textAlign: 'left',
            marginLeft: 30
        }
    },
    avatar: {
        width: 70,
        height: 70
    }
}));

const MainContent = ({ fileInfo }: PropsInfo) => {
    const classes = useStyles();

    const [commentText, setCommentText] = useState<string>('');

    return (
        <Container className={classes.root}>
            <Grid container>
                <Grid item xs={8}>
                    <img src={fileBaseURL + fileInfo.fileImagePath} alt="文件配图" className={classes.fileImg} />
                </Grid>
                <Grid item xs={4}>
                    <div className={classes.userInfo}>
                        <Avatar src={fileBaseURL + fileInfo.userPortrait} className={classes.small} />
                        <p className={classes.userName}>{fileInfo.userName}</p>
                    </div>
                    <div className={classes.buttonGroups}>
                        <Button color="primary" size="small">已收藏</Button>
                        <Button color="secondary" size="small">点赞1</Button>
                    </div>
                    <p className={classes.desc}>{fileInfo.fileBriefDescription}</p>
                    <Button
                        variant="contained"
                        style={{ color: '#fff', backgroundColor: green[500] }}
                        className={classes.downloadBtn}
                        startIcon={<DownloadIcon />}
                    >
                        D O W N L O A D
                    </Button>
                </Grid>
                <Grid item className={classes.commentBox} xs={12}>
                    <p style={{textAlign: 'left'}}>评论</p>
                    <div className={classes.inputBox}>
                        <TextField
                            label="对该文件评论几句吧"
                            multiline
                            rowsMax={4}
                            value={commentText}
                            style={{flex: 1}}
                            onChange={(e) => {setCommentText(e.target.value)}}
                        />
                        <Button
                            size="small"
                            style={{ color: '#fff', backgroundColor: blue[500], marginLeft: 20 }}
                        >
                            发布
                        </Button>
                    </div>  
                    <div className={classes.commentText}>
                        <p style={{textAlign: 'left'}}>共{fileInfo.commentAmount}条</p>
                        <div className={classes.commentList}>
                            {
                                fileInfo.commentList.map((commentItem: any, commentIndex: number) => (
                                    <div className={classes.commentItem}>
                                        <Avatar src={fileBaseURL + commentItem.userPortrait} variant="rounded" className={classes.avatar} />
                                        <div>
                                            <p style={{color: blue[300]}}>{commentItem.userName}</p>
                                            <p>{commentItem.commentContent}</p>
                                            <p style={{color: grey[400]}}>{timestampToTime(commentItem.commentTime)}</p>
                                        </div>
                                        <Button 
                                            color="primary" 
                                            size="small"
                                            style={{position: 'absolute', right: 20, bottom: 20}}
                                        >删除</Button>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </Grid>
            </Grid>
        </Container>
    )
} 

export default MainContent;