import { useEffect, useState } from "react";

function ThemeController() {
  const defaultTheme = localStorage.getItem("theme") || "light";
  const [theme, setTheme] = useState(defaultTheme);

  // Update theme in state and localStorage
  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  // Apply theme to the HTML tag
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, [theme]);

  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button " className="btn  btn-sm md:btn-md  m-1">
        Theme
        <svg
          width="12px"
          height="12px"
          className="inline-block h-2 w-2 fill-current opacity-60"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 2048 2048"
        >
          <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
        </svg>
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content bg-base-300 rounded-box z-[1] w-52 p-2 shadow-2xl"
      >
        {[
          "light",
          "dark",
          "cupcake",
          "bumblebee",
          "emerald",
          "corporate",
          "synthwave",
          "retro",
          "cyberpunk",
          "valentine",
          "halloween",

          "forest",

          "fantasy",
          "wireframe",

          "dracula",

          "business",
          "acid",
          "lemonade",
          "night",
          "coffee",

          "sunset",
        ].map((t) => (
          <li key={t}>
            <input
              type="radio"
              name="theme-dropdown"
              className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
              aria-label={t.charAt(0).toUpperCase() + t.slice(1)}
              value={t}
              checked={theme === t}
              onChange={() => handleThemeChange(t)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ThemeController;
