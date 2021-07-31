import { useEffect, useRef } from "react";
import useScrollIntoView from "./useScrollIntoView";

function About(props){
    useScrollIntoView();
    return(
        <div ref={About} className="container-md" style={{minHeight:80+'vh'}}>
            <div className="row mt-2 px-4">
                <h1 className="display-5 text-center ">About</h1>
                <p className="text-justify"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum necessitatibus beatae nulla, autem aperiam temporibus accusamus asperiores eveniet? Assumenda corporis ipsam eum fugit, quibusdam dolores debitis autem dicta placeat nobis consectetur quis ratione nam aspernatur eius nemo quae nihil, esse voluptate laudantium doloribus saepe ipsa optio dolorem? Iusto eveniet a omnis quos est nam aero fuga?</p>
                <p className="text-justify"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum necessitatibus beatae nulla, autem aperiam temporibus accusamus asperiores eveniet? Assumenda corporis ipsam eum fugit, quibusdam dolores debitis autem dicta placeat nobis consectetur quis ratione nam aspernatur eius nemo quae nihil, esse voluptate laudantium doloribus saepe ipsa optio dolorem? Iusto eveniee nesciunt libero fuga?</p>
            </div>
        </div>
    )
}
export default About;