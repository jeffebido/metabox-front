import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";
import {useAuth} from "../../../providers/Auth"; 
import Header from "../../layout/Header"; 

function Collection(data){

}

export default function Home() {

    const navigate = useNavigate();
    const {token} = useAuth();

    let {userId} = jwt_decode(token);

    const API_URL = process.env.REACT_APP_API_URL;

    const [collections, setCollections] = useState();

    useEffect(() => {

        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        const promise = axios.get(`${API_URL}/collections/${userId}`, config);

        promise.then(response => {

            setCollections(response.data);
        });
        
    }, []);

    return (

        <>  
            <Header />
        </>
    );
}
const Container = styled.div`
	width: 100%;
    height: 100vh;
	background: #8C11BE;
    padding-left: 40px;
    padding-right: 40px;
    display: flex;
    flex-direction: column;
`;
