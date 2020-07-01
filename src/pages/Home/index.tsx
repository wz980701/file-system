import React, {useEffect, useState, MouseEvent} from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Store from 'electron-store';
import FileSearch from 'components/FileSearch/index';
import NavSideList from 'components/NavSideList/index';
import Toast from 'components/Toast/index';
import api from 'helpers/api';
import { fileBaseURL } from 'env/config';
import BottomMenu from '@/components/BottomMenu';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    position: 'relative'
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeaderBox: {
    position: 'absolute',
    width: '100%',
    top: 0,
    zIndex: 999
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
    marginTop: theme.spacing(3)
  },
  userHeader: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    paddingLeft: theme.spacing(2)
  },
  userName: {
    marginLeft: theme.spacing(3),
    fontSize: 18
  },
  searchBox: {
    width: '100%',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    display: 'flex',
    justifyContent: 'center'
  }
}));

const store = new Store();

export default function PersistentDrawerLeft() {
  const classes = useStyles();
  const theme = useTheme();
  const { userName, userPortrait } = store.get('userInfo');
  const [open, setOpen] = useState<boolean>(true); // 侧栏显示
  const [toggle, setToggle] = useState<boolean>(false); // 搜索，收藏时的列表显示
  const [list, setList] = useState<any[]>([]);
  const [dialogInfo, setDialogInfo] = useState<object>({
      open: false,
      text: '',
      type: '' 
  });

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const onToggleClose = () => {
    setToggle(false);
  }

  const onBottomMenuClick = (e: MouseEvent<HTMLDivElement>, type: string) => {
    switch (type) {
      case 'upload':
        showUploadList();
        break;
      case 'collect':
        showCollectList();
        break;
      case 'add':
        AddCatalog();
        break;
      default:
        return;
    }
  }

  const showUploadList = () => {
    console.log('upload');
  }

  const showCollectList = () => {
    console.log('collect');
  }

  const AddCatalog = () => {
    console.log('add');
  }

  const handleDrawerClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    initData();
  }, []);

  const initData = () => {
    api.getFileCatalogList().then((res) => {
      let list = [...res.fileCatalogList];
      for (let index in list) {
        const item = list[index];
        const id = item.fileCatalogId;
        api.getFileList({
          params: {
            fileCatalogId: id,
            page: 1,
            limit: 100
          }
        }).then((res) => {
          const fileList = res.fileUserViewList ? res.fileUserViewList : [];
          list[index] = {...item, fileList};
        }).catch((err) => {
          console.log(err);
          setDialogInfo({
            open: true,
            text: '获取文件列表数据失败',
            type: 'error'
          });
        });
        setList(list);
      }
    }).catch((err) => {
      console.log(err);
      setDialogInfo({
        open: true,
        text: '获取文档列表数据失败',
        type: 'error'
      });
    })
  }

  const onSearch = (val: string) => {
    console.log(val);
    setToggle(true);
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Persistent drawer
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeaderBox}>
          <div className={classes.drawerHeader}>
            <div className={classes.userHeader}>
              <Avatar alt="Avatar" src={`${fileBaseURL}${userPortrait}`} />
              <p className={classes.userName}>{userName}</p>
            </div>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </div>
          <Divider />
          <div className={classes.searchBox}>
            <FileSearch handleSearch={onSearch} />
          </div>
          <Divider />
        </div>
        <NavSideList list={list} />
        <BottomMenu handleClick={onBottomMenuClick} />
        <Drawer 
          anchor="bottom"
          variant="persistent"
          open={toggle}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <IconButton onClick={onToggleClose}>
              <ExpandMore />
          </IconButton>
        </Drawer>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
      </main>
      <Toast dialogInfo={dialogInfo} handleClose={ () => { setDialogInfo({...dialogInfo, open: false}) } } />
    </div>
  );
}