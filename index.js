var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var todo = require("./seed.js");

app.use("/",bodyParser.urlencoded({extended:false}));

//GET request to retrieve all todos

app.get("/api/todos",function(req,res){
    if(!todo.todos){
        res.status(400).json({error:"No Todos exist"});
    }
    else{
        res.json(todo.todos);
    }
})

//POST request to add a new todo
app.post("/api/todos",function(req,res){
    var newTodoTitle = req.body.title;
    if(!newTodoTitle || newTodoTitle=="" || newTodoTitle.trim() == "" ){
        res.status(400).json({error:"Todo title can not be empty "});
    }
    else{
        var newTodo = {
            title:newTodoTitle,
            status:todo.StatusENUMS.ACTIVE
        }
        todo.todos[todo.next_todo_id++] = newTodo;
    }
    res.json(todo.todos);
})

//PUT request to update an existing todo
app.put("/api/todos/:id",function(req,res){
    var todoId = req.params.id;
    var todoFound = todo.todos[todoId];
    if(!todoFound){
        res.status(400).json({error:"No todo exist at this id."});
    }
    else{
        var todoTitle = req.body.title;
        var todoStatus = req.body.status;
        if(todoTitle=="" || todoStatus == ""){
            res.status(400).json({error:"Empty title or empty status not allowed"});
        }
        else if(!todoTitle){
            if(todoStatus){
                todoFound.status = todoStatus;
            }
        }
        else if(!todoStatus){
            if(todoTitle){
                todoFound.title = todoTitle;
            }
        }
        else{
            todoFound.title = todoTitle;
            todoFound.status = todoStatus;
        }
    }
    res.json(todo.todos);
})

//DELETE request to mark a todo as deleted

app.delete("/api/todos/:id",function(req,res){
    var todoId = req.params.id;
    var todoFound = todo.todos[todoId];
    if(!todoFound){
        res.status(400).json({error:"No todo exist at this ID."});
    }
    else{
        todoFound.status = todo.todos.StatusENUMS.DELETED;
    }
    res.json(todo.todos);
})

//GET all todos with a particular status
//URLS of form localhost:3000/api/todos/status
app.get("/api/todos/:name",function(req,res){
    var targetTodo = req.params.name.toUpperCase();
    if(!(targetTodo in todo.StatusENUMS)) {
        res.status(400).json({error: "Not a proper status"});
    }
    else
    {
        var targetTodos = [];
        for(var i = 1;i<todo.next_todo_id;i++){
            if(todo.todos[i].status == targetTodo.toUpperCase()) {
                var a = todo.todos[i];
                targetTodos.push(a);
            }
        }
    }

    res.json(targetTodos);
})

//UPDATE TODO to a particular status
//URL of form localhost:3000/api/todos/active/1
app.put("/api/todos/:name/:id",function(req,res){
    var todoFound = todo.todos[req.params.id];
    var todoStatus = req.params.name.toUpperCase();
    if(!(todoStatus in todo.StatusENUMS)){
        res.status(400).json({error:"Not a proper status"});
    }
    else{
        if(!todoFound){
            res.status(400).json({error:"No todo exist"});
        }
        else{
            todoFound.status = req.params.name.toUpperCase();
        }
    }
    res.json(todo.todos);
})

app.listen(3000);