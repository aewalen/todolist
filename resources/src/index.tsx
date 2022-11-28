import React, { ChangeEvent, useState } from "react";
import ReactDOM from "react-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import { IconButton, ListItem } from "@mui/material";
import { green, red } from "@mui/material/colors";
import { Container } from "@mui/system";

type TodoState = {
  todo: string[];
  completed: string[];
  currentInput: string;
};

const TodoApp = () => {
  const [state, setState] = useState<TodoState>({
    todo: [],
    completed: [],
    currentInput: "",
  });

  function addTodo() {
    if (
      state.currentInput != "" &&
      state.todo.every((text) => text != state.currentInput)
    ) {
      setState({
        todo: [state.currentInput, ...state.todo],
        completed: state.completed,
        currentInput: "",
      });
    }
  }

  function deleteTodo(text: string) {
    setState({
      todo: state.todo.filter((t) => t != text),
      completed: state.completed.filter((t) => t != text),
      currentInput: state.currentInput,
    });
  }

  function completeTodo(text: string) {
    setState({
      todo: state.todo.filter((t) => t != text),
      completed: [text, ...state.completed],
      currentInput: state.currentInput,
    });
  }

  function uncompleteTodo(text: string) {
    setState({
      todo: [text, ...state.todo],
      completed: state.completed.filter((t) => t != text),
      currentInput: state.currentInput,
    });
  }

  function changeInput(e: ChangeEvent<HTMLInputElement>) {
    setState({
      todo: state.todo,
      completed: state.completed,
      currentInput: e.target.value,
    });
  }

  function TodoElement(props: { text: string; completed: boolean }) {
    return (
      <ListItem
        secondaryAction={
          <>
            <IconButton onClick={() => deleteTodo(props.text)}>
              <DeleteIcon sx={{ color: red[300] }} />
            </IconButton>
            <IconButton
              onClick={() =>
                !props.completed
                  ? completeTodo(props.text)
                  : uncompleteTodo(props.text)
              }
              edge="end"
            >
              <CheckIcon sx={{ color: green[300] }} />
            </IconButton>
          </>
        }
      >
        {props.text}
      </ListItem>
    );
  }

  return (
    <Container maxWidth="md">
      <header>
        <input
          value={state.currentInput}
          onChange={changeInput}
          type="text"
          placeholder="Enter an activity..."
          id="item"
        />
        <button id="add" onClick={addTodo}></button>
      </header>
      <div className="container">
        <ul className="todo" id="todo">
          {state.todo.map((text) => (
            <TodoElement text={text} completed={false} />
          ))}
        </ul>
        <ul className="todo" id="completed">
          {state.completed.map((text) => (
            <TodoElement text={text} completed={true} />
          ))}
        </ul>
      </div>
    </Container>
  );
};

ReactDOM.render(<TodoApp />, document.getElementById("root"));
