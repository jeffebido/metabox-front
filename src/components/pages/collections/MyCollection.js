import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";
import {useAuth} from "../../../providers/Auth"; 
import Header from "../../layout/Header"; 
import Divider from "../../layout/Divider"; 


export default function MyCollection() {

    
    const navigate = useNavigate();
    const {token} = useAuth();

    let {userId} = jwt_decode(token);

    const { collectionId } = useParams();

    const API_URL = process.env.REACT_APP_API_URL;

    const [models, setModels] = useState([]);

    useEffect(() => {
       
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        const promise = axios.get(`${API_URL}/models/${collectionId}`, config);

        promise.then(response => {

            setModels(response.data);

        });
        
    }, []);

    return (

        <>  
            <Header />
            
            <Container>
                <Heading>Seus Modelos</Heading>

                <Divider />

                {models === null ? (<div className="loading">Carregando...</div>) : (
                    models.map( model => 
            
                            
                        <h4>{model.fileName}</h4>
                                                        

                    )
                )}
                   
                
               
                <Divider />

                <NewCollecton>
                    <Link to={`/`} className="btn">
                        Criar Coleção
                    </Link>
                </NewCollecton>
            </Container>
        </>
    );
}
const Container = styled.div`
	width: 100%;
    height: auto;
    box-sizing: border-box;
    padding-left: 50px;
    padding-right: 50px;
    padding-top: 50px;

    a{
        text-decoration: none;
    }
`;
const Heading = styled.h1`
	font-size: 26px;
    font-weight: 700;
    line-height: 30px;
    width: 100%;
`;

const NewCollecton = styled.div`
	padding-top: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    a{
        width: 50%;
        
    }
`;
const CollectionCardContainer = styled.div`
	padding: 30px;
`;