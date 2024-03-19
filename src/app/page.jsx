import FormTask from "./components/FormTask";
import ListTask from "./components/ListTask";

export const dynamic = "force-dynamic";

export default function Home() {
	return (
		<main className="container mx-auto">
			<section className="flex flex-col gap-x-20 py-5">
				<h1 className="col-span-10 text-center text-xl pb-5">Task App</h1>

				<div className="flex w-full gap-x-20">
					<div className="flex justify-center w-[400px]">
						<FormTask />
					</div>

					<div className="w-full">
						<ListTask />
					</div>
				</div>
			</section>
		</main>
	);
}
