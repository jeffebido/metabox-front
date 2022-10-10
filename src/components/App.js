import { BrowserRouter, Routes, Route } from "react-router-dom";
import {AuthProvider} from "../providers/Auth"; 


import SignUp from "./pages/sign-up/SignUp";
import Login from "./pages/login/Login";


export default function App() {

    return (

        <>  
            <AuthProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="/sign-up" element={<SignUp />} />
                        <Route path="/" element={<Login />} />
                    </Routes> 
                </BrowserRouter>
            </AuthProvider>
        </>
    );
}