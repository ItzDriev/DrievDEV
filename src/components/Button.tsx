import { Link } from "react-router-dom";

interface ButtonProps {
  to: string;
  children?: React.ReactNode;
  className?: string;
  target?: string;
}

function Button({ to, children, className, target }: ButtonProps) {
  return (
    <Link
      to={to}
      target={target}
      className={
        "mt-8 p-5 rounded-4xl font-semibold text-white text-xl bg-linear-to-r from-blue-600 via-violet-600 to-red-600 hover:shadow-indigo-500 hover:shadow-[0px_0px_15px_2px] transition duration-350 " +
        className
      }
    >
      {children}
    </Link>
  );
}

export default Button;
