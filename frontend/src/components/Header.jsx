import React from 'react'
import styled from 'styled-components'
import SearchIcon from '@mui/icons-material/Search';
import { Avatar, colors } from '@mui/material';



const HeaderContainer = styled.div`
    display: grid;
    grid-template-columns: 300px auto 200px;
    align-items: center;
    padding: 5px 20px;
    height: 60px;
    border-bottom: 1px solid lightgray;
`
const HeaderLogo = styled.div`
    display: flex;
    align-items: center;
    img {
        width: 40px;
    }
    span{
        font-size: 22px;
        margin-left: 10px;
        color: gray;
    }
`

const HeaderSearch = styled.div`
    display: flex;
    align-items: center;
    width: 900px;
    background-color: whitesmoke;
    padding: 12px;
    margin-left:150px;
    border-radius: 10px;
    input{
        background-color: transparent;
        border: 0;
        outline: 0;
        flex: 1;
    }
`
const HeaderIcons = styled.div`
    display: flex;
    align-items: center;
    span {
        display: flex;
        align-items: center;
        margin-left: 20px;
    }
    svg.MuiSvgIcon-root{
        margin: 0px 10px;
    }
`

function Header(props) {

const mystyle={
    color: "#808080",
    fontSize: "20px",
    fontWeight: "800",
    // rightPadding:"5px"

}

  return (
    <HeaderContainer>
        <HeaderLogo>
            {/* <img src="./axismyindia1404_logo.jpg" alt="BB logo" /> */}
            <img src="./BB.png" alt="BB logo" />
            <span>Drive</span>
        </HeaderLogo>
             
         <HeaderSearch>
            {/* <SearchIcon/>
                <input type="text" placeholder='Search here' /> */}
                {/* <FormatAlignCenterIcon/> */}
         </HeaderSearch>
        
        <HeaderIcons>   
            <span>
                {/* <AppsIcon/> */}
                {/* <p style={mystyle}>{props.userName}</p> */}
                 <p style={mystyle}>{props.userRole} </p> 
                <Avatar/>

            </span>
        </HeaderIcons>        
    </HeaderContainer>
  )
}

export default Header