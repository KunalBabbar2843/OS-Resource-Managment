//arrival time->point of time at which process enter the scheduling queue.
//burst time->duration required to excute the process.
//completion time->point of time at which process is completed and moved out of scheduling queue
//waiting time->totol duration of time in which process remain in queue{turn around time - burst time}
//turn around time->total duration in which process remain in queue and excution{completion time - arrival time}  
//response time->duration of time in which a process get scheduled for first time{point of time at which a process get cpu first time - arrival time}
function processInfo(id,arrival,burst){
    this.id=id;
    this.arrival=arrival;
    this.burst=burst;
    this.remaining=burst;
    this.finish=null;
    this.turnaround=null;``
    this.wait=null;
    this.response=null;
}
class CpuScheduling{
    constructor()
    {

    }
    createProcessList(process_ary,sort_by)
    {
        let process_list=[],id=1;
        for(let process of process_ary)
        {
            let new_process=new processInfo(id,process[0],process[1]);
            process_list.push(new_process);
            if(process[2])
                new_process.priority=process[2];
            id+=1;
        }
        process_list.sort(sort_by);
        return process_list;
    }
    timingInfo(old_time,new_time,process_id)
    {
        console.log(old_time+" to "+new_time+" process:"+process_id);
    }
    calculateFinalState(process_list){
        process_list.sort((a,b)=>a.id-b.id);
        let avg_turnaround=0,avg_wait=0,avg_response=0,length=process_list.length;
        for(let process of process_list)
        {
            process.turnaround=process.finish-process.arrival;
            avg_turnaround+=(process.turnaround)/length;
            process.wait=process.turnaround-process.burst;
            avg_wait+=(process.wait)/length;
            avg_response+=(process.response)/length;
        }
        console.table(process_list);
        console.log("average turnaround time:"+avg_turnaround);
        console.log("average waiting time:"+avg_wait);
        console.log("average response time:"+avg_response);
    }
    firstComeFirstServe(process_ary){
        console.log("<--FIRST COME FIRST SERVE SCHEDULING-->");
        let process_list=this.createProcessList(process_ary,(a,b)=>{
            if(a.arrival<b.arrival) return -1;
            if(a.arrival==b.arrival) return a.id-b.id;
            return 1;
        });
        let time_elapsed=0;
        for(let process of process_list){
            if(time_elapsed<process.arrival)
            {
                this.timingInfo(time_elapsed,process.arrival,"cpu idle");
                time_elapsed=process.arrival;
            }
            if(!process.response)
            {
                process.response=time_elapsed-process.arrival;
            }
            let old_time=time_elapsed;
            time_elapsed+=process.remaining;
            let new_time=time_elapsed;
            process.remaining=0;
            process.finish=time_elapsed;
            this.timingInfo(old_time,new_time,process.id);
        }
        this.calculateFinalState(process_list);
    }
    shortestJobFirst(process_ary)
    {
        console.log("<--SHORTEST JOB FIRST SCHEDULING-->");
        let process_list=this.createProcessList(process_ary,(a,b)=>{
            if(a.arrival<b.arrival) return -1;
            if(a.arrival==b.arrival) return a.burst-b.burst;
            return 1;
        });
        let time_elapsed=0;
        let shortest_job=process_list[0];
        while(shortest_job){
            if(time_elapsed<shortest_job.arrival)
            {
                this.timingInfo(time_elapsed,shortest_job.arrival,"cpu idle");
                time_elapsed=shortest_job.arrival;
            }
            if(!shortest_job.response)
                shortest_job.response=time_elapsed-shortest_job.arrival;
            let old_time=time_elapsed;
            time_elapsed+=shortest_job.remaining;
            let new_time=time_elapsed;
            shortest_job.remaining=0;
            shortest_job.finish=time_elapsed;
            this.timingInfo(old_time,new_time,shortest_job.id);
            shortest_job=null;
            for(let process of process_list){
                if(!process.finish)
                {
                    if(!shortest_job)
                        shortest_job=process;
                    else if(shortest_job.burst>process.burst)
                        shortest_job=process;
                    else if(shortest_job.burst==process.burst&&shortest_job.arrival>process.arrival)
                        shortest_job=process;
                }
            }
        }
        this.calculateFinalState(process_list);
    }
    shortestRemainingTimeFirst(process_ary){
        console.log("<--SHORTEST REMAINING TIME FIRST SCHEDULING-->");
        let process_list=this.createProcessList(process_ary,(a,b)=>{
            if(a.arrival<b.arrival) return -1;
            if(a.arrival==b.arrival) return a.burst-b.burst;
            return 1;
        });
        let time_elapsed=0;
        let shortest_job=process_list[0];
        shortest_job.response=0;
        while(shortest_job){
            if(time_elapsed<shortest_job.arrival)
            {
                this.timingInfo(time_elapsed,shortest_job.arrival,"cpu idle");
                time_elapsed=shortest_job.arrival;
            }
            if(shortest_job.response==null) 
                shortest_job.response=time_elapsed-shortest_job.arrival;          
            let next_arrived=null;
            for(let process of process_list)
            {
                if(process.arrival<=time_elapsed||process.arrival>time_elapsed+shortest_job.remaining) continue;
                let time_before_arrival=process.arrival-time_elapsed;
                if(shortest_job.remaining-time_before_arrival>=process.remaining)
                {
                    next_arrived=process;
                    break;
                }
            }
            let old_time=time_elapsed;
            if(next_arrived)
            {
                shortest_job.remaining-=(next_arrived.arrival-time_elapsed);
                time_elapsed=next_arrived.arrival;
            }
            else
            {
                time_elapsed+=shortest_job.remaining;
                shortest_job.remaining=0;
                shortest_job.finish=time_elapsed;
                for(let process of process_list)
                {
                    if(process.finish) continue;
                    if(process.arrival<=time_elapsed)
                    {
                        if(!next_arrived)
                            next_arrived=process;
                        else if(next_arrived.remaining>process.remaining)
                            next_arrived=process;
                        else if(next_arrived.remaining==process.remaining&&next_arrived.arrival>process.arrival)
                            next_arrived=process;
                    }
                    else if(!next_arrived)
                    {
                        next_arrived=process;
                        break;
                    }
                }
            }
            let new_time=time_elapsed;
            this.timingInfo(old_time,new_time,shortest_job.id);
            shortest_job=next_arrived;
        }
        this.calculateFinalState(process_list);
    }
    roundRobin(process_ary,time_quantum){
        console.log("<--ROUND ROBIN SCHEDULING-->");
        let process_list=this.createProcessList(process_ary,(a,b)=>{
            if(a.arrival<b.arrival) return -1;
            if(a.arrival==b.arrival) return a.burst-b.burst;
            return 1;
        });
        let time_elapsed=0;
        let ready_queue=[process_list[0]];
        let top_process;
        while(ready_queue.length)
        {
            top_process=ready_queue.shift();
            if(time_elapsed<top_process.arrival)
            {
                this.timingInfo(time_elapsed,top_process.arrival,"cpu idle");
                time_elapsed=top_process.arrival;
            }
            if(top_process.response==null)
                top_process.response=time_elapsed-top_process.arrival;
            let run_time=top_process.remaining>time_quantum?time_quantum:top_process.remaining;
            let not_arrived=null;
            for(let process of process_list)
            {
                if(process.arrival<=time_elapsed||process.id==top_process.id) continue;
                if(time_elapsed+run_time>=process.arrival)
                {
                    ready_queue.push(process);
                }
                else if(!ready_queue.length)
                {
                    not_arrived=process;
                    break;
                }
            }
            let old_time=time_elapsed;
            time_elapsed+=run_time;
            let new_time=time_elapsed;
            this.timingInfo(old_time,new_time,top_process.id);
            top_process.remaining-=run_time;
            if(top_process.remaining==0)
                top_process.finish=time_elapsed;
            else
                ready_queue.push(top_process);
            if(!ready_queue.length&&not_arrived)
                ready_queue.push(not_arrived);
        }
        this.calculateFinalState(process_list);
    }
    priorityNonPreemptive(process_ary)
    {
        console.log("<--PRIORITY NON PRE-EMPTIVE SCHEDULING-->");
        let process_list=this.createProcessList(process_ary,(a,b)=>{
            if(a.arrival<b.arrival) return -1;
            if(a.arrival==b.arrival) return b.priority-a.priority;
            return 1;
        });
        let time_elapsed=0;
        let top_process=process_list[0];
        while(top_process)
        {
            if(time_elapsed<top_process.arrival)
            {
                this.timingInfo(time_elapsed,top_process.arrival,"cpu idle");
                time_elapsed=top_process.arrival;
            }
            if(top_process.response==null)
                top_process.response=time_elapsed-top_process.arrival;
            let next_arrived=null;
            for(let process of process_list)
            {
                if(process.finish||process.id==top_process.id) continue;
                if(process.arrival<=time_elapsed+process.remaining)
                {
                    if(!next_arrived) next_arrived=process;
                    else if(next_arrived.priority>process.priority) next_arrived=process;
                }
                else{
                    next_arrived=process;
                    break;
                }
            }
            let old_time=time_elapsed;
            time_elapsed+=top_process.remaining;
            let new_time=time_elapsed;
            this.timingInfo(old_time,new_time,top_process.id);
            top_process.remaining=0;
            top_process.finish=time_elapsed;
            top_process=next_arrived;
        }
        this.calculateFinalState(process_list);
    }
    priorityPreemptive(process_ary)
    {
        console.log("<--PRIORITY PREEMPTIVE SCHEDULING-->");
        let process_list=this.createProcessList(process_ary,(a,b)=>{
            if(a.arrival<b.arrival) return -1;
            if(a.arrival==b.arrival) return b.priority-a.priority;
            return 1;
        });
        let time_elapsed=0;
    }
}
let process_ary=[[0,10,20],[1,6,13],[3,8,8],[5,14,18]];
let cpu=new CpuScheduling();
// cpu.firstComeFirstServe(process_ary);
// cpu.shortestJobFirst(process_ary);
// cpu.shortestRemainingTimeFirst(process_ary);
// cpu.roundRobin(process_ary,2);
cpu.priorityNonPreemptive(process_ary);
