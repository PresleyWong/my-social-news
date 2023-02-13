const Tooltip = (props) => {
  return (
    <a
      href="#"
      className="text-blue-600 hover:text-blue-700 transition duration-150 ease-in-out"
      data-bs-toggle="tooltip"
      title={props.text}
    >
      {props.children}
    </a>
  );
};

export default Tooltip;
