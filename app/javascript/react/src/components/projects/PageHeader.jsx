import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import React, { Fragment } from "react";
import { PropTypes } from "prop-types";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const PageHeader = ({
  handleCreateTicket,
  handleDelete,
  handleEditProject,
  user_type,
}) => {
  return (
    <div className="project-details-header flex justify-between items-center p-4 px-8 bg-white">
      <h1>Project Details</h1>
      <div>
        <Menu>
          <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
            Actions
            <ChevronDownIcon
              className="-mr-1 h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </Menu.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              {user_type === "manager" && (
                <>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        onClick={handleEditProject}
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "block px-4 py-2 text-sm"
                        )}
                      >
                        Edit
                      </a>
                    )}
                  </Menu.Item>

                  <Menu.Item>
                    {({ active }) => (
                      <a
                        onClick={handleDelete}
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "block px-4 py-2 text-sm"
                        )}
                      >
                        Delete
                      </a>
                    )}
                  </Menu.Item>
                </>
              )}
              {user_type === "qa" && (
                <Menu.Item>
                  {({ active }) => (
                    <a
                      onClick={handleCreateTicket}
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm"
                      )}
                    >
                      Create Ticket
                    </a>
                  )}
                </Menu.Item>
              )}
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </div>
  );
};

PageHeader.propTypes = {
  handleCreateTicket: PropTypes.func,
  handleDelete: PropTypes.func,
  handleEditProject: PropTypes.func,
  user_type: PropTypes.string,
};

export default PageHeader;
