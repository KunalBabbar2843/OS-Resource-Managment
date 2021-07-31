import { useRef } from "react";
import { Link } from "react-router-dom";
import useScrollIntoView from "./useScrollIntoView";

function Home(props) {
  useScrollIntoView();
  return (
    <div className="container-fluid px-4" style={{ minHeight: 80 + "vh" }}>
      <div className="row">
        <h1 className="text-center mt-2 px-4 display-6">
          Operating System Resource Managment
        </h1>
        <p className="py-2 px-4 mb-0" style={{ textAlign: "justify" }}>
          OS resource manager is a visualizing tool made for visualizing various
          alogrithms used is operating system to manage the resources like
          centeral processing unit,main memory and secondary storage.An
          operating system acts similarly like manager means an operating system
          performs no useful function by itself; though it provides an
          environment within which other programs can do useful work.
        </p>
        <p className="py-2 px-4 mb-0">
          The operating system can be viewed as a resource allocator.A computer
          system consists of many resources that must be managed efficiently.
          The operating system acts as the manager of the resources, decides
          between conflicting requests, controls the execution of programs, etc.
        </p>
      </div>
      <div className="row">
        <h1 className="text-center display-6 mb-2">Resources</h1>
        <div className="col-10 col-lg-4 mx-auto mb-2">
          <div className="card px-4 h-100">
            <h5 className="card-title text-center p-3">Cpu scheduling</h5>
            <img
              src="https://cdn.pixabay.com/photo/2013/07/12/17/56/cpu-152656_1280.png"
              className="card-img-top mx-auto"
              alt="..."
            />
            <div className="card-body d-flex flex-column justify-content-around">
              <p className="card-text">
                CPU Scheduling is a process of determining which process will
                own CPU for execution while another process is on hold.
              </p>
              <p className="fw-bold">
                The tool implements various cpu scheduling algorithms like first
                come first serve,shortest remaining time first,round robin etc
                and provides output as:-
              </p>
              <ul className="list-group mb-4">
                <li className="list-group-item">
                  finish time,Turnaround around time,waiting time,response time
                  for each process
                </li>
                <li className="list-group-item">
                  Timming diagram(gantt chart) of scheduling
                </li>
              </ul>
              <Link
                className="btn btn-primary d-block mx-2 "
                to="resource/cpu-scheduling"
              >
                Use Tool
              </Link>
            </div>
          </div>
        </div>
        <div className="col-10 col-lg-4 mx-auto mb-2">
          <div className="card px-4 h-100">
            <h5 className="card-title text-center p-3">Memory Managment</h5>
            <img
              src="https://cdn3.iconfinder.com/data/icons/cloud-data-technology-2-4/65/65-512.png"
              className="card-img-top mx-auto"
              alt="..."
            />
            <div className="card-body d-flex flex-column justify-content-around">
              <p className="card-text">
                Memory management is the functionality of an operating system
                which handles or manages primary memory and moves processes back
                and forth between main memory and disk during execution
              </p>
              <p className="fw-bold">
                The tool implements various Demand Paging algorithms like first
                come first serve,Least recently use and optimal paging and
                provides output as:-
              </p>
              <ul className="list-group mb-4">
                <li className="list-group-item">
                  Number of fault,Hit Ratio Miss Ratio
                </li>
                <li className="list-group-item">
                  Frame Diagrams for each page request
                </li>
              </ul>
              <Link
                className="btn btn-primary d-block mx-2"
                to="resource/memory-managment"
              >
                Use Tool
              </Link>
            </div>
          </div>
        </div>
        <div className="col-10 col-lg-4 mx-auto mb-2">
          <div className="card px-4 h-100">
            <h5 className="card-title text-center p-3">Disk Scheduling</h5>
            <img
              src="https://www.iconfreepik.com/wp-content/uploads/2021/04/Hard-Drive-Icon-Png-Color.png"
              className="card-img-top mx-auto"
              alt="..."
            />
            <div className="card-body d-flex flex-column justify-content-around">
              <p className="card-text">
                Disk scheduling is a technique used by the operating system to
                schedule multiple requests for accessing the disk.
              </p>
              <p className="fw-bold">
                The tool implements various Disk Scheduling algorithms like
                first come first serve,Scan,look and provides output as:-
              </p>
              <ul className="list-group mb-4">
                <li className="list-group-item">
                  Total head Movment for each algorithm
                </li>
                <li className="list-group-item">Disk Scheduling Diagram</li>
              </ul>
              <Link
                className="btn btn-primary d-block mx-2"
                to="resource/disk-scheduling"
              >
                Use Tool
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Home;
