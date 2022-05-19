import React from 'react';
import './App.css';
import Header from "./components/Header";
import GlobalStyles from "./components/styles/Global";
import Footer from "./components/Footer";
import 'semantic-ui-css/semantic.min.css';
import { Container, Button,Card,Icon,Grid } from 'semantic-ui-react';
import '../src/Home.css'
import Home22 from "./HomeSection";
import InfoSection from './components/InfoSection/index'
import { homeObjOne,homeObjTwo,homeObjThree, homeObjFour, homeObjFive, homeObjSix ,homeObjSeven } from './components/InfoSection/data';
import Navbar2 from './components/Navbar2';
function Home(){
    return(
        <div>
         <Navbar2 />
        <Home22 />
        <InfoSection {...homeObjOne} />
        <InfoSection {...homeObjTwo} />
        <InfoSection {...homeObjThree} />
        <InfoSection {...homeObjFour} />
        <InfoSection {...homeObjFive} />
        <InfoSection {...homeObjSix} />
        <InfoSection {...homeObjSeven} />
        
        <Footer />
        </div>
    )
}

export default Home;