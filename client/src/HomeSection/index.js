import React, {useState} from 'react';
import Video from '../videos/video.mp4';
import { Home2Container,HomeBg,VideoBg,HomeContent, HomeH1,HomeP,HomeBtnWrapper,ArrowForward,ArrowRight  } from './Home2';
import { Button2 } from "../components/Button2";
import { Button3 } from "../components/Button3";
import {Link} from "react-scroll";


const Home22=()=>{
    const[hover,setHover]=useState(false)
    const onHover=()=>{
        setHover(!hover)
    }
    return(
        <Home2Container>
            <HomeBg>
                <VideoBg autoPlay loop muted src={Video} type='video/mp4' />
            </HomeBg>
            <HomeContent>
                <HomeH1>Welcome to Neros Stablecoin</HomeH1>
                <HomeP>
                    exchange now, 100% redeemable at any time
                </HomeP>
                
            </HomeContent>
        </Home2Container>
    )
}

export default Home22;