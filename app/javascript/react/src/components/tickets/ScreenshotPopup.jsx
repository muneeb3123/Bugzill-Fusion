import React, { Fragment } from "react"; 
import { Dialog, Transition } from "@headlessui/react";
import PropTypes from "prop-types";

const ScreenshotPopup = ({isOpen ,setIsOpen, screenshot_url}) => {
  return (
    <div>
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
                <div className="relative bg-white w-[65vw] xl:w-[50vw] mx-auto rounded-xl">
                  <img src={screenshot_url} alt="screenshot" className="w-full" />
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </div>
  )
}

ScreenshotPopup.propTypes = {
  isOpen: PropTypes.bool,
  setIsOpen: PropTypes.func,
  screenshot_url: PropTypes.string
}

export default ScreenshotPopup;

