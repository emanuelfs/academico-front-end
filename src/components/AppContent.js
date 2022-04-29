import React, {
    useState,
} from 'react';
import {
    AppBar,
    CssBaseline,
    Divider,
    Drawer,
    Hidden,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Typography,
} from '@material-ui/core';
import {
    Home as HomeIcon,
    Face as FaceIcon,
    Work as WorkIcon,
    Menu as MenuIcon,
} from '@material-ui/icons';
import {
    makeStyles,
    useTheme,
} from '@material-ui/core/styles';

import Students from './Students';
import StudentForm from './StudentForm';

const drawerWidth = 240;

const CONTENT_TYPE_HOME = 'H';
const CONTENT_TYPE_TEACHER = 'T';
const CONTENT_TYPE_STUDENT = 'S';
const CONTENT_TYPE_STUDENT_FORM = 'SF';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    appBar: {
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
        },
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));

function AppContent(props) {
    const {
        window,
    } = props;

    const classes = useStyles();
    const theme = useTheme();

    const [mobileOpen, setMobileOpen] = useState(false);
    const [contentType, setContentType] = useState(CONTENT_TYPE_HOME);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleOnStudentsNewButtonClick = () => {
        setContentType(CONTENT_TYPE_STUDENT_FORM);
    };

    const handleOnStudentFormSave = () => {
        alert('Aluno cadastro com sucesso');
    };

    const getContent = () => {
        switch (contentType) {
            case CONTENT_TYPE_STUDENT:
                return <Students onNewButtonClick={handleOnStudentsNewButtonClick} />;
            case CONTENT_TYPE_STUDENT_FORM:
                return <StudentForm onSave={handleOnStudentFormSave} />;
            case CONTENT_TYPE_TEACHER:
                return 'Professor';
            default:
                return 'Bem-vindo';
        }
    }

    const drawer = (
        <div>
            <div className={classes.toolbar} />
            <Divider />
            <List>
                <ListItem
                    button
                    onClick={() => {
                        setContentType(CONTENT_TYPE_HOME);
                    }}
                >
                    <ListItemIcon>
                        <HomeIcon />
                    </ListItemIcon>
                    <ListItemText primary='Início' />
                </ListItem>
                <ListItem
                    button
                    onClick={() => {
                        setContentType(CONTENT_TYPE_STUDENT);
                    }}
                >
                    <ListItemIcon>
                        <FaceIcon />
                    </ListItemIcon>
                    <ListItemText primary='Alunos' />
                </ListItem>
                <ListItem
                    button
                    onClick={() => {
                        setContentType(CONTENT_TYPE_TEACHER);
                    }}
                >
                    <ListItemIcon>
                        <WorkIcon />
                    </ListItemIcon>
                    <ListItemText primary='Professores' />
                </ListItem>
            </List>
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        className={classes.menuButton}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        Responsive drawer
                    </Typography>
                </Toolbar>
            </AppBar>
            <nav className={classes.drawer} aria-label="mailbox folders">
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Hidden smUp implementation="css">
                    <Drawer
                        container={container}
                        variant="temporary"
                        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
                <Hidden xsDown implementation="css">
                    <Drawer
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        variant="permanent"
                        open
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
            </nav>
            <main className={classes.content}>
                <div className={classes.toolbar} />
                {getContent()}
            </main>
        </div>
    );
}

export default AppContent;
