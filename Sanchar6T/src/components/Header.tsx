import { Phone, Mail, User, ChevronDown } from "lucide-react";
import logo from "../assets/logo.jpeg";
import { Link } from "react-router-dom"; 

const Header = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo + Brand */}
          <div className="flex items-center gap-2">
            <Link
              to="/"
             
            >
            <img
              src={logo} // using imported image
              alt="Sanchar6T Logo"
              className="w-20 h-20 object-contain"
            />
            </Link>
            <span className="font-bold text-xl">
              <span className="text-red-600">SANCHAR</span>
              <span className="text-violet">6</span>
              <span className="text-red-600">T</span>
            </span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
           
             <Link
              to="/tirupati-packages"
              className="text-nav-blue font-medium hover:text-primary transition-colors"
            >
              Tirupati Packages
            </Link>
            <a
              href="#"
              className="text-nav-blue font-medium hover:text-primary transition-colors"
            >
              Destination
            </a>
            {/* ✅ Updated Itineraries link */}
            <a
              href="#"
              className="text-nav-blue font-medium hover:text-primary transition-colors"
            >
              Itineraries
            </a>
            <div className="flex items-center gap-1 text-nav-blue font-medium hover:text-primary transition-colors cursor-pointer">
              <span>More</span>
              <ChevronDown className="w-4 h-4" />
            </div>
          </nav>

          {/* Contact Icons */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <Phone className="w-4 h-4 text-white" />
            </div>
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <Mail className="w-4 h-4 text-white" />
            </div>
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
           <Link to="/signup-login">   <User className="w-4 h-4 text-white" /></Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;


