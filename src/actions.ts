import { Request, Response } from 'express'
import { getRepository } from 'typeorm'  // getRepository"  traer una tabla de la base de datos asociada al objeto
import { Users } from './entities/Users'
import { Exception } from './utils'
import { Todos } from './entities/Todos'

//agregar un usuario
export const createUser = async (req: Request, res: Response): Promise<Response> => {

    //verficamos que el request contenga email y password
    if (!req.body.email) throw new Exception("Por favor ingrese un email")
    if (!req.body.password) throw new Exception("Por favor ingrese un password")

    const userRepo = getRepository(Users)
    const user = await userRepo.findOne({ where: { email: req.body.email } })
    //verificamos que ya exista algun usuario con ese email
    if (user) throw new Exception("Ya existe un usuario con ese email")

    const newUser = getRepository(Users).create(req.body);
    const results = await getRepository(Users).save(newUser);
    return res.json(results);
}

//obtener todos los usuarios
export const getUsers = async (req: Request, res: Response): Promise<Response> => {
    const users = await getRepository(Users).find({ relations: ["todos"] });
    return res.json(users);
}

//obtener todas las tareas 
export const getTodosAll = async (req: Request, res: Response): Promise<Response> => {
    const todo = await getRepository(Todos).find({ relations: ["user"] });
    return res.json(todo);
}

//agregar lista de tareas a un usuario por id
export const createTodos = async (req: Request, res: Response): Promise<Response> => {

    const userRepo = getRepository(Users)
    const usuario = await userRepo.findOne({ where: { id: req.params.userId } })
    //verificamos que exista el usuario
    if (!usuario) throw new Exception("No existe usuario con ese id")

    const listaTareas = req.body.labels
    //verificamos que el request contenga la lista de tareas
    if (!listaTareas) throw new Exception("Por favor ingrese una lista de tareas")
    const todosRepo = getRepository(Todos)
    let todos = await todosRepo.find({ where: { user: usuario } })
    //verificamos si alguna de las tareas de la lista ya existe para ese usuario
    console.log(listaTareas)
    console.log(todos)
    for (let i = 0; i < listaTareas.length; i++) {
        for (let j = 0; j < todos.length; j++) {
            if (listaTareas[i] == todos[j].label) throw new Exception("Una de las tareas ya existe para ese usuario")
        }
    }

    //agregamos la lista de tareas
    var results: Todos[] = []
    for (let i = 0; i < listaTareas.length; i++) {
        let todo = new Todos()
        todo.label = listaTareas[i]
        todo.done = false
        todo.user = usuario
        await todosRepo.save(todo);
        results.push(todo)
    }
    return res.json(results);
}

//obtener las tareas de un usuario por id
export const getTodos = async (req: Request, res: Response): Promise<Response> => {

    const userRepo = getRepository(Users)
    const usuario = await userRepo.findOne({ where: { id: req.params.userId } })
    //verificamos que exista el usuario
    if (!usuario) throw new Exception("No existe usuario con ese id")

    const todosRepo = getRepository(Todos)
    const todos = await todosRepo.find({ where: { user: req.params.userId } })
    return res.json(todos)
}

//eliminar un usuario por id, y todas sus tareas
export const deleteUser = async (req: Request, res: Response): Promise<Response> => {

    const userRepo = getRepository(Users)
    const usuario = await userRepo.findOne({ where: { id: req.params.userId } })
    //verificamos que exista el usuario
    if (!usuario) throw new Exception("No existe usuario con ese id")

    //eliminamos las tareas del usuario
    const todosRepo = getRepository(Todos)
    const todos = await todosRepo.delete({ user: usuario })

    //eliminamos el usuario
    const idUsuario = parseInt(req.params.userId)
    const usuarioBorrado = await userRepo.delete({ id: idUsuario })

    if (todos.affected || usuarioBorrado.affected)
        return res.json({ "message": "Eliminado correctamente" });
    else
        return res.json({ "message": "No se ha eliminado" })
}

//actualizar todas las tareas de un usuario por id
export const putTodos = async (req: Request, res: Response): Promise<Response> => {

    const userRepo = getRepository(Users)
    const usuario = await userRepo.findOne({ where: { id: req.params.userId } })
    //verificamos que exista el usuario
    if (!usuario) throw new Exception("No existe usuario con ese id")

    const listaTareas = req.body.labels
    //verificamos que el request contenga la lista de tareas a agregar
    if (!listaTareas) throw new Exception("Por favor ingrese una lista de tareas")

    //eliminamos las tareas actuales del usuario
    const todosRepo = getRepository(Todos)
    await todosRepo.delete({ user: usuario })

    //agregamos la lista de tareas
    var results: Todos[] = []
    for (let i = 0; i < listaTareas.length; i++) {
        let todo = new Todos()
        todo.label = listaTareas[i]
        todo.done = false
        todo.user = usuario
        await todosRepo.save(todo);
        results.push(todo)
    }
    return res.json(results);
}