"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const TaskCard = ({ task }) => {
	const router = useRouter();
	const [edit, setEdit] = useState(false);
	const [newTitle, setNewTitle] = useState(task.title);
	const [newDescription, setNewDescription] = useState(task.description);
	const handleDelete = async (id) => {
		const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/tasks/${id}/`, {
			method: "DELETE",
		});

		if (response.status === 204) {
			router.refresh();
		}
	};

	const handleEdit = (editing) => {
		setEdit(editing);
	};

	const handleDone = async (id) => {
		const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/tasks/${id}/completed/`, {
			method: "POST",
		});

		if (response.status === 200) {
			router.refresh();
		}
	};

	const handleUpdate = async (id) => {
		const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/tasks/${id}/`, {
			method: "PUT",
			body: JSON.stringify({
				title: newTitle,
				description: newDescription,
			}),
			headers: {
				"Content-Type": "application/json",
			},
		});

		if (response.status === 200) {
			setEdit(false);
		}
	};

	return (
		<div className="bg-gray-700 p-3 flex w-full gap-2 rounded-sm justify-between">
			<div className="flex flex-col gap-4">
				{!edit ? (
					<h3 className="text-xl">
						{newTitle} {task.completed && <span className="text-green-500">✅</span>}
					</h3>
				) : (
					<input
						type="text"
						defaultValue={newTitle}
						className="text-white bg-transparent outline-none border-white border-2 px-2"
						onChange={(e) => setNewTitle(e.target.value)}
					/>
				)}

				{!edit ? (
					<p className="text-sm">{newDescription}</p>
				) : (
					<input
						defaultValue={newDescription}
						className="text-white bg-transparent outline-none border-white border-2 px-2"
						onChange={(e) => setNewDescription(e.target.value)}
					/>
				)}
			</div>
			{!edit ? (
				<div className="flex gap-5 items-center">
					{!task.completed && (
						<div>
							<button onClick={() => handleDone(task.id)} className="bg-green-500 px-4 py-1 rounded-sm">
								Done
							</button>
						</div>
					)}
					<div className="flex gap-2 flex-col">
						<button onClick={() => handleEdit(!edit)} className="bg-blue-500 py-1 rounded-sm">
							Edit
						</button>
						<button onClick={() => handleDelete(task.id)} className="bg-red-500 px-3 py-1 rounded-sm">
							Delete
						</button>
					</div>
				</div>
			) : (
				<div className="flex items-center">
					<button className="bg-blue-500 px-4 py-1 rounded-sm" onClick={() => handleUpdate(task.id)}>
						Save
					</button>
				</div>
			)}
		</div>
	);
};
export default TaskCard;
