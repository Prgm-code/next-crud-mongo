
import { dbConnect } from "utils/mongoose";
import  Task  from "models/Task";
dbConnect();





export default async (req, res) => {
    const {method, body, query:{id}} = req;
    switch (method) {
        case "GET":
            try {
                const task = await Task.findById(id)
                if (!task) return res.status(404).json({ "error": "Task not found" })
                return res.status(200).json(task)
            } catch (error) {
                return res.status(500).json({ "error": error.message })
            }
        case "PUT":
            try {
                const task = await Task.findByIdAndUpdate(id , body, {
                        new: true,
                        runValidators: true
                    })
                if (!task) return res.status(404).json({ "msg": "Task not found" })
                return res.status(200).json(task)
            } catch (error) {
                return res.status(500).json({ "msg": error.message })
            }
        case "DELETE":
            try {
                const deletedTask = await Task.findByIdAndDelete(id)
                if (!deletedTask) return res.status(404).json({ "msg": "Task not found" })
                return res.status(200).json(deletedTask)
               
            } catch (error) {
                return res.status(500).json({ "msg": error.message })
            }
        default:
            return res.status(400).json({ msg: "Method not allowed" })
    }
}

/* 
    console.log(req.body);
    const { method, body } = req;
    return res.status(200).json({ "msg": "recibed" })
} */