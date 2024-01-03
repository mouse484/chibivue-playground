import {
  createRenderer,
  createAppAPI,
  type CreateAppFunction,
} from '../runtime-core';

import { nodeOps } from './nodOps';

const { render } = createRenderer<Node>(nodeOps);

const _createApp = createAppAPI(render);

export const createApp = ((...args) => {
  const app = _createApp(...args);
  const { mount } = app;
  app.mount = (selector: string) => {
    const container = document.querySelector(selector);
    if (!container) return;
    mount(container);
  };
  return app;
}) satisfies CreateAppFunction<Element>;
