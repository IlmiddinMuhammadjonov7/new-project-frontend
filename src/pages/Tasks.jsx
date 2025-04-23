import React, { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import { TaskCard } from "../components/TaskCard";
import { useNavigate } from "react-router-dom";
import { fetchAssignments, fetchLesson } from "../services/assignmentService";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadTasks = async () => {
      const assignments = await fetchAssignments();

      const tasksWithLessons = await Promise.all(assignments.map(async (a) => {
        const lesson = await fetchLesson(a.lessonId);
        const submission = a.submissions?.[0];
        let status = "Yuborish";

        if (submission) {
          if (a.status === "COMPLETED") status = "Bajarildi";
          else if (a.status === "REJECTED") status = "Muvaffaqiyatsiz";
          else status = "Bajarilmadi";
        }

        return {
          id: a.id,
          number: a.id,
          title: lesson.title,
          description: a.description,
          status,
        };
      }));

      setTasks(tasksWithLessons);
    };

    loadTasks();
  }, []);

  const handleTaskClick = (task) => {
    navigate(`/dashboard/tasks/${task.id}`);
  };

  return (
    <div>
      <PageHeader title="Topshiriqlar" />
      <div className="mt-6 flex flex-wrap gap-6 justify-start ml-4">
        {tasks.map((task, indes) => (
          <div key={task.id} onClick={() => handleTaskClick(task)} className="cursor-pointer">
            <TaskCard {...task} indes={indes}/>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tasks;
