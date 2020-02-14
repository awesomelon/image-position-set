import React, { useCallback, useState, createRef } from 'react';
import Dropzone from 'react-dropzone';
import './dropZone.css';
import CreateCanvas from '../createCanvas';

const dropzoneRef = createRef();

function MyDropzone() {
	const [visible, setVisible] = useState(false);
	const [imgsData, setImgsData] = useState([{}]);

	const onDropFiles = useCallback(acceptedFiles => {
		setImgsData([{}]);
		acceptedFiles.forEach(file => {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onabort = () => console.log('file reading was aborted');
			reader.onerror = () => console.log('file reading has failed');
			reader.onload = () => {
				const binaryStr = reader.result;
				setImgsData(imgsData => [...imgsData, { src: binaryStr }]);
				setVisible(true);
			};
		});
	}, []);

	const FileZone = () => {
		return (
			<Dropzone ref={dropzoneRef} onDrop={onDropFiles}>
				{({ getRootProps, getInputProps }) => (
					<div {...getRootProps()} className="dropzone dz-clickable" id="dropzone-el">
						<input {...getInputProps()} />
						<p className="dz-message">Drop the files</p>
					</div>
				)}
			</Dropzone>
		);
	};

	return (
		<>
			<FileZone />
			{visible && <CreateCanvas data={imgsData} />}
		</>
	);
}

export default MyDropzone;
