import { useEffect, useRef, useState } from "react";
import DrawDemandPagingOnCanvas from "./os resources/DrawDemadPagingOnCanvas";
import useScrollIntoView from "./useScrollIntoView";

export default function MemoryManagmentVisualizer(props) {
  const [pagingData, setPagingData] = useState({
    request: "",
    frameSize: "",
  });
  useScrollIntoView();
  const [error,setError]=useState('');
  const resultContainer=useRef();
  const updatePagingData=(value, prop)=>{
    switch (prop) {
      case "request":
        const charCode = value.charCodeAt(value.length - 1);
        if (
          charCode === 44 ||
          (charCode >= 48 && charCode <= 57) ||
          charCode == 8 ||
          value.length === 0
        ) {
          setPagingData((prevState) => {
            return { ...prevState, request: value };
          });
        }
        return;
      default:
        setPagingData((prevState) => {
          return { ...prevState, [prop]: value };
        });
    }
  }
  const clearPagingData=()=>{
    setPagingData({request:'',frameSize:''});
    setAlgorithms((prevState)=>{
      let newState=prevState.map((algo)=>{return {...algo,selected:false}});
      return newState;
    });
    setError('');
    resultContainer.current.innerHTMl='';
  }
  const submitPagingData=()=>{
    let request,frameSize,selectedAlgo=[];
    request=pagingData.request.split(',').map((strNum)=>parseInt(strNum));
    frameSize=Math.abs(parseInt(pagingData.frameSize));
    algorithms.forEach((algo)=>{
      if(algo.selected) selectedAlgo.push(algo.id);
    });
    const endReq=request[request.length-1];
    if(Object.is(endReq,NaN)){
      request.pop();
    } 
    if(request.length===0){
      setError('no page list inputed');
      return ;
    }
    if(selectedAlgo.length===0)
    {
      setError('no algorithm selected');
      return;
    }
    if(Object.is(frameSize,NaN))
    {
      setError('invalid frame size inputed');
      return;
    }
    if(frameSize<2){
      setError('frame size should be at least 2');
      return;
    }
    if(frameSize>10){
      setError('frame size should be less than 10');
      return;
    }
    setError('');
    console.log(request,frameSize,selectedAlgo);
    let visualizer=new DrawDemandPagingOnCanvas();
    visualizer.drawSelectedMemoryManagmentAlgorithms(resultContainer.current,selectedAlgo,request,frameSize);
    resultContainer.current.scrollIntoView();
  }
  const [algorithms, setAlgorithms] = useState([
    {
      id: "fcfs",
      name: "First Come First Serve",
      selected: false,
    },
    {
      id: "optimal",
      name: "Optimal Algorithm",
      selected: false,
    },
    {
      id: "lru",
      name: "Least Recently Algorithm",
      selected: false,
    },
  ]);
  return (
    <div className="container-fluid">
      <h1 className="display-6 text-center mb-2">Demand Paging</h1>
      <div className="row" style={{ minHeight: 80 + "vh" }} id="input-data">
        <div className="col-lg-9 px-4">
          <form className="mb-4" onSubmit={(e) => e.preventDefault()}>
            <div className="row mb-3">
              <label  className="form-label px-2">
                Input the page number requests
              </label>
              <input
                type="text"
                className="form-control mx-1"
                value={pagingData.request}
                onChange={(e) => updatePagingData(e.target.value, "request")}
              />
              <div className="form-text mb-2">
                Seprate the requests with commas ',' only
              </div>
            </div>
            <div className="input-group mb-3 w-50">
              <span className="input-group-text" id="basic-addon1">
                Frame Size
              </span>
              <input
                type="number"
                className="form-control"
                value={pagingData.frameSize}
                onChange={(e) => updatePagingData(e.target.value, "frameSize")}
              />
            </div>
            <div className="d-flex justify-content-end">
              <button className="btn btn-danger me-2" onClick={clearPagingData}>Clear</button>
              <button className="btn btn-success me-2" onClick={submitPagingData}>Submit</button>
            </div>
          </form>
          {error&&<p className="text-danger text-center">{error}</p>}
        </div>
        <div className="col-lg-3">
          <h6>Demand Paging Algorithm:-</h6>
          {algorithms.map((algo, index) => {
            return (
              <div className="form-check mb-2" key={algo.id}>
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
              </div>
            );
          })}
        </div>
      </div>
      <div ref={resultContainer} className="container-fluid" id="result-container">
      </div>
    </div>
  );
}
