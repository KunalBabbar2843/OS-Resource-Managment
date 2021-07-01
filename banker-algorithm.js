function Process(id,allocated,max){
    this.id=id;
    this.allocated=allocated;
    this.max=max;
    this.need=[];
    for(let i=0;i<max.length;++i)
    {
        this.need.push(this.max[i]-this.allocated[i]);
    }
}
function bankerAlgorithm(process_ary,available){
    console.log("<--BANKERS ALGORITHM-->");
    let safe_sequence="";
    let is_safe=true,pass=1;
    while(process_ary.length&&is_safe)
    {
        let allocated_in_pass=0;
        console.log("PASS #"+pass+":");
        for(let process of process_ary)
        {
            let i;
            for(i=0;i<process.max.length;++i)
            {
                if(process.need[i]>available[i])
                    break;
            }
            if(i==process.max.length)
            {
                console.log("resorce allocated to:"+process.id);
                let str="current availaible resource:"+available+" + "+"relased resource by process #"+process.id+":"+process.allocated+" =";
                for(i=0;i<process.max.length;++i)
                {
                    available[i]+=process.allocated[i];
                }
                console.log(str+available);
                process_ary=process_ary.filter(p=>p!=process);
                safe_sequence+=process.id+"->";
                allocated_in_pass+=1;
            }
        }
        pass+=1;
        if(allocated_in_pass==0) is_safe=false;
    }
    safe_sequence+="\b \b\b \b";
    if(is_safe)
        console.log("safe sequence of process:"+safe_sequence);
    else
        console.log("NO SAFE SEQUENCE EXIST");
}
let available=[1,6,2,0];
let p1=new Process(1,[0,0,1,2],[0,0,1,2]);
let p2=new Process(2,[1,0,0,0],[1,7,5,0]);
let p3=new Process(3,[1,3,5,4],[2,3,5,6]);
let p4=new Process(4,[0,6,3,2],[0,6,5,2]);
let p5=new Process(5,[0,0,1,4],[0,6,5,6]);
bankerAlgorithm([p1,p2,p3,p4,p5],available);
