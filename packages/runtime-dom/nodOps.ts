import type { RendererOptions } from '../runtime-core';

export const nodeOps = {
  createElement(tagName) {
    return document.createElement(tagName);
  },
  createText(text) {
    return document.createTextNode(text);
  },
  setElementText(node, text) {
    node.textContent = text;
  },
  insert: (child, parent, anchor) => {
    parent.insertBefore(child, anchor || null);
  },
} satisfies Omit<RendererOptions<Node>, 'patchProp'>;
