import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";

// Slice để lưu trạng thái công việc theo ngày
interface Task {
  id: string;
  date: Date;
  title: string;
  content: string;
  status: "open" | "in-progress" | "completed";
  assigner: string;
}

const calendarSlice = createSlice({
  name: "calendar",
  initialState: {
    tasks: [] as Task[], // Mảng lưu công việc của từng ngày
  },
  reducers: {
    addTaskForDay: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
    },
  },
});

export const { addTaskForDay } = calendarSlice.actions;

const store = configureStore({
  reducer: {
    calendar: calendarSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
