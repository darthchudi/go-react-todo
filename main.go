package main

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/mysql"
	"time"
)

var db *gorm.DB

type TodoModel struct {
	ID          uint `gorm:"primary_key"`
	CreatedAt   time.Time
	UpdatedAt   time.Time
	Description string
	Completed   bool ` gorm: "default: false" `
}

func (TodoModel) TableName() string {
	return "todos"
}

func main() {
	//Open a DB Connection
	var err error
	db, err = gorm.Open("mysql", "root@tcp(127.0.0.1:3306)/todo?charset=utf8&parseTime=True&loc=Local")
	defer db.Close()

	db.AutoMigrate(&TodoModel{})

	if err != nil {
		panic("failed to connect to database")
	}

	//Set Up Gin and Mount Routers
	router := gin.Default()

	api := router.Group("/api")
	{
		api.POST("/create", CreateTodo)
		api.GET("/fetch/:id", FetchTodo)
		api.GET("/fetch", FetchAllTodos)
		api.POST("/update/:id", UpdateTodo)
		api.POST("/delete/:id", DeleteTodo)
		api.POST("/complete/:id", CompleteTodo)
	}

	router.Run()
}

func CreateTodo(context *gin.Context) {
	var todo TodoModel
	context.ShouldBind(&todo)
	db.Create(&todo)
	context.JSON(200, gin.H{"message": "successfully fetched todo", "todo": todo})
}

func FetchAllTodos(context *gin.Context) {
	var todos []TodoModel
	db.Find(&todos)
	if len(todos) <= 0 {
		context.JSON(404, gin.H{"message": "No todos found"})
		return
	}
	context.JSON(200, gin.H{"message": "successfully fetched todos", "todos": todos})
}

func FetchTodo(context *gin.Context) {
	var todo TodoModel
	id := context.Param("id")
	db.Find(&todo, id)

	if todo.ID == 0 {
		context.JSON(404, gin.H{"message": "No todo found"})
		return
	}

	context.JSON(200, gin.H{"message": "successfully fetched todo", "todo": todo})
}

func UpdateTodo(context *gin.Context) {
	var todo TodoModel
	description := context.PostForm("Description")
	id := context.Param("id")
	db.Find(&todo, id)

	if todo.ID == 0 {
		context.JSON(404, gin.H{"message": "No todo found"})
		return
	}

	db.Model(&todo).Update("description", description)

	context.JSON(200, gin.H{"message": "Successfully updated Todo", "todo": todo})
}

func DeleteTodo(context *gin.Context) {
	var todo TodoModel
	id := context.Param("id")
	db.Find(&todo, id)

	if todo.ID == 0 {
		context.JSON(404, gin.H{"message": "No todo found"})
		return
	}

	db.Delete(&todo)

	fmt.Println(todo)

	context.JSON(200, gin.H{"message": "Successfully deleted Todo", "todo": todo})
}

func CompleteTodo(context *gin.Context) {
	var todo TodoModel
	id := context.Param("id")
	db.Find(&todo, id)

	if todo.ID == 0 {
		context.JSON(404, gin.H{"message": "No todo found"})
		return
	}

	db.Model(&todo).Update("completed", true)

	context.JSON(200, gin.H{"message": "Successfully marked Todo as Complete", "todo": todo})

}
