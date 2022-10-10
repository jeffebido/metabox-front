import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import Divider from "../layout/Divider"; 


export default function CollectionModels() {

    
    const navigate = useNavigate();

    const { slug } = useParams();

    const API_URL = process.env.REACT_APP_API_URL;

    const [models, setModels] = useState([]);
    const [collection, setCollection] = useState([]);
    


    useEffect(() => {

        //busca dados da coleção
        axios.get(`${API_URL}/collection/${slug}`).then(res => {

            setCollection(res.data);
        })
        
        //busca modelos da coleção
        if(collection.id){

            axios.get(`${API_URL}/models/${collection.id}`).then(res => {

                setModels(res.data);
            })
        }
    }, [collection]);

    return (

        <>  
            {collection === null ? (<div className="loading">Carregando...</div>) : (
                <Header>{collection.name}</Header>
            )} 
            <Container>
                

                <Divider />

                <ModelsGrid>

                
                    {!models.length ? (<div className="loading">Carregando...</div>) : (
                        models.map( model => 
                            <GridItem>  

                                <ModelSection>
                                     
                                    <model-viewer  src={API_URL+'/uploads/'+model.fileName} ar shadow-intensity="1" camera-controls touch-action="pan-y"></model-viewer>
                                    <ModelInfo>
                                        <h4>{model.name}</h4>  
                                    </ModelInfo>
                                </ModelSection>

                            
                            </GridItem>
                                        
                        )
                    )}
                </ModelsGrid>

          
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
    @media (max-width: 800px) {
        padding-left: 0px;
        padding-right: 0px;
    }
`;
const Header = styled.h1`
	font-size: 26px;
    font-weight: 700;
    line-height: 30px;
    width: 100%;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #FFFFFF;
    box-shadow: 4px 2px 6px rgba(72, 100, 125, 0.3), inset -2px -2px 6px rgba(72, 100, 125, 0.1);
    border-bottom-right-radius: 20px;
    border-bottom-left-radius: 20px;
`;



const ModelsGrid = styled.div`
	width: 100%;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
`;
const GridItem = styled.div`
	width: 30%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 30px;
    @media (max-width: 800px) {
        width: 100%;
    }
`;
const ModelSection = styled.div`
	padding: 30px;
    height: 450px;
    width: 100%;
    background: #fff;
    box-shadow: 18px 18px 20px #D1D9E6;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    padding-bottom: 80px;
    model-viewer{
        height: 100%;
    }
`;
const ModelInfo = styled.div`
    background-color: #fff;
    width: 100%;
    padding: 20px;
    position: absolute;
    bottom: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    border-top: 1px solid #dee5ea;
    border-bottom-right-radius: 20px;
border-bottom-left-radius: 20px;
    h4{
        font-size: 20px;
        color: #4785D6;
    }
`;