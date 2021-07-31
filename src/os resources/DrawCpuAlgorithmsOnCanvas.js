import CpuScheduling from "./cpu-scheduling";
export class DrawCpuAlgorithmOnCanvas {
  constructor(props) {
    let cpuScheduler = new CpuScheduling();
    this.priority_greater = (a, b) =>
      a.priority > b.priority ? 1 : a.priority == b.priority ? 0 : -1;
    this.priority_lesser = (a, b) =>
      a.priority > b.priority ? -1 : a.priority == b.priority ? 0 : 1;
    this.algorithms = {
      fcfs: {
        excute: cpuScheduler.firstComeFirstServe.bind(cpuScheduler),
        name: "FIRST COME FIRST SERVE",
      },
      sjf: {
        excute: cpuScheduler.shortestJobFirst.bind(cpuScheduler),
        name: "SHORTEST JOB FIRST",
      },
      srtf: {
        excute: cpuScheduler.shortestRemainingTimeFirst.bind(cpuScheduler),
        name: "SHORTEST REMAINING TIME FIRST",
      },
      rr: {
        excute: cpuScheduler.roundRobin.bind(cpuScheduler),
        name: "ROUND ROBIN",
      },
      pnp: {
        excute: cpuScheduler.priorityNonPreemptive.bind(cpuScheduler),
        name: "PRIORITY NON PREEMPTIVE",
      },
      pp: {
        excute: cpuScheduler.priorityPreemptive.bind(cpuScheduler),
        name: "PRIORITY PREEMPTIVE",
      },
    };
    this.colors=[
      '#FF7171',
      '#055052',
      '#F5C0C0',
      '#9FD8DF',
      '#7952B3',
      '#766161',
      '#87A7B3',
      '#ED8E7C',
      '#CDF3A2',
      '#93D9A3',
    ]
  }
  drawSelectedCpuSchedulingAlgorithm(
    container,
    select,
    process_ary,
    time_quantum,
    priority
  ) {
    let result,
      width = window
        .getComputedStyle(container)
        .getPropertyValue("width")
        .slice(0, -2),
      height = 300;
    let display = container.style.display;
    container.style.display='none';
    container.innerHTML = "";
    for (let type of select) {
      if (type == "rr") {
        result = this.algorithms[type].excute([...process_ary], time_quantum);
      } else if (type == "pp" || type == "pnp") {
        result = this.algorithms[type].excute(
          [...process_ary],
          priority == "greater" ? this.priority_greater : this.priority_lesser
        );
      } else {
        result = this.algorithms[type].excute([...process_ary]);
      }
      console.log(result);
      container.appendChild(
        this.getFinalState(result,this.algorithms[type].name)
      );
      container.appendChild(
        this.drawCpuSchedulingAlgorithm(
          result.gantt_chart,
          width * 0.9,
          height
        )
      );
    }
    container.style.display = display;
  }
  getFinalState(result,algoName) {
    let state = document.createElement("div");
    let algoInfo = document.createElement("h4");
    let averageInfo = document.createElement("div");
    let tableInfo = document.createElement("table");
    algoInfo.className = "text-center";
    algoInfo.textContent = algoName;
    averageInfo.innerHTML = `<span>average turnaround time:${result.avg_turnaround.toFixed(2)}</span><span>average waiting time:${result.avg_wait.toFixed(2)}</span><span>average response time:${result.avg_response.toFixed(2)}</span>`;
    averageInfo.className="d-flex justify-content-between px-2";
    tableInfo.innerHTML = `<thead>
      <tr>
        <th scope='col'>process no.</th>
        <th scope='col'>arrival time</th>
        <th scope='col'>burst time</th>
        <th scope='col'>priority</th>
        <th scope='col'>turnaround time</th>
        <th scope='col'>waiting time</th>
        <th scope='col'>response time</th>
      </tr>
    </thead>`;
    let body = "<tbody>";
    for (let processInfo of result.final_state) {
      body += `<tr><td>${processInfo.id}</td>
      <td>${processInfo.arrival}</td>
      <td>${processInfo.burst}</td>
      <td>${processInfo.priority}</td>
      <td>${processInfo.turnaround}</td>
      <td>${processInfo.wait}</td>
      <td>${processInfo.response}</td></tr>`;
    }
    body += "</tbody>";
    tableInfo.innerHTML += body;
    tableInfo.className = "table table-striped text-center";
    state.appendChild(algoInfo);
    state.appendChild(tableInfo);
    state.appendChild(averageInfo);
    return state;
  }
  drawCpuSchedulingAlgorithm(ganttChart, width, height) {
    let canvas = document.createElement("canvas");
    canvas.style.width = "100%";
    let size = 30;
    let font = size + "px Arial";
    canvas.setAttribute("width", (width *= 2.5));
    canvas.setAttribute("height", height);
    let ctx = canvas.getContext("2d");
    ctx.strokeStyle = "#000000";
    ctx.fillStyle = "#000000";
    ctx.lineWidth = 2;
    let x = 20,
      y = height / 3;
    let factor = (width - 100) / ganttChart[ganttChart.length - 1].new_time;
    ctx.font = font;
    ctx.fillText("Gantt Chart",size,50);
    ctx.fillText("0", x - size / 3, y - 10);
    let prev_x = x,
      rect_size = height * 0.2;
    for (let process of ganttChart) {
      let time = (process.new_time - process.old_time) * factor;
      x = prev_x + time;
      ctx.fillStyle =this.colors[process.process_id-1];
      ctx.fillRect(prev_x, y, x, y + rect_size);
      prev_x = x;
      ctx.font = font;
      ctx.fillStyle = "#000000";
      ctx.fillText(
        "P" + process.process_id,
        x - time / 2 - size / 2,
        y + rect_size + size / 2
      );
      ctx.fillText(process.new_time, x - size / 3, y - 10);
    }
    ctx.fillStyle = "rgb(255,255,255)";
    ctx.fillRect(prev_x, y, width, y + rect_size);
    return canvas;
  }
}
