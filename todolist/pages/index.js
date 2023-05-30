import React, { useEffect, useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  Checkbox,
  IconButton,
  TextField,
  styled,
  Stack,
  Typography,
  Box,
  Collapse,
  Button,
} from "@mui/material";
import { TransitionGroup } from "react-transition-group";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

const StyledListItemText = styled(ListItemText)(({ theme }) => ({}));
const StyledBox = styled(Box)(({ theme }) => ({}));

const DeleteIconButton = styled(IconButton)(({ theme }) => ({
  "&:hover": {
    backgroundColor: "transparent",
  },
}));

function Home() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  const handleToggle = (taskId) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const handleDelete = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const handleAddTask = () => {
    if (newTask.trim() === "") {
      return;
    }

    const newTaskObj = {
      id: tasks.length + 1,
      title: newTask.trim(),
      completed: false,
    };

    const updatedTasks = [...tasks, newTaskObj];
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));

    setNewTask("");
  };

  const handleUpdateTask = (taskId, newTitle) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, title: newTitle };
      }
      return task;
    });
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  return (
    <div
      style={{
        textAlign: "center",
        backgroundColor: "#f5f5f5",
        padding: "2rem",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{ marginBottom: 5 }}
        color="secondary"
      >
        Todo List
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 2,
        }}
      >
        <TextField
          label="Add Task"
          variant="outlined"
          value={newTask}
          size="small"
          onChange={(e) => setNewTask(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleAddTask();
            }
          }}
          inputProps={{ "data-testid": "add-task-input" }}
          sx={{ marginBottom: "1rem" }}
          //data-testid=""
        />
        <Button
          variant="contained"
          size="large"
          onClick={() => handleAddTask()}
          disabled={!newTask}
          sx={{ alignSelf: "flex-start" }}
          data-testid="add-task-button"
        >
          Add
        </Button>
      </Box>
      <List
        dense
        sx={{
          width: "100%",
          maxWidth: 360,
          margin: "0 auto",
          bgcolor: "white",
          borderRadius: "8px",
        }}
      >
        <TransitionGroup>
          {tasks.map((task) => (
            <Collapse key={task.id} in={true}>
              <ListItem>
                <Checkbox
                  edge="start"
                  checked={task.completed}
                  onChange={() => handleToggle(task.id)}
                  inputProps={{
                    "aria-labelledby": `checkbox-list-secondary-label-${task.id}`,
                    "data-testid": `checkbox-task-${task.id}`,
                  }}
                />
                <StyledBox
                  sx={{
                    display: "flex",
                    ":hover": {
                      bgcolor: "#eee",
                    },
                    width: "100%",
                    paddingX: 1,
                    borderRadius: 2,
                    transition: "all 0.3s linear",
                  }}
                >
                  <StyledListItemText
                    primary={
                      <TextField
                        value={task.title}
                        onChange={(e) =>
                          handleUpdateTask(task.id, e.target.value)
                        }
                        fullWidth
                        sx={{
                          textDecoration: task.completed
                            ? "line-through"
                            : "none",
                          color: task.completed
                            ? "rgba(0, 0, 0, 0.5)"
                            : "inherit",
                        }}
                        variant="standard"
                        InputProps={{
                          disableUnderline: true,
                        }}
                        inputProps={{ "data-testid": `task-title-${task.id}` }}
                      />
                    }
                  />
                  <Stack
                    direction="row"
                    alignItems="center"
                    spacing={1}
                    sx={{ opacity: 1, transition: "opacity 0.3s" }}
                    className="delete-icon"
                  >
                    <DeleteIconButton
                      aria-label="delete"
                      sx={{ opacity: 1 }}
                      onClick={() => handleDelete(task.id)}
                      data-testid={`delete-task-${task.id}`}
                    >
                      <DeleteIcon />
                    </DeleteIconButton>
                  </Stack>
                </StyledBox>
              </ListItem>
            </Collapse>
          ))}
        </TransitionGroup>
      </List>
    </div>
  );
}

export default Home;
