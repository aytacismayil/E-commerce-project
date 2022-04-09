import { register } from "../../data/register";

export default function handler(req,res){
    res.status(200).json(register)
}