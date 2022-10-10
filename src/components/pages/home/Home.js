import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";
import {useAuth} from "../../../providers/Auth"; 
import Header from "../../layout/Header"; 
import Divider from "../../layout/Divider"; 
import { Swiper, SwiperSlide } from "swiper/react";

import { Pagination } from "swiper";

import 'swiper/swiper.min.css'

export default function Home() {

    const navigate = useNavigate();
    const {token} = useAuth();

    let {userId} = jwt_decode(token);

    const API_URL = process.env.REACT_APP_API_URL;

    const [collections, setCollections] = useState([]);

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
            
            <Container>
                <Heading>Suas Coleções</Heading>

                <Divider />

                <Swiper
                    slidesPerView={3}
                    pagination={{
                        clickable: true,
                    }}
                    breakpoints={{
                        640: {
                        slidesPerView: 2,
                        },
                        768: {
                        slidesPerView: 3,
                        },
                        1024: {
                        slidesPerView: 4,
                        },
                    }}
                >   
                    {collections === null ? (<div className="loading">Carregando...</div>) : (
                        collections.map( collection => 
                            <SwiperSlide>
                                <Link to={`/myCollecton/${collection.id}`}>
                                    <CollectionCardContainer>
                                        <CollectionCard bkgUrl={collection.coverImg}>
                                            <h4>{collection.name}</h4>
                                        </CollectionCard>
                                    </CollectionCardContainer>
                                </Link>                      
                            </SwiperSlide>
                        )
                    )}
                </Swiper>
               
                <Divider />

                <NewCollecton>
                    <Link to={`/new-collecton/`} className="btn">
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
const CollectionCard = styled.div`
	width: 100%;
    height: 200px;
    background: #000;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 20px;
    margin-top: 30px;
    padding: 20px;
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url( ${(props) => props.bkgUrl} );
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    box-shadow: 18px 18px 20px #D1D9E6, -18px -18px 20px #FFFFFF;
    color: #fff;
    h4{
        font-size: 20px;
        font-weight: 500px;
        text-shadow: 0px 0px 6px rgba(0, 0, 0, 0.9);
    }

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