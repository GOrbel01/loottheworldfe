import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useMenuLoginHook } from "./login/LoginProvider";

    export function withParamsAndNavigate(Component) {
    return (props) => (
    <Component {...props} params={useParams()} navigate={useNavigate()} location={useLocation()} authData={useMenuLoginHook()} />
    );
}