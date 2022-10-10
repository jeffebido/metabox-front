import { BrowserRouter, Routes, Route } from "react-router-dom";
import {AuthProvider} from "../providers/Auth"; 

import Home from "./pages/home/Home";
import SignUp from "./pages/sign-up/SignUp";
import Login from "./pages/login/Login";
import NewCollection from "./pages/collections/NewCollection";

export default function App() {

    return (

        <>  
            <AuthProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="/home" element={<Home />} />
                        <Route path="/sign-up" element={<SignUp />} />
                        <Route path="/new-collecton" element={<NewCollection />} />
                        <Route path="/" element={<Login />} />
                        
                    </Routes> 
                </BrowserRouter>
            </AuthProvider>
        </>
    );
}