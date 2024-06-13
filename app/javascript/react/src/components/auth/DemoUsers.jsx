import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import PropTypes from "prop-types";
import manager from "../../images/manager.jpeg";
import developer from "../../images/dev.jpeg";
import qa from "../../images/qa.jpeg";
import { useDispatch } from "react-redux";
import { login } from "../../features/auth/authThunks";

const DemoUsers = ({ isOpen, setIsOpen }) => {
    const dispatch = useDispatch();

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
            <Dialog.Panel>
                <div className="relative max-w-[400px] bg-white p-12 rounded-xl">
                  <div className="logo-head">
                    <i className="bx bxs-bug text-2xl" />
                    <h2 className="heading text-2xl">Demo-User Login</h2>
                  </div>
                  <div className="Users">
                    <div onClick={() => dispatch(login({email: 'manager@gmail.com', password: '123456'}))} className="user admin hover:scale-90 transition-transform duration-300">
                      <img
                        src={manager}
                        alt="admin"
                        className="user-img"
                      />
                      <p className="text-xl">Project Manager</p>
                    </div>
                    <div onClick={() => dispatch(login({email: 'developer@gmail.com', password: '123456'}))} className="user dev hover:scale-90 transition-transform duration-300">
                      <img src={developer} alt="dev" className="user-img" />
                      <p className="text-xl">Developer</p>
                    </div>
                    <div onClick={() => dispatch(login({email: 'qa@gmail.com', password: '123456'}))} className="user qa hover:scale-90 transition-transform duration-300">
                      <img src={qa} alt="admin" className="user-img" />
                      <p className="text-xl">QA</p>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

DemoUsers.propTypes = {
  isOpen: PropTypes.bool,
  setIsOpen: PropTypes.func,
};

export default DemoUsers;
