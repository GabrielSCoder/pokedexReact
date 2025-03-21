import { FaCircleNotch } from "react-icons/fa";
import { useCachedImage } from "../../hooks/useCachedImage";
import { PokemonType, typeColors } from "../../utils/colors";
import LabelType from "../LabelType";

type props = {
    name: string;
    id: number;
    weight: string;
    height: string;
    types: Array<any>
}


export default function SimpleCard(props: props) {

    const { name, id, types } = props
    const imageURL = useCachedImage(id.toString(), `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`);

    return (
        <div className=" flex flex-col justify-end items-center rounded-md bg-gray-300 p-2 border border-black h-52 h-lg:h-72">

            <div className={` justify-center flex items-center w-full h-full ${typeColors[types[0].type.name as PokemonType]}`}>
                {imageURL ? (
                    <img src={imageURL} className="bg-white rounded-full h-[80px] w-[80px]" />
                ) : (
                    <span className="flex items-center justify-center"><FaCircleNotch className="animate-spin" size={30} /></span>
                )}
            </div>

            <div className="bg-white rounded-md shadow-md h-28 flex flex-col justify-start px-4 gap-2 rounded-t-none w-full p-2" >

                <div className="text-left">
                    <h2 className="font-medium text-slate-500">#{id}</h2>
                </div>

                <div className="flex gap-1 text-black flex-col text-left">
                    <div>
                        <h2 className="text-black text-lg font-bold">{name.charAt(0).toUpperCase() + name.slice(1)}</h2>
                    </div>

                    <div className="flex gap-2 text-center ">
                        {types.map((index: { slot: number; type: { name: string }; }) => {
                            return (
                                <LabelType id={index.slot} name={index.type.name} key={index.slot} classes="w-20 p-0 rounded" />
                            )
                        })}
                    </div>

                </div>

            </div>
        </div>
    )
}