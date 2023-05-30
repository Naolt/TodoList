import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "../pages/index";

describe("Home component", () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });

  test("renders the Todo List component", () => {
    render(<Home />);

    // Check if the Todo List heading is rendered
    const headingElement = screen.getByText(/Todo List/i);
    expect(headingElement).toBeInTheDocument();

    // Check if the Add Task input is rendered
    const addTaskInput = screen.getByTestId("add-task-input");
    expect(addTaskInput).toBeInTheDocument();

    // Check if the Add Task button is rendered
    const addTaskButton = screen.getByTestId("add-task-button");
    expect(addTaskButton).toBeInTheDocument();
  });

  test("adds a new task to the list", () => {
    render(<Home />);

    // Add a new task
    const addTaskInput = screen.getByTestId("add-task-input");
    const addTaskButton = screen.getByTestId("add-task-button");
    fireEvent.change(addTaskInput, { target: { value: "New Task" } });
    fireEvent.click(addTaskButton);

    // Check if the new task is added to the list
    const taskTitle = screen.getByTestId("task-title-1");
    expect(taskTitle).toBeInTheDocument();
  });

  test("toggles task completion when checkbox is clicked", () => {
    render(<Home />);

    // Add a new task
    const addTaskInput = screen.getByTestId("add-task-input");
    const addTaskButton = screen.getByTestId("add-task-button");
    fireEvent.change(addTaskInput, { target: { value: "New Task" } });
    fireEvent.click(addTaskButton);

    // Click the checkbox to toggle completion
    const checkbox = screen.getByTestId("checkbox-task-1");
    fireEvent.click(checkbox);

    // Check if the task is marked as completed
    expect(checkbox).toHaveProperty("checked", true);
  });

  test("deletes a task when delete button is clicked", () => {
    render(<Home />);

    // Add a new task
    const addTaskInput = screen.getByTestId("add-task-input");
    const addTaskButton = screen.getByTestId("add-task-button");
    fireEvent.change(addTaskInput, { target: { value: "New Task" } });
    fireEvent.click(addTaskButton);

    // Click the delete button to delete the task
    const deleteButton = screen.getByTestId("delete-task-1");
    fireEvent.click(deleteButton);

    // Check if the task is deleted from the list
    const taskTitle = screen.queryByText("New Task");
    expect(taskTitle).not.toBeInTheDocument();
  });
});
