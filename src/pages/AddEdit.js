import React, { useState,useEffect } from 'react';
import { fireDb } from '../firebase';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { onValue, push, ref, update } from 'firebase/database';


const initialState = {name:"",price:"",seller:""}
const AddEdit = () => {

  const [state,setState]=useState(initialState); 
  const [collectionData,setDb]=useState({});
  const {name,price,seller } = state;
  const {id} = useParams();
  const navigate =useNavigate();
  useEffect(() => {
    const objetsRef = ref(fireDb,"objet");
    onValue(objetsRef, (resultat)=>{
      if(resultat.exists()){
        setDb(resultat.val())
      } else{
        setDb({})
      }
    })
    return () => {setDb({})}
  },[id]);
  
  useEffect(()=>{
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
    if(!name || !price || !seller){
      toast.error("S'il vous plait veuillez entrer les valeurs de chaques champs")
    }else {
      //Si l'id n'existe pas en paramètre, alors on fera une insertion dans la base de données
      if(!id){
        console.log("avant")
        push(ref(fireDb,"objets"),state,(err)=>{
          if(err){
            toast.error(err.message)
          }else{
            toast.success("L'objet a été ajouté")
          }
        })
      }else{
        //Si l'id existe, alors on fera une modification dans la base de données
        update(ref(fireDb,`objets/${id}`), state, (err) => {
          if(err){
            toast.error(err.message)
          }else {
            toast.success("l'article' a bien été mis à jour")
          }
        })
      }
      toast.success("Envoi Réussi");
      navigate("/accueil");
    }
   
  }
    return (
        <div>
            <form onSubmit={soumettreFormulaire}>
              <div class="mb-3">
                <label for="objet" class="form-label">Objet</label>
                <input type="text" name='name'onChange={changerValeurInput} value={name || ""} class="form-control" id="objet" />
    
              </div>
  
              <div class="mb-3">
                <label for="prix" class="form-label">Prix (en F CFA)</label>
                <input type="number"name='price'onChange={changerValeurInput} value={price || ""} class="form-control" id="prix" />
                
              </div>

              <div class="mb-3">
                <label for="seller" class="form-label">Vendeur</label>
                <input type="text"name='seller'onChange={changerValeurInput} value={seller || ""} class="form-control" id="vendeur" />
    
              </div>
  
              <input type="submit" class="btn btn-primary" value={id ?"Mettre à jour":"Enregistrer"}/>
            </form>
        </div>
    );
};

export default AddEdit;