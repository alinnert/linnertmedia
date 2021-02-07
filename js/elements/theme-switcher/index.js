import { commonElements } from '../../base/common-elements.js'
import { defineElement } from '../../base/elements.js'
import { storageKey } from '../../base/storageKeys.js'

defineElement('theme-switcher', (element, { getChildElements }) => {
  if (localStorage.getItem(storageKey.theme) === 'dark') {
    setTheme('dark')
  } else {
    setTheme('light')
  }

  element.addEventListener('click', handleThemeSwitcherClick)

  /**
   * @param { MouseEvent } event
   */
  function handleThemeSwitcherClick(event) {
    if (commonElements.body.classList.contains('dark')) {
      setTheme('light')
    } else {
      setTheme('dark')
    }
  }

  /**
   * @param { 'light' | 'dark' } theme
   */
  function setTheme(theme) {
    const otherTheme = theme === 'light' ? 'dark' : 'light'
    const currentThemeSwitcher = getChildElements(theme)
    const otherThemeSwitcher = getChildElements(otherTheme)

    commonElements.body.classList.toggle('dark', theme === 'dark')

    currentThemeSwitcher.forEach((switcher) =>
      switcher.classList.toggle('hidden', false)
    )

    otherThemeSwitcher.forEach((switcher) => {
      switcher.classList.toggle('hidden', true)
    })

    localStorage.setItem(storageKey.theme, theme)
  }
})
