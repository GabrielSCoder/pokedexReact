import { useEffect, useState } from "react";
import CardView from "../components/Card";

export default function View() {

    const [color, setColor] = useState('bg-slate-100')

    useEffect(() => {

        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });

    }, []);


    return (
        <div className={`${color} relative p-2 lg:p-0 mx-4 lg:mx-96 shadow-md flex justify-center items-center cursor-default h-[100dvh] overflow-y-hidden`}>
            <button className="absolute top-1 left-2 rounded-md border-none p-2 hover:text-white hover:bg-red-700 hover:border hover:border-white" onClick={() => window.history.back()}>BACK</button>
            <CardView setColor={setColor} />
        </div>
    )
}