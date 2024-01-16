import { ReactiveEffect } from '../reactivity';
import type { Component } from './component';
import { Text, normalizeVNode, type VNode } from './vnode';

export type RendererNode = {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  [key: string]: any;
};
export type RendererElement = RendererNode;

export type RendererOptions<
  HostNode = RendererNode,
  HostElement = RendererElement
> = {
  createElement(tagName: string): HostNode;

  createText(text: string): HostNode;

  setText(node: HostNode, text: string): void;

  setElementText(node: HostNode, text: string): void;

  insert(child: HostNode, parent: HostNode, anchor?: HostNode | null): void;

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  patchProp(el: HostElement, key: string, value: any): void;
};

export type RootRenderFunction<HostElement = RendererElement> = (
  vnode: Component,
  container: HostElement
) => void;

export type Renderer<T extends RendererElement = RendererElement> = {
  render: RootRenderFunction<T>;
};

export const createRenderer = <T extends RendererElement>({
  createElement,
  patchProp,
  insert,
  createText,
  setText,
}: RendererOptions<T>) => {
  const mountElement = (vnode: VNode, container: T) => {
    const { type, props } = vnode;
    vnode.el = createElement(type as string);
    const el = vnode.el as T;

    mountChildren(vnode.children as VNode[], el);

    if (props) {
      for (const key in props) {
        patchProp(el, key, props[key]);
      }
    }

    insert(el, container);
  };

  const mountChildren = (children: VNode[], container: T) => {
    for (const [index, node] of children.entries()) {
      // なんでかわからないけど必須
      children[index] = normalizeVNode(node);
      const child = children[index];
      patch(null, child, container);
    }
  };

  const patchElement = (n1: VNode, n2: VNode) => {
    n2.el = n1.el;
    const el = n2.el as T;

    const props = n2.props;

    patchChildren(n1, n2, el);

    for (const key in props) {
      if (props[key] !== n1.props?.[key]) {
        patchProp(el, key, props[key]);
      }
    }
  };

  const patchChildren = (n1: VNode, n2: VNode, container: T) => {
    const c1 = n1.children as VNode[];
    const c2 = n2.children as VNode[];

    for (const [index, node] of c2.entries()) {
      c2[index] = normalizeVNode(node);
      const child = c2[index];
      patch(c1[index], child, container);
    }
  };

  const processElement = (n1: VNode | null, n2: VNode, container: T) => {
    if (n1 === null) {
      mountElement(n2, container);
    } else {
      patchElement(n1, n2);
    }
  };

  const processText = (n1: VNode | null, n2: VNode, container: T) => {
    if (n1 == null) {
      n2.el = createText(n2.children as string);
      insert(n2.el as T, container);
    } else {
      n2.el = n1.el;
      const el = n2.el as T;
      if (n2.children !== n1.children) {
        setText(el, n2.children as string);
      }
    }
  };

  const patch = (n1: VNode | null, n2: VNode, container: T) => {
    const { type } = n2;
    if (type === Text) {
      processText(n1, n2, container);
    } else {
      processElement(n1, n2, container);
    }
  };

  const render: RootRenderFunction<T> = (rootComponent, container) => {
    const componentRender = rootComponent.setup?.();

    let n1: VNode | null = null;

    const updateComponent = () => {
      const n2 = componentRender?.();
      patch(n1, n2, container);
      n1 = n2;
    };

    const effect = new ReactiveEffect(updateComponent);
    effect.run();
  };

  return { render };
};
