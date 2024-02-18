import {toast} from "react-toastify";

export const successMessage = (message) => {
	toast.success(message, {
		position: toast.POSITION.BOTTOM_RIGHT
	});
};

export const warningMessage = (message) => {
	toast.warning(message, {
		position: toast.POSITION.BOTTOM_RIGHT
	});
};

export const infoMessage = (message) => {
	toast.info(message, {
		position: toast.POSITION.BOTTOM_RIGHT
	});
};

export const errorMessage = (message) => {
	toast.error(message, {
		position: toast.POSITION.BOTTOM_RIGHT
	});
};

export const logOutMessage = () => {
	toast.info(`Вы вышли из аккаунта`, {
		position: toast.POSITION.BOTTOM_RIGHT
	});
}