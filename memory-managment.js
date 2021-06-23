class DemandPaging{
    constructor(){
    }
    printReplacement(frame_list,replacement_page,new_page,to_replace=true){
        let str=new_page+"|";
        if(!to_replace)
        {
            console.log(str+"|");
            return;
        }
        for(let page of frame_list)
        {
            if(page===replacement_page)
            {
                str+="->"+replacement_page;
            }
            else
            {
                str+="  "+page;
            }
        }
        str+="|";
        console.log(str);
    }
    firstComeFirstOutReplacement(page_list,frame_size)
    {
        if(page_list.length<=frame_size)
            return page_list.length;
        let page_faults=0;
        let frame_list=[];
        let first_come_page=0;
        for(let page of page_list)
        {
            if(!frame_list.includes(page))
            {
                if(frame_list.length<frame_size)
                {
                    this.printReplacement(frame_list,frame_list[first_come_page],page);
                    frame_list.push(page);
                }
                else
                {
                    this.printReplacement(frame_list,frame_list[first_come_page],page);
                    for(let page_idx in frame_list)
                    {
                        if(frame_list[first_come_page]===frame_list[page_idx])
                        {
                            frame_list[first_come_page]=page;
                        }
                    }
                    first_come_page=(first_come_page+1)%frame_size;
                }
                page_faults+=1;
            }
            else{
                this.printReplacement(frame_list,first_come_page,page,false);
            }
        }
        return page_faults;
    }
    leastRecentlyUsedReplacement(page_list,frame_size)
    {
        if(page_list.length<=frame_size)
            return page_list.length;
        let page_faults=0;
        let frame_list=[];
        let lru_counter=[];
        let count=0;
        for(let page of page_list)
        {
            if(!frame_list.includes(page))
            {
                if(frame_list.length<frame_size)
                {
                    this.printReplacement(frame_list,frame_list[0],page);
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
                    this.printReplacement(frame_list,frame_list[lru_idx],page);
                    lru_counter[lru_idx]=count++;
                    frame_list[lru_idx]=page;
                }
                page_faults+=1;
            }
            else
            {
                for(let page_id in frame_list)
                {
                    if(frame_list[page_id]===page){
                        lru_counter[page_id]=count++;
                    }
                }
                this.printReplacement(frame_list,"not calculated",page,false);
            }
        }
        return page_faults;
    }
    optimalReplacement(page_list,frame_size)
    {
        if(page_list.length<frame_size)
            return page_list.length;
        let page_faults=0;
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
                    this.printReplacement(frame_list,frame_list[last_page_id],page);
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
                    this.printReplacement(frame_list,frame_list[last_page_id],page);
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
                page_faults+=1;
            }
            else
            {
                this.printReplacement(frame_list,frame_list[last_page_id],page,false);
                //updating the next id of the page 
                let next_page_id=page_list.indexOf(page,curr_idx+1);
                if(next_page_id==-1) 
                    next_page_id=page_list.length+1;
                next_page_id_list[page_id]=next_page_id;
            }
            curr_idx+=1;
        }
        return page_faults;
    }
    showAllPagingAlgo(page_list,frame_size)
    {
        let page_faults;
        console.log("<--FIRST COME FIRST SERVER-->");
        page_faults=this.firstComeFirstOutReplacement(page_list,frame_size);
        console.log("PAGE FAULTS:"+page_faults+" MISS RATIO:"+(page_faults*1.0/page_list.length)+"  HIT RATIO:"+(1-(page_faults*1.0/page_list.length)));
        console.log("<--LEAST RECENTLY USED-->");
        page_faults=this.leastRecentlyUsedReplacement(page_list,frame_size);
        console.log("PAGE FAULTS:"+page_faults+" MISS RATIO:"+(page_faults*1.0/page_list.length)+"  HIT RATIO:"+(1-(page_faults*1.0/page_list.length)));
        console.log("<--OPTIMAL REPLACEMENT-->");
        page_faults=this.optimalReplacement(page_list,frame_size);
        console.log("PAGE FAULTS:"+page_faults+" MISS RATIO:"+(page_faults*1.0/page_list.length)+"  HIT RATIO:"+(1-(page_faults*1.0/page_list.length)));
    }
}

let demand_paging=new DemandPaging();

let page_list=[1,2,3,4,1,2,5,1,2,3,4,5];

let frame_size=4;

demand_paging.showAllPagingAlgo(page_list,frame_size);