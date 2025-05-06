export type RawRow = {
	'Email Address': string;
	'First Name': string;
	Zip?: string;
	Location?: string;
};

export type Row = RawRow & {
	'Last Name'?: string;
	DMA?: string;
	DMA_CODE?: string;
	lat: number;
	lon: number;
};

export type DMARow = {
	Zip: string;
	DMA_CODE: string;
	DMA: string;
};
