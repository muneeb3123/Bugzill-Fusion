import { Dialog, Transition } from "@headlessui/react";
import PropTypes from "prop-types";
import React, { Fragment } from "react";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { createTicket, fetchTickets, updateTicket } from "../../features/ticket/ticketThunks";
import { fetchProjectTickets } from "../../features/project_tickets/projectTicketThunks";

function TicketForm({ isOpen, setIsOpen, formType, creator_id, project_id, ticket }) {
  const dispatch = useDispatch();

  const { values, handleChange, handleSubmit, setFieldValue } = useFormik({
    initialValues: {
      deadline: ticket ? ticket.deadline : "",
      bug_type: ticket ? ticket.bug_type : "",
      title: ticket ? ticket.title : "",
      description: ticket ? ticket.description : "",
      screenshot: null,
    },
    onSubmit: (values, action) => {
      const ticketData = {
        bug: { ...values, project_id, creator_id }
      };
       if (formType === "edit") {
        dispatch(updateTicket({ticket:ticketData, id: ticket.id})).then(() => dispatch(fetchTickets()));
       } else {
        dispatch(createTicket(ticketData)).then(() => dispatch(fetchProjectTickets(project_id)));
        }
      setIsOpen(false);
      action.resetForm();
    },
  });

  const handleImageChange = (e) => {
    setFieldValue("screenshot", e.currentTarget.files[0]);
  };

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog
        className="fixed z-10 inset-0 overflow-y-auto"
        onClose={() => setIsOpen(false)}
      >
        <div className="flex items-center justify-center min-h-screen">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-30" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel>
              <div className="relative bg-white max-w-[400px] mx-auto rounded-xl p-12 pb-0">
                <h1 className="pb-4 text-2xl text-center">Create Ticket</h1>
                <form
                  className="w-full flex-col"
                  method="post"
                  onSubmit={handleSubmit}
                >
                  <div className="flex flex-col my-4">
                    <label htmlFor="Title">Title:</label>
                    <input
                      className="border-2 border-black p-2 rounded-xl"
                      value={values.title}
                      type="text"
                      name="title"
                      placeholder="Enter Title"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex flex-col my-4">
                    <label htmlFor="bug_type">Type:</label>
                    <select
                      className="border-2 border-black p-2 rounded-xl"
                      value={values.bug_type}
                      name="bug_type"
                      onChange={handleChange}
                    >
                      <option value="">Select Type</option>
                      <option value="bug">Bug</option>
                      <option value="feature">Feature</option>
                    </select>
                  </div>
                  <div className="flex flex-col my-4">
                    <label htmlFor="Description">Description:</label>
                    <textarea
                      rows={4}
                      cols={50}
                      value={values.description}
                      className=" border-2 border-black p-2 rounded-xl"
                      name="description"
                      placeholder="Description"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex flex-col my-4">
                    <label htmlFor="Description">Screenshot:</label>
                    <input
                      type="file"
                      accept=".png, .gif"
                      onChange={handleImageChange}
                    />
                  </div>
                  <div className="flex flex-col my-4">
                    <label htmlFor="Deadline">Deadline:</label>
                    <input
                      name="deadline"
                      type="date"
                      value={values.deadline}
                      placeholder="Date"
                      min={new Date().toISOString().split("T")[0]}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="pt-8">
                    <input
                      className="w-full"
                      type="submit"
                      value={
                        formType === "ticket"
                          ? "Create Ticket"
                          : formType === "edit"
                          ? "Edit Project"
                          : "Create New Project"
                      }
                    />
                  </div>
                </form>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}

TicketForm.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  title: PropTypes.string,
  formType: PropTypes.string,
  creator_id: PropTypes.number,
  project_id: PropTypes.number,
  ticket: PropTypes.object,
};

export default TicketForm;
