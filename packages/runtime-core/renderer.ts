export type RendererNode = unknown
export type RendererElement = RendererNode

export interface RendererOptions<HostNode = RendererNode> {
  setElementText: (node: HostNode, text: string) => void
}

export type RootRenderFunction<HostElement = RendererElement> = (
  message: string,
  container: HostElement,
) => void

export function createRenderer<HostNode = RendererElement>(options: RendererOptions<HostNode>) {
  const { setElementText: hostSetElementText } = options

  const render: RootRenderFunction<HostNode> = (message, container) => {
    hostSetElementText(container, message)
  }

  return { render }
}
