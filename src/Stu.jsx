const studentname="lokesh"
const age=22
const city="chinnagoapanapalli"
const isAdult = age >= 18

function StudentInfo(){
    return(
        <div>
        <h3>{studentname}</h3>
        <p>Born in :{2026 - age}</p>
        <span>
            {isAdult ? "Adult": "Minor"}
        </span>
        <p>Location: {city + ", Andhra Pradesh"}</p>
        <p>Profile: {`${studentname}, ${age} years, ${city}`}</p>
        <p>Name length: {studentname.toUpperCase()}</p>
        </div>

    );
}

export default StudentInfo

