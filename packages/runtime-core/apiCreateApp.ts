import { ReactiveEffect } from "../reactivity";
import type { Component } from "./component";
import type { RootRenderFunction } from "./renderer";

export interface App<HostElement> {
	mount(container: HostElement | string): void;
}

export type CreateAppFunction<HostElement> = (
	rootComponent: Component,
) => App<HostElement>;

export const createAppAPI =
	<HostElement>(
		render: RootRenderFunction<HostElement>,
	): CreateAppFunction<HostElement> =>
	(rootComponent) => {
		const app = {
			mount(container: HostElement) {
				const componentRender = rootComponent.setup?.();
				if (!componentRender) return;

				const updateComponent = () => {
					const vnode = componentRender();
					render(vnode, container);
				};

				const effect = new ReactiveEffect(updateComponent);
				effect.run();
			},
		} satisfies App<HostElement>;
		return app;
	};
