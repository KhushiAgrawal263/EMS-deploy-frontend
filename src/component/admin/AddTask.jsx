import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import "./EmployeeDetail.css";

const AddTask = ({ props }) => {
  const todos = props.task;
  const id = props.id;
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    if (!value) return;
    const newtask = {
      task: value,
    };
    try {
      const data = await fetch(`/yupdatetask/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newtask),
      });
      const res = await data.json();
      alert(JSON.stringify(res.message));
      // setReload(true);

      window.location.href = "EmployeeDetails";
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="todo">
      <p>Project Details</p>
      {todos &&
        todos.map((todo) => (
          <div>
            <table class="table">
              <tbody>
                <tr>
                  <td>{todo.task}</td>
                </tr>
              </tbody>
            </table>
          </div>
        ))}

      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Control
            type="text"
            className="todoIn"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Add new Project "
            required
          />
        </Form.Group>
        {loading ? (
          <div
            class="spinner-border"
            role="status"
            style={{
              height: "15px",
              width: "15px",
              color: "#15074e",
              marginLeft: "70px",
              marginTop: "15px",
            }}
          >
            <button class="visually-hidden">Loading...</button>
          </div>
        ) : (
          <Button variant="primary m-3" type="submit">Submit</Button>
        )}

      </Form>
    </div>
  );
};

export default AddTask;
