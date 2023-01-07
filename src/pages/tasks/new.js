import { Form, Grid, Button } from "semantic-ui-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function TaskFormPage() {
  const router = useRouter();
  const { id } = router.query;
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
  });
  const [errors, setErrors] = useState({
    title: "",
    description: "",
  });
  const validate = () => {
    const errors = {};
    if (!newTask.title) errors.title = "Title is required";
    if (!newTask.description) errors.description = "Description is required";
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let errors = validate();
    if (Object.keys(errors).length) return setErrors(errors);

    if (id) {
      await updateTask();
      console.log("updating task", newTask);
      await router.push("/");
      return;
    }

    await createTask(newTask);
    console.log("submitting form", newTask);
    await router.push("/");
  };

  const updateTask = async () => {
    try {
      await fetch(`/api/tasks/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      });
    } catch (error) {
      console.log(error);
    }
  };

  const createTask = async (task) => {
    try {
      await fetch("/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setErrors({
      ...errors,
      [e.target.name]: "",
    });

    setNewTask({
      ...newTask,
      [e.target.name]: e.target.value,
    });
  };

  const fetchTask = async () => {
    try {
      const res = await fetch(`/api/tasks/${id}`);
      const task = await res.json();
      setNewTask({
        title: task.title,
        description: task.description,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchTask();
    }
  }, [id]);

  return (
    <Grid
      centered
      verticalAlign="middle"
      columns="3"
      style={{ heigth: "80vh" }}
    >
      <Grid.Row>
        <Grid.Column textAlign="center">
          <h1>{id ? "Update Task" : "Add Task"}</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Input
              label="Title"
              placeholder="Title"
              name="title"
              onChange={handleChange}
              error={errors.title ? { content: errors.title } : null}
              value={newTask.title}
            />
            <Form.TextArea
              label="Description"
              placeholder="Description"
              onChange={handleChange}
              name="description"
              error={
                errors.description ? { content: errors.description } : null
              }
              value={newTask.description}
            />
            <Button>{id ? "Update" : "Submit"}</Button>
          </Form>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
