import classNames from "../../utils/classnames";
import { PokemonType, typeColors } from "../../utils/colors";

type props = {
    name : string;
    id : number;
    classes? : string;
    upper ?: boolean;
}


export default function LabelType (props : props) {

    const { id, name, classes, upper } = props

    return (
        <h3 key={id} className={classNames(`rounded-xl font-medium w-40 ${typeColors[name as PokemonType]} || bg-black`, classes)}>{upper ? name.toUpperCase() : name}</h3>
    )
}