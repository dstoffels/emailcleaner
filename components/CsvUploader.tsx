'use client';

import { useState } from 'react';
import parseCsv from '@/utils/parseCsv';
import { api } from '@/utils/api';
import { DMARow, Row } from '@/types';
import nexios from 'nexios';
import { TextField } from '@mui/material';

const CsvUploader = () => {
	const [csvFile, setCsvFile] = useState<File | null>(null);
	const [parsedData, setParsedData] = useState<any[] | null>(null);

	const handleCsvChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			setCsvFile(file);
			setParsedData(null);
		}
	};

	const handleParse = async () => {
		if (!csvFile) return;
		try {
			const data = await parseCsv<Row>(csvFile);

			const parsedData = await parseRows(data);
			setParsedData(parsedData);
			console.log(parsedData);
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<div className="mt-4 border p-4 rounded bg-gray-800">
			<label className="block mb-2 font-medium text-white">Upload CSV File</label>
			<label
				htmlFor="csv-upload"
				className="block cursor-pointer w-full text-center px-6 py-3 border-2 border-blue-500 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-500 font-semibold"
			>
				{csvFile ? `File Selected: ${csvFile.name}` : 'Choose CSV File'}
			</label>
			<input
				id="csv-upload"
				type="file"
				accept=".csv"
				className="hidden"
				onChange={handleCsvChange}
			/>

			{csvFile && (
				<div>
					<TextField />
					<button
						onClick={handleParse}
						className="mt-4 w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
					>
						Clean CSV
					</button>
				</div>
			)}
		</div>
	);
};

export default CsvUploader;

async function parseRows(rows: Row[]): Promise<Row[]> {
	const parsedRows: Row[] = [];
	const response = await fetch('/zip-dma.csv');
	const DMAs = await parseCsv<DMARow>(await response.text());

	for (let i = 0; i < rows.length; i++) {
		let row = rows[i];
		let { Location, Zip } = row;

		try {
			// If we have a location but no zipcode
			if (Location && !Zip) {
				const response = await api.get<string>(`/api/parse-zip?location=${Location}`, {
					cache: 'no-cache',
				});
				Zip = response.data;
			}

			const dmaRow = DMAs.find((r) => r.Zip === Zip);
			if (dmaRow) row = { ...row, ...dmaRow };
			parsedRows.push(row);
		} catch (error) {
			console.error(error);
			break;
		}
	}

	return parsedRows;
}
