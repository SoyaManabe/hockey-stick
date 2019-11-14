package db

import (
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/postgres"

	"github.com/SoyaManabe/hockey-stick/entity"
)

var (
	db  *gorm.DB
	err error
)

// Init is initialize db from main function
func Init() {
	db, err = gorm.Open("postgres", "host=localhost port=5432 user=postgres dbname=postgres password=secret sslmode=disable")
	if err != nil {
		panic(err)
	}

	autoMigration()
}

// GetDB is called in models
func GetDB() *gorm.DB {
	return db
}

// Close is closing db
func Close() {
	if err := db.Close(); err != nil {
		panic(err)
	}
}

func autoMigration() {
	db.AutoMigrate(&entity.Item{})
}
