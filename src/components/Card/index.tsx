import { useEffect, useState } from "react"
import { getSearch } from "../../services/search";
import { pokemonData } from "../../types/pokemon";
import LabelType from "../LabelType";
import { PokemonType, typeColors } from "../../utils/colors";
import { useLocation } from "react-router-dom";
import { FaCircleNotch } from "react-icons/fa";

type Props = {
    setColor: any
}

type pokedex = {
    flavor_text_entries : Array<{ flavor_text : string}>
}

export default function CardView(props: Props) {

    const { setColor } = props

    const [loading, setLoading] = useState(true);
    const [imgLoading, setImgLoading] = useState(true);
    const [data, setData] = useState<pokemonData>();
    const [pokedex, setDex] = useState<pokedex>();

    const locale = useLocation()
    const { id } = locale.state

    useEffect(() => {
        const start = async () => {
            const resp = await getSearch('pokemon/' + id);
            const resp2 = await getSearch('pokemon-species/' + id);
    
            if (resp.status === 200 && resp2.status === 200) {
                const treatedName = pokemonNameTreatment(resp.data.name);
                setData({ ...resp.data, name: treatedName });
                setDex(resp2.data);
                setColor(typeColors[resp.data.types[0].type.name as PokemonType]);
            }
    
            setLoading(false);
        };
    
        start();
    }, []);


    const cleanText = (text: string) => text.replace(/[\n\f]/g, ' ');

    const pokemonNameTreatment = (str : string) => {
        return str.toLowerCase() === 'deoxys-normal' ? 'deoxys' : str;
    }

    return (

        <>
            {!loading && data && pokedex && pokedex.flavor_text_entries ? (

                <div className={`p-2 rounded-md shadow-md shadow-black min-h-[550px] w-[450px] flex flex-col items-center justify-between gap-4 bg-slate-200  `}>

                    <h1 className="text-4xl text-black font-semibold py-4" onFocus={(e) => e.target.blur()} >{data.name}</h1>

                    <div className="p-8 items-center min-h-30 relative">

                        {imgLoading && (
                            <div className="absolute inset-0 flex items-center justify-center">
                                <FaCircleNotch className="animate-spin" size={30} />
                            </div>
                        )}

                        <img
                            src={`https://projectpokemon.org/images/normal-sprite/${data.name}.gif`}
                            alt="Pokemon"
                            className={` transition-opacity duration-500 ${!imgLoading ? 'opacity-100' : 'opacity-0'
                                }`}
                            onLoad={() => setImgLoading(false)}
                        />

                    </div>

                    <div className="flex justify-center items-center gap-x-40">

                        <div onFocus={(e) => e.target.blur()} >
                            <h2 className="text-black font-semibold">{(data.height * 0.025).toFixed(2)}m</h2>
                            <h2 className="text-slate-700 font-normal">Height</h2>
                        </div>

                        <div>
                            <h2 className="text-black font-semibold">{(data.weight * 0.45).toFixed(2)}Kgs</h2>
                            <h2 className="text-slate-700 font-normal">Weight</h2>
                        </div>


                    </div>


                    <div className="flex flex-col justify-center items-center space-y-4  ">

                        <div className="flex gap-2">
                            {data.types.map((index: { slot: number; type: { name: string }; }) => {
                                return (
                                    <LabelType id={index.slot} name={index.type.name} key={index.slot} upper/>
                                )
                            })}
                        </div>

                        <p className="text-black bg-white rounded-md min-h-20 text-center flex items-center justify-center">{cleanText(pokedex.flavor_text_entries[0].flavor_text)}</p>
                    </div>

                </div>
            ) : <FaCircleNotch className="animate-spin" size={50} />}
        </>

    )
}

