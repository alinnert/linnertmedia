const colors = require("tailwindcss/colors");

// Source: https://github.com/tailwindlabs/tailwindcss-typography/blob/master/src/styles.js
const round = (num) =>
  num
    .toFixed(7)
    .replace(/(\.[0-9]+?)0+$/, '$1')
    .replace(/\.0$/, '')
// const rem = (px) => `${round(px / 16)}rem`
const em = (px, base) => `${round(px / base)}em`

module.exports = {
  purge: {
    content: ["layouts/**/*.html"],
    options: {},
  },
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    colors: {
      transparent: "transparent",
      current: "currenColor",
      brand: colors.cyan,
      gray: colors.blueGray,
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
            address: {
              fontStyle: 'normal'
            },
            'a.no-underline': {
              textDecoration: 'none'
            }
          },
        },
        lg: {
          css: {
            h2: {
              fontSize: theme("fontSize.2xl")[0],
            },
            address: {
              marginBottom: em(24, 18)
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
