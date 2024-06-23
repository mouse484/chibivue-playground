import type { VNode } from './vnode'

export type RendererNode = Record<string, unknown>
export type RendererElement = RendererNode

export interface RendererOptions<
  HostNode = RendererNode,
  HostElement = RendererElement,
> {
  // eslint-disable-next-line ts/no-explicit-any
  patchProp: (element: HostElement, key: string, value: any) => void

  createElement: (tagName: string) => HostElement
  createText: (text: string) => HostNode

  setElementText: (node: HostNode, text: string) => void

  insert: (child: HostNode | HostElement, parent: HostNode | HostElement, anchor?: HostNode | null) => void
}

export type RootRenderFunction<HostElement = RendererElement> = (
  message: string,
  container: HostElement,
) => void

export function createRenderer<
  HostNode = RendererNode,
HostElement = RendererElement,
>(
  options: RendererOptions<HostNode, HostElement>,
) {
  const {
    patchProp: hostPatchProp,
    createElement: hostCreateElement,
    createText: hostCreateText,
    insert: hostInsert,
  } = options

  function renderVNode(vnode: VNode | string) {
    if (typeof vnode === 'string') {
      return hostCreateText(vnode)
    }
    const el = hostCreateElement(vnode.type)

    Object.entries(vnode.props).forEach(([key, value]) => {
      hostPatchProp(el, key, value)
    })

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
