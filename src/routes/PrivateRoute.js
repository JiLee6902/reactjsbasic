import User from "../components/User/User";
import { useSelector } from 'react-redux'
import { Navigate } from "react-router-dom";

const PrivateRoute = (props) => {

    const isAuthenticated = useSelector(state => state.user.isAuthenticated);

    if(!isAuthenticated) {
        return <Navigate to="/login"></Navigate> //Redirect duoi dang component
    }
    return (
        <>
           {props.children}
        </>
    )
}

export default PrivateRoute;
