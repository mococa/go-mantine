package database

import (
	"api/config"
	"fmt"
	"log"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var db *gorm.DB

func Init() *gorm.DB {
	env, err := config.LoadEnv()
	if err != nil {
		panic("ENV error")
	}

	DB_URI := env.DB_URI

	db, err := gorm.Open(postgres.Open(DB_URI), &gorm.Config{})

	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("Connected to database")

	runMigrations(db)

	return db
}

func GetDB() *gorm.DB {
	return db
}
