export default function Total({
  labelDescription = "Descrição do Label",
  inputValue = "Valor padrão do input",
  onInputChange = null,
  id = "id_input_height",
}) {
  function handleInputChange({ currentTarget }) {
    if (onInputChange) {
      const newValue = currentTarget.value;
      onInputChange(newValue);
    }
  }

  return (
    <div>
      <label className="total" htmlFor={id}>
        {labelDescription}
      </label>
      <input
        readOnly
        id={id}
        className="total"
        type="number"
        value={inputValue}
        onChange={handleInputChange}
      />
    </div>
  );
}
