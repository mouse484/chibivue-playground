export const createApp = (options: { render: () => string }) => {
	return {
		mount: (selector: string) => {
			const root = document.querySelector(selector);
			if (root) {
				root.innerHTML = options.render();
			}
		},
	};
};
