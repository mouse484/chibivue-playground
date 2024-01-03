import type { VNode } from './vnode';

export type RendererNode = {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  [key: string]: any;
};
export type RendererElement = RendererNode;

export type RendererOptions<HostNode = RendererNode> = {
  createElement(tagName: string): HostNode;

  createText(text: string): HostNode;

  setElementText(node: HostNode, text: string): void;

  insert(cjild: HostNode, parent: HostNode, anchor?: HostNode | null): void;
};

export type RootRenderFunction<HostElement = RendererElement> = (
  vnode: VNode | string,
  container: HostElement
) => void;

export type Renderer<T extends RendererElement = RendererElement> = {
  render: RootRenderFunction<T>;
};

export const createRenderer = <T extends RendererElement>(
  options: RendererOptions<T>
): Renderer<T> => {
  const { createText, createElement, insert } = options;

  const renderVNode = (vnode: VNode | string) => {
    if (typeof vnode === 'string') {
      return createText(vnode);
    }

    const el = createElement(vnode.type);

    for (const child of vnode.children) {
      insert(renderVNode(child), el);
    }

    return el;
  };
  return {
    render: (vnode, container) => {
      insert(renderVNode(vnode), container);
    },
  };
};
