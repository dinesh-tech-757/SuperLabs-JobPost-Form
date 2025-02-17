import logo from '../assets/logo.png'

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-gray-200 to-gray-400 shadow-md py-3 px-10 sticky top-0 z-50">
      <img src={logo} alt="Logo" className="h-8" />
    </nav>
  );
}

export default Navbar;
