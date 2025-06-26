export const Header = () => {
  return (
    <header className="bg-white shadow dark:bg-gray-800 flex">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center ">
            <a
              href="/"
              className="text-2xl font-bold text-gray-900 dark:text-white"
            >
              MyApp
            </a>
          </div>
          <nav className="flex space-x-4">
            <a
              href="/"
              className="text-gray-900 dark:text-white hover:underline"
            >
              Home
            </a>
            <a
              href="/about"
              className="text-gray-900 dark:text-white hover:underline"
            >
              About
            </a>
            <a
              href="/contact"
              className="text-gray-900 dark:text-white hover:underline"
            >
              Contact
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};
