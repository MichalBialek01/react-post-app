import {Link} from "react-router-dom";
import {auth} from "../config/firebase";


export const Navbar = () => {

    return (<>
        <div>
            <Link to="/">Home</Link>
            <Link to="/login">Login</Link>
        </div>
        <div>
            <p>{auth.currentUser?.displayName}</p>
        </div>
        </>
    )


}