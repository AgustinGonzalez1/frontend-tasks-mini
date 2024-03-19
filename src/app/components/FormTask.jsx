"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

const FormTask = () => {
	const {
		handleSubmit,
		register,
		formState: { errors },
		reset,
	} = useForm();

	const router = useRouter();

	const onSubmit = handleSubmit(async (data) => {
		const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/tasks/`, {
			method: "POST",
			body: JSON.stringify({
				title: data.title,
				description: data.description,
			}),
			headers: {
				"Content-Type": "application/json",
			},
		});

		const result = await response.json();

		if (response.ok) {
			reset();
		}
		router.refresh();
	});

	return (
		<form onSubmit={onSubmit} className="bg-gray-800 p-3 flex flex-col w-full gap-2 rounded-sm h-fit">
			<h2 className="text-center">Add Task</h2>
			<input
				{...register("title", { required: "Title is required" })}
				type="text"
				name="title"
				className="w-full rounded-sm text-gray-800 p-2"
				placeholder="Title"
			/>
			{<p className="text-red-500">{errors?.title?.message}</p>}
			<textarea
				{...register("description", { required: "Description is required" })}
				name="description"
				rows="4"
				className="w-full rounded-sm text-gray-800 p-2"
				placeholder="Description"></textarea>
			{<p className="text-red-500">{errors?.description?.message}</p>}
			<button className="bg-indigo-600 px-3 py-1 text-white">Save</button>
		</form>
	);
};
export default FormTask;
