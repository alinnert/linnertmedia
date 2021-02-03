/**
 * @param { string } name
 * @param { (
 *  element: HTMLElement,
 *  { getChildElements }: {
 *    getChildElements: (name: string) => HTMLElement[]
 *  }
 * ) => void } setup
 */
export function defineElement(name, setup) {
  const elements = Array.from(
    /** @type { NodeListOf<HTMLElement> } */
    (document.querySelectorAll(`[data-element="${name}"]`))
  )

  elements.forEach((element) => {
    /**
     * @param { string } childrenName
     * @returns { HTMLElement[] }
     */
    function getChildElements(childrenName) {
      return Array.from(
        element.querySelectorAll(`[data-element="${name}/${childrenName}"]`)
      )
    }

    setup(element, { getChildElements })
  })
}

/**
 * @param { string } name
 * @returns { HTMLElement[] }
 */
export function selectElement(name) {
  return Array.from(
    globalThis.document.querySelectorAll(`[data-element="${name}"]`)
  )
}
