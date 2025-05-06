'use client';

import { useState } from 'react';

interface ImgUploaderProps {}

const ImgUploader: React.FC<ImgUploaderProps> = ({}) => {
	const [imageFile, setImageFile] = useState<File | null>(null);

	const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			setImageFile(file);
		}
	};

	return (
		<div className="mt-4 border p-4 rounded bg-gray-900">
			<label className="block mb-2 font-medium">Upload Form Image</label>
			<label
				htmlFor="image-upload"
				className="block cursor-pointer w-full text-center px-6 py-3 border-2 border-green-500 rounded-lg bg-green-50 hover:bg-green-100 text-green-500 font-semibold"
			>
				{imageFile ? `File Selected: ${imageFile.name}` : 'Choose Image File'}
			</label>
			<input
				id="image-upload"
				type="file"
				accept="image/*"
				className="hidden"
				onChange={handleImageChange}
			/>
			{imageFile && (
				<div className="mt-4">
					<img
						src={URL.createObjectURL(imageFile)}
						alt="Image Preview"
						className="w-full h-auto rounded-lg"
					/>
				</div>
			)}
		</div>
	);
};

export default ImgUploader;
