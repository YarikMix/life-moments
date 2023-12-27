import "./CustomButton.sass"

const CustomButton = ({children , onClick}) => {
    return (
        <button className="custom-button" onClick={onClick}>{children}</button>
    )
}

export default CustomButton