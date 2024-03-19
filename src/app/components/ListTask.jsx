import TaskCard from "./TaskCard";

const loadTasks = async () => {
	const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/tasks/`, {
		cache: "no-cache",
	});

	const result = await response.json();

	return result;
};

const ListTask = async () => {
	const tasks = await loadTasks();

	return (
		<div className="bg-gray-800 p-3 flex flex-col w-full gap-2 rounded-sm min-h-[calc(100vh-88px)]">
			<h2 className="text-center">List Task</h2>
			<div className="flex flex-col gap-2">
				{tasks.map((task) => (
					<TaskCard key={task.id} task={task} />
				))}
			</div>
		</div>
	);
};
export default ListTask;
