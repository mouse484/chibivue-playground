import type { RendererOptions } from '../runtime-core/renderer'
import { patchAttr } from './modules/attrs'
import { patchEvent } from './modules/events'

type DOMRendererOptions = RendererOptions<Node, Element>

const onRE = /^on[^a-z]/
export const isOn = (key: string) => onRE.test(key)

export const patchProp: DOMRendererOptions['patchProp'] = (element, key, value) => {
  if (isOn(key)) {
    patchEvent(element, key, value)
  } else {
    patchAttr(element, key, value)
  }
}
