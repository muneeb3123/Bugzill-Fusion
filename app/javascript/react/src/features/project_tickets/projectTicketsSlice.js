import { createSlice } from "@reduxjs/toolkit";
import { fetchProjectTickets, assignUserToProject, removeUserFromProject } from "./projectTicketThunks";
import { logout } from "../auth/authThunks";



const initialState = {
    loading: false,
    error: null,
    projecttickets: {},
};

const projectTicketsSlice = createSlice({
    name: "projecttickets",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchProjectTickets.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchProjectTickets.fulfilled, (state, action) => {
            state.loading = false;
            state.projecttickets = action.payload;
        });
        builder.addCase(fetchProjectTickets.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
        builder.addCase(assignUserToProject.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(assignUserToProject.fulfilled, (state, action) => {
            state.loading = false;
            state.projecttickets.collaborators.push(action.payload);
        });
        builder.addCase(removeUserFromProject.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(removeUserFromProject.fulfilled, (state, action) => {
            state.loading = false;
            state.projecttickets.collaborators = state.projecttickets.collaborators.filter((collaborator) => collaborator.id !== action.payload.id);
        });
        builder.addCase(logout.fulfilled, (state) => {
            state.projecttickets = {};
        });
    },
});

export default projectTicketsSlice.reducer;