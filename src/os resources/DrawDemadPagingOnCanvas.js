import DemandPaging from "./memory-managment";
export default class DrawDemandPagingOnCanvas{
    constructor(){
        let memory_manager=new DemandPaging();
        this.algorithms={
            fcfs:{
                excute:memory_manager.firstComeFirstOutReplacement.bind(memory_manager),
                name:"First Come First Serve"
            },
            optimal:{
                excute:memory_manager.optimalReplacement.bind(memory_manager),
                name:"Optimal Paging"
            },
            lru:{
                excute:memory_manager.leastRecentlyUsedReplacement.bind(memory_manager),
                name:"Least Recently Used"
            }
        }
    }
    drawSelectedMemoryManagmentAlgorithms(container,selected,pageList,frameSize)
    {
        let displayProp=container.style.display;
        container.style.display='none';
        container.innerHTML='';
        for(let type of selected){
            let result=this.algorithms[type].excute(pageList,frameSize);
            console.log(result);
            let algoInfo=this.getAglorithmData(this.algorithms[type].name,result.fault_count,pageList.length);
            let canvas=this.drawMemoryManagmentAlgorithm(result.page_faults,frameSize);
            container.appendChild(algoInfo);
            container.appendChild(canvas);
        }
        container.style.display=displayProp;
    }
    getAglorithmData(name,faultCount,requests)
    {
        let agloData=document.createElement('div');
        let algoName=document.createElement('h4');
        algoName.textContent=name;
        algoName.className="text-center";
        let algoInfo=document.createElement('p');
        let missRatio=(faultCount/requests).toFixed(2);
        let hitRatio=(1-missRatio).toFixed(2)
        algoInfo.innerHTML=`<span>Number Of Page Faults:${faultCount}</span><span>Miss Ratio:${missRatio}</span><span>Hit Ratio:${hitRatio}</span>`;
        algoInfo.className="d-flex text-center gap-4 justify-content-center";
        agloData.appendChild(algoName);
        agloData.appendChild(algoInfo);
        return agloData;
    }
    drawMemoryManagmentAlgorithm(pageFaults,frameSize)
    {
        console.log(pageFaults);
        let canvas=document.createElement('div');
        canvas.style.width="100%";
        canvas.className="d-flex flex-wrap justify-content-evenly p-4";
        for(let faultInfo of pageFaults)
        {
            let info=document.createElement('div');
            info.className='d-flex flex-column text-center align-items-center me-4 mb-2'
            let newPage=document.createElement('p');
            newPage.textContent=faultInfo.new_page;
            let frameList=document.createElement('div');
            frameList.className="d-flex flex-column mb-2"
            for(let page of faultInfo.frame_list){
                let pageInfo=document.createElement('p');
                pageInfo.textContent=page;
                pageInfo.className="p-2 border border-dark m-0";
                if(faultInfo.to_replace&&page==faultInfo.replacement_page)
                    pageInfo.className+=" bg-danger text-white";
                frameList.appendChild(pageInfo);
            }
            let status=document.createElement('p');
            status.textContent=faultInfo.to_replace?'MISS':'HIT';
            info.appendChild(newPage);
            info.appendChild(frameList);
            info.appendChild(status);
            canvas.appendChild(info);
        }
        return canvas;
    }    
}