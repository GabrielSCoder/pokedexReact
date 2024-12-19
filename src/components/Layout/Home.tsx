import Background from "../../assets/background3.jpg"
import { Outlet } from "react-router-dom";

export default function HomeLayout() {


    
    return (
        <div className="">
            <div
                className="absolute inset-0"
                style={{ backgroundImage: `url(${Background})` }}
            ></div>

            <div className="absolute inset-0 bg-black opacity-50"></div>

            <div className="relative z-10 text-white text-center h-screen">
                <Outlet />
            </div>
        </div>
    )
}