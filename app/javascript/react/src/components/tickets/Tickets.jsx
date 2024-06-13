import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTickets } from "../../features/ticket/ticketThunks";
import { NavLink } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const TicketsTable = () => {
  const dispatch = useDispatch();
  const [projectFilter, setProjectFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");

  const { tickets, error, loading } = useSelector((state) => state.Ticket);
  const { isLogin } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isLogin) {
      dispatch(fetchTickets());
    }
  }, [dispatch, isLogin]);

  const renderSkeletonRows = () => {
    const skeletonRows = [];
    for (let i = 0; i < 5; i++) {
      skeletonRows.push(
        <tr key={i}>
          <td colSpan="4">
            <Skeleton height={40} count={1} />
          </td>
        </tr>
      );
    }
    return skeletonRows;
  };

  return (
    <section className="projects-section">
   <div className="h-40 bg-white mx-auto mt-4 p-8 w-[calc(100%-30px)] rounded-lg shadow-md border-blue-500 border">
      <div className="ticket-filters ">
        <form className="flex gap-4">
        <div className="relative sm:w-[15rem] md:w-[18rem] xl:w-[25rem]">
          <input
            className="placeholder-gray-900 sm:text-[10px] md:text-xl border border-black p-4 rounded-xl text-[5px] w-[80px] sm:w-full hover:border-blue-500"
            type="text"
            placeholder="filter by project name"
            name="search"
            autoComplete="off"
            onChange={(e) => setProjectFilter(e.target.value)}
          />
          <i className="bx bx-search text-3xl absolute top-1/2 transform -translate-y-1/2 right-0 sm:right-4" />
          </div>
          <div className="relative sm:w-[15rem] md:w-[18rem] xl:w-[25rem]">
          <input
            className="placeholder-gray-900 sm:text-[10px] md:text-xl border text-[5px] border-black p-4 rounded-xl w-[80px] sm:w-full hover:border-blue-500"
            type="text"
            placeholder="Filter by Status"
            name="statusFilter"
            autoComplete="off"
            onChange={(e) => setStatusFilter(e.target.value)}
          />
          <i className="bx bx-search text-3xl absolute top-1/2 transform -translate-y-1/2 right-2 sm:right-4" />
          </div>
          <div className="relative sm:w-[15rem] md:w-[18rem] xl:w-[25rem]">
          <input
            className="placeholder-gray-900 sm:text-[10px] md:text-xl border text-[5px] border-black p-4 rounded-xl w-[80px] sm:w-full hover:border-blue-500"
            type="text"
            placeholder="Filter by Type"
            name="typeFilter"
            autoComplete="off"
            onChange={(e) => setTypeFilter(e.target.value)}
          />
          <i className="bx bx-search text-3xl absolute top-1/2 transform -translate-y-1/2 right-2 sm:right-4" />
          </div>
        </form>
      </div>
      </div>
      <div className="projects tickets border border-blue-500 max-h-[600px] overflow-auto">
        <div className="table-body">
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
                <th>Project Name</th>
                <th>Type</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {error && (
                <tr>
                  <td colSpan="4">{error}</td>
                </tr>
              )}
              {loading && renderSkeletonRows()}
              {!error &&
                !loading &&
                tickets &&
                tickets.length > 0 &&
                tickets
                  .filter(
                    (item) =>
                      (projectFilter === "" ||
                        item.project_name
                          .toLowerCase()
                          .includes(projectFilter.toLowerCase())) &&
                      (statusFilter === "" ||
                        item.status
                          .toLowerCase()
                          .includes(statusFilter.toLowerCase())) &&
                      (typeFilter === "" ||
                        item.bug_type
                          .toLowerCase()
                          .includes(typeFilter.toLowerCase()))
                  )
                  .map((ticket) => (
                    <tr className="hover:bg-blue-500 hover:text-white transition-all sm:text-[1.3rem] duration-200" key={ticket.id}>
                      <td className="project-name">
                        <NavLink state={{ id: ticket.id, project_id: ticket.project_id }} to={`${ticket.id}`}>
                          {ticket.title}
                        </NavLink>
                      </td>
                      <td>{ticket.project_name}</td>
                      <td>{ticket.bug_type}</td>
                      <td><p className={classNames(
                    ticket.status === "open" && "bg-green-500 text-white px-4 rounded-xl w-20" ,
                    ticket.status === 'started' && "bg-red-500 text-white px-4 rounded-xl w-20",
                   "bg-blue-500 text-white px-4 rounded-xl w-24 hover:bg-white hover:text-black"
                  )}>{ticket.status}</p></td>
                    </tr>
                  ))}
              {!error && !loading && tickets.length === 0 && (
                <tr>
                  <td colSpan="4">There are no tickets.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default TicketsTable;
