import DiskScheduling from "./disk-scheduling";
export default class drawDiskSchedulingAlgorithmOnCanvas {
  constructor() {
    let disk_scheduler = new DiskScheduling();
    this.algorithms={
      fcfs:{excute:disk_scheduler.firstComeFirstServe,name:"FIRST COME FIRST SERVE"},
      sst:{excute:disk_scheduler.shortestSeekTime,name:"SHORTEST SEEK TIME"},
      scan:{excute:disk_scheduler.Scan,name:"SCAN"},
      look:{excute:disk_scheduler.Look,name:"LOOK"},
      cscan:{excute:disk_scheduler.Cscan,name:"C-SCAN"},
      clook:{excute:disk_scheduler.Clook,name:"C-LOOK"}
    };
  }
  getDiskAlgorithmComponent(algorithm,movement,canvasInfo){
    let container=document.createElement('div');
    let algorithmInfo=document.createElement('h3');
    algorithmInfo.textContent=algorithm;
    let movementInfo=document.createElement('p');
    movementInfo.textContent="MOVEMENT:"+movement;
    algorithmInfo.className="text-center mb-2";
    movementInfo.className="text-center mb-2";
    container.appendChild(algorithmInfo);
    container.appendChild(movementInfo);
    container.appendChild(canvasInfo);
    return container;
  }
  drawSelectedDiskSchedulingAlgorithms(container,request,head,end,select){
    //removes duplicate requests form the array + remove request greater than end
    request=request.filter((req,id,self)=>{
      return self.indexOf(req)===id&&req!=head&&req<=end&&req>=0;
    });
    let result,width=window.getComputedStyle(container).getPropertyValue('width').slice(0,-2),height=400;
    console.log(width);
    let childList=[];
    let canvasComponent,child;
    for(let type of select){
      result=this.algorithms[type].excute([...request],head,end);
      if(type=='fcfs'||type=='sst')
      {
        canvasComponent=this.drawDiskSchedulingAlgorithm(result.history,head,end,width,height);
        child=this.getDiskAlgorithmComponent(this.algorithms[type].name,result.movement,canvasComponent);
        childList.push(child);
      }
      else{
        canvasComponent=this.drawDiskSchedulingAlgorithm(result.history.left,head,end,width,height);
        child=this.getDiskAlgorithmComponent(this.algorithms[type].name+" LEFT",result.movement.left,canvasComponent);
        childList.push(child);
        canvasComponent=this.drawDiskSchedulingAlgorithm(result.history.right,head,end,width,height);
        child=this.getDiskAlgorithmComponent(this.algorithms[type].name+" RIGHT",result.movement.right,canvasComponent);
        childList.push(child);
      }
    }
    let displyProp=container.style.display;
    container.style.display='none';
    container.innerHTML='';
    for(let child of childList){
      container.appendChild(child);
    }
    container.style.display=displyProp;
  }
  drawDiskSchedulingAlgorithm(history,head,end,width,height) {
    let canvas = document.createElement("canvas");
    canvas.style.width="100%";
    let size=30;
    let font=size+"px Arial";
    let dpi=window.devicePixelRatio;
    canvas.setAttribute('width', width *= dpi);
    canvas.setAttribute('height', height *= dpi);
    let ctx = canvas.getContext("2d");
    ctx.strokeStyle = "#000000";
    ctx.fillStyle = "#000000";
    ctx.lineWidth = 2;
    let padding=5;
    let factor = (width-2*padding) / end;
    let x = 0,y=0;
    ctx.arc(head * factor+padding, y + 5, 5, 0, 2 * Math.PI);
    ctx.fill();
    x = head * factor+padding;
    y +=5;
    ctx.font = font;
    ctx.fillText("head:" + head, x, y + 25);
    history.shift();
    for (let req of history) {
      ctx.beginPath();
      ctx.moveTo(x, y);
      if (x > req * factor + padding) ctx.textAlign = "left"; else ctx.textAlign = "right";
      x = req * factor + padding;
      y += (height - 100) / history.length;
      ctx.lineTo(x, y);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(x, y, 5, 0, 2 * Math.PI);
      ctx.fill();
      ctx.font = font;
      ctx.fillText(req, x, y + 25);
    }
    return canvas;
  }
}
