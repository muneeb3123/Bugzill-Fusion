import { Dialog, Transition } from "@headlessui/react";
import PropTypes from "prop-types";
import React, { Fragment, useEffect, useState } from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { fetchDevelopers, fetchQas } from "../../features/auth/authThunks";
import { assignUserToProject } from "../../features/project_tickets/projectTicketThunks";


function NewCollaboratorForm({ isOpen, setIsOpen, projectId }) {
  const dispatch = useDispatch();
  const [role, setRole] = useState("developer");

  const { developers, qas} = useSelector((state) => state.auth);

  const initialValues = {
    id: "",
  };

  const { values, handleChange, handleSubmit } = useFormik({
    initialValues,
    onSubmit: ({ id }) => {
      dispatch(assignUserToProject({ id, projectId }));
      setIsOpen(false);
    },
  });


  useEffect(() => {
    dispatch(fetchQas());
    dispatch(fetchDevelopers());
  }, [dispatch])

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
                <h1 className="pb-4 text-2xl text-center">Add Collaborator</h1>
                <form
                  className="w-full flex-col"
                  method="post"
                  onSubmit={handleSubmit}
                >
                  <div className="flex flex-col my-4">
                    <label htmlFor="role">Role:</label>
                    <div className="flex gap-8">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="developer"
                        name="role"
                        value="developer"
                        checked={role === "developer"}
                        onChange={() => setRole("developer")}
                      />
                      <label htmlFor="developer" className="ml-2">Developer</label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="qa"
                        name="role"
                        value="qa"
                        checked={role === "qa"}
                        onChange={() => setRole("qa")}
                      />
                      <label htmlFor="qa" className="ml-2">QA</label>
                    </div>
                    </div>
                  </div>
                  {role === "developer" && (
                    <div className="flex flex-col my-4 w-[300px]">
                      <label htmlFor="developer_id">Developers:</label>
                      <select
                        className="border-2 border-black p-2 rounded-xl"
                        value={values.id}
                        name="id"
                        onChange={handleChange}
                      >
                        <option value="">Select Developer</option>
                        {developers && developers.length > 0 ? developers.map((developer) => (
                          <option key={developer.id} value={developer.id}>{developer.name}</option>
                        )) : (
                          <option value="">No Developers Found</option>
                        )}
                      </select>
                    </div>
                  )}
                  {role === "qa" && (
                    <div className="flex flex-col my-4 w-[300px]">
                      <label htmlFor="qa_id">QAs:</label>
                      <select
                        className="border-2 border-black p-2 rounded-xl"
                        value={values.id}
                        name="id"
                        onChange={handleChange}
                      >
                        <option value="">Select QA</option>
                        {qas && qas.length > 0 ? qas.map((qa) => (
                          <option key={qa.id} value={qa.id}>{qa.name}</option>
                        )) : (
                          <option value="">No QAS Found</option>
                        )}
                      </select>
                    </div>
                  )}
                  <div className="pt-8">
                    <input
                      className="w-full"
                      type="submit"
                      value="Add Collaborator"
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

NewCollaboratorForm.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  projectId: PropTypes.number,
};

export default NewCollaboratorForm;
