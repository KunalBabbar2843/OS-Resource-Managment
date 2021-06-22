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
                    frame_list.push(page);
                    this.printReplacement(frame_list,frame_list[first_come_page],page);
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
        let lru_page=page_list[0];
        for(let page of page_list)
        {
            if(!frame_list.includes(page))
            {
                if(frame_list.length<frame_size)
                {
                    frame_list.push(page);
                    this.printReplacement(frame_list,lru_page,page);
                }
                else
                {
                    this.printReplacement(frame_list,lru_page,page);
                    frame_list=frame_list.filter((present_page)=>{ //remove the least recently used page and add new page
                        return present_page!=lru_page;
                    });
                    frame_list.push(page);
                }
                page_faults+=1;
            }
            else
            {
                this.printReplacement(frame_list,lru_page,page,false);
                frame_list=frame_list.filter((present_page)=>{ //remove the frame from it's current position and add it to end
                    return present_page!=page;
                })
                frame_list.push(page);
            }
            lru_page=frame_list[0];
        }
        return page_faults;
    }
    optimalReplacement(page_list,frame_size)
    {
        if(page_list.length<frame_size)
            return page_list.length;
        let page_faults=0;
        let frame_list=[];
        let not_used_page=page_list[0];
        let curr_idx=0;
        for(let page of page_list)
        {
            if(!frame_list.includes(page))
            {
                if(frame_list.length<frame_size)
                {
                    frame_list.push(page);
                    this.printReplacement(frame_list,not_used_page,page);
                }
                else{
                    this.printReplacement(frame_list,not_used_page,page);
                    frame_list=frame_list.filter((present_page)=>{
                        return present_page!=not_used_page;
                    });
                    frame_list.push(page);
                }
                let max_last_idx=-1;
                for(let present_page of frame_list){
                    let first_idx=page_list.indexOf(present_page,curr_idx+1);
                    if(first_idx==-1)
                    {
                        not_used_page=present_page;
                        break;
                    }
                    else if(first_idx>max_last_idx){
                        not_used_page=present_page;
                        max_last_idx=first_idx;
                    }
                }
                page_faults+=1;
            }
            else{
                this.printReplacement(frame_list,not_used_page,page,false);
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
        console.log("MISS RATIO:"+(page_faults*1.0/page_list.length)+"  MISS RATIO:"+(1-(page_faults*1.0/page_list.length)));
        console.log("<--LEAST RECENTLY USED-->");
        page_faults=this.leastRecentlyUsedReplacement(page_list,frame_size);
        console.log("MISS RATIO:"+(page_faults*1.0/page_list.length)+"  MISS RATIO:"+(1-(page_faults*1.0/page_list.length)));
        console.log("<--OPTIMAL REPLACEMENT-->");
        page_faults=this.optimalReplacement(page_list,frame_size);
        console.log("MISS RATIO:"+(page_faults*1.0/page_list.length)+"  MISS RATIO:"+(1-(page_faults*1.0/page_list.length)));
    }
}

let demand_paging=new DemandPaging();

let page_list=[7,0,1,2,0,3,0,4,2,3,0,3,2,1,2,0,1,7,0,1];

let frame_size=4;

demand_paging.showAllPagingAlgo(page_list,frame_size);