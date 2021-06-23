class DiskScheduling {
  constructor() {}
  firstComeFirstServe(request, head) {
    let movement = 0;
    console.log("<--FIRST COME FIRST-->");
    for (let block of request) {
      movement += Math.abs(head - block);
      console.log("FROM:" + head + " TO:" + block);
      head = block;
    }
    console.log("MOVEMENT:" + movement);
  }
  shortestSeekTime(request, head) {
    let movement = 0;
    console.log("<--SHORTEST SEEK TIME-->");
    while (request.length > 0) {
      let min_seek = 0;
      for (let i = 1; i < request.length; ++i) {
        if (Math.abs(head - request[min_seek]) > Math.abs(head - request[i]))
          min_seek = i;
      }
      movement += Math.abs(head - request[min_seek]);
      console.log("FROM:" + head + " TO:" + request[min_seek]);
      head = request[min_seek];
      request.splice(min_seek, 1);
    }
    console.log("MOVEMENT:" + movement);
  }
  Scan(request, head, end) {
    let movement = 0,temp=head;
    request.sort(function (a, b) {
      return a - b;
    });
    let m;
    console.log("<--SCAN-->");
    for (m in request) {
      if (request[m] >= head) break;
    }
    console.log("<--LEFT-->");
    for (let i = m - 1; i >= 0; --i) {
      movement += Math.abs(head - request[i]);
      console.log("FROM:" + head + " TO:" + request[i]);
      head = request[i];
    }
    movement += head;
    console.log("FROM:" + head + " TO:0");
    head = 0;
    for (let i = m; i < request.length; ++i) {
      movement += Math.abs(head - request[i]);
      console.log("FROM:" + head + " TO:" + request[i]);
      head = request[i];
    }
    console.log("MOVEMENT:" + movement);
    console.log("<--RIGHT-->");
    head=temp;
    movement = 0;
    for (let i = m; i < request.length; ++i) {
      movement += Math.abs(head - request[i]);
      console.log("FROM:" + head + " TO:" + request[i]);
      head = request[i];
    }
    movement += end - head;
    console.log("FROM:" + head + " TO:" + end);
    head = end;
    for (let i = m - 1; i >= 0; --i) {
      movement += Math.abs(head - request[i]);
      console.log("FROM:" + head + " TO:" + request[i]);
      head = request[i];
    }
    console.log("MOVEMENT:" + movement);
  }
  Cscan(request, head, end) {
    let movement = 0,temp=head;
    request.sort(function (a, b) {
      return a - b;
    });
    let m;
    console.log("<--C-SCAN-->");
    for (m in request) {
      if (request[m] >= head) break;
    }
    console.log("<--LEFT-->");
    for (let i = m - 1; i >= 0; --i) {
      movement += Math.abs(head - request[i]);
      console.log("FROM:" + head + " TO:" + request[i]);
      head = request[i];
    }
    movement += head;
    console.log("FROM:" + head + " TO:0");
    head = 0;
    movement+=end;
    console.log("FROM:" + head + " TO:" + end);
    head = end;
    for (let i = request.length - 1; i >= m; --i) {
      movement += Math.abs(head - request[i]);
      console.log("FROM:" + head + " TO:" + request[i]);
      head = request[i];
    }
    console.log("MOVEMENT:" + movement);
    console.log("<--RIGHT-->");
    head=temp;
    movement = 0;
    for (let i = m; i < request.length; ++i) {
      movement += Math.abs(head - request[i]);
      console.log("FROM:" + head + " TO:" + request[i]);
      head = request[i];
    }
    movement += end - head;
    console.log("FROM:" + head + " TO:" + end);
    head = end;
    movement+=end;
    console.log("FROM:" + head + " TO:0");
    head = 0;
    for (let i = 0; i < m; ++i) {
      movement += Math.abs(head - request[i]);
      console.log("FROM:" + head + " TO:" + request[i]);
      head = request[i];
    }
    console.log("MOVEMENT:" + movement);
  }
  Look(request, head, end) {
    let movement = 0,temp=head;
    request.sort(function (a, b) {
      return a - b;
    });
    let m;
    console.log("<--LOOK-->");
    for (m in request) {
      if (request[m] >= head) break;
    }
    console.log("<--RIGHT-->");
    for (let i = m; i < request.length; ++i) {
      movement += Math.abs(head - request[i]);
      console.log("FROM:" + head + " TO:" + request[i]);
      head = request[i];
    }
    for (let i = m - 1; i >= 0; --i) {
      movement += Math.abs(head - request[i]);
      console.log("FROM:" + head + " TO:" + request[i]);
      head = request[i];
    }
    console.log("MOVEMENT:" + movement);
    console.log("<--LEFT-->");
    head=temp;
    movement = 0;
    for (let i = m - 1; i >= 0; --i) {
      movement += Math.abs(head - request[i]);
      console.log("FROM:" + head + " TO:" + request[i]);
      head = request[i];
    }
    for (let i = m; i < request.length; ++i) {
      movement += Math.abs(head - request[i]);
      console.log("FROM:" + head + " TO:" + request[i]);
      head = request[i];
    }
    console.log("MOVEMENT:" + movement);
  }
  Clook(request, head, end) {
    let movement = 0,temp=head;
    request.sort(function (a, b) {
      return a - b;
    });
    let m;
    console.log("<--C-LOOK-->");
    for (m in request) {
      if (request[m] >= head) break;
    }
    console.log("<--RIGHT-->");
    for (let i = m; i < request.length; ++i) {
      movement += Math.abs(head - request[i]);
      console.log("FROM:" + head + " TO:" + request[i]);
      head = request[i];
    }
    for (let i = 0; i < m; ++i) {
      movement += Math.abs(head - request[i]);
      console.log("FROM:" + head + " TO:" + request[i]);
      head = request[i];
    }
    console.log("MOVEMENT:" + movement);
    movement = 0;
    console.log("<--LEFT-->");
    head=temp;
    for (let i = m - 1; i >= 0; --i) {
      movement += Math.abs(head - request[i]);
      console.log("FROM:" + head + " TO:" + request[i]);
      head = request[i];
    }
    for (let i = request.length - 1; i >= m; --i) {
      movement += Math.abs(head - request[i]);
      console.log("FROM:" + head + " TO:" + request[i]);
      head = request[i];
    }
    console.log("MOVEMENT:" + movement);
  }
  ShowAllDiskAlgo(request, head, end, dir) {
    this.firstComeFirstServe([...request], head);
    this.shortestSeekTime([...request], head);
    this.Scan([...request], head, end, dir);
    this.Look([...request], head, end, dir);
    this.Cscan([...request], head, end, dir);
    this.Clook([...request], head, end, dir);
  }
}

let disk = new DiskScheduling();
let request = [180,20,190,65,160,80,175,95];
let head = 82,
    end = 199;
disk.ShowAllDiskAlgo(request, head, end);
