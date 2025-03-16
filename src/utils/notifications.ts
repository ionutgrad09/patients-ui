import {toast} from "react-toastify";


export const handleSuccess = (message: String) => {
    toast.success(message);
}

export const handleInfo = (message: String) => {
    toast.info(message);
}

export const handleError = (error: any) => {
    toast.error(error.response.data.message);

}


