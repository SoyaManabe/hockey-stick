package main

import (
	"net/http"

	"github.com/gin-gonic/gin"

	"github.com/SoyaManabe/hockey-stick/db"
	"github.com/SoyaManabe/hockey-stick/server"
)

type Item struct {
	ID       int    `json:"id"`
	Name     string `json:"name"`
	Category string `json:"category"`
	Price    int    `json:"price"`
	Date     string `json:"date"`
}

type Sum struct {
	Date  string `json:"date"`
	Price int    `json:"price"`
	Diff  int    `json:"diff"`
	Total int    `json:"total"`
}

// This is sumple items
// need to consider about date
var items = []Item{
	Item{1, "Coffee", "Food", 260, "2019/10/30"},
	Item{2, "Train", "Exportation", 250, "2019/10/30"},
	Item{3, "Lunch", "Food", 540, "2019/10/30"},
	Item{4, "Drink", "Food", 150, "2019/10/31"},
}

var sums = []Sum{
	Sum{"2019/10/27", 760, 40, 40},
	Sum{"2019/10/28", 580, 220, 260},
	Sum{"2019/10/29", 760, 40, 300},
	Sum{"2019/10/30", 1050, -250, 50},
	Sum{"2019/10/31", 150, 650, 700},
}

func main() {

	// Initialize DB
	db.Init()

	server.Init()
}

func ListSums(c *gin.Context) {
	c.Header("Content-Type", "application/json")
	c.Header("Access-Control-Allow-Origin", "*")
	c.JSON(http.StatusOK, sums)
}
