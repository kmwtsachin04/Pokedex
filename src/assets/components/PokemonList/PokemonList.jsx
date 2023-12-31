import { useEffect, useState } from "react";
import axios from 'axios';
import './PokemonList.css'
import Pokemon from "../Pokemon/Pokemon";

function PokemonList() {

  // const [pokemonList, setPokemonList] = useState([]);
  // const [isLoading, setIsLoading] = useState(true)

  // const [pokedexUrl, setPokedexUrl] =useState('https://pokeapi.co/api/v2/pokemon');
  // const [nextUrl, setNextUrl] = useState('');
  // const [prevUrl, setPrevUrl] = useState('');

  const [pokemonListState, setPokemonListState]= useState({
    pokemonList:[],
    isLoading:true,
    pokedexUrl:'https://pokeapi.co/api/v2/pokemon',
    nextUrl:'',
    prevUrl:''

  });

  async function downloadPokemon() {
    // setIsLoading(true);
    setPokemonListState({...pokemonListState, isLoading:true});
    const respose = await axios.get(pokemonListState.pokedexUrl); //thid is download 20 pokemon
    const pokemonResults = respose.data.results; // we get the array of pokemin from result
    console.log(respose.data);
    // setNextUrl(respose.data.next);
    setPokemonListState((state)=>({
      ...state,
       nextUrl:respose.data.next, 
       prevUrl:respose.data.previous}));
    // setPrevUrl(respose.data.previous)

    // itearting over the array of  pokemon and using thier url , to create an array of promises
    //  that will download those 20 pokemon
    const pokemonResultProminse = pokemonResults.map((pokemon) => axios.get(pokemon.url));

    // passing that promise aarya to axios.all
    const pokemonData = await axios.all(pokemonResultProminse);
    console.log(pokemonData);
    // aaray of 20 pokemon detailed data , and extract id, name, image and types
    const pokeListResult = pokemonData.map((pokeData) => {
      const pokemon = pokeData.data;

      return {
        id: pokemon.id,
        name: pokemon.name,
        image: (pokemon.sprites.other) ? pokemon.sprites.other.dream_world.front_default : pokemon.sprites.front_shiny,
        types: pokemon.types
      }
    });
    console.log( pokeListResult);
    setPokemonListState((state)=>({...state,pokemonList:pokeListResult, isLoading:false}));
    // setPokemonList( pokeListResult);
    // setIsLoading(false);
  }

  useEffect(() => {
    downloadPokemon();
  }, [pokemonListState.pokedexUrl]);


  return (
    <div className="pokemon-list-wrapper">
      
      <div className="pokemon-wrapper">
        {(pokemonListState.isLoading) ? 'Loading....' : 
        pokemonListState.pokemonList.map((p)=> <Pokemon name={p.name} image={p.image} key ={p.id} id={p.id}/>)}</div>

        <div className="controls">
          <button disabled= {pokemonListState.prevUrl==null} onClick={()=> setPokemonListState({...pokemonListState, pokedexUrl:pokemonListState.prevUrl})}>Prev</button>
          <button disabled={pokemonListState.nextUrl==null} onClick={()=> setPokemonListState({...pokemonListState, pokedexUrl:pokemonListState.nextUrl})}>Next</button>
        </div>
    </div>

  )

}

export default PokemonList;