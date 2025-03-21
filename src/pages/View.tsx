import { useState } from "react";
import CardView from "../components/Card";

export default function View () {

    const [color, setColor] = useState('bg-slate-100')

    return (
        <div className={`${color} relative p-2 lg:p-0 mx-4 lg:mx-96 h-full shadow-md flex justify-center items-center cursor-default`}>
            <button className="absolute top-1 left-2 rounded-md border-none p-2 hover:text-white hover:bg-red-700 hover:border hover:border-white" onClick={() => window.history.back()}>BACK</button>
            <CardView setColor={setColor}/>
        </div>
    )
}