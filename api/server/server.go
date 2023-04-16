package httpserver

import (
	"api/config"
	"api/modules"
	"api/server/routes"
	"api/shared"
	"fmt"
	"log"
	"net/http"

	"github.com/rs/cors"
	"gorm.io/gorm"
)

func NewServer(port string, db *gorm.DB) *shared.HttpServer {
	env, err := config.LoadEnv()
	if err != nil {
		panic(error.Error(fmt.Errorf("could not load env %s", err)))
	}

	modules := modules.NewModules(db)
	router := routes.NewRouter(modules)

	server := &shared.HttpServer{
		Modules: modules,
		Router:  router,
		Port:    ":3333",
		Start:   nil,
		Env:     env,
	}

	server.Start = func() {
		startServer(server)
	}

	return server
}

func startServer(s *shared.HttpServer) {
	c := cors.New(cors.Options{
		AllowedOrigins:   []string{"*"},
		AllowCredentials: true,
		AllowedHeaders:   []string{"*"},
		ExposedHeaders:   []string{"set-cookie"},
		Debug:            true,
	})

	handler := c.Handler(s.Router)

	log.Println("Server listening on port", s.Port)

	routes.DisplayRoutes()

	log.Fatalln(http.ListenAndServe(s.Port, handler))
}
