package httpserver

import (
	"api/modules"
	"api/server/routes"
	"api/shared"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/rs/cors"
	"gorm.io/gorm"
)

func NewServer(port string, db *gorm.DB) *shared.HttpServer {
	modules := modules.NewModules(db)
	router := routes.NewRouter(modules)

	server := &shared.HttpServer{
		Modules: modules,
		Router:  router,
		Port:    ":3333",
		Start:   nil,
	}

	server.Start = func() {
		startServer(server)
	}

	return server
}

func startServer(s *shared.HttpServer) {
	domain := os.Getenv("DOMAIN")

	c := cors.New(cors.Options{
		AllowedOrigins:   []string{"http://localhost:3000", fmt.Sprintf("https://%s", domain)},
		AllowCredentials: true,
		AllowedHeaders:   []string{"*"},
		ExposedHeaders:   []string{"set-cookie"},
		AllowedMethods:   []string{"GET", "POST", "PUT"},
		Debug:            true,
	})

	handler := c.Handler(s.Router)

	log.Println("Server listening on port", s.Port)

	routes.DisplayRoutes()

	log.Fatalln(http.ListenAndServe(s.Port, handler))
}
