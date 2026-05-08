import { useEffect, useState } from "react";

import API from "../services/api";

function Dashboard() {

  const logout = () => {
  localStorage.removeItem("token");

  window.location.href = "/login";
  };

  const [tasks, setTasks] = useState([]);

  const [stats, setStats] = useState({
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0,
    inProgressTasks: 0,
  });

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    assignedTo: "",
    status: "Todo",
  });

  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks");

      setTasks(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchStats = async () => {
    try {
        const res = await API.get(
        "/dashboard"
        );

        setStats(res.data);
    }     catch (error) {
        console.log(error);
    }
};

  useEffect(() => {
    fetchTasks();
    fetchStats();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/tasks", formData);

      alert("Task Created");

      fetchTasks();
      fetchStats();

      setFormData({
        title: "",
        description: "",
        assignedTo: "",
        status: "Todo",
      });
    } catch (error) {
      console.log(error);

      alert("Error creating task");
    }
  };

  const updateStatus = async (
    id,
    status
  ) => {
    try {
      await API.put(`/tasks/${id}`, {
        status,
      });

      fetchTasks();
      fetchStats();

    } catch (error) {
      console.log(error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);

      fetchTasks();
      fetchStats();

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ padding: "30px" }}>
    <h1>Task Dashboard</h1>
        <button onClick={logout}>
        Logout
        </button>
        
        <div
            style={{
            display: "flex",
            gap: "20px",
            marginBottom: "30px",
            flexWrap: "wrap",
            }}
  >
        <div
            style={{
            border: "1px solid gray",
            padding: "20px",
            width: "200px",
            }}
  >
    <h3>Total Tasks</h3>

    <p>{stats.totalTasks}</p>
    </div>

        <div
            style={{
            border: "1px solid gray",
            padding: "20px",
            width: "200px",
            }}
  >
    <h3>Completed</h3>

    <p>{stats.completedTasks}</p>
    </div>

            <div
                style={{
                border: "1px solid gray",
                padding: "20px",
                width: "200px",
                }}
>
    <h3>Pending</h3>

    <p>{stats.pendingTasks}</p>
    </div>

                <div
                style={{
                border: "1px solid gray",
                padding: "20px",
                width: "200px",
                }}
  >
    <h3>In Progress</h3>

    <p>{stats.inProgressTasks}</p>
    </div>
    </div>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Task Title"
          value={formData.title}
          onChange={handleChange}
        />

        <br />
        <br />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
        />

        <br />
        <br />

        <input
          type="text"
          name="assignedTo"
          placeholder="Assigned To"
          value={formData.assignedTo}
          onChange={handleChange}
        />

        <br />
        <br />

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
        >
          <option value="Todo">
            Todo
          </option>

          <option value="In Progress">
            In Progress
          </option>

          <option value="Done">
            Done
          </option>
        </select>

        <br />
        <br />

        <button type="submit">
          Create Task
        </button>
      </form>

      <hr />

      <h2>All Tasks</h2>

      {tasks.map((task) => (
        <div
          key={task.id}
          style={{
            border: "1px solid gray",
            padding: "15px",
            marginBottom: "15px",
          }}
        >
          <h3>{task.title}</h3>

          <p>{task.description}</p>

          <p>
            <strong>Assigned To:</strong>{" "}
            {task.assignedTo}
          </p>

          <p>
            <strong>Status:</strong>{" "}
            {task.status}
          </p>

          <button
            onClick={() =>
              updateStatus(
                task.id,
                "In Progress"
              )
            }
          >
            In Progress
          </button>

          {" "}

          <button
            onClick={() =>
              updateStatus(
                task.id,
                "Done"
              )
            }
          >
            Done
          </button>

          {" "}

          <button
            onClick={() =>
              deleteTask(task.id)
            }
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;