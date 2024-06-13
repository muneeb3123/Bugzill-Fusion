import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjects } from "../../features/projects/projectThuncks";
import ProjectForm from "./ProjectForm";
import { NavLink } from "react-router-dom";
import "./project.css";
import SearchBar from "./SearchBar";

const Project = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const { projects, error, loading } = useSelector((state) => state.Project);
  const { user_type } = useSelector((state) => state.auth.user) || {};
  const { isLogin } = useSelector((state) => state.auth) || {};
  const {
    loading: searchLoading,
    error: searchError,
    searchResults,
  } = useSelector((state) => state.Search);

  useEffect(() => {
    if (isLogin) {
      dispatch(fetchProjects());
    }
  }, [dispatch, isLogin]);

  useEffect(() => {
    if (projects && projects.length > 0) {
      setFilteredProjects(projects);
    }
  }, [projects]);

  const renderSkeletonRows = () => {
    const skeletonRows = [];
    for (let i = 0; i < 5; i++) {
      skeletonRows.push(
        <tr key={i}>
          <td colSpan="4">
            <Skeleton />
          </td>
        </tr>
      );
    }
    return skeletonRows;
  };

  let [filteredProjects, setFilteredProjects] = useState(projects);

  return (
    <>
      <section className="projects-section">
        <div className="h-40 bg-white mx-auto mt-4 p-8 w-[calc(100%-30px)] rounded-lg shadow-md border-blue-500 border">
          <SearchBar
            searchLoading={searchLoading}
            searchError={searchError}
            searchrezults={searchResults}
            setFilteredProjects={setFilteredProjects}
            projects={projects}
          />
        </div>
        <div className="projects border border-blue-500">
          <div className="project-page">
            <h3> Projects </h3>
            {user_type && user_type === "manager" && (
              <button
                onClick={() => setIsOpen(true)}
                className="btn new-project transition-transform duration-200 hover:scale-110"
                to="/projects/new"
              >
                Create Project
              </button>
            )}
          </div>
          <div className="table-body max-h-[500px] overflow-auto">
            <table className="styled-table">
            <colgroup>
              <col style={{ width: "18%" }} />
              <col style={{ width: "50%" }} />
              <col style={{ width: "18%" }} />
              <col style={{ width: "18%" }} />
            </colgroup>
              <thead>
                <tr>
                  <th>Project</th>
                  <th>Description</th>
                  <th>Creator</th>
                  <th>Details</th>
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
                  filteredProjects &&
                  filteredProjects.map((project) => (
                    <tr className="sm:text-[1.3rem] hover:bg-blue-500 hover:text-white duration-200 transition-all" key={project.id}>
                      <td className="">{project.name}</td>
                      <td className="project-description">{project.description}</td>
                      <td>John</td>
                      <td>
                        <NavLink
                          className="btn"
                          to={`/projects/${project.id}`}
                          state={{ id: project.id }}
                        >
                          Details
                        </NavLink>
                      </td>
                    </tr>
                  ))}
                {!error && !loading && filteredProjects.length === 0 && (
                  <tr>
                    <td colSpan="4">There are no projects.</td>
                  </tr>
                )}  ``
              </tbody>
            </table>
          </div>
        </div>
        <ProjectForm
          isOpen={isOpen}
          setIsOpen={() => setIsOpen(false)}
          title="Create New Project"
        />
      </section>
    </>
  );
};

export default Project;
