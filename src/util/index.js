export const createElementFunc = (...rest) => {
	const [el, attributes] = [...rest];
	const args = [...rest];
	var node = document.createElement(el);
	if (attributes) {
		for (var attr in attributes) {
			if (attributes.hasOwnProperty(attr)) {
				node.setAttribute(attr, attributes[attr]);
			}
		}
	}

	for (var i = 2, len = args.length; i < len; i++) {
		var child = args[i];
		if (typeof child == 'string') {
			child = document.createTextNode(child);
		}
		node.appendChild(child);
	}
	return node;
};

export const appendEl = (p, c) => {
	return p.appendChild(c);
};
