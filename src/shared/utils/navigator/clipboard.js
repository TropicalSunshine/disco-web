import { toast } from "react-toastify";

async function write(text){
    await navigator.clipboard.writeText(text);
    toast.success("Copied");
}


export default{
    write
}