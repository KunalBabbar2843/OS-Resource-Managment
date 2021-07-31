import { useEffect } from "react";
export default function useScrollIntoView(){
    useEffect(()=>{
        document.querySelector('nav').scrollIntoView();
      },[]);
}