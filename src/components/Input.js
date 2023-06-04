function Input({ type, theClass, placeholder, text, data }) {
  return (
    <input
      type={type}
      className={theClass}
      placeholder={placeholder}
      onChange={text}
      value={data}
    />
  );
}

export default Input;
