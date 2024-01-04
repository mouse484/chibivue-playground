// biome-ignore lint/complexity/noBannedTypes: <explanation>
type ComponentFunction = Function;

export type Component = {
	render?: ComponentFunction;
	setup?: () => ComponentFunction;
};
