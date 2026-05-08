import { useEffect, useState } from "react";

import API from "../services/api";

function Projects() {
  const [projects, setProjects] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const fetchProjects = async () => {
    try {
      const res = await API.get(
        "/projects"
      );

      setProjects(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProjects();
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
      await API.post(
        "/projects",
        formData
      );

      alert("Project Created");

      fetchProjects();

      setFormData({
        title: "",
        description: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>Projects</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Project Title"
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

        <button type="submit">
          Create Project
        </button>
      </form>

      <hr />

      {projects.map((project) => (
        <div
          key={project.id}
          style={{
            border: "1px solid gray",
            padding: "15px",
            marginBottom: "15px",
          }}
        >
          <h3>{project.title}</h3>

          <p>{project.description}</p>
        </div>
      ))}
    </div>
  );
}

export default Projects;