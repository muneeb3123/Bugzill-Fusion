import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

export const fetchProjectTickets = createAsyncThunk(
    "projecttickets/fetchProjectTickets",
    async (id) => {
        const token = localStorage.getItem("token");
        try {
            const response = await axios.get(`https://bugzill-fusion.onrender.com/api/v1/projects/${id}/users_and_bugs_by_project`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token,
                },
            });
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    })

    export const assignUserToProject = createAsyncThunk(
        "projecttickets/assignUserToProject",
        async ({ id : developer_id, projectId }) => {
            const token = localStorage.getItem("token");
            try {
                const response = await axios.post(
                    `https://bugzill-fusion.onrender.com/api/v1/projects/${projectId}/assign_user/${developer_id}`, 
                    null,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: token,
                        },
                    }
                );
                toast.success(response.data.message);
                return response.data.user;
            } catch (error) {
                toast.error(error.response.data.error);
                throw error;
            }
        }
    );

    export const removeUserFromProject = createAsyncThunk(
        "projecttickets/removeUserFromProject",
        async ({ project_id , id }) => {
            const token = localStorage.getItem("token");
            try {
                const response = await axios.delete(
                    `https://bugzill-fusion.onrender.com/api/v1/projects/${project_id}/remove_user/${id}`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: token,
                        },
                    }
                );
                toast.success(response.data.message);
                return response.data.user;
            } catch (error) {
                toast.error(error.response.data.error);
                throw error;
            }
        }
    );
    