import React from 'react'
import styled from 'styled-components'
import landingpageimg1 from "../images/landingpageimg1.png"
import landingpageimg2 from "../images/studentimg1.png"



const Container = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    width:100%;
    height:300px;
    background-image:url(${landingpageimg2});
    background-position:center;
    background-size:cover;
    
`

const Img = styled.img`
    width:100%;
    height:100%;

`

const LandingPageImg = () => {

    




  return (
    <Container>
        {/* <Img src={landingpageimg1} alt="landingpageimg"/> */}
    </Container>
  )
}

export default LandingPageImg
