const students=[
    {id: 1, name:"Lokesh", age: 22, email:"lokesh161@gmail.com"},
    {id: 2, name:"nikil", age: 23, email:"nikil463@gmail.com"},
    {id: 3, name:"palani", age: 20, email:"palani78@gmail.com"},
];

function Student_Dis(){
    return(
        <div> {students.map((s) => (
            <div>
                <p>{s.id}</p>
                <p>{s.name}</p>
                <p>{s.email}</p>
            </div>
            ))}
        </div>
    );
}
export default Student_Dis;
