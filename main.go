package main

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"time"
)

var err error

type Hero struct {
	Name       string `json: "name"`
	Superpower string `json: "superpower"`
	Villains   int    `json: "villains"`
}

func main() {

	fmt.Println(time.Now().Format(time.RFC3339))
	// router := gin.Default()
	// router.POST("/api/create", CreateHero)
	// router.Run()
}

func CreateHero(c *gin.Context) {
	var hero Hero
	c.ShouldBind(&hero)

	fmt.Println(hero.Name)

	c.JSON(200, hero)

}
