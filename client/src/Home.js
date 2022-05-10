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
import { homeObjOne,homeObjTwo,homeObjThree, homeObjFour, homeObjFive, homeObjSix  } from './components/InfoSection/data';

function Home(){
    return(
        <div>
        <Home22 />
        <InfoSection {...homeObjOne} />
        <InfoSection {...homeObjTwo} />
        <InfoSection {...homeObjThree} />
        <InfoSection {...homeObjFour} />
        <InfoSection {...homeObjFive} />
        <InfoSection {...homeObjSix} />
        
        <Footer />
        </div>
    )
}

export default Home;