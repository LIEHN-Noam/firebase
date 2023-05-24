import React, { useState,useEffect } from 'react';
import { fireDb } from '../firebase';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { onValue, push, ref, update } from 'firebase/database';


const initialState = {name:"",email:"",contact:""}
const AddEdit = () => {

  const [state,setState]=useState(initialState); 
  const [collectionData,setDb]=useState({});
  const {name,email,contact } = state;
  const {id} = useParams();
  const navigate =useNavigate();
  useEffect(() => {
    //fonction qui permet de pouvoir récupérer une collection de données depuis la base de données
    const contactsRef = ref(fireDb,"contacts");
    onValue(contactsRef, (resultat)=>{
      if(resultat.exists()){
        setDb(resultat.val())
      } else{
        setDb({})
      }
    })
    return () => {setDb({})}
  },[id]);
  
  useEffect(()=>{
    //setState nous permet de faire un changement d'état
    if(id){
      setState({...collectionData[id]})
    } else{
      setState({...initialState})
    }
    return () => {
      setState({...initialState})
    }
  },[id, collectionData]);

  const changerValeurInput = (e)=>{
      const {name,value}=e.target;
    setState({...state,[name]:value})
  }
  const soumettreFormulaire = (e)=>{
    e.preventDefault();
    if(!name || !email || !contact){
      toast.error("S'il vous plait veuillez entrer les valeurs de chaques champs")
    }else {
      //Si l'id n'existe pas en paramètre, alors on fera une insertion dans la base de données
      if(!id){
        console.log("avant")
        push(ref(fireDb,"contacts"),state,(err)=>{
          if(err){
            toast.error(err.message)
          }else{
            toast.success("Le contact a été crée")
          }
        })
      }else{
        //Si l'id existe, alors on fera une modification dans la base de données
        update(ref(fireDb,`contacts/${id}`), state, (err) => {
          if(err){
            toast.error(err.message)
          }else {
            toast.success("le contact a bien été mis à jour")
          }
        })
      }
      //setTimeout (()=>navigate("/accueil"),700);
      toast.success("le formulaire a été envoyé avec succès");
      navigate("/accueil");
    }
   
  }
    return (
        <div>
            <form onSubmit={soumettreFormulaire}>
              <div class="mb-3">
                <label for="name" class="form-label">Nom</label>
                <input type="text"name='name'onChange={changerValeurInput} value={name || ""} class="form-control" id="name" aria-describedby="emailHelp"/>
    
              </div>
  
              <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input type="email"name='email'onChange={changerValeurInput} value={email || ""} class="form-control" id="email" aria-describedby="emailHelp"/>
                
              </div>

              <div class="mb-3">
                <label for="contact" class="form-label">Numéro</label>
                <input type="number"name='contact'onChange={changerValeurInput} value={contact || ""} class="form-control" id="contact" aria-describedby="emailHelp"/>
    
              </div>
  
              <input type="submit" class="btn btn-primary" value={id ?"Mettre à jour":"Enregistrer"}/>
            </form>
        </div>
    );
};

export default AddEdit;