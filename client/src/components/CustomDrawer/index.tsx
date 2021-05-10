import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import AddCircleOutlined from '@material-ui/icons/AddCircleOutlined';

const drawerWidth = 300;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      width: "98%",
      maxWidth:"1024px",
      margin:"5px auto",
      overflowX:"hidden"
    },
    menuButton: {
      width:"100px"
    },
    hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
      // flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
      overflowX:"hidden"
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end',
    }
  }),
);

const CustomDrawer:React.FC<any> = ({component}) => {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
       <Button
        variant="outlined"
        color="primary"
        className={clsx(classes.menuButton, open && classes.hide)}
        onClick={handleDrawerOpen}
        startIcon={<AddCircleOutlined />}
        >
        Add 
      </Button>

      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
          {
            component
          }
      </Drawer>
    </div>
  );
}

export default CustomDrawer