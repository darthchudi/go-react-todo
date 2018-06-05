package main

import (
	_ "fmt"
	_ "github.com/gin-contrib/static"
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

	//Serve the html file
	// router.Use(static.Serve("/", static.LocalFile("/frontend/public", true)))

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
	var allTodos []TodoModel
	var uncompletedTodos []TodoModel

	//Bind the todo from the form and create the todos
	context.ShouldBind(&todo)
	db.Create(&todo)

	//Find all the todos
	db.Find(&allTodos)

	//Find uncompleted Todos
	db.Where("completed = ?", false).Find(&uncompletedTodos)

	context.JSON(200, gin.H{"message": "successfully created todo", "todo": todo, "allTodos": allTodos, "uncompletedTodos": uncompletedTodos})
}

func FetchAllTodos(context *gin.Context) {
	var allTodos []TodoModel
	var completedTodos []TodoModel
	var uncompletedTodos []TodoModel

	db.Find(&allTodos)
	db.Where("completed = ?", true).Find(&completedTodos)
	db.Where("completed = ?", false).Find(&uncompletedTodos)

	if len(allTodos) <= 0 {
		context.JSON(404, gin.H{"message": "No todos found"})
		return
	}

	context.JSON(200, gin.H{"message": "successfully fetched todos", "allTodos": allTodos, "uncompletedTodos": uncompletedTodos, "completedTodos": uncompletedTodos})
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
	var allTodos []TodoModel
	var uncompletedTodos []TodoModel
	var completedTodos []TodoModel

	id := context.Param("id")
	db.Find(&todo, id)

	if todo.ID == 0 {
		context.JSON(404, gin.H{"message": "No todo found"})
		return
	}

	db.Delete(&todo)

	db.Where("completed = ?", true).Find(&completedTodos)
	db.Where("completed = ?", false).Find(&uncompletedTodos)
	db.Find(&allTodos)

	context.JSON(200, gin.H{"message": "Successfully deleted Todo", "todo": todo, "allTodos": allTodos, "completedTodos": completedTodos, "uncompletedTodos": uncompletedTodos})
}

func CompleteTodo(context *gin.Context) {
	var todo TodoModel
	var uncompletedTodos []TodoModel
	var completedTodos []TodoModel

	//Find Todo
	id := context.Param("id")
	db.Find(&todo, id)

	if todo.ID == 0 {
		context.JSON(404, gin.H{"message": "No todo found"})
		return
	}

	//Update Todo
	db.Model(&todo).Update("completed", true)
	db.Where("completed = ?", true).Find(&completedTodos)
	db.Where("completed = ?", false).Find(&uncompletedTodos)

	context.JSON(200, gin.H{"message": "Successfully marked Todo as Complete", "todo": todo, "completedTodos": completedTodos, "uncompletedTodos": uncompletedTodos})
}
