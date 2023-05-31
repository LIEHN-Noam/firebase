import React from 'react'
import { Link } from 'react-router-dom';
const Init = () => {
    return(
        <>
            <div>
                <br/>
                <h1>Bienvenue sur IFRAN e-commerce</h1>
                <br/><br/>
                <h2>Pour accéder au site, veuillez vous connecter</h2><br/><br/>    
                <Link to={`/login`}>
                    <button type='button' class="btn btn-primary">Se connecter</button>
                </Link><br/><br/>
                <h2>Si vous n'avez pas de compte, vous pouvez cliquer ici pour vous connecter</h2><br/><br/>
                <Link to={`/register`}>
                    <button type='button' class="btn btn-primary">S'inscrire</button>
                </Link>
            </div>
        </>
    )
}

export default Init;
