export default function Inputs({
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
      <label htmlFor={id}>{labelDescription}</label>
      <input
        id={id}
        type="number"
        min="0"
        maxLength={9}
        value={inputValue}
        onChange={handleInputChange}
      />
    </div>
  );
}
