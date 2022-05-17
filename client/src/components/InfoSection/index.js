import React from 'react'
import { Button2 } from '../Button2'
import { Column2, ImgWrap,InfoContainer,InfoRow,InfoWrapper,Column1,TextWrapper,TopLine,Heading ,Subtitle,BtnWrap,Img,imgStart, NavBtnLink,NavBtnLink2,NavBtn} from './InfoElements';



const InfoSection=({to2,present,lightBg,id,imgStart,topLine,lightText,headline,darkText,description,buttonLabel,buttonLabel2,img,alt,primary,dark,dark2,to})=>{
    if(present){
        return(
        
            <>
            
            <InfoContainer lightBg={lightBg} id={id} >
                <InfoWrapper>
                    <InfoRow imgStart={imgStart}>
                        <Column1>
                        <TextWrapper>
                            <TopLine>{topLine}</TopLine>
                            <Heading lightText={lightText}>{headline}
                            </Heading>
                            <Subtitle darkText={darkText}>Start your crypto journey by buying NROs now or mint your NFTs with NROCS now</Subtitle>
                            <NavBtn>
                                <NavBtnLink
                                to={to}
                                smooth={true}
                                duration={500}
                                spy={true}
                                exact="true"
                                offset={-80}
                                primary={primary?1:0}
                                dark={dark?1:0}
                                dark2={dark2?1:0}
                                >{buttonLabel}
                                </NavBtnLink>
                                "               "
                                <NavBtnLink2
                                to={to2}
                                smooth={true}
                                duration={500}
                                spy={true}
                                exact="true"
                                offset={-80}
                                primary={primary?1:0}
                                dark={dark?1:0}
                                dark2={dark2?1:0}
                                >Buy NROCs
                                </NavBtnLink2>
                            </NavBtn>
                        </TextWrapper>
                        </Column1>
                        <Column2>
                        <ImgWrap>
                        <Img src={img} alt={alt} />
                        </ImgWrap>
                        </Column2>
                    </InfoRow>
                </InfoWrapper>
            </InfoContainer>
            </>
        )
     
    }
    else
    {
        return(
        
            <>
            
            <InfoContainer lightBg={lightBg} id={id} >
                <InfoWrapper>
                    <InfoRow imgStart={imgStart}>
                        <Column1>
                        <TextWrapper>
                            <TopLine>{topLine}</TopLine>
                            <Heading lightText={lightText}>{headline}
                            </Heading>
                            <Subtitle darkText={darkText}>{description}</Subtitle>
                            <NavBtn>
                                <NavBtnLink
                                to={to}
                                smooth={true}
                                duration={500}
                                spy={true}
                                exact="true"
                                offset={-80}
                                primary={primary?1:0}
                                dark={dark?1:0}
                                dark2={dark2?1:0}
                                >{buttonLabel}
                                </NavBtnLink>
                            </NavBtn>
                        </TextWrapper>
                        </Column1>
                        <Column2>
                        <ImgWrap>
                        <Img src={img} alt={alt} />
                        </ImgWrap>
                        </Column2>
                    </InfoRow>
                </InfoWrapper>
            </InfoContainer>
            </>
        )
    }
    
}

export default InfoSection;