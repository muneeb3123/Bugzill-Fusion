import { createSlice } from "@reduxjs/toolkit";
import { fetchProjects, fetchProjectById, createProject, updateProject, deleteProject } from "./projectThuncks";
import { logout } from "../auth/authThunks";

const initialState = {
    projects: [],
    loading: false,
    error: null
}

const projectSlice = createSlice({
    name: 'projects',
    initialState,
    reducers: {},
    extraReducers: ((builder) => {
        builder.addCase(createProject.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(createProject.fulfilled, (state, action) => {
            state.loading = false;
            state.projects.push(action.payload);
        })
        builder.addCase(createProject.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
        builder.addCase(fetchProjects.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(fetchProjects.fulfilled, (state, action) => {
            if (action.payload.error !== undefined) {
                state.loading = false;
                state.error = action.payload.error;
            } else {
                state.loading = false;
                state.projects = action.payload;
            }
        })
        builder.addCase(fetchProjects.rejected, (state, action) => {
            console.log(action.payload)
            state.loading = false;
            state.error = action.error.message;
        })
        builder.addCase(fetchProjectById.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(fetchProjectById.fulfilled, (state, action) => {
            state.loading = false;
            state.projects.push(action.payload);
        })
        builder.addCase(fetchProjectById.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
        builder.addCase(updateProject.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(updateProject.fulfilled, (state, action) => {
            state.loading = false;
            const updatedProject = action.payload;
            const index = state.projects.findIndex(project => project.id === updatedProject.id);
            if (index !== -1) {
                state.projects[index] = updatedProject;
            }
        });        
        builder.addCase(updateProject.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
        builder.addCase(deleteProject.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(deleteProject.fulfilled, (state, action) => {
            state.loading = false;
            const id = action.payload;
            state.projects = state.projects.filter(project => project.id !== id);
        })
        builder.addCase(deleteProject.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
        builder.addCase(logout.fulfilled, (state) => {
            state.projects = [];
            state.error = null;
        })
    })
})

export default projectSlice.reducer;