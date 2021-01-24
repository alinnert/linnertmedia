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
      green: colors.emerald,
    },
    fontFamily: {
      heading: ["Montserrat", "sans-serif"],
      sans: ["Open Sans", "sans-serif"],
      mono: ["IBM Plex Mono", "monospace"],
    },
    extend: {
      typography: (theme) => ({
        DEFAULT: {
          css: {
            maxWidth: "none",
            code: {
              color: theme("colors.brand.800"),
            },
            h2: {
              fontFamily: theme("fontFamily.heading").toString(),
              fontWeight: "400",
              position: "relative",
              "&::before": {
                content: '"# "',
                color: theme("colors.gray.500"),
                [`@media (min-width: ${theme("screens.lg")})`]: {
                  content: '"#"',
                  position: "absolute",
                  left: "-1.2em",
                },
              },
            },
          },
        },
        lg: {
          css: {
            h2: {
              fontSize: theme("fontSize.2xl")[0],
            },
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
