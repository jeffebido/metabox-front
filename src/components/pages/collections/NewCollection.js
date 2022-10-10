import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";
import {useAuth} from "../../../providers/Auth"; 
import Header from "../../layout/Header"; 
import Divider from "../../layout/Divider"; 

export default function NewCollection() {

    const navigate = useNavigate();
    const {token} = useAuth();

    let {userId} = jwt_decode(token);

    const [formName, setFormName] = useState("");
    const [formDescription, setFormDescription] = useState("");
    const [formCoverImg, setFormCoverImg] = useState("");


    function enviaForm (e) {

		e.preventDefault();

        
        const API_URL = process.env.REACT_APP_API_URL;

        const config = {
            headers: { authorization: `Bearer ${token}` }
        };
        
		axios.post(`${API_URL}/newCollection`, {
            name: formName,
            description: formDescription,
            coverImg: formCoverImg
		}, config)
        .then( response => {
            
            navigate("/home");
        } )
        .catch((err) => {
            if (err.response) {
                console.log(err)
                alert("Ops, algo deu errado.");
            }
        });
	}

    return (

        <>  
            <Header />
            
            <Container>
                <Heading>Crie uma nova coleção 😁</Heading>

                <Divider />
                <form onSubmit={enviaForm}>
                    <input type="text" placeholder="Nome" value={formName} onChange={e => setFormName(e.target.value)} required ></input>
                    <input type="text" placeholder="Descrição" value={formDescription} onChange={e => setFormDescription(e.target.value)} required ></input>
                    <input type="text" placeholder="Imagem de Capa" value={formCoverImg} onChange={e => setFormCoverImg(e.target.value)} required ></input>

                    <button type="submit" className="btn">CRIAR COLEÇÃO</button>
                </form>

               
               
            </Container>
        </>
    );
}
const Container = styled.div`
	width: 100%;
 
    height: auto;
    padding-left: 50px;
    padding-right: 50px;
    padding-top: 50px;

    a{
        text-decoration: none;
    }
    input, .btn{
        margin-bottom: 30px; 
    }
`;
const Heading = styled.h1`
	font-size: 26px;
    font-weight: 700;
    line-height: 30px;
    width: 100%;
`;