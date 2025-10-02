import Link from 'next/link';

const Header = () => {
  return (
    <nav className="bg-primary text-white px-6 py-4 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center">
          <h1 className="text-2xl font-bold">Enneagram Test</h1>
          <div className="space-x-6 mx-6">
            <Link href="/" className="hover:text-secondary transition-colors">
              Home
            </Link>
            <Link href="/test" className="hover:text-secondary transition-colors">
              Take Test
            </Link>
            <Link href="/articles" className="hover:text-secondary transition-colors">
              Articles
            </Link>
          </div>
        </div>
      </nav>
  );
};

export default Header;