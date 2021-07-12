class DemandPaging{
    constructor(){}
    updateReplacement(frame_list,replacement_page,new_page,result,to_replace=true)
    {
        result.page_faults.push({
            new_page,
            frame_list:[...frame_list],
            replacement_page,
            to_replace
        });
    }
    firstComeFirstOutReplacement(page_list,frame_size)
    {
        let result={
            page_faults:[],
            fault_count:0
        };
        let frame_list=[];
        let first_come_page=0;
        for(let page of page_list)
        {
            if(!frame_list.includes(page))
            {
                if(frame_list.length<frame_size)
                {
                    this.updateReplacement(frame_list,frame_list[first_come_page],page,result,false);
                    frame_list.push(page);
                }
                else
                {
                    this.updateReplacement(frame_list,frame_list[first_come_page],page,result,true);
                    for(let page_idx in frame_list)
                    {
                        if(frame_list[first_come_page]===frame_list[page_idx])
                        {
                            frame_list[first_come_page]=page;
                        }
                    }
                    first_come_page=(first_come_page+1)%frame_size;
                }
                result.fault_count+=1;
            }
            else{
                this.updateReplacement(frame_list,first_come_page,page,result,false);
            }
        }
        return result;
    }
    leastRecentlyUsedReplacement(page_list,frame_size)
    {
        let result={
            page_faults:[],
            fault_count:0
        };
        let frame_list=[];
        let lru_counter=[];
        let count=0;
        for(let page of page_list)
        {
            if(!frame_list.includes(page))
            {
                if(frame_list.length<frame_size)
                {
                    this.updateReplacement(frame_list,frame_list[0],page,result,false);
                    frame_list.push(page);
                    lru_counter.push(count++);
                }
                else
                {
                    let lru_idx=0;
                    for(let count_idx in lru_counter)
                    {
                        if(lru_counter[lru_idx]>lru_counter[count_idx])
                        {
                            lru_idx=count_idx;
                        }
                    }
                    this.updateReplacement(frame_list,frame_list[lru_idx],page,result);
                    lru_counter[lru_idx]=count++;
                    frame_list[lru_idx]=page;
                }
                result.fault_count+=1;
            }
            else
            {
                for(let page_id in frame_list)
                {
                    if(frame_list[page_id]===page){
                        lru_counter[page_id]=count++;
                    }
                }
                this.updateReplacement(frame_list,"not calculated",page,result,false);
            }
        }
        return result;
    }
    optimalReplacement(page_list,frame_size)
    {
        let result={
            page_faults:[],
            fault_count:0
        };
        let frame_list=[];
        let last_page_id=-1;
        let next_page_id_list=[];
        let curr_idx=0;
        for(let page of page_list)
        {
            let page_id=frame_list.indexOf(page);
            if(page_id<0)
            {
                if(frame_list.length<frame_size)
                {
                    this.updateReplacement(frame_list,frame_list[last_page_id],page,result,false);
                    frame_list.push(page);
                    let next_page_id=page_list.indexOf(page,curr_idx+1);
                    if(next_page_id==-1) next_page_id=page_list.length+1;
                    next_page_id_list.push(next_page_id);
                    if(next_page_id>last_page_id) last_page_id=curr_idx;
                }
                else{
                    //calulating the id of page which is to be used last 
                    for(let id in next_page_id_list)
                    {
                        if(next_page_id_list[id]>next_page_id_list[last_page_id])
                            last_page_id=id;
                    }
                    this.updateReplacement(frame_list,frame_list[last_page_id],page,result);
                    for(let page_id in frame_list)
                    {
                        if(frame_list[page_id]===frame_list[last_page_id])
                        {
                            frame_list[page_id]=page;
                            let next_page_id=page_list.indexOf(page,curr_idx+1);
                            if(next_page_id==-1) 
                                next_page_id=page_list.length+1;
                            next_page_id_list[page_id]=next_page_id;
                            break;
                        }
                    }
                }
                result.fault_count+=1;
            }
            else
            {
                this.updateReplacement(frame_list,frame_list[last_page_id],page,result,false);
                //updating the next id of the page 
                let next_page_id=page_list.indexOf(page,curr_idx+1);
                if(next_page_id==-1) 
                    next_page_id=page_list.length+1;
                next_page_id_list[page_id]=next_page_id;
            }
            curr_idx+=1;
        }
        return result;
    }
    showResult(result){
        for(let info of result.page_faults)
        {
            let info_str=info.new_page+" | ";
            for(let page of info.frame_list)
            {
                if(info.to_replace&&page===info.replacement_page)
                    info_str+="->"+page+" ";
                else
                    info_str+=page+" ";
            }
            info_str+="|";
            console.log(info_str);
        }
        let length=result.page_faults.length;
        console.log("FAULT COUNT:"+result.fault_count);
        console.log("MISS RATIO:"+result.fault_count*1.0/length);
        console.log("HIT RATIO:"+(1-(result.fault_count*1.0/length)));
    }
    showAllPagingAlgo(page_list,frame_size)
    {
        let result;
        console.log("<--FIRST COME FIRST SERVER-->");
        result=this.firstComeFirstOutReplacement(page_list,frame_size);
        this.showResult(result);
        console.log("<--LEAST RECENTLY USED-->");
        result=this.leastRecentlyUsedReplacement(page_list,frame_size);
        this.showResult(result);
        console.log("<--OPTIMAL REPLACEMENT-->");
        result=this.optimalReplacement(page_list,frame_size);
        this.showResult(result);
    }
}

let demand_paging=new DemandPaging();

let page_list=[1,2,3,4,1,2,5,1,2,3,4,5];

let frame_size=4;

demand_paging.showAllPagingAlgo(page_list,frame_size);