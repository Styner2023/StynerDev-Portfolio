

const Header = ({ onToggleDarkMode, darkMode }: { onToggleDarkMode?: () => void, darkMode?: boolean }) => {
  return (
    <header className="h-32 bg-card-light dark:bg-card-dark border-b border-border-light dark:border-border-dark flex items-center justify-between px-8">
      <div className="flex items-center">
        <button className="p-2 mr-4">
          <span className="material-icons">menu</span>
        </button>
        <h1 className="text-3xl font-semibold">Dashboard</h1>
      </div>

      <div className="flex items-center space-x-6">
        <div className="relative w-96">
          <span className="material-icons absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">search</span>
          <input
            className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-full py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Search here"
            type="text"
          />
        </div>

        <div className="flex items-center space-x-6 border-l border-border-light dark:border-border-dark pl-6">
          <button className="relative">
            <span className="material-icons text-gray-600 dark:text-gray-400 text-3xl">chat_bubble_outline</span>
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-white text-xs rounded-full flex items-center justify-center">6</span>
          </button>

          <button className="relative">
            <span className="material-icons text-gray-600 dark:text-gray-400 text-3xl">notifications_none</span>
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-white text-xs rounded-full flex items-center justify-center">4</span>
          </button>

          <div className="flex items-center">
            <img
              alt="Peter Parkur"
              className="w-12 h-12 rounded-full"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAFJXtr9FpAZO4i9IROCj5a8jTB9iGN1VdFUZloS3fXASQCIe2XwZDP4v5hDwh2sY0Q5EygViQqEdwb2xyg1JKxZjgvtnKB2gknzzVfCpxMIaZXpcmNQWLXNu_msnyhSrusN1dAA6b7xGR2N6MNgN_Vaal9HeKXbE86sAGHi27FHMrRa5pNJQqUUkgHcDQjM4nr6N9VQUc8W6YBn9YDtMWrk7RFdc7_SBqJ0MAzdY9UUnG3f91e0VrwQITQgJ8DsG0jXxO7-nvACc5q"
            />
            <div className="ml-3">
              <p className="font-semibold">Peter Parkur</p>
              <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark">Super Admin</p>
            </div>
            <span className="material-icons text-gray-400 ml-2">expand_more</span>
          </div>

          <button
            onClick={onToggleDarkMode || (() => { })}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
          >
            <span className="material-icons">{darkMode ? 'light_mode' : 'dark_mode'}</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
