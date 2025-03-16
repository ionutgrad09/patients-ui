import {useContext} from "react";
import {AuthContext} from "../contexts/AuthProvider";
import {AppPermission} from "../utils/types";
import {hasAccess} from "../utils/permissions";
import {useNavigate} from "react-router-dom";
import {ROUTES} from "../utils/routes";

function withGuard<T extends object>(
    WrappedComponent: React.ComponentType<T>,
    appPermission: AppPermission
) {
    return (props: T) => {
        const {user} = useContext(AuthContext);
        const navigate = useNavigate();

        if (!hasAccess(appPermission, user)) {
            navigate(ROUTES.NotFound)
        }

        return <WrappedComponent {...(props as T)} />;
    };
}

export default withGuard