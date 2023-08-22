import './App.css';
import "./Styles/muiCustom.css"
import { BrowserRouter as Router } from 'react-router-dom';
import NavBar from './Components/pure/NavBar';
import banner from "./Images/banner.png"
import logo from "./Images/logo.png"
import {Provider} from "react-redux"
import store from "./Store/Store"
import LogContainer from './Components/LogContainer';
import RoutesContainer from './Components/RoutesContainer';
import { useState } from 'react';
import { Drawer } from '@mui/material';
import CartContainer from './Components/CartContainer';


function App() {

  const [openDrawer, setOpenDrawer] = useState(false);
  

  const toggleDrawer = () => {
    setOpenDrawer(!openDrawer);
  };

  

  return (
    <Provider store={store}>
      <div className="App">
        <Router>
          <aside>
            <div  style={{display:"flex", flexDirection:"row", backgroundColor:"#50A060", 
                            justifyContent:"center", boxShadow:"0px 5px 15px 3px black"}}>
              <div style={{margin:"15px"}}>
                <img className='App-logo' src={logo} alt="logo" width="150px" height="150px"></img>
                <img src={banner} alt="banner" width="466px" height="150px"></img>
              </div>
              <NavBar openDrawer={toggleDrawer}></NavBar> 
              <LogContainer></LogContainer>
            </div>
          </aside>
          <main>
            <div id="panelBody">
              <RoutesContainer></RoutesContainer>
              <Drawer anchor="right" open={openDrawer} onClose={toggleDrawer}>
                <CartContainer></CartContainer>
              </Drawer>
            </div>
          </main> 
        </Router>
      </div>
       
    </Provider>
    
  );
}

export default App;
