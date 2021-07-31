import { useState, useRef } from "react";
import { DrawCpuAlgorithmOnCanvas } from "./os resources/DrawCpuAlgorithmsOnCanvas";
import useScrollIntoView from "./useScrollIntoView";
function renderCPUalgorithm(container, processData) {
  let algoDrawer = new DrawCpuAlgorithmOnCanvas();
  algoDrawer.drawSelectedCpuSchedulingAlgorithm(
    container,
    processData.select,
    processData.process_ary,
    processData.timeQuantum,
    processData.priority
  );
  container.scrollIntoView();
}
function CpuSchedulingVisualizer(props) {
  const [processes, setProcesses] = useState([]);
  const [error, setError] = useState("");
  const resultContainer = useRef();
  useScrollIntoView();
  const addProcess = () => {
    setProcesses((prevState) => {
      const newState = [...prevState];
      const newProcess = {
        id: newState.length + 1,
        arrival: "",
        brust: "",
        priority: 0,
      };
      newState.push(newProcess);
      return newState;
    });
  };
  const updateProcess = (prop, id, value) => {
    setProcesses((prevState) => {
      const newState = [...prevState];
      const positiveNum = parseInt(value);
      newState[id][prop] =
        positiveNum !== NaN && positiveNum >= 0 ? positiveNum : "";
      return newState;
    });
  };
  const removeProcess = (remove_id) => {
    setProcesses((prevState) => {
      const newState = prevState.filter((item, id) => id !== remove_id);
      for (let i = remove_id; i < newState.length; ++i) newState[i].id = i + 1;
      return newState;
    });
  };
  const submitProcess = () => {
    const process_ary = [];
    for (let process of processes) {
      if (process.arrival === "" || process.brust === "") {
        setError("process " + process.id + " has not enough parameter");
        return;
      }
      process_ary.push([process.arrival, process.brust, process.priority]);
    }
    if (process_ary.length === 0) {
      setError("not enough process");
      return;
    }
    const select = [];
    let timeQuantum, priority;
    for (let algo of aglorithms) {
      if (algo.selected) {
        select.push(algo.id);
        if (algo.id === "rr") timeQuantum = parseInt(algo.timeQuantum);
        if (algo.id === "pp" || algo.id === "pnp") priority = algo.priority;
      }
    }
    if (select.length === 0) {
      setError("No Algorithm Selected");
      return;
    }
    if (!timeQuantum) timeQuantum = 4;
    setError("");
    let visualizer=new DrawCpuAlgorithmOnCanvas();
    visualizer.drawSelectedCpuSchedulingAlgorithm(
      resultContainer.current,
      select,
      process_ary,
      timeQuantum,
      priority
    );
    resultContainer.current.scrollIntoView();
  };
  const [aglorithms, setAlgorithms] = useState([
    {
      id: "fcfs",
      name: "First Come First Serve",
      selected: false,
    },
    {
      id: "sjf",
      name: "Shortest Job First",
      selected: false,
    },
    {
      id: "srtf",
      name: "Shortest Remmaing time First",
      selected: false,
    },
    {
      id: "rr",
      name: "Round Robin",
      selected: false,
      timeQuantum: "",
    },
    {
      id: "pnp",
      name: "Priority Non Preemptive",
      selected: false,
      priority: "lesser",
    },
    {
      id: "pp",
      name: "Priority Preemptive",
      selected: false,
      priority: "lesser",
    },
  ]);
  return (
    <div className="container-fluid">
      <h1 className="display-6 text-center mb-4">Cpu scheduling</h1>
      <div
        className="row mx-2 overflow-scroll"
        style={{ minHeight: 80 + "vh", maxHeight: 80 + "vh" }}
      >
        <div
          className="col-lg-9 px-2 py-1 overflow-scroll"
          style={{ maxHeight: 100 + "%" }}
        >
          <div className="d-flex flex-md-row flex-column justify-content-between align-items-center px-2 gap-2">
            <div>
              <button className="btn btn-primary me-2" onClick={addProcess}>
                Add Process
              </button>
              <button
                type="button"
                className="btn btn-danger me-2"
                onClick={() => {
                  setProcesses([]);
                  setError([]);
                  setAlgorithms((prevState) =>
                    prevState.map((algo) => {
                      return { ...algo, selected: false };
                    })
                  );
                  resultContainer.current.innerHTML = "";
                }}
              >
                clear all
              </button>
              <button
                type="button"
                className="btn btn-success"
                onClick={submitProcess}
              >
                Submit
              </button>
            </div>
            {error && <p className="text-danger  m-0">{error}</p>}
          </div>
          <table
            className="table table-hover text-center"
          >
            <thead>
              <tr>
                <th scope="col">process no.</th>
                <th scope="col">arrival time</th>
                <th scope="col">brust time</th>
                <th scope="col">priority</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {processes.map((process, index) => {
                return (
                  <tr key={process.id}>
                    <th scope="row">{process.id}</th>
                    <td>
                      <input
                        type="number"
                        value={process.arrival}
                        onChange={(e) =>
                          updateProcess("arrival", index, e.target.value)
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={process.brust}
                        onChange={(e) =>
                          updateProcess("brust", index, e.target.value)
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={process.priority}
                        onChange={(e) =>
                          updateProcess("priority", index, e.target.value)
                        }
                      />
                    </td>
                    <td>
                      <button
                        type="button"
                        className="btn p-0 pb-2 mx-auto"
                        onClick={() => removeProcess(index)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          fill="currentColor"
                          class="bi bi-trash-fill"
                          viewBox="0 0 16 16"
                        >
                          <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="col-lg-3">
          <h6>Cpu Scheduling Algorithms:-</h6>
          {aglorithms.map((algo, index) => {
            return (
              <div className="form-check" key={algo.id}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  value={algo.id}
                  id={algo.id}
                  checked={algo.selected}
                  onChange={(e) =>
                    setAlgorithms((prevState) => {
                      const newState = [...prevState];
                      newState[index].selected = e.target.checked;
                      return newState;
                    })
                  }
                />
                <label className="form-check-label" htmlFor={algo.id}>
                  {algo.name}
                </label>
                {algo.timeQuantum !== undefined && (
                  <div className="input-group m-2">
                    <span className="input-group-text">timeQuantum:</span>
                    <input
                      type="number"
                      className="form-control"
                      value={algo.selected && algo.timeQuantum}
                      onChange={(e) =>
                        setAlgorithms((prevState) => {
                          const newState = [...prevState];
                          newState[index].timeQuantum = e.target.value;
                          return newState;
                        })
                      }
                      disabled={!algo.selected}
                    />
                  </div>
                )}
                {algo.priority && (
                  <div className="form-check form-switch m-2">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id={algo.id}
                      checked={algo.priority === "greater" && algo.selected}
                      disabled={!algo.selected}
                      onChange={(e) =>
                        setAlgorithms((prevState) => {
                          const newState = [...prevState];
                          newState[index].priority = e.target.checked
                            ? "greater"
                            : "lesser";
                          return newState;
                        })
                      }
                    />
                    <label className="form-check-label" htmlFor={algo.id}>
                      greater value greater priority
                    </label>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <div ref={resultContainer} className="row px-3" id="result-container"></div>
    </div>
  );
}
export default CpuSchedulingVisualizer;
