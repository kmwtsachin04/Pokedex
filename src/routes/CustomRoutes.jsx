import { Routes ,Route } from "react-router-dom";
import Pokedex from '../assets/components/Pokedex/Pokedex'
import PokemonDetails from "../assets/components/PokemonDetails/PokemonDetails";
function CustomRoutes(){
 
    return(
        <Routes>
            <Route path="/" element={<Pokedex />}/>
            <Route path="/pokemon/:id" element={<PokemonDetails/>}/>
        </Routes>

    );
}

export default CustomRoutes;