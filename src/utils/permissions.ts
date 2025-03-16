import {AppPermission, User} from "./types";


export const hasAccess = (permission: AppPermission, currentUser: User | null): boolean => {
    if (!currentUser) {
        return false;
    }

    return currentUser.permissions.includes(permission);
}