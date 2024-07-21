import "./CustomButton.sass"

interface I_Props {
    children: any,
    onClick: () => void
}

const CustomButton = ({children, onClick}:I_Props) => {
    return (
        <button className="custom-button" onClick={onClick}>{children}</button>
    )
}

export default CustomButton