import React from "react";
import { Calendar, Badge } from "rsuite";
import "rsuite/dist/rsuite.min.css"; // Style cho RSuite
import { useSelector, useDispatch } from "react-redux";
import { addTaskForDay, RootState } from "./store";
import moment from "moment";

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.calendar.tasks);

  // Giả lập thêm công việc khi chọn ngày (sau này có thể thêm logic thêm/sửa/xóa)
  const handleSelectDay = (date: Date) => {
    console.log(date);

    dispatch(
      addTaskForDay({
        id: moment().unix().toString(),
        date: date,
        title: "Task 1",
        content: "Nội dung task 1",
        status: "open",
        assigner: "Admin",
      })
    );
  };

  // Render badge nếu ngày có công việc
  const renderCell = (date: Date) => {
    const thisDayTasks = tasks.filter((task) =>
      moment(task.date).isSame(date, "day")
    );
    const hasTasks = thisDayTasks.length > 0;
    if (hasTasks) {
      return (
        <div className="absolute top-0 right-0 p-1">
          <Badge content={tasks.length} className="bg-red-500 text-white" />
          {thisDayTasks.map((task, index) => (
            <div key={index}>
              <span>{task.title}</span>
              <span>{task.content}</span>
              <span>{task.assigner}</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Lịch công việc</h1>
        <Calendar bordered renderCell={renderCell} onSelect={handleSelectDay} />
      </div>
    </div>
  );
};

export default Home;
