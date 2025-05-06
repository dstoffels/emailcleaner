'use client';

import { useState } from 'react';
import CsvUploader from './CsvUploader';
import ImgUploader from './ImgUploader';

export default function UploadSelect() {
	const [uploadType, setUploadType] = useState<'csv' | 'image' | ''>('');
	const [csvFile, setCsvFile] = useState<File | null>(null);
	const [imageFile, setImageFile] = useState<File | null>(null);

	const handleCsvFileSelect = (file: File) => {
		setCsvFile(file);
	};

	const handleImageFileSelect = (file: File) => {
		setImageFile(file);
	};

	return (
		<div className="w-full max-w-md space-y-6">
			<label className="block text-lg font-semibold">Select Upload Type</label>
			<select
				value={uploadType}
				onChange={(e) => setUploadType(e.target.value as 'csv' | 'image')}
				className="w-full border border-gray-300 rounded px-4 py-2 bg-white text-gray-700 focus:ring-2 focus:ring-blue-500"
			>
				<option value="">-- Choose an option --</option>
				<option value="csv">CSV Upload</option>
				<option value="image">Image Upload</option>
			</select>

			{uploadType === 'csv' && <CsvUploader />}
			{uploadType === 'image' && <ImgUploader />}
		</div>
	);
}
