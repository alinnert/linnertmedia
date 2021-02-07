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
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currenColor',
      brand: colors.cyan,
      gray: colors.warmGray,
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
            a: {
              color: theme('colors.brand.500'),
              textDecoration: 'none',
            },
            'a:hover': {
              textDecoration: 'underline',
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
            a: {
              color: theme('colors.brand.300'),
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
      borderRadius: ['first-type', 'last'],
      backgroundColor: ['after-checked', 'after-not-checked'],
      textColor: ['after-checked', 'after-not-checked'],
      display: ['checked-label', 'not-checked-label'],
      position: ['after-focus'],
      zIndex: ['after-focus'],
      ringColor: ['after-focus'],
      ringWidth: ['after-focus'],
      ringOffsetColor: ['after-focus'],
    },
  },
  plugins: [
    plugin(({ addVariant, e }) => {
      addVariant('after-checked', ({ modifySelectors, separator }) => {
        modifySelectors(
          ({ className }) =>
            `input:checked + .${e(`after-checked${separator}${className}`)}`
        )
      })

      addVariant('after-not-checked', ({ modifySelectors, separator }) => {
        modifySelectors(
          ({ className }) =>
            `input:not(:checked) + .${e(
              `after-not-checked${separator}${className}`
            )}`
        )
      })

      addVariant('after-focus', ({ modifySelectors, separator }) => {
        modifySelectors(
          ({ className }) =>
            `input:focus + .${e(`after-focus${separator}${className}`)}`
        )
      })

      addVariant('checked-label', ({ modifySelectors, separator }) => {
        modifySelectors(
          ({ className }) =>
            `input:checked + * > .${e(`checked-label${separator}${className}`)}`
        )
      })

      addVariant('not-checked-label', ({ modifySelectors, separator }) => {
        modifySelectors(
          ({ className }) =>
            `input:not(:checked) + * > .${e(
              `not-checked-label${separator}${className}`
            )}`
        )
      })

      addVariant('first-type', ({ modifySelectors, separator }) => {
        modifySelectors(
          ({ className }) =>
            `.${e(`first-type${separator}${className}`)}:first-of-type`
        )
      })
    }),
    require('@tailwindcss/typography'),
  ],
}
