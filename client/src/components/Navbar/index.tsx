import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle'
import Menu from '@material-ui/core/Menu';
import Avatar from '@material-ui/core/Avatar';
import MenuItem from '@material-ui/core/MenuItem';
import React from 'react';


import {Auth} from '../../util/auth'
import { useHistory } from 'react-router-dom'
import {useAuth} from '../../context/AuthContextProvider'
import { useCurrency } from '../../context/CurrencyContextProvider';
import { Currency } from '../../util/currency';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grow: {
      flexGrow: 1,
    },
    title: {
      display: 'block',
      fontSize: 28,
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    navTitle:{
      display:"flex",
      flexDirection:"row",
      margin:"auto 0",
      cursor:"pointer"
    },
    navItems:{
      display:"flex",
      flexDirection:"row",
      justifyContent:"space-between"
    },
    userProfile:{
      margin:"auto 10px",
    }
  }),
);

export interface NavbarProps{
  
}
const Navbar: React.FC<NavbarProps> = () => {
  const classes = useStyles();
  const history = useHistory();
  const {user} = useAuth();
  const {currency,changeCurrency} = useCurrency()
  const option : Currency = currency === Currency.INR ? Currency.USD : Currency.INR
  const auth = new Auth()
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleCurrencyChange = () => {
    changeCurrency(option)
    handleClose()
  }
  const redirectToDashboard:()=>void = () => history.push('/')

  if(!user) return null

  return (
    <div className={classes.grow}>
      <AppBar position="static" color="transparent">
        <Toolbar className={classes.navItems}>
          <div className={classes.navTitle}  onClick={redirectToDashboard}>
            <Avatar className={classes.userProfile} src='/assets/logo.png' alt="logo" /> 
            <Typography className={classes.title} variant="subtitle1" noWrap>
                Invester
            </Typography>
          </div>
         
          <div>
              {/* <Button>Portfolio</Button> */}
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem>
                  {user.photoURL && <Avatar className={classes.userProfile} src={user.photoURL} alt="user-profile" />}
                  <Typography variant="h6">{user.displayName}</Typography>
                </MenuItem>
                <MenuItem onClick={handleCurrencyChange}>show in {option}</MenuItem>
                <MenuItem onClick={auth.logout}>Logout</MenuItem>
              </Menu>
            </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navbar