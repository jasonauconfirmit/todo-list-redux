import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addTask, updateTask, deleteTask, getTasks } from "../../api";

export const getTasksThunk = createAsyncThunk(
  "tasks/getTasks",
  async (name, _thunkAPI) => {
    const response = await getTasks(name);
    console.log("getTasksThunk", response.data);
    return response.data;
  }
);

export const addTaskThunk = createAsyncThunk(
  "tasks/addTask",
  async ({ name, description }, _thunkAPI) => {
    const response = await addTask(name, description);
    return response.data;
  }
);

export const updateTaskThunk = createAsyncThunk(
  "tasks/updateTask",
  async (task, _thunkAPI) => {
    console.log("updateTaskThunk >>", task);
    const response = await updateTask(task);
    return response.data;
  }
);

export const deleteTaskThunk = createAsyncThunk(
  "tasks/deleteTask",
  async (task, _thunkAPI) => {
    const response = await deleteTask(task);
    console.log("deleteTaskThunk >>", response);
    return { status: response.status, id: task.id };
  }
);

export const slice = createSlice({
  name: "todo",
  initialState: { loading: false, items: [] },
  reducers: {
    // add: (state, action) => {
    //   console.log("action >>", action);
    //   state.items.push({ id: 99, name: action.payload, complete: false });
    // },
    // remove: (state, action) => {
    //   state = state.filter((task) => task.id === action.taskId);
    // },
    // complete: (state, action) => {
    //   const taskIndex = state.findIndex((task) => task.id === action.taskId);
    //   state[taskIndex].complete = true;
    // }
  },
  extraReducers: (builder) => {
    builder.addCase(addTaskThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.items.unshift(action.payload);
    });
    builder.addCase(addTaskThunk.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(addTaskThunk.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(updateTaskThunk.fulfilled, (state, action) => {
      const taskIndex = state.items.findIndex(
        (task) => task.id === action.payload.id
      );
      state.items[taskIndex] = action.payload;
      state.loading = false;
    });
    builder.addCase(updateTaskThunk.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(updateTaskThunk.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(deleteTaskThunk.fulfilled, (state, action) => {
      const taskIndex = state.items.findIndex(
        (task) => task.id === action.payload.id
      );
      state.items.splice(taskIndex, 1);
      state.loading = false;
    });
    builder.addCase(deleteTaskThunk.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(deleteTaskThunk.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getTasksThunk.fulfilled, (state, action) => {
      state.loading = false;
      console.log("getTasksThunk.fulfilled", action.payload);
      state.items.unshift(...action.payload);
    });
    builder.addCase(getTasksThunk.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(getTasksThunk.pending, (state, action) => {
      state.loading = true;
    });
  }
});

export const { add, remove, complete } = slice.actions;

// export const slice = createSlice({
//   name: 'counter',
//   initialState: {
//     value: 0,
//   },
//   reducers: {
//     increment: state => {
//       // Redux Toolkit allows us to write "mutating" logic in reducers. It
//       // doesn't actually mutate the state because it uses the immer library,
//       // which detects changes to a "draft state" and produces a brand new
//       // immutable state based off those changes
//       state.value += 1;
//     },
//     decrement: state => {
//       state.value -= 1;
//     },
//     incrementByAmount: (state, action) => {
//       state.value += action.payload;
//     },
//   },
// });

// export const { increment, decrement, incrementByAmount } = slice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const incrementAsync = (amount) => (dispatch) => {
  setTimeout(() => {
    dispatch(add(amount));
  }, 1000);
};

// export const addTask = (name) => async (dispatch) => {
//   const task = await api.addTask(name);
// };

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectCount = (state) => state.counter.value;

export const selectTasks = (state) => state.tasks.items;

export default slice.reducer;
