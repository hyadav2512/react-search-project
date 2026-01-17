import { useState } from "react";

const InputComponent = ()=>{
    const[input, setInput] = useState("");
    const [count, setCount] = useState(0);

    const updateCount = ()=>{
        setCount(input.length);
        if(count>20){
            
        }
    }

    return(
        <div>
            <input type="text" placeholder = "Name"
            onChange = {updateCount}
            ></input>
            <div>Input Count :{count} </div>
        </div>
    )
}
export default InputComponent;