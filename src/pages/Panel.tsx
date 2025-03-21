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

    // const lastpage = parseInt(window.sessionStorage.getItem("lastpage") ?? "0", 10)

    const [data, setData] = useState<propsLabel[]>([])
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(() => { return parseInt(window.sessionStorage.getItem("lastpage") || "0") })

    let touchStartX = 0;
    let touchEndX = 0;

    const nav = useNavigate()

    const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

    const loadData = async () => {

        setLoading(true)

        const haveCache = window.localStorage.getItem(`page${page}`)

        let resp
        let datas = []

        if (haveCache) {
            const parsedCache = JSON.parse(haveCache) as propsLabel[];
            setData(parsedCache);
            setLoading(false);
            return;
        }


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
            }



            await delay(100);
        }

        let nextPage = []

        for (let i = (1 + (12 * (page + 1))); i <= (12 * (page + 2)); i++) {


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

                nextPage.push(label)
            }

            await delay(100);
        }

        window.localStorage.setItem(`page${page}`, JSON.stringify(datas))
        window.localStorage.setItem(`page${page + 1}`, JSON.stringify(nextPage))

        setData(datas)

        setLoading(false)
    }

    const previousPage = () => {
        page > 0 ? setPage(page - 1) : null
        window.sessionStorage.setItem("lastpage", (page - 1).toString())
    }

    const nextPage = () => {
        page < 100 ? setPage(page + 1) : null
        window.sessionStorage.setItem("lastpage", (page + 1).toString())
    }

    const getPokemon = (dat: propsLabel) => {
        const data = { id: dat.id, pokemon: dat.name }
        nav('/view', { state: data })
    }

    const forwardPage = () => {
        if (page < 100) {
            setPage((prev) => {
                const newPage = prev + 1;
                window.sessionStorage.setItem("lastpage", newPage.toString());
                return newPage;
            });
        }
    };

    const prevPage = () => {
        if (page > 0) {
            setPage((prev) => {
                const newPage = prev - 1;
                window.sessionStorage.setItem("lastpage", newPage.toString());
                return newPage;
            });
        }
    };

    const handleTouchEnd = () => {
        const swipeThreshold = 50;

        if (touchStartX - touchEndX > swipeThreshold) {
            forwardPage();
        } else if (touchEndX - touchStartX > swipeThreshold) {
            prevPage();
        }
    };

    const handleTouchStart = (e: TouchEvent) => {
        touchStartX = e.touches[0].clientX;
    };

    const handleTouchMove = (e: TouchEvent) => {
        touchEndX = e.touches[0].clientX;
    };

    useEffect(() => {
        loadData()
    }, [page])

    useEffect(() => {
        window.addEventListener("touchstart", handleTouchStart);
        window.addEventListener("touchmove", handleTouchMove);
        window.addEventListener("touchend", handleTouchEnd);

        return () => {
            window.removeEventListener("touchstart", handleTouchStart);
            window.removeEventListener("touchmove", handleTouchMove);
            window.removeEventListener("touchend", handleTouchEnd);
        };
    }, [page]);

    return (
        <>
            <div className="fixed top-0 left-1 z-30 xl:hidden">
                <button className="" onClick={() => nav("/")}><MdCancel size={40} className="text-center hover:text-red-500" /></button>
            </div>
            <div className="relative flex justify-center items-center md:h-full w-full overflow-y-auto md:overflow-y-hidden" >

                {!loading ? (
                    <div className="relative h-full xl:flex flex-col justify-center items-center hidden">
                        <button className="absolute top-2" onClick={() => nav("/")}><MdCancel size={40} className="text-center hover:text-red-500" /></button>
                        {page >= 1 ? (<button disabled={page == 0 || loading} onClick={() => previousPage()}><FaArrowAltCircleLeft size={60} className="hover:text-blue-400" /></button>) : null}
                    </div>
                ) : null}

                {!loading ? (
                    <div className="grid md:grid-cols-4 md:grid-rows-3 min-w-[2000px]:grid-rows-4 grid-cols-2 grid-rows-4  lg:gap-2 md:gap-2 gap-1 h-full bg-purple-600 p-4 md:p-2 lg:p-4 xl:w-[1200px] xl:mx-40">
                        {data.map((key, index) => (
                            <div key={index} className="xl:transition duration-500 ease-in-out col-span-1 transform-gpu xl:hover:scale-110 hover:cursor-pointer" onClick={() => getPokemon(key)}>
                                <SimpleCard key={index} id={key.id} name={key.name} height={key.height} weight={key.weight} types={key.types} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <>
                        <div className="absolute top-0 bg-black/50 h-full md:h-screen w-screen z-20 backdrop-blur-[30px] flex justify-center items-center">
                            <FaCircleNotch className="animate-spin" size={50} />
                        </div>
                        <div className="md:grid md:grid-cols-4 md:grid-rows-3 md:gap-4 h-[98vh] md:h-full bg-white p-4 w-[1200px] md:mx-40 "></div>
                    </>
                )}

                {!loading ? (
                    <div className=" h-full xl:flex flex-col justify-center items-center hidden">
                        <button onClick={() => nextPage()} disabled={page > 99 || loading}><FaArrowAltCircleRight size={60} className="hover:text-red-400" /></button>
                    </div>
                ) : null}

            </div>
        </>

    )
}