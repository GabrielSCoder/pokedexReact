import { useEffect, useState } from "react";
import SimpleCard from "../components/SimpleCard";
import { getSearch } from "../services/search";
import { FaCircleNotch } from "react-icons/fa";
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { MdCancel } from "react-icons/md";

type propsLabel = {
    name: string;
    id: number;
    weight: string;
    height: string;
    types: Array<any>
}

export default function Panel() {

    const [data, setData] = useState<propsLabel[]>([])
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0)

    const nav = useNavigate()

    const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

    const loadData = async () => {

        setLoading(true)

        let resp 
        let datas = []

        for (let i = (1 + (12 * page)); i <= (12 * (page + 1)); i++) {

            resp = await getSearch("pokemon/" + i)

            if (resp.status == 200) {
                const data = resp.data;

                const label: propsLabel = {
                    id: data.id,
                    name: data.name,
                    height: (data.height * 0.025).toFixed(2),
                    weight: (data.weight * 0.45).toFixed(2),
                    types: data.types

                }


                datas.push(label)
                console.log(label)
            }



            await delay(500);
        }

        setData(datas);

        setLoading(false)
    }

    const previousPage = () => {
        page > 0 ? setPage(page - 1) : null
    }

    const nextPage = () => {
        page < 100 ? setPage(page + 1) : null
    }

    const getPokemon = (dat: propsLabel) => {
        const data = { id: dat.id, pokemon: dat.name }
        nav('/view', { state: data })
    }

    useEffect(() => {
        loadData()
    }, [page])

    return (
        <div className="flex justify-center items-center h-full w-full">

            {!loading ? (
                <div className="relative h-full flex flex-col justify-center items-center">
                    <button className="absolute top-2" onClick={() => nav("/")}><MdCancel size={40} className=" text-center hover:text-red-500"/></button>
                    {page >= 1 ? (<button disabled={page == 0 || loading} onClick={() => previousPage()}><FaArrowAltCircleLeft size={60} className="hover:text-blue-400" /></button>) : null}
                </div>
            ) : null}

            {!loading ? (
                <div className="grid grid-cols-4 grid-rows-3 gap-4 h-full bg-purple-600 p-4 w-[1200px] mx-40 ">
                    {data.map((key, index) => (
                        <div key={index} className="transition duration-500 ease-in-out col-span-1 transform-gpu hover:scale-110 hover:cursor-pointer" onClick={() => getPokemon(key)}>
                            <SimpleCard key={index} id={key.id} name={key.name} height={key.height} weight={key.weight} types={key.types} />
                        </div>
                    ))}
                </div>
            ) : (<FaCircleNotch className="animate-spin" size={50} />)}

            {!loading ? (
                <div className=" h-full flex flex-col justify-center items-center">
                    <button onClick={() => nextPage()} disabled={page > 99 || loading}><FaArrowAltCircleRight size={60} className="hover:text-red-400" /></button>
                </div>
            ): null}

        </div>
    )
}