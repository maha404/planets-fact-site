interface Props {
  number: string;
  text: string;
  option: "overview" | "structure" | "geology";
  onClick?: (option: "overview" | "structure" | "geology") => void;
  active: boolean;
}

export default function Button({ number, text, option, onClick, active }: Props) {
  return (
    <button className={`btn ${active ? 'active' : ''}`} onClick={() => onClick && onClick(option)}>
      <p>{number}</p>
      <p>{text}</p>
    </button>
  );
}