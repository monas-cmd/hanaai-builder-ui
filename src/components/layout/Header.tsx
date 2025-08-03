import { Link } from 'react-router-dom';
import { Menu } from 'lucide-react';

export default function Header() {
  return (
    <header className="w-full bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo / Branding */}
        <Link to="/" className="text-2xl font-extrabold text-blue-600 tracking-tight">
          Hana<span className="text-gray-900">AI</span>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex space-x-8 text-sm font-medium text-gray-700">
          <Link to="/" className="hover:text-blue-600 transition-colors">
            Home
          </Link>
          <Link to="/preview" className="hover:text-blue-600 transition-colors">
            Previews
          </Link>
          <Link to="/about" className="hover:text-blue-600 transition-colors">
            About
          </Link>
        </nav>

        {/* CTA Button */}
        <div className="hidden md:block">
          <Link
            to="/signin"
            className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-semibold shadow hover:bg-blue-700 transition"
          >
            Sign In
          </Link>
        </div>

        {/* Mobile Menu Icon */}
        <button className="md:hidden text-gray-700">
          <Menu size={24} />
        </button>
      </div>
    </header>
  );
}
