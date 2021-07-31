import { Link } from "react-router-dom";
function Footer(props) {
  return (
    <div className="mt-5 pb-0 footer">
      <div className="container-fluid bg-dark text-white">
        <div className="row px-2 py-4">
          <div className="col-lg-5 col-xs-12 mb-3">
            <h4>Operating System Resource Managment</h4>
            <p className="pr-5 ">
              OS resource manager is a visualizing tool made for visualizing
              various alogrithms used is operating system to manage the
              resources like centeral processing unit,main memory and secondary
              storage.
            </p>
            <p>
              <a href="#">
                <i className="fa fa-facebook-square mr-1"></i>
              </a>
              <a href="#">
                <i className="fa fa-linkedin-square"></i>
              </a>
            </p>
          </div>
          <div className="col-lg-3 col-xs-12 mb-3 px-4">
            <h4 className="mt-lg-0 mt-sm-3">Links</h4>
            <ul className="list-unstyled">
              <li>
                <Link className="text-white d-block mb-2" to="/home">
                  Home
                </Link>
              </li>
              <li>
                <Link className="text-white d-block mb-2" to="/about">
                  About
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-lg-4 col-xs-12 mb-3">
            <h4 className="mt-lg-0 mt-sm-4">Contact</h4>
            <p>22, Lorem ipsum dolor, consectetur adipiscing</p>
            <p className="mb-0">
              <i className="fa fa-phone mr-3"></i>(541) 754-3010
            </p>
            <p>
              <i className="fa fa-envelope-o mr-3"></i>kunalbabbar2843@gmail.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Footer;
