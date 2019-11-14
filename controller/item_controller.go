package item

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"

	item "github.com/SoyaManabe/hockey-stick/service"
)

// Controller is item controller
type Controller struct{}

// ListItems action: GET /api/logs/items
func (pc Controller) ListItems(c *gin.Context) {
	var s item.Service
	p, err := s.GetAll()

	if err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
	} else {
		c.Header("Content-Type", "application/json")
		c.Header("Access-Control-Allow-Origin", "*")
		c.JSON(http.StatusOK, p)
	}
}

// Create action : POST /api/logs/items
func (pc Controller) Create(c *gin.Context) {
	var s item.Service
	p, err := s.CreateModel(c)

	if err != nil {
		c.AbortWithStatus(400)
		fmt.Println(err)
	} else {
		headers := c.Request.Header.Get("Access-Control-Request-Headers")
		c.Header("Content-Type", "application/json")
		c.Header("Access-Control-Allow-Origin", "*")
		c.Header("Access-Control-Allow-Methods", "Content-Type")
		c.Header("Access-Control-Allow-Headers", headers)
		c.JSON(http.StatusOK, p)
	}
}

// Create action : OPTIONS /api/logs/items
func (pc Controller)  Options(c *gin.Context) {
	c.Header("Content-type", "application/json")
	c.Header("Access-Control-Allow-Origin", "*")
	c.Header("Access-Control-Allow-Headers", "Content-Type")
    c.JSON(http.StatusOK, gin.H{"status": "ok"})
}

// Update action: PUT /api/logs/items/:id
func (pc Controller) Update(c *gin.Context) {
	id := c.Params.ByName("id")
	var s item.Service
	p, err := s.UpdateByID(id, c)

	if err != nil {
		c.AbortWithStatus(400)
		fmt.Println(err)
	} else {
		c.JSON(http.StatusOK, p)
	}
}

// Delete action: DELETE /api/logs/items/:id
func (pc Controller) Delete(c *gin.Context) {
	id := c.Params.ByName("id")
	var s item.Service

	if err := s.DeleteByID(id); err != nil {
		c.AbortWithStatus(403)
		fmt.Println(err)
	} else {
		c.JSON(204, gin.H{"id #" + id: "deleted"})
	}
}
