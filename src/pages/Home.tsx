import PokeLogo from "../assets/pokemon-logo.svg"
import Loupe from "../assets/loupe.svg"
import { getSearch } from "../services/search"
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { FaCircleNotch } from "react-icons/fa";
import classNames from "../utils/classnames";
import useDebounce from "../utils/debounce";

export default function Home() {

    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorSearch, setError] = useState(false);

    const nav = useNavigate();

    const btSearch = async () => {
        setLoading(true)
        const resp = await getSearch('pokemon/' + pokemonNameTreatment());

        if (resp.status == 200) {
            const data = { id: resp.data.id, pokemon: pokemonDataTreatment(resp.data.name) }
            nav("/view", { state: data });
        } else {
            setError(true)
        }
        setLoading(false);
    }

    const handleInputChange = (event: any) => {
        setSearch(event.target.value);
    };

    const pokemonNameTreatment = () => {
        if (search.toLowerCase() == "deoxys") {
            return '386'
        } else {
            return search
        }
    }

    const pokemonDataTreatment = (name: string) => {
        if (name.toLowerCase() == "deoxys-normal") {
            return "deoxys"
        } else {
            name;
        }
    }

    const handleDebounceSearch = useDebounce(btSearch, 200);


    return (

        <div className="flex flex-col items-center justify-start z-10 h-full">
            <img src={PokeLogo} />

            {!loading ? (
                <>
                    <div className="flex gap-1">
                        <input type="text" placeholder="Digite o nome ou número" className="ml-4 p-4 rounded-md w-[600px] text-black" onChange={handleInputChange} value={search} disabled={loading} />

                        <button className={classNames(`p-4 bg-green-500 rounded-md items-center`,
                            search.length > 1 && 'hover:bg-green-400'

                        )} onClick={handleDebounceSearch} disabled={loading || search.length < 1}>
                            <img src={Loupe} height={20} width={20} />
                        </button>
                    </div>
                    {errorSearch && !loading && <p className="text-red-500 text-xl font-medium mt-2 border-b border-red-500">Nenhum pokémon achado! Tente novamente</p>}
                    <button className="bg-green-500 text-center text-slate-900 font-normal text-xl p-2 rounded-md hover:bg-green-400 mt-4 hover:text-white"
                        onClick={() => nav("/panel")}
                    >
                        Ver Painel
                    </button>
                </>

            ) : (
                <FaCircleNotch className="animate-spin" size={50} />
            )}


        </div>
    )
}