import { defineElement, selectElement } from '../../base/elements.js'

defineElement('main-nav-toggle', (element) => {
  element.addEventListener('click', handleMainNavToggleClick)

  /**
   * @param {MouseEvent} event
   */
  function handleMainNavToggleClick(event) {
    const menuElements = selectElement('main-nav')
  }
})
