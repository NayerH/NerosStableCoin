import React from 'react';
import About1 from './components/About/index'
import { homeObjOne} from './components/About/data';
import NavGen from './components/NavGen';
import Footer from "./components/Footer";

function About(){
    return(
        <div>
        <NavGen />
        <About1 {...homeObjOne} />
        <Footer />
        </div>
    )
}
export default About;