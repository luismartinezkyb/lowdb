import { v4 as uuidv4 } from 'uuid';
import { getConnection } from '../database/database.js';

const getTasks=(req, res) => {
    const db = getConnection();

    res.json(db.data.tasks);
}
const createTask= async(req, res) => {
    const {name, description} = req.body;
    const newTask={
        id:uuidv4(),
        name,
        description
    }

    try {
        const db = getConnection();
        db.data.tasks.push(newTask);
        await db.write();

        res.json({
            statusCode: 'success',
            newTask
        });
    } catch (error) {
        console.log(error)
        return res.status(500).send({message:error.message})
    }
}
const getTask=(req, res) => {
    const {id}=req.params;
    const db = getConnection();
    let result = db.data.tasks.find(task => task.id === id);

    if(result)
        res.json(result);    
    else
        res.json({message:'There is not tasks with the given id'})
    
}
const updateTask= async(req, res) => {
    const {id}=req.params;
    const {name, description}=req.body;

    try {
        const db = getConnection();

        const task = db.data.tasks.find(task => task.id === id);

        if(!task){
            res.json({message:'There is no tasks with the given id'});
        }

        task.name=name;
        task.description=description;

        db.data.tasks.map(t => t.id===id ? task : t);

        await db.write();
        
        res.json({
            message:'Task updated successfully',
            newTask: task,
        });
    } catch (error) {
        console.log(error)
        return res.status(500).send({message:error.message})
    }
}
const deleteTask= async(req, res) => {
    const {id}=req.params;

    try {
        const db = getConnection();

        const task = db.data.tasks.find(task => task.id === id);

        if(!task){
            res.json({message:'There is no tasks with the given id'});
        }

        const newTasks=db.data.tasks.filter(task => task.id !== id);
        console.log(newTasks)
        db.data.tasks=newTasks;
        await db.write();

        res.status(200).json({message:`Task with the id ${id} deleted successfully`})
    } catch (error) {
        console.log(error)
        return res.status(500).send({message:error.message})
    }

}
const countTask=(req, res) => {
    
    const db = getConnection();
    const totalTasks = db.data.tasks.length;
    res.json({tasksCount:totalTasks});
}


export {getTasks, createTask, countTask, deleteTask, getTask, updateTask}