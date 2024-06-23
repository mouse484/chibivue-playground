export function patchAttr(
  el: Element,
  key: string,
  value: string | null,
) {
  if (value) {
    el.setAttribute(key, value)
  } else {
    el.removeAttribute(key)
  }
}
