import React, { useState, useRef, useEffect } from 'react';
import interact from 'interactjs';
import { createElementFunc, appendEl } from '../../util';
import './canvas.css';

const CreateList = ({ data, dragEnd }) => {
	return (
		<>
			{data.map((img, idx) => {
				if (!img.src) return;
				return (
					<li className={`files${idx}`} key={idx} onDragEnd={e => dragEnd(e)}>
						<img src={img.src} alt='' />
						<button className='xButton' value='X'>
							X
						</button>
						<button className='oButton' value='O'>
							O
						</button>
						<input type='text' placeholder='id 입력' />
					</li>
				);
			})}
		</>
	);
};

const CreateCanvas = ({ data }) => {
	const dragzone = useRef();
	const dragMoveListener = event => {
		const target = event.target;
		const x = Math.floor(parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
		const y = Math.floor(parseFloat(target.getAttribute('data-y')) || 0) + event.dy;
		target.style.webkitTransform = target.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
		target.setAttribute('data-x', x);
		target.setAttribute('data-y', y);
		target.children[0].innerText = `top:${y}px, left:${x}px`;
	};

	const dragImageEnd = e => {
		if (e.type === 'dragend') {
			let image = new Image();
			if (!e.target.src) return;
			image.src = e.target.src;
			let p = document.createElement('p');
			let div = createElementFunc('div', { class: 'files', style: 'cursor:grab; position:absolute;' });
			appendEl(div, p);
			appendEl(div, image);
			appendEl(dragzone.current, div);
			interact(div).draggable({
				inertia: true,
				modifiers: [
					interact.modifiers.restrictRect({
						restriction: 'parent',
						endOnly: true
					})
				],
				autoScroll: true,
				onmove: dragMoveListener
			});
		}
	};

	return (
		<>
			<div className='canvas-wrap-bg'>
				<ul>
					<CreateList data={data} dragEnd={dragImageEnd} />
				</ul>
			</div>
			<div className='drag-zone' ref={dragzone}></div>
		</>
	);
};

export default CreateCanvas;
