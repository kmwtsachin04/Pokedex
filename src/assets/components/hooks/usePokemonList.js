import { useEffect } from "react";

function usePokemonList(){
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

      useEffect(()=>{
        downloadPokemon()

      },[pokemonListState.pokedexUrl]);

      return {pokemonListState,setPokemonListState}



}

export default usePokemonList;