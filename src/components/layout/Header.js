import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";
import {useAuth} from "../../providers/Auth"; 


export default function Header() {

    const navigate = useNavigate();
    const {token} = useAuth();

    let {userId, userName, userProfileImg} = jwt_decode(token);


    return (

        <>  
            <Container>
                <Logo>MetaBox</Logo>
                <Hello>
                    <p>Bem vindo(a) novamente, <strong> {userName}</strong> 👋</p>
                </Hello>
                <Avatar avatarUrl={userProfileImg}/>
            </Container>
        </>
    );
}
const Logo = styled.div`
	font-family: 'Raleway', sans-serif;
    font-size: 30px;
    color: #388efd;

`;
const Container = styled.div`
	width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 80px;
    color: #000;
    padding-left: 50px;
    padding-right: 50px;
    border-bottom: 1px solid #d7dee2;
`;
const Hello = styled.p`
    font-size: 20px;
    display: flex;
    justify-content: center;
    
    strong{
        font-weight: 800;
    }
`;
const Avatar = styled.div`
    height: 60px;
    width: 60px;
    border-radius: 50%;
    background: url( ${(props) => props.avatarUrl} );
    background-size: cover;
    background-position: center;
`;