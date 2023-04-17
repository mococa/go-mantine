package main

import (
	httpserver "api/server"
	"api/server/database"

	"github.com/joho/godotenv"
)

func init() {
	godotenv.Load("app.env")
}

func main() {
	const port string = ":3333"

	db := database.Init()

	server := httpserver.NewServer(port, db)
	server.Start()
}
