function Footer() {
  return (
    <footer className="z-21 sticky bg-(--navBG) w-screen h-20 border-t-1 border-red-500 flex items-center justify-center text-center text-[1.1rem]">
      <div className="text-white">
        Anton Andersson © {new Date().getFullYear()}
      </div>
    </footer>
  );
}

export default Footer;
