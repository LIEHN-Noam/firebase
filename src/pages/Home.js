import { onValue, ref, remove } from 'firebase/database';
import React, { useEffect, useState } from 'react';
import { fireDb } from '../firebase';
import { Link, useParams } from 'react-router-dom';
import {toast} from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const [collections,setData]=useState({});
    const navigate = useNavigate();
    const{id}=useParams();
    useEffect(()=>{
        const objetsCollection=ref(fireDb,"objets");
        onValue(objetsCollection,(snapshot)=>{
            if(snapshot.exists()){
                setData(snapshot.val())
            }else{
                setData({})
            }
            return ()=>{
                setData({})
            }
        })
    })
    const supprimerObjet=(id)=>{
        if(window.confirm("Êtes vous sur de vouloir supprimer ?")){
            const objetsSelectionner=ref(fireDb,`objets/${id}`)
            remove(objetsSelectionner,(err)=>{
                if(err){
                    toast.error(err)
                }else{
                    toast.sucess("Supression Effectuée")
                }
            });
            setTimeout(()=>navigate("/accueil"),700)
        }
    }
    return (
        <>
            <div> 
            <table class="table table-striped table-info">
  <thead>
    <tr>
      <th scope="col">No.</th>
      <th scope="col">Objet</th>
      <th scope="col">Prix</th>
      <th scope="col">Vendeur</th>
      <th scope="col">Action</th> 
    </tr>
  </thead>
  <tbody>
    {Object.keys(collections).map((id,index)=>{
        return (
            <tr key={id}>
            <th scope="row">{index+2}</th>
            <td >{collections[id].name}</td>
            <td>{collections[id].price}</td>
            <td>{collections[id].seller}</td>
            <td><Link to={`/view/${id}`}>
                <button type='button' class="btn btn-secondary">Voir</button>
                </Link>&nbsp;
                <Link to={`/update/${id}`}>
                <button type='button' class="btn btn-warning">Editer</button>
                </Link>&nbsp;
                <Link to={`/accueil`}>
                <button type='button' class="btn btn-danger" onClick={()=>supprimerObjet(id)}>Supprimer</button>
                </Link>&nbsp;
            </td>
          </tr>
        )
    })}


  </tbody>
</table>
            </div>
        </>
    );
};

export default Home;