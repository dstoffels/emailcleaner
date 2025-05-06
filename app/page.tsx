import UploadSelect from '@/components/UploadSelect';

export default function Page() {
	return (
		<main className="flex min-h-screen items-center justify-center p-6 ">
			<div className="w-full max-w-xl rounded-xl bg-gray-700 p-6 shadow">
				<UploadSelect />
			</div>
		</main>
	);
}
