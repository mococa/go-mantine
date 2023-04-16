package shared

import (
	"api/config"
	"api/modules"

	"net/http"

	"github.com/gorilla/mux"
)

type HttpServer struct {
	Modules *modules.Modules
	Router  *mux.Router
	Port    string
	Start   func()
	Env     config.Config
}

type Handler struct {
	Modules       modules.Modules
	Request       *http.Request
	Response      http.ResponseWriter
	ParseBody     func(body any) error
	GetPathParams func() map[string]string
}
