import React from 'react';

const List = ({ data }) => {
	console.log(data.length);
	// const ImageDraw = () => {
	// 	const image = new Image();
	// 	image.src = src;
	// 	image.onload = () => {
	// 		const canvasWrap = document.querySelector('.canvas-wrap-list');
	// 		if (canvasWrap.children) canvasWrap.innerHTML = '';

	// 		const canvas = document.createElement('canvas');
	// 		canvas.width = image.width;
	// 		canvas.height = image.height;
	// 		const context = canvas.getContext('2d');
	// 		context.drawImage(image, 0, 0, image.width, image.height);
	// 		canvasWrap.appendChild(canvas);
	// 	};
	// };
	return (
		<>
			<div className="canvasWrap"></div>
		</>
	);
};

export default List;
