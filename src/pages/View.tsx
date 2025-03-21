import {  useState } from "react";
import CardView from "../components/Card";

export default function View() {

    const [color, setColor] = useState('bg-transparent')
    console.log(color)

    return (
        <div className={`bg-transparent p-2 lg:p-0 shadow-md flex justify-center items-center cursor-default h-[100dvh] overflow-x-hidden w-full `}>
            <button className="absolute top-1 left-2 rounded-md border-none p-2 hover:text-white hover:bg-red-700 hover:border hover:border-white" onClick={() => window.history.back()}>BACK</button>
            <CardView setColor={setColor} />
        </div>
    )
}