export type RendererNode = {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  [key: string]: any;
};
export type RendererElement = RendererNode;

export type RendererOptions<HostNode = RendererNode> = {
  setElementText(node: HostNode, text: string): void;
};

export type RootRenderFunction<HostElement = RendererElement> = (
  message: string,
  container: HostElement
) => void;

export type Renderer<T extends RendererElement = RendererElement> = {
  render: RootRenderFunction<T>;
};

export const createRenderer = <T extends RendererElement>(
  options: RendererOptions<T>
): Renderer<T> => {
  const { setElementText } = options;
  return {
    render: (message, container) => {
      setElementText(container, message);
    },
  };
};
