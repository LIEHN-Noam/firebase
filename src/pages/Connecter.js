import React, { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
const Connecter = () => {

    const [erreur, setErreur]=useState();
    const [email, setEmail]=useState();
    const [password, setPassword] =useState();
    const navigate = useNavigate();
    const soumettre = (e) => {
        e.preventDefault()

        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            // ...
            navigate("/accueil");
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
        });
    }

  return (
    <div>
      
      <div className='container pt-5'>
      <h1>Connexion</h1>
        <form onSubmit={soumettre}>
            <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Adresse E-mail</label>
                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' onChange={(e)=>setEmail(e.target.value)} />
            </div>
            <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Mot de passe</label>
                <input type="password" class="form-control" id="exampleInputPassword1" name='password' onChange={(e)=>setPassword(e.target.value)} />
            </div>
            <div class="mb-3 form-check">
                <input type="checkbox" class="form-check-input" id="exampleCheck1" name='retenir'/>
                <label class="form-check-label" for="exampleCheck1">Se souvenir de moi</label>
            </div>
            <input type="submit" class="btn btn-primary"/>
        </form><br/>
        <p>Pas encore inscrit?</p>
        <Link to={`/register`}>
                <button type='button' class="btn btn-secondary">S'inscrire</button>
        </Link>
      </div>
    </div>
  )
}

export default Connecter
