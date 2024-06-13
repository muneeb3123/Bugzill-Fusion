import { configureStore } from "@reduxjs/toolkit";
import authReducer from './features/auth/authSlice';
import projectReducer from './features/projects/projectSlice';
import ticketReducer from './features/ticket/ticketSlice';
import projectTicketReducer from './features/project_tickets/projectTicketsSlice';
import searchReducer from './features/search/searchSlice'

const store = configureStore({
    reducer: {
        auth: authReducer,
        Project: projectReducer,
        Ticket: ticketReducer,
        ProjectTicket: projectTicketReducer,
        Search: searchReducer,
    }
})

export default store;