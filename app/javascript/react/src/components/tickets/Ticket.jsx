import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  assignTicket,
  deleteTicket,
  fetchTicketById,
  markTicketAsCompleted,
} from "../../features/ticket/ticketThunks";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import TicketForm from "./TicketForm";
import { useLocation, useNavigate } from "react-router-dom";
import ScreenshotPopup from "./ScreenshotPopup";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Ticket = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = location.state || {
    id: parseInt(location.pathname.split("/").pop()),
  };

  const handleDeleteTicket = () => {
    dispatch(deleteTicket(ticket.id)).then(() => navigate("/tickets"));
  };

  const [isOpenTicket, setIsOpenTicket] = useState(false);
  const [isOpen, setIsOpen] = useState(false);


  const { user_type, id: user_id } =
    useSelector((state) => state.auth.user) || {};
  const { isLogin } = useSelector((state) => state.auth) || {};

  const { tickets } = useSelector((state) => state.Ticket);
  const ticket =
    tickets && tickets.length > 0 && tickets.find((ticket) => ticket.id === id);

  useEffect(() => {
    if (!ticket && id && isLogin) {
      dispatch(fetchTicketById(id));
    }
  }, [dispatch, id, ticket, isLogin]);

  return (
    <>
      <div className="h-30 bg-white mx-auto mt-4 p-8 w-[calc(100%-30px)] rounded-lg shadow-md border-blue-500 border flex justify-between items-center">
        <h1>{ticket.title}</h1>
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
              <Menu.Items className="absolute right-16 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                {user_type === "developer" && (
                  <>
                    {ticket.status && ticket.status === "open" ? (
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            onClick={() => dispatch(assignTicket(ticket.id))}
                            className={classNames(
                              active
                                ? "bg-blue-500 text-white"
                                : "text-gray-700",
                              "block px-4 py-2 text-sm"
                            )}
                          >
                            Assign ticket
                          </a>
                        )}
                      </Menu.Item>
                    ) : (
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            onClick={() =>
                              dispatch(markTicketAsCompleted(ticket.id))
                            }
                            className={classNames(
                              active
                                ? "bg-blue-500 text-white"
                                : "text-gray-700",
                              "block px-4 py-2 text-sm"
                            )}
                          >
                            {ticket.bug_type === "bug"
                              ? "Mark it as Resolved"
                              : "mark it as completed"}
                          </a>
                        )}
                      </Menu.Item>
                    )}
                  </>
                )}
                {user_type === "qa" && (
                  <>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          onClick={() => setIsOpenTicket(true)}
                          className={classNames(
                            active ? "bg-blue-500 text-white" : "text-gray-700",
                            "block px-4 py-2 text-sm"
                          )}
                        >
                          Edit Ticket
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          onClick={handleDeleteTicket}
                          className={classNames(
                            active ? "bg-blue-500 text-white" : "text-gray-700",
                            "block px-4 py-2 text-sm"
                          )}
                        >
                          Delete Ticket
                        </a>
                      )}
                    </Menu.Item>
                  </>
                )}
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
      <div className="w-[calc(100%-30px)] mx-auto bg-whitetickets mt-8 border border-blue-500 max-h-[600px] overflow-auto">
        <div className="bg-white">
          <table className="styled-table" style={{ tableLayout: "fixed" }}>
            <colgroup>
              <col style={{ width: "25%" }} />
              <col style={{ width: "25%" }} />
              <col style={{ width: "25%" }} />
              <col style={{ width: "25%" }} />
            </colgroup>
            <thead>
              <tr>
                <th>Title</th>
                <th>Deadline</th>
                <th>Type</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {ticket && ticket !== "undefined" ? (
                <tr key={ticket.id} className="sm:text-[1.3rem]">
                  <td className="project-name">
                   {ticket.title}
                  </td>
                  <td>{ticket.deadline}</td>
                  <td>{ticket.bug_type}</td>
                  <td><p className={classNames(
                    ticket.status === "open" && "bg-green-500 text-white px-4 rounded-xl w-20" ,
                    ticket.status === 'started' && "bg-red-500 text-white px-4 rounded-xl w-20",
                   "bg-blue-500 text-white px-4 rounded-xl w-24 "
                  )}>{ticket.status}</p></td>
                </tr>
              ) : (
                <tr>
                  <td colSpan="4">There are no tickets.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      
      <div className=" bg-white flex flex-col gap-4 p-4">
        <strong>description</strong>
        <p className="w-[400px] sm:text-[1.3rem]">{ticket.description}</p>
      </div>
      <div className=" bg-white flex flex-col gap-4 p-4">
        <strong>attachement</strong>
        <img onClick={() => setIsOpen(true)} className="w-[100px] h-[50px] hover:scale-90 transition-scal duration-200" src={ticket.screenshot_url} />
      </div>
      </div>
      <ScreenshotPopup isOpen={isOpen} setIsOpen={() => setIsOpen(false)} screenshot_url={ticket.screenshot_url} />
      <TicketForm
        isOpen={isOpenTicket}
        setIsOpen={() => setIsOpenTicket(false)}
        creator_id={user_id}
        ticket={ticket}
        formType={ticket ? "edit" : "create"}
      />
    </>
  );
};

export default Ticket;
