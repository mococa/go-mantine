package database

import (
	"fmt"

	"gorm.io/gorm"
)

func runMigrations(db *gorm.DB) {
	fmt.Println("Running migrations...")

	db.AutoMigrate(
	// list models. e.g: &models.App, &models.AppUser
	)
}
