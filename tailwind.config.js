const colors = require('tailwindcss/colors')
const plugin = require('tailwindcss/plugin')

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
    content: ['layouts/**/*.html'],
    options: {},
  },
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currenColor',
      brand: colors.cyan,
      gray: colors.blueGray,
      green: colors.emerald,
    },
    screens: {
      '2xl': { max: '1535px' },
      xl: { max: '1279px' },
      lg: { max: '1023px' },
      md: { max: '767px' },
      sm: { max: '639px' },
    },
    fontFamily: {
      heading: ['Montserrat', 'sans-serif'],
      sans: ['Open Sans', 'sans-serif'],
      mono: ['IBM Plex Mono', 'monospace'],
    },
    extend: {
      typography: (theme) => ({
        DEFAULT: {
          css: {
            code: {
              color: theme('colors.brand.800'),
            },
            h2: {
              fontFamily: theme('fontFamily.heading').toString(),
              fontWeight: '400',
              position: 'relative',
              '&::before': {
                content: '"#"',
                position: 'absolute',
                left: '-1.2em',
                color: theme('colors.gray.500'),
                [`@media (max-width: ${theme('screens.lg.max')})`]: {
                  content: '"# "',
                  position: 'static',
                  left: 0,
                },
              },
            },
            address: {
              fontStyle: 'normal',
            },
            'a.no-underline': {
              textDecoration: 'none',
            },
          },
        },
        lg: {
          css: {
            h2: {
              fontSize: theme('fontSize.2xl')[0],
            },
            address: {
              marginBottom: em(24, 18),
            },
          },
        },
        dark: {
          css: {
            code: {
              color: theme('colors.brand.200'),
            },
            h2: {
              color: theme('colors.gray.50'),
              '&::before': {
                color: theme('colors.gray.400'),
              },
            },
            p: {
              color: theme('colors.gray.200'),
            },
            strong: {
              color: theme('colors.gray.50'),
            },
            address: {
              color: theme('colors.gray.200'),
            },
          },
        },
      }),
    },
  },
  variants: {
    extend: {
      typography: ['dark'],
      inset: ['open'],
    },
  },
  plugins: [
    plugin(({ addVariant, e }) => {
      addVariant('open', ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          return `.is-open.${e(`open${separator}${className}`)}`
        })
      })
    }),
    require('@tailwindcss/typography'),
  ],
}
