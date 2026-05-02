import { useState } from "react";

function Demo(){
    const[count,setcount]=useState(0)
    const increment=()=> setcount(count+1);
    const decrement=()=> {if(count==0)return;
     setcount(count-1);
    }
   return(
        <div>
        <h1>counter Button</h1>
        <b><h3>count:{count}</h3></b>
        <button onClick={increment}>Increment</button>
        <button onClick={decrement}>Decrement</button>
        </div>
   );

   
}
export default Demo;