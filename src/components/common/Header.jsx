import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import { styled, alpha } from '@mui/material/styles';
import MenuDrawer from './MenuDrawer';
import Container from '@mui/material/Container';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MoreIcon from '@mui/icons-material/MoreVert';
import { AuthContext } from '../../context/AuthContext';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import useDebounce from './useDebounce';
import ReactCountryFlag from "react-country-flag";

// Styled components
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 1),
  '&:hover': {
    backgroundColor: theme.palette.common.white,
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: '40ch',
  },
}));

const SearchIconWrapper = styled('div')(({ theme, focused }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: focused ? '#ffffff' : '#1976d2',
}));



function Header() {
    const [focused, setFocused] = useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
    const {
        isAuthenticated,
        userAvatarUrl,
        setIsAuthenticated,
        showLoginSuccessAlert,
        setShowLoginSuccessAlert,
        showLogoutAlert, 
        setShowLogoutAlert
    } = useContext(AuthContext);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    const navigate = useNavigate();
    const [searchInput, setSearchInput] = useState('');
    const [searchKey, setSearchKey] = useState(0);
    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const debouncedSearchInput = useDebounce(searchInput, 500);    

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsAuthenticated(!!token);
        // Reset login success alert when Header mounts
        setShowLoginSuccessAlert(false);
    }, [setIsAuthenticated, setShowLoginSuccessAlert]);

    // useEffect for handling search
    useEffect(() => {
        const fetchData = async () => {
            if (debouncedSearchInput.length >= 3) {
                setIsLoading(true);
                try {
                    const response = await axios.get(`https://django-stocks-ecbc6bc5e208.herokuapp.com/api/search_stocks/?query=${encodeURIComponent(debouncedSearchInput)}`, {
                        headers: {
                            'Authorization': `Token 13502af70a55d1fcddf7c094e4418c65904ef6eb`,
                        },
                    });
                    console.log(response.data);
                    setSearchResults(response.data || []);
                } catch (error) {
                    console.error('Search Error: ', error);
                }
                setIsLoading(false);
            } else {
                setSearchResults([]); // Clear results if input is less than 3 characters
            }
        };

        if (debouncedSearchInput) fetchData();
    }, [debouncedSearchInput]);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const handleLogout = async () => {
        try {
            await axios.post('https://django-stocks-ecbc6bc5e208.herokuapp.com/auth/logout/');
            localStorage.removeItem('token');
            setIsAuthenticated(false);

            // Set the logout alert state to true
            setShowLogoutAlert(true); 

            // Navigate to the login page
            navigate('/login', { replace: true }); // Added { replace: true } to replace the current entry in the history stack
        } catch (error) {
            console.error('Logout Error: ', error);
        }
    };
  


    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id="primary-search-account-menu"
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
        >
            {isAuthenticated ? [
                <MenuItem key="profile" onClick={handleMenuClose}>Profile</MenuItem>,
                <MenuItem key="account" onClick={handleMenuClose}>My account</MenuItem>,
                <MenuItem key="logout" onClick={handleLogout}>Logout</MenuItem>
            ] : [
                <MenuItem key="login" component={Link} to="/login" onClick={handleMenuClose}>Login</MenuItem>,
                <MenuItem key="register" component={Link} to="/signup" onClick={handleMenuClose}>Register</MenuItem>
            ]}
        </Menu>
    );

    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id="primary-search-account-menu-mobile"
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            {isAuthenticated ? [
                <MenuItem key="profile" onClick={handleMenuClose}>Profile</MenuItem>,
                <MenuItem key="account" onClick={handleMenuClose}>My account</MenuItem>,
                <MenuItem key="logout" onClick={handleLogout}>Logout</MenuItem>
            ] : [
                <MenuItem key="login" component={Link} to="/login" onClick={handleMobileMenuClose}>Login</MenuItem>,
                <MenuItem key="register" component={Link} to="/signup" onClick={handleMobileMenuClose}>Register</MenuItem>
            ]}
        </Menu>
    );


    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar className="stickyHeader">
                <Container maxWidth="xl" style={{ maxWidth: '1280px', margin: '0 auto' }} className="mobileMenu">
                    <Toolbar sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            sx={{ mr: 2 }}
                            onClick={() => setIsDrawerOpen(true)}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Link to="/" style={{ display: 'flex', alignItems: 'center', flexGrow: 1, color: 'inherit', textDecoration: 'none' }}>
                            <img 
                                src="/bull-street-logo.png" 
                                alt="Bull Street Logo" 
                                style={{ height: 'auto', maxWidth: '100%', maxHeight: '50px' }}
                            />
                        </Link>
                        <Search>
                            <SearchIconWrapper focused={focused}>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <Autocomplete
                            key={searchKey}
                            freeSolo
                            id="search-autocomplete"
                            options={searchResults}
                            loading={isLoading}
                            inputValue={searchInput}
                            onInputChange={(event, newInputValue) => {
                                setSearchInput(newInputValue);
                            }}
                            onChange={(event, value) => {
                            if (value != null && value.uid) {
                                navigate(`/stocks/${value.uid}`);
                            }
                            }}
                            getOptionLabel={(option) => `${option.name}`}
                            renderOption={(props, option) => (
                            <li {...props}>
                                <ReactCountryFlag
                                countryCode={option.country_iso}
                                svg
                                style={{
                                    width: '2em',
                                    height: '2em',
                                    marginRight: '0.5em',
                                    verticalAlign: 'middle',
                                }}
                                title={option.country_iso}
                                />
                                {option.name}
                            </li>
                            )}
                            renderInput={(params) => (
                                <TextField
                                {...params}
                                onFocus={() => setFocused(true)}
                                onBlur={() => setFocused(false)}
                                InputProps={{
                                    ...params.InputProps,
                                    endAdornment: (
                                    <React.Fragment>
                                        {isLoading ? <CircularProgress color="inherit" size={16} /> : null}
                                        {params.InputProps.endAdornment}
                                    </React.Fragment>
                                    ),
                                    style: { width: '100%', padding: '3px' },
                                }}
                                />
                            )}
                            />

                            </Search>
                        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                            <IconButton
                                size="large"
                                edge="end"
                                aria-label="account of current user"
                                aria-controls="primary-search-account-menu"
                                aria-haspopup="true"
                                onClick={handleProfileMenuOpen}
                                color="inherit"
                            >
                                {isAuthenticated ? (
                                    userAvatarUrl ? (
                                        <img 
                                            src={userAvatarUrl} // Use the avatar URL from context
                                            alt="User Avatar" 
                                            style={{ width: '32px', height: '32px', borderRadius: '50%' }}
                                        />
                                    ) : (
                                        <AccountCircle /> // Fallback icon if no avatar URL
                                    )
                                ) : (
                                    <AccountCircle /> // Show this if not authenticated
                                )}
                            </IconButton>
                        </Box>
                        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="show more"
                                aria-controls="primary-search-account-menu-mobile"
                                aria-haspopup="true"
                                onClick={handleMobileMenuOpen}
                                color="inherit"
                            >
                                <MoreIcon />
                            </IconButton>
                        </Box>
                    </Toolbar>

            <>
                {/* Row 1 - Mobile Only */}
            <Toolbar sx={{ display: { xs: 'flex', md: 'none' }, justifyContent: 'center' }}>
                {/* Menu Button */}
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                    sx={{ marginRight: 2 }}
                    onClick={() => setIsDrawerOpen(true)}
                >
                    <MenuIcon />
                </IconButton>
                {/* Logo */}
            <Link to="/" style={{ display: 'flex', alignItems: 'center', color: 'inherit', textDecoration: 'none', marginLeft: 'auto', marginRight: 'auto'}}>
                <img 
                    src="/bull-street-logo.png" 
                    alt="Bull Street Logo" 
                    style={{ height: 'auto', maxWidth: '100%', maxHeight: '45px', marginLeft: 'auto', marginRight: 'auto', paddingTop: '5px'  }} // Adjust height and width as needed
                />
            </Link>

                {/* Login Menu */}
                <IconButton
                    size="large"
                    edge="end"
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    onClick={handleProfileMenuOpen}
                    color="inherit"
                >
                    {isAuthenticated ? (
                        userAvatarUrl ? (
                            <img 
                                src={userAvatarUrl} // Use the avatar URL from context
                                alt="User Avatar" 
                                style={{ width: '35px', height: '35px', borderRadius: '50%' }}
                            />
                        ) : (
                            <AccountCircle /> // Fallback icon if no avatar URL
                        )
                    ) : (
                        <AccountCircle /> // Show this if not authenticated
                    )}
                </IconButton>

            </Toolbar>


                {/* Row 2 */}
                <Toolbar sx={{ display: { xs: 'flex', md: 'none' } }} className='mobileSearch'>
                    {/* Search Bar */}
                    <Search>
                        <SearchIconWrapper focused={focused}>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <Autocomplete
                            key={searchKey}
                            freeSolo
                            id="search-autocomplete"
                            options={searchResults}
                            loading={isLoading}
                            inputValue={searchInput}
                            onInputChange={(event, newInputValue) => {
                                setSearchInput(newInputValue);
                            }}
                            onChange={(event, value) => {
                                if (value && value.uid) {
                                    navigate(`/stocks/${value.uid}`);
                                    setSearchInput('');
                                    setSearchKey(prevKey => prevKey + 1);
                                }
                            }}
                            getOptionLabel={(option) => `${option.name}`}
                            renderOption={(props, option) => (
                            <li {...props}>
                                <ReactCountryFlag
                                countryCode={option.country_iso}
                                svg
                                style={{
                                    width: '2em',
                                    height: '2em',
                                    marginRight: '0.5em',
                                    verticalAlign: 'middle',
                                }}
                                title={option.country_iso}
                                />
                                {option.name}
                            </li>
                            )}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    onFocus={() => setFocused(true)}
                                    onBlur={() => setFocused(false)}
                                    InputProps={{
                                        ...params.InputProps,
                                        endAdornment: (
                                            <React.Fragment>
                                                {isLoading ? <CircularProgress color="inherit" size={16} /> : null}
                                                {params.InputProps.endAdornment}
                                            </React.Fragment>
                                        ),
                                        style: { width: '100%', padding: '3px' },
                                    }}
                                />
                            )}
                        />
                    </Search>
                </Toolbar>
            </>
                </Container>
                <MenuDrawer isOpen={isDrawerOpen} onDrawerClose={() => setIsDrawerOpen(false)} />
            </AppBar>
            {renderMobileMenu}
            {renderMenu}
            {showLoginSuccessAlert && (
                <Alert className="alert" severity="success" onClose={() => setShowLoginSuccessAlert(false)}>
                    Logged in successfully!
                </Alert>
            )}
            {showLogoutAlert && (
                <Alert className="alert" severity="success" onClose={() => setShowLogoutAlert(false)}>
                    Logged out successfully!
                </Alert>
            )}
        </Box>
    );
}

export default Header;
