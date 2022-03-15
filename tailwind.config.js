module.exports = {
  purge: ["./src/**/*.js"],
  darkMode: false,
  theme: {
    container: {
      center: true,
    },
    extend: {
      cursor: {
        "context-menu": "context-menu",
      },
      colors: {
        "primary-50": "var(--color-primary-50)",
        "primary-100": "var(--color-primary-100)",
        "primary-200": "var(--color-primary-200)",
        "primary-300": "var(--color-primary-300)",
        "primary-400": "var(--color-primary-400)",
        "primary-500": "var(--color-primary-500)",
        "primary-600": "var(--color-primary-600)",
        "primary-700": "var(--color-primary-700)",
        "primary-800": "var(--color-primary-800)",
        "primary-900": "var(--color-primary-900)",
        "blue-primary-50": "var(--color-primary-blue-50)",
        "blue-primary-100": "var(--color-primary-blue-100)",
        "blue-primary-200": "var(--color-primary-blue-200)",
        "blue-primary-300": "var(--color-primary-blue-300)",
        "blue-primary-400": "var(--color-primary-blue-400)",
      },
    },
    minWidth: {
      0: "0",
      "1/4": "25%",
      "1/2": "50%",
      "3/4": "75%",
      full: "100%",
    },
  },
  variants: {
    extend: {
      stroke: ["hover", "focus"],
    },
  },
  plugins: [],
};
