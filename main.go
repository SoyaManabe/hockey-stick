package main

import (
	"net/http"

	"github.com/gin-gonic/contrib/static"
	"github.com/gin-gonic/gin"
)

type Item struct {
	ID       int    `json:"id"`
	Name     string `json:"name"`
	Category string `json:"category"`
	Price    int    `json:"price"`
	Date     string `json:"date"`
}

// This is sumple items
// need to consider about date
var items = []Item{
	Item{1, "Coffee", "Food", 260, "2019/10/30"},
	Item{2, "Train", "Exportation", 250, "2019/10/30"},
	Item{3, "Lunch", "Food", 540, "2019/10/30"},
	Item{4, "Drink", "Food", 150, "2019/10/31"},
}

func main() {
	router := gin.Default()

	router.Use(static.Serve("/", static.LocalFile("./client/build", true)))

	api := router.Group("/api")
	{
		api.GET("/", func(c *gin.Context) {
			c.JSON(http.StatusOK, gin.H{
				"message": "pong",
			})
		})
	}

	// Define routes to describe HockeyStick
	// /items
	// /logs
	api.GET("/logs/items", ListItems)

	router.Run(":5000")
}

func ListItems(c *gin.Context) {
	c.Header("Content-Type", "application/json")
	c.Header("Access-Control-Allow-Origin", "*")
	c.JSON(http.StatusOK, items)
}
