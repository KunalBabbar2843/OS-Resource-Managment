import React, { useRef } from "react";
import { Link } from "react-router-dom";
function Header() {
  const closeBtn = useRef();
  const navBtn=useRef();
  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark bg-dark"
      id="main-header"
    >
      <div className="container-fluid">
        <a className="navbar-brand d-flex flex-md-row flex-column gap-1" href="#">
            <span >Operating System</span>
            <span>Resource Managment</span>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
          ref={navBtn}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto me-3 mt-1 mb-1 d-flex align-items-center gap-2">
            <li className="nav-item">
              <Link className="nav-link active " to="/home" onClick={()=>navBtn.current.click()}>
                Home
              </Link>
            </li>
            <li className="nav-item mb-2 mb-md-0 me-1">
              <Link className="nav-link active " to="/about"  onClick={()=>navBtn.current.click()}>
                About
              </Link>
            </li>
            <li className="nav-item">
              <button
                className="btn btn-success btn-sm p-8"
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasExample"
                aria-controls="offcanvasExample"
                onClick={()=>navBtn.current.click()}
              >
                Resources
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div
        className="offcanvas offcanvas-start"
        tabIndex="-1"
        id="offcanvasExample"
        aria-labelledby="offcanvasExampleLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title mx-2" id="offcanvasExampleLabel">
            Resources
          </h5>
          <button
            type="button"
            className="btn-close text-reset me-3"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
            ref={closeBtn}
          ></button>
        </div>
        <div className="offcanvas-body">
          <div className="mb-4 p-2">
            <Link
              to="/resource/cpu-scheduling"
              className="text-decoration-none text-dark d-flex justify-content-between align-items-center "
              onClick={() => closeBtn.current.click()}
            >
              <span>Cpu Scheduling</span>
              <img src="https://img.icons8.com/material-rounded/48/000000/smartphone-cpu.png" />
            </Link>
          </div>
          <div className="mb-4 p-2 rounded">
            <Link
              to="/resource/memory-managment"
              className="text-decoration-none text-dark d-flex justify-content-between align-items-center"
              onClick={() => closeBtn.current.click()}
            >
              <span>Memory Managment</span>
              <img src="https://img.icons8.com/material-sharp/48/000000/smartphone-ram.png" />
            </Link>
          </div>
          <div className="mb-4 p-2">
            <Link
              to="/resource/disk-scheduling"
              className="text-decoration-none text-dark d-flex justify-content-between align-items-center "
              onClick={() => closeBtn.current.click()}
            >
              <span>Disk Scheduling</span>
              <img src="https://img.icons8.com/material-rounded/48/000000/hdd.png" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
export default Header;
