import React, {useEffect, useState} from 'react';
import {Link, useLocation} from"react-router-dom";
import "./Header.css"
const Header = () => {
    const [activeTab, setActiveTab] = useState("Home");
    const location = useLocation();

    useEffect(() => {
        if(location.pathname ==="/login"){
            setActiveTab("Login")
        }else if(location.pathname === "/register"){
            setActiveTab("Register");
        }
    },[location]);

  return (
        <div className='header'>
            <p className='logo'>IFRAN e-commerce</p>
            <div className='header-right'>
                 <Link to="/accueil">
                    <p 
                     className={`${activeTab === "Home" ? "active":""}`}
                     onClick={()=> setActiveTab("Home")} 
                    >
                            Accueil
                    </p>
                </Link>
                <Link to="/login">
                    <p 
                     className={`${activeTab === "Login" ? "active":""}`}
                     onClick={()=> setActiveTab("Login")} 
                    >
                            Se connecter
                    </p>
                </Link>
                <Link to="/register">
                    <p 
                     className={`${activeTab === "Register" ? "active":""}`}
                     onClick={()=> setActiveTab("Register")} 
                    >
                           S'inscrire
                    </p>
                </Link>
                <Link to="/add">
                    <p 
                     className={`${activeTab === "Add" ? "active":""}`}
                     onClick={()=> setActiveTab("Add")} 
                    >
                           Ajouter un objet
                    </p>
                </Link>
            </div>
        </div>
  )
}

export default Header