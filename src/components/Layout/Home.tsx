import { useEffect } from "react";
import Background from "../../assets/background3.jpg"
import { Outlet } from "react-router-dom";

export default function HomeLayout() {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="">
            <div
                className="absolute inset-0"
                style={{ backgroundImage: `url(${Background})`, height: "100%" }}
            ></div>

            <div className="absolute inset-0 bg-black opacity-50"></div>

            <div className="relative z-10 text-white text-center min-h-[100dvh]">
                <Outlet />
            </div>
        </div>
    )
}