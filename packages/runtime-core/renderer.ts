import type { VNode } from './vnode'

export type RendererNode = Record<string, unknown>
export type RendererElement = RendererNode

export interface RendererOptions<HostNode = RendererNode> {
  createElement: (tagName: string) => HostNode
  createText: (text: string) => HostNode

  setElementText: (node: HostNode, text: string) => void

  insert: (child: HostNode, parent: HostNode, anchor?: HostNode | null) => void
}

export type RootRenderFunction<HostElement = RendererElement> = (
  message: string,
  container: HostElement,
) => void

export function createRenderer<HostNode = RendererElement>(
  options: RendererOptions<HostNode>,
) {
  const {
    createElement: hostCreateElement,
    createText: hostCreateText,
    insert: hostInsert,
  } = options

  function renderVNode(vnode: VNode | string) {
    if (typeof vnode === 'string')
      return hostCreateText(vnode)
    const el = hostCreateElement(vnode.type)

    for (const child of vnode.children) {
      const childEl = renderVNode(child)
      hostInsert(childEl, el)
    }

    return el
  }

  const render: RootRenderFunction<HostNode> = (vnode, container) => {
    const el = renderVNode(vnode)
    hostInsert(el, container)
  }

  return { render }
}
