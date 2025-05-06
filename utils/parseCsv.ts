import { Row } from '@/types';
import Papa from 'papaparse';

export default async function parseCsv<T>(file: File | string): Promise<T[]> {
	let text: string;

	if (typeof file !== 'string') text = await readFileAsText(file);
	else text = file;

	const parsedResult = Papa.parse(text, {
		header: true,
		skipEmptyLines: true,
	});

	if (parsedResult.errors.length > 0) {
		throw new Error(`CSV parsing failed: ${parsedResult.errors.join('\n')}`);
	}

	return parsedResult.data as T[];
}

const readFileAsText = (file: File): Promise<string> => {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onload = () => resolve(reader.result as string);
		reader.onerror = (error) => reject(error);
		reader.readAsText(file);
	});
};
