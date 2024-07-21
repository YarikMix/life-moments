import "./customInput.sass"

const customInput = ({placeholder, value, setValue, id, required, type="text"}) => {
    return (
        <input
            className="custom-input"
            type={type}
            placeholder={placeholder}
            id={id}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            required={required}
        />
    )
}

export default customInput