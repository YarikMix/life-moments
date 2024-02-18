import {useEffect, useRef} from "react";

export function usePopup(setIsOpen) {

	const modalRef = useRef(null);

	const closeButtonRef = useRef(null);

	const handleClickOutside = (event) => {
		if (modalRef.current && (!modalRef.current.contains(event.target) || closeButtonRef.current.contains(event.target))) {
			setIsOpen(false);
		}
	};

	useEffect(() => {
		document.addEventListener('click', handleClickOutside, true);
		return () => {
			document.removeEventListener('click', handleClickOutside, true);
		};
	}, []);


	return {
		modalRef,
		closeButtonRef
	};
}