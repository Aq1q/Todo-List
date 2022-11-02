const projectsList = {
    projects: [],
    addProject: function(title) {
        if(this.projects.length != 0) {
            this.projects.push({
                pid: this.projects[this.projects.length - 1].pid + 1,
                title, 
                tasks:[],
                addTask: function(title, dueDate = '', priority = 0, description = '') {
                    if(this.tasks.length != 0) {
                        this.tasks.push({
                            id: this.tasks[this.tasks.length - 1].id + 1,
                            title,
                            description,
                            dueDate,
                            priority
                        });
                    } else {
                        this.tasks.push({
                            id: this.tasks.length,
                            title,
                            description,
                            dueDate,
                            priority
                        })
                    };
                },
                removeTask: function(id) {
                    const taskWithId = this.tasks.findIndex(obj => obj.id == id)
                    this.tasks.splice(taskWithId, 1);
                },
            });
        } else {
            this.projects.push({
                pid: this.projects.length,
                title, 
                tasks:[],
                addTask: function(title, dueDate = '', priority = 0, description = '') { 
                    if(this.tasks.length != 0) {
                        this.tasks.push({
                            id: this.tasks[this.tasks.length - 1].id + 1,
                            title,
                            description,
                            dueDate,
                            priority
                        });
                    } else {
                        this.tasks.push({
                            id: this.tasks.length,
                            title,
                            description,
                            dueDate,
                            priority
                        });
                    };
                },
                removeTask: function(id) {
                    const taskWithId = this.tasks.findIndex(obj => obj.id == id);
                    this.tasks.splice(taskWithId, 1);
                },
            });   
        }
    },
    removeProject: function(id) {
        const projectWithId = this.projects.findIndex(obj => obj.pid == id);
        this.projects.splice(projectWithId, 1);
    }
}

export { projectsList };