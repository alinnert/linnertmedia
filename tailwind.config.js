const colors = require("tailwindcss/colors");

module.exports = {
  purge: {
    content: ["layouts/**/*.html"],
    options: {},
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      transparent: "transparent",
      current: "currenColor",
      brand: colors.cyan,
      gray: colors.gray,
      green: colors.emerald
    },
    extend: {
      typography: (theme) => ({
        DEFAULT: {
          css: {
            maxWidth: "none",
            code: {
              color: theme('colors.brand.800')
            }
          },
        },
      }),
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography")],
};
