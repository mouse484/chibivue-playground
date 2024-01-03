import type { RendererOptions } from '../runtime-core';

export const nodeOps = {
  setElementText(node, text) {
    node.textContent = text;
  },
} satisfies RendererOptions<Node>;
