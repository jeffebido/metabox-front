import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {useAuth} from "../../../providers/Auth"; 

export default function Login() {

    const navigate = useNavigate();

    const {setToken, token} = useAuth([]);

    const [formEmail, setFormEmail] = useState("");
    const [formPassword, setFormPassword] = useState("");


    useEffect(() => {
        
        if(token){
            navigate("/home");
        }

    }, []);

    function enviaForm (event) {

        event.preventDefault();

        const API_URL = process.env.REACT_APP_API_URL;
        
        axios.post(`${API_URL}/login`, {
            email: formEmail,
            password: formPassword
		})
        .then( response => {

            setToken(response.data);//Salva token no Contexto

            localStorage.setItem("userToken", JSON.stringify(response.data));

            navigate("/home");
            
           
        } )
        .catch((err) => {
            
            alert("Usuário ou senha incorreta!");
        });
    }
    return (

        <>  
            <Container>
                <Logo>MetaBox</Logo>

                <form onSubmit={enviaForm}>
                    <input type="email" placeholder="E-mail" value={formEmail} onChange={e => setFormEmail(e.target.value)} required ></input>
                    <input type="password" placeholder="Senha" value={formPassword} onChange={e => setFormPassword(e.target.value)} required ></input>
                    
                    <button type="submit" className="btn">ENTRAR</button>
                </form>

                <Footer>
                    <Link to={`/sign-up`} >
                        Não tem uma conta? <strong>Cadastre-se!</strong>
                    </Link>
                </Footer>
            </Container>
        </>
    );
}

const Container = styled.div`
	width: 100%;
    height: 100vh;
	background: #ECF0F3;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding-left: 40px;
    padding-right: 40px;
    input, .btn{
        margin-bottom: 30px;
    }
`;
const Logo = styled.div`
	font-family: 'Raleway', sans-serif;
    font-size: 60px;
    margin-bottom: 50px;
    color: #388efd;
`;
const Footer = styled.div`
    margin-top: 35px;
    a{
        font-style: normal;
        font-weight: 600;
        font-size: 16px;
        line-height: 18px;
        text-align: center;
        text-decoration: none;
        color: #515151;
        cursor: pointer;
        strong{
            font-weight: 800;
        }
    }
`;