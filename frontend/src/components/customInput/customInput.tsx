import "./customInput.sass"

const customInput = ({placeholder, value, onChange, id, required, type="text"}) => {
    return (
        <input
            className="custom-input"
            type={type}
            placeholder={placeholder}
            id={id}
            value={value}
            onChange={onChange}
            required={required}
        />
    )
}

export default customInput