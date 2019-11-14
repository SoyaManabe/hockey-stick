package server

import (
	"net/http"

	"github.com/gin-gonic/contrib/static"
	"github.com/gin-gonic/gin"
	"github.com/gin-contrib/cors"

	item "github.com/SoyaManabe/hockey-stick/controller"
)

// Init is initialize server
func Init() {
	r := router()
	r.Run(":5000")
}

func router() *gin.Engine {
	r := gin.Default()

	r.Use(cors.Default())
	r.Use(static.Serve("/", static.LocalFile("./client/build", true)))

	api := r.Group("/api")
	{
		api.GET("/", func(c *gin.Context) {
			c.JSON(http.StatusOK, gin.H{
				"message": "pong",
			})
		})
	}
	// Controller
	ctrl := item.Controller{}

	// Define routes to describe HockeyStick
	// /items
	// /logs
	api.GET("/logs/items", ctrl.ListItems)
	api.POST("/logs/items", ctrl.Create)
	api.OPTIONS("/logs/items", ctrl.Options)
	api.PUT("/logs/items/:id", ctrl.Update)
	api.DELETE("/logs/items/:id", ctrl.Delete)
	//	api.GET("/logs/sums", ListSums)
	return r

}
