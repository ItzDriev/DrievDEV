import { Link } from "react-router-dom";

interface Props {
  to: string;
  text: string;
  className?: string;
  dropDown?: boolean;
}

function NavLink({ to, text, className }: Props) {
  return (
    <Link
      to={to}
      className={
        "text-white text-[1.2rem] rounded-xs py-1 px-2 text-center font-montserrat " +
        className
      }
    >
      {text}
    </Link>
  );
}

export default NavLink;
