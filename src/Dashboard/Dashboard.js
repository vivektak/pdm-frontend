import React, {useState}  from "react";
import {
Button,
TextField,
Grid,
Paper,
AppBar,
Typography,
Toolbar,
} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles'
import Nav from 'react-bootstrap/Nav'
import './Dashboard.css'
import List from '../List/List'
import Create from '../Create/Create'
import { Link } from 'react-router-dom'

const useStyles = makeStyles({
   
    sectionDesktop: {
      display: 'flex',
      alignItems: 'center',
    },
    navLinkBar: {
      borderRadius: '16px',
      backgroundColor: 'white',
      display: 'flex',
      justifyContent: 'center',
      padding: '4px',
      marginRight: '8px',
      marginTop: '16px',
      marginBottom: '16px',
      marginLeft: '88px',
    },
    tab: {
      fontSize: '13px',
      fontWeight: '500',
      fontStretch: 'normal',
      fontStyle: 'normal',
      letterSpacing: '0.4px',
      textAlign: 'center',
      textTransform: 'none',
      lineHeight: '1.54',
      padding: '4px 24px',
      color: '#000000',
      fontFamily: 'Theinhardt Medium',
      height: '24px',
      '&:hover': {
        color: '#000000',
      },
    },
    activeTab: {
      borderRadius: '16px',
      backgroundColor: '#4050b5',
      color: '#ffffff',
      '&:hover': {
        color: '#ffffff',
      },
    },
  })

const Dashboard = () => {
    const classes = useStyles()
    const [selectedNav, setSelectedNav] = React.useState('create')


    const PM_EXPLORE_INSIDE_OUR_NAV_TABS= [
        { label: 'Create', value: 'create' },
        { label: 'List', value: 'list' },
    ]

    const handleTabChange = (item) => {
        setSelectedNav(item.value)
    }

    return (
        <div>
        <AppBar position="static" alignitems="center" color="primary">
            <Toolbar>
                <Grid container justify="center" wrap="wrap">
                    <Grid item>
                        <Nav className={classes.navLinkBar}>
                            {PM_EXPLORE_INSIDE_OUR_NAV_TABS.map(
                            (item, index) => (
                                <Nav.Item key={item.label}>
                                <Nav.Link
                                    onClick={() => handleTabChange(item)}
                                    eventKey={index}
                                    className={selectedNav === item.value ? `${classes.tab} ${classes.activeTab}` : classes.tab}
                                    style={{textDecoration: 'none'}}
                                >
                                    {item.label}
                                </Nav.Link>
                                </Nav.Item>
                            ),
                            )}
                        </Nav>
                    </Grid>
                    <Grid item>
                        <div style={{position: "absolute",right: "40px",top: "15px"}}>
                            <Link to="/login" style={{color: "white", textDecoration: 'none'}}><Typography component="h1" variant="h6" >Logout</Typography></Link>
                        </div>
                     </Grid>   
                </Grid>
            </Toolbar>
        </AppBar>
        
        {selectedNav === 'create' && (
            <Create />
        )}
        {selectedNav === 'list' && (
            <>
            <List />
            </>
        )}
        </div>
       );

}
export default Dashboard;