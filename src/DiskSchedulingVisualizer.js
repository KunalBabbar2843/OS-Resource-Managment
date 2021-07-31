import { useState, useRef } from "react";
import drawDiskSchedulingAlgorithmOnCanvas from "./os resources/DrawDiskAlgorithmOnCanvas";
import useScrollIntoView from "./useScrollIntoView";
export default function DiskSchedulingVisualizer(props) {
  const [diskData, setDiskData] = useState({
    request: "",
    head: "",
    end: "",
  });
  useScrollIntoView();
  const resultContainer = useRef();
  const [error, setError] = useState("");
  const updateDiskData = (value, prop) => {
    switch (prop) {
      case "request":
        const charCode = value.charCodeAt(value.length - 1);
        if (
          charCode === 44 ||
          (charCode >= 48 && charCode <= 57) ||
          charCode === 8 ||
          value.length === 0
        ) {
          setDiskData((prevState) => {
            return { ...prevState, request: value };
          });
        }
        return;
      default:
        setDiskData((prevState) => {
          return { ...prevState, [prop]: value };
        });
    }
  };
  const clearState = () => {
    setAlgorithms((prevState) => {
      const newState = prevState.map((algo) => {
        return { ...algo, selected: false };
      });
      return newState;
    });
    setDiskData((prevState) => {
      return {
        request: "",
        head: "",
        end: "",
      };
    });
    setError("");
    resultContainer.current.innerHTML = "";
  };
  const submitRequest = () => {
    let request,
      head,
      end,
      selectedAlgo = [];
    request = diskData.request.split(",").map((strNum) => parseInt(strNum));
    head = parseInt(diskData.head);
    end = parseInt(diskData.end);
    const endReq = request[request.length - 1];
    if (Object.is(endReq, NaN)) {
      request.pop();
    }
    if (request.length === 0) {
      setError("no disk request inputed");
      return;
    }
    if (head >= end) {
      setError("head cannot become greater than end");
      return;
    }
    algorithms.forEach((algo) => {
      if (algo.selected) selectedAlgo.push(algo.id);
    });
    if (!selectedAlgo.length) {
      setError("no algorithm selected");
      return;
    }
    setError("");
    let visualizer = new drawDiskSchedulingAlgorithmOnCanvas();
    visualizer.drawSelectedDiskSchedulingAlgorithms(
      resultContainer.current,
      request,
      head,
      end - 1,
      selectedAlgo
    );
    resultContainer.current.scrollIntoView();
  };
  const [algorithms, setAlgorithms] = useState([
    {
      id: "fcfs",
      name: "First Come First serve",
      selected: false,
    },
    {
      id: "sst",
      name: "Shortest Seek Time",
      selected: false,
    },
    {
      id: "scan",
      name: "Scan",
      selected: false,
    },
    {
      id: "look",
      name: "Look",
      selected: false,
    },
    {
      id: "cscan",
      name: "C-Scan",
      selected: false,
    },
    {
      id: "clook",
      name: "C-Look",
      selected: false,
    },
  ]);
  return (
    <div class="container-fluid">
      <h3 class="display-6 text-center">Disk Scheduling</h3>
      <div class="row my-4" style={{ minHeight: 80 + "vh" }}>
        <div class="col-lg-9">
          <form class="mb-4 px-2" onSubmit={(e) => e.preventDefault()}>
            <div class="mb-3 me-5">
              <label for="" class="form-label">
                Input the disk requests
              </label>
              <input
                type="text"
                class="form-control"
                value={diskData.request}
                onChange={(e) => updateDiskData(e.target.value, "request")}
              />
              <div class="form-text mb-2">
                Seprate the requests with commas ','
              </div>
              <div class="row align-items-center mb-4">
                <div class="col-auto mb-2">
                  <div className="input-group">
                    <span class="input-group-text px-4" id="basic-addon1">
                      Head
                    </span>
                    <input
                      type="number"
                      class="form-control"
                      value={diskData.head}
                      onChange={(e) => updateDiskData(e.target.value, "head")}
                    />
                  </div>
                </div>
                <div class="col-auto mb-2">
                  <div className="input-group">
                    <span class="input-group-text px-4" id="basic-addon2">
                      End
                    </span>
                    <input
                      type="number"
                      class="form-control"
                      value={diskData.end}
                      onChange={(e) => updateDiskData(e.target.value, "end")}
                    />
                  </div>
                </div>
              </div>
              <div className="mt-2 d-flex justify-content-end">
                <button className="btn btn-danger me-2" onClick={clearState}>
                  Clear
                </button>
                <button class="btn btn-success" onClick={submitRequest}>
                  Submit
                </button>
              </div>
            </div>
          </form>
          {error && <p className="text-danger text-center mt-4">{error}</p>}
        </div>
        <div className="col-lg-3">
          <form onSubmit={(e) => e.preventDefault()}>
            <h6>Disk Scheduling Algorithms:-</h6>
            {algorithms.map((algo, index) => {
              return (
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value={algo.id}
                    id={algo.id}
                    onChange={(e) =>
                      setAlgorithms((prevState) => {
                        const newState = [...prevState];
                        newState[index].selected = e.target.checked;
                        return newState;
                      })
                    }
                  />
                  <label class="form-check-label" htmlFor={algo.id}>
                    {algo.name}
                  </label>
                </div>
              );
            })}
          </form>
        </div>
      </div>
      <div
        ref={resultContainer}
        class="container-fluid"
        id="result-container"
      ></div>
    </div>
  );
}
