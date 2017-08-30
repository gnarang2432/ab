var StatusENUMS = {
    ACTIVE:"ACTIVE",
    COMPLETE:"COMPLETE",
    DELETED:"DELETED"
}

var todos = {
    1:{title:"Hit someone",status:"ACTIVE"},
    2:{title:"Focus on goals",status:"ACTIVE"},
    3:{title:"Don't run after someone",status:"ACTIVE"}
}

var next_todo_id = 4;

module.exports={
    StatusENUMS:StatusENUMS,
    todos:todos,
    next_todo_id:next_todo_id
}