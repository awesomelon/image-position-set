import React, { useEffect } from 'react';
import './canvas.css';
import interact from 'interactjs';

const dragMoveListener = event => {
	var target = event.target;
	// keep the dragged position in the data-x/data-y attributes
	var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
	var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;
	// translate the element
	target.style.webkitTransform = target.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
	// update the posiion attributes
	target.setAttribute('data-x', x);
	target.setAttribute('data-y', y);
	target.style.cssText = `cursor:grab; position:absolute; left:${x}px; top:${y}px`;
};

const dragImageEnd = (e, parent, className) => {
	if (e.type === 'dragend') {
		let image = new Image();
		if (!e.target.src) return;
		image.src = e.target.src;
		image.style.cssText = `cursor:grab; position:absolute;`;
		image.className = className;
		parent.appendChild(image);
		interact(image).draggable({
			inertia: true,
			modifiers: [
				interact.modifiers.restrictRect({
					// restriction: 'parent',
					endOnly: true
				})
			],
			autoScroll: true,

			onmove: dragMoveListener,
			onend: function(event) {
				console.log('moved a distance of ' + Math.sqrt((Math.pow(event.pageX - event.x0, 2) + Math.pow(event.pageY - event.y0, 2)) | 0).toFixed(2) + 'px');
			}
		});
	}
};

const CreateCanvas = ({ data }) => {
	useEffect(() => {
		const wrap = document.querySelector('.canvas-wrap-bg ul');
		let li = document.createElement('li');
		let image = new Image();
		let button = document.createElement('button');
		button.value = 'X';
		button.innerText = 'X';
		button.addEventListener('click', e => {
			Array.from(document.querySelectorAll(`.${e.target.parentNode.className}`)).map(t => {
				t.parentNode.removeChild(t);
			});
		});
		const roots = document.querySelector('.drag-zone');
		data.map((img, idx) => {
			if (!img.src) return;
			image = new Image();
			image.src = img.src;
			image.style.width = '100%';
			image.style.height = '100%';
			li = document.createElement('li');
			li.classList.add(`file${idx}`);
			li.setAttribute('draggable', true);
			li.ondragend = e => {
				dragImageEnd(e, roots, `file${idx}`);
			};

			li.id = idx;
			image.onload = () => {
				li.appendChild(image);
				li.appendChild(button);
			};
		});
		if (!image.src) return;
		wrap.appendChild(li);
	});

	return (
		<>
			<div className="canvas-wrap-bg">
				<ul></ul>
			</div>
			<div className="drag-zone"></div>
		</>
	);
};

export default CreateCanvas;
