import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {useAuth} from "../../../providers/Auth"; 

export default function SignUp() {

    const navigate = useNavigate();

    const [formName, setFormName] = useState("");
    const [formEmail, setFormEmail] = useState("");
    const [formProfileImg, setFormProfileImg] = useState("");
    const [formPassword, setFormPassword] = useState("");
    const [formConfirmPassword, setFormConfirmPassword] = useState("");

    function enviaForm (e) {

		e.preventDefault();
        
        const API_URL = process.env.REACT_APP_API_URL;

		axios.post(`${API_URL}/signup`, {
            name: formName,
            email: formEmail,
            profileImg: formProfileImg,
            password: formPassword, 
            confirmPassword: formConfirmPassword, 
		})
        .then( response => {
            
            navigate("/");
        } )
        .catch((err) => {

            console.error(err);
            alert("Dados inválidos!");
            
        });
	}

    return (

        <>  
            <Container>
                <Logo>MetaBox</Logo>

                <form onSubmit={enviaForm}>
                    <input type="text" placeholder="Nome" value={formName} onChange={e => setFormName(e.target.value)} required ></input>
                    <input type="email" placeholder="E-mail" value={formEmail} onChange={e => setFormEmail(e.target.value)} required ></input>
                    <input type="text" placeholder="Imagem de Perfil" value={formProfileImg} onChange={e => setFormProfileImg(e.target.value)} required ></input>
                    <input type="password" placeholder="Senha" value={formPassword} onChange={e => setFormPassword(e.target.value)} required ></input>
                    <input type="password" placeholder="Confirme a senha" value={formConfirmPassword} onChange={e => setFormConfirmPassword(e.target.value)} required ></input>

                    <button type="submit" className="btn">ENTRAR</button>
                </form>

                <Footer>
                    <Link to={`/`} >
                        Já tem uma conta? <strong>Entre agora!</strong>
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
    color: #388efd;
    font-size: 60px;
    margin-bottom: 50px;
`;
const Footer = styled.div`
    margin-top: 35px;
    a{
        font-style: normal;
        font-weight: 600;
        font-size: 15px;
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