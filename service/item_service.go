package item

import (
	"log"
	"github.com/gin-gonic/gin"

	"github.com/SoyaManabe/hockey-stick/db"
	"github.com/SoyaManabe/hockey-stick/entity"
)

// Service procides item's behavior
type Service struct{}

// Item is alias of entity.Item struct
type Item entity.Item

// GetAll is get all Item
func (s Service) GetAll() ([]Item, error) {
	db := db.GetDB()
	var i []Item

	if err := db.Find(&i).Error; err != nil {
		return nil, err
	}

	return i, nil
}

// CreateModel is create Item model
func (s Service) CreateModel(c *gin.Context) (Item, error) {
	db := db.GetDB()
	var i Item

	if err := c.BindJSON(&i); err != nil {

		log.Printf("Whatnareudoingmen");
		return i, err
	}

	if err := db.Create(&i).Error; err != nil {
		return i, err
	}

	return i, nil
}

// GetByID is get a User
func (s Service) GetByID(id string) (Item, error) {
	db := db.GetDB()
	var i Item

	if err := db.Where("id = ?", id).First(&i).Error; err != nil {
		return i, err
	}
	return i, nil
}

// UpdateByID is update an Item
func (s Service) UpdateByID(id string, c *gin.Context) (Item, error) {
	db := db.GetDB()
	var i Item

	if err := db.Where("id = ?", id).First(&i).Error; err != nil {
		return i, err
	}
	if err := c.BindJSON(&i); err != nil {
		return i, err
	}

	db.Save(&i)

	return i, nil
}

// DeleteByID is delete an item
func (s Service) DeleteByID(id string) error {
	db := db.GetDB()
	var i Item

	if err := db.Where("id = ?", id).Delete(&i).Error; err != nil {
		return err
	}

	return nil
}
