import { user } from "../../data/user";

export default function handler(req,res){
    res.status(200).json(user)
}