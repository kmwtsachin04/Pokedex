import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './PokemonDetails.css'

function PokemonDetails(){
    const {id }= useParams();
    const [pokemon, setPokemon] =useState({});
    async function downloadPokemon(){
        const respose =await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
        setPokemon({
            name: respose.data.name,
            image: respose.data.sprites.other.dream_world.front_default,
            weigth: respose.data.weight,
            height: respose.data.height,
            types: respose.data.types.map((t)=> t.type.name)

        });

    }
    useEffect(()=>{
         downloadPokemon();
    },[]);
    return (

        <div className="pokemon-details-wrapper">
             <img className="pokemon-details-image" src={pokemon.image}/>
          <div className="pokemon-details-name">

            <span>{pokemon.name}</span>
          </div>
         
          <div className="pokemon-details-name"> Height : {pokemon.height}</div>
         <div className="pokemon-details-name">Weight : {pokemon.weigth}</div>
          <div className="pokemon-details-types">
            {pokemon.types && pokemon.types.map((t) => <div key={t}>{t}</div>)}
          </div>
        </div>
    );
    
 
}

export default PokemonDetails;