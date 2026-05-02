import { useState } from "react";
import StudentInfo from "../Stu";
import Student_Dis from "./Student";

function Toggle(){
    const [value,setvalue]=useState(false)
    const handleToggle=()=>setvalue(!value)

    return(
        <>
        <button onClick={handleToggle}>{value ? "Hide student": "Show student"}</button>
        {value&&<Student_Dis/>}
        </>
    );
}
export default Toggle;