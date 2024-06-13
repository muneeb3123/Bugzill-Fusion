import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/auth/authThunks";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import "./layout.css";
import dashboard from "../../images/dashboard.png";
import tickets from "../../images/tickets.png";
import bug from "../../images/bug1.png"
// import Skeleton from "react-loading-skeleton";
// import "react-loading-skeleton/dist/skeleton.css";

const Layout = () => {
  const dispatch = useDispatch();
  const { isLogin, loading } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    !isLogin && navigate("/signin");
  }, [navigate, isLogin]);

  // if (loading) {
  //   return (
  //     <div className="layout-container">
  //       <aside className="menu">
  //         <div className="header">
  //           <Skeleton width={150} height={40} />
  //         </div>
  //         <nav>
  //           <Skeleton count={3} height={50} />
  //         </nav>
  //       </aside>
  //       <main>
  //         <Skeleton className="mt-5" count={9} height={70} />
  //       </main>
  //     </div>
  //   );
  // }

  return (
    <div className="layout-container overflow-y-hidden">
      <aside className="menu border-x-2">
        <div className="header">
          <img className="logo" src={bug} alt="" />
        </div>
        <nav>
          <>
            <div className="hover:bg-blue-500 hover:text-white rounded-xl">
              <img src={dashboard} className="w-[20px]"/>
              <NavLink to={"/"} className="nav-link hover:text-white">
                Dashboard
              </NavLink>
            </div>
            <div className="hover:bg-blue-500 hover:text-white rounded-xl"> 
              <img src={tickets} className="w-[20px]" />
              <NavLink to={"/tickets"} className="nav-link hover:text-white">
                Tickets
              </NavLink>
            </div>
            <div className="seprater" />
            <div className="auth-wrap">
              {isLogin && (
                <button
                  className="btn auth-btn hover:scale-90 duration-200 transition-transform"
                  onClick={() => dispatch(logout())}
                >
                  Logout
                </button>
              )}
            </div>
          </>
        </nav>
      </aside>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
