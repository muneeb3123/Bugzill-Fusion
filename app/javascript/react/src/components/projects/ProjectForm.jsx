import { Dialog, Transition } from "@headlessui/react";
import PropTypes from "prop-types";
import React, { Fragment } from "react";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import {
  createProject,
  updateProject,
} from "../../features/projects/projectThuncks";

function ProjectForm({ isOpen, setIsOpen, title, project, formType }) {
  const dispatch = useDispatch();

  const projectInitialValues = {
    name: project ? project.name : "",
    description: project ? project.description : "",
    title: "",
  };

  const { values, handleChange, handleSubmit: formikSubmit } = useFormik({
    initialValues: projectInitialValues,
    onSubmit: (values, action) => {
      if (formType === "edit") {
        setIsOpen(false);
        dispatch(updateProject({ project: values, id: project.id }));
      } else {
        dispatch(createProject(values));
        setIsOpen(false);
      }
      action.resetForm();
    },
  });

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
                <h1 className="pb-4 text-2xl text-center">{title}</h1>
                <form
                  className="w-full flex-col"
                  method="post"
                  onSubmit={formikSubmit}
                >
                  <>
                    <div className="flex flex-col my-4">
                      <label htmlFor="Name">Name:</label>
                      <input
                        className="border-2 border-black p-2 rounded-xl"
                        value={values.name}
                        type="text"
                        name="name"
                        placeholder="Project Name"
                        onChange={handleChange}
                      />
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
                  </>
                  <div className="pt-8">
                    <input
                      className="w-full hover:scale-90 transition-transform duration-300"
                      type="submit"
                      value={
                        formType === "edit"
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

ProjectForm.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  project: PropTypes.object,
  formType: PropTypes.string,
};

export default ProjectForm;
