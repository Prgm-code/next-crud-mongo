

import { dbConnect } from 'utils/mongoose.js'
import Task from 'models/Task.js'


dbConnect()

export default async function handler(req, res) {
   const { method, body , url  } = req;
   console.log(method,  url);

   switch (method) {
      case "GET":
         try {

         const tasks = await Task.find();
         console.log(tasks);
         return res.status(200).json(tasks)
         } catch (error) {
            return res.status(500).json({ "error" : error.message})
         }

            
      case "POST":
        
      try {
         console.log(body);
         const newTask = await new Task (body);
         const savedTask = await newTask.save();
         return res.status(201).json(savedTask)
      } catch (error) {
         return res.status(400).json({ "error" : error.message})
      }
               
         default:
            return res.status(400).json({ msg: "Method not allowed"})
   }
}



