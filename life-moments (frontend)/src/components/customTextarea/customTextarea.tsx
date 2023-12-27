import "./customTextarea.sass"
import styled from "styled-components";

const CustomTextarea = ({value, placeholder, required, height=72, onInput=() => {}}) => {

	const onKeyUp = (e) => {
		e.target.style.height = 'inherit'
		e.target.style.height = e.target.scrollHeight + "px"

		onInput(e.target.value)
	}

	return (
		<TextareaWrapper
			value={value}
			onInput={onKeyUp}
			placeholder={placeholder}
			required={required}
			padding={height / 6 + "px"}
			height={height + "px"}
		/>
	)
}

const TextareaWrapper = styled.textarea`
	padding: ${({padding}) => padding};
	height: ${({height}) => height};
`



export default CustomTextarea