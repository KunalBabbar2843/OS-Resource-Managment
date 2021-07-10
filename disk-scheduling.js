class DiskScheduling {
  constructor() {}
  firstComeFirstServe(request, head) {
    let result = {
      history: [head],
      movement: 0,
    };
    for (let block of request) {
      result.movement += Math.abs(head - block);
      result.history.push(block);
      head = block;
    }
    return result;
  }
  shortestSeekTime(request, head) {
    let result = {
      history: [head],
      movement: 0,
    };
    while (request.length > 0) {
      let min_seek = 0;
      for (let i = 1; i < request.length; ++i) {
        if (Math.abs(head - request[min_seek]) > Math.abs(head - request[i]))
          min_seek = i;
      }
      result.movement += Math.abs(head - request[min_seek]);
      result.history.push(request[min_seek]);
      head = request[min_seek];
      request.splice(min_seek, 1);
    }
    return result;
  }
  Scan(request, head, end) {
    let result = {
      history: {
        left: [head],
        right: [head],
      },
      movement: {
        left: 0,
        right: 0,
      },
    };
    let temp = head;
    request.sort(function (a, b) {
      return a - b;
    });
    let m;
    for (m in request) {
      if (request[m] >= head) break;
    }
    for (let i = m - 1; i >= 0; --i) {
      result.movement.left += Math.abs(head - request[i]);
      result.history.left.push(request[i]);
      head = request[i];
    }
    result.movement.left += head;
    result.history.left.push(0);
    head = 0;
    for (let i = m; i < request.length; ++i) {
      result.movement.left += Math.abs(head - request[i]);
      result.history.left.push(request[i]);
      head = request[i];
    }
    head = temp;
    for (let i = m; i < request.length; ++i) {
      result.movement.right += Math.abs(head - request[i]);
      result.history.right.push(request[i]);
      head = request[i];
    }
    result.movement.right += end - head;
    result.history.right.push(end);
    head = end;
    for (let i = m - 1; i >= 0; --i) {
      result.movement.right += Math.abs(head - request[i]);
      result.history.right.push(request[i]);
      head = request[i];
    }
    return result;
  }
  Cscan(request, head, end) {
    let result = {
      history: {
        left: [head],
        right: [head],
      },
      movement: {
        left: 0,
        right: 0,
      },
    };
    let temp = head;
    request.sort(function (a, b) {
      return a - b;
    });
    let m;
    for (m in request) {
      if (request[m] >= head) break;
    }
    for (let i = m - 1; i >= 0; --i) {
      result.movement.left += Math.abs(head - request[i]);
      result.history.left.push(request[i]);
      head = request[i];
    }
    result.movement.left += head;
    result.history.left.push(0);
    head = 0;
    result.movement.left += end;
    result.history.left.push(end);
    head = end;
    for (let i = request.length - 1; i >= m; --i) {
      result.movement.left += Math.abs(head - request[i]);
      result.history.left.push(request[i]);
      head = request[i];
    }
    head = temp;
    for (let i = m; i < request.length; ++i) {
      result.movement.right += Math.abs(head - request[i]);
      result.history.right.push(request[i]);
      head = request[i];
    }
    result.movement.right += end - head;
    result.history.right.push(end);
    head = end;
    result.movement.right += end;
    result.history.right.push(0);
    head = 0;
    for (let i = 0; i < m; ++i) {
      result.movement.right += Math.abs(head - request[i]);
      result.history.right.push(request[i]);
      head = request[i];
    }
    return result;
  }
  Look(request, head, end) {
    let result = {
      history: {
        left: [head],
        right: [head],
      },
      movement: {
        left: 0,
        right: 0,
      },
    };
    let temp = head;
    request.sort(function (a, b) {
      return a - b;
    });
    let m;
    for (m in request) {
      if (request[m] >= head) break;
    }
    for (let i = m; i < request.length; ++i) {
      result.movement.right += Math.abs(head - request[i]);
      result.history.right.push(request[i]);
      head = request[i];
    }
    for (let i = m - 1; i >= 0; --i) {
      result.movement.right += Math.abs(head - request[i]);
      result.history.right.push(request[i]);
      head = request[i];
    }
    head = temp;
    for (let i = m - 1; i >= 0; --i) {
      result.movement.left += Math.abs(head - request[i]);
      result.history.left.push(request[i]);
      head = request[i];
    }
    for (let i = m; i < request.length; ++i) {
      result.movement.left += Math.abs(head - request[i]);
      result.history.left.push(request[i]);
      head = request[i];
    }
    return result;
  }
  Clook(request, head, end) {
    let result = {
      history: {
        left: [head],
        right: [head],
      },
      movement: {
        left: 0,
        right: 0,
      },
    };
    let temp = head;
    request.sort(function (a, b) {
      return a - b;
    });
    let m;
    for (m in request) {
      if (request[m] >= head) break;
    }
    for (let i = m; i < request.length; ++i) {
      result.movement.right += Math.abs(head - request[i]);
      result.history.right.push(request[i]);
      head = request[i];
    }
    for (let i = 0; i < m; ++i) {
      result.movement.right += Math.abs(head - request[i]);
      result.history.right.push(request[i]);
      head = request[i];
    }
    head = temp;
    for (let i = m - 1; i >= 0; --i) {
      result.movement.left += Math.abs(head - request[i]);
      result.history.left.push(request[i]);
      head = request[i];
    }
    for (let i = request.length - 1; i >= m; --i) {
      result.movement.left += Math.abs(head - request[i]);
      result.history.left.push(request[i]);
      head = request[i];
    }
    return result;
  }
  ShowAllDiskAlgo(request, head, end, dir) {
    console.table(this.firstComeFirstServe([...request], head));
    console.table(this.shortestSeekTime([...request], head));
    console.table(this.Scan([...request], head, end));
    console.table(this.Look([...request], head, end));
    console.table(this.Cscan([...request], head, end));
    console.table(this.Clook([...request], head, end));
  }
}

let disk = new DiskScheduling();
let request = [40, 124, 22, 86, 132, 60, 185, 17];
let head = 50,
  end = 199;
disk.ShowAllDiskAlgo(request, head, end);
