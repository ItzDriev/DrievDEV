import { Link } from "react-router-dom";

interface Props {
  fixed?: true | false;
}

function ReturnToHomePage({ fixed = false }: Props) {
  return fixed ? (
    <Link
      id="return-button"
      to="/"
      className="top-5 left-5 fixed flex justify-center items-center bg-transparent hover:bg-blue-600 px-4 py-2 border border-blue-600 hover:border-transparent rounded-full w-10 h-10 font-semibold text-blue-600 hover:text-white text-center"
    >
      <i className="fa-arrow-left fa-solid"></i>
    </Link>
  ) : (
    <Link
      id="return-button"
      to="/"
      className="top-5 left-5 flex justify-center items-center bg-transparent hover:bg-blue-600 px-4 py-2 border border-blue-600 hover:border-transparent rounded-full w-10 h-10 font-semibold text-blue-600 hover:text-white text-center"
    >
      <i className="fa-arrow-left fa-solid"></i>
    </Link>
  );
}

export default ReturnToHomePage;
