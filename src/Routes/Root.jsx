import { Outlet } from "react-router";
import Navigation from "../Navigation";

export default function Root() {
    return (
        <div className="container">
            <Outlet />
        </div>
    )

}