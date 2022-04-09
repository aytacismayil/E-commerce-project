import { login } from "../../data/login";

export default function handler(req,res){
    res.status(200).json(login)
}