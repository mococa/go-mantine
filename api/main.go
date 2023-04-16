package main

import (
	httpserver "api/server"
	"api/server/database"
)

func main() {
	const port string = ":3333"

	db := database.Init()

	server := httpserver.NewServer(port, db)
	server.Start()
}
