package routes

import (
	"api/modules"
	"api/shared"
	"errors"
	"fmt"
	"net/http"
	"os"
	"text/tabwriter"

	http_helper "api/server/helpers"

	"github.com/gorilla/mux"
	array "github.com/mococa/go-array"
)

type ModuleHandler func(*shared.Handler)

type Route struct {
	path    string
	method  string
	handler ModuleHandler
}

var Routes = array.NewGoArray[*Route]()

const reset_color = "\033[0m"

func NewRouter(m *modules.Modules) *mux.Router {
	router := mux.NewRouter()

	Routes.Each(func(route *Route) {
		h := route.handler

		router.HandleFunc(route.path,
			func(w http.ResponseWriter, r *http.Request) {
				w.Header().Set("Content-Type", "application/json")
				w.Header().Set("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers")

				h(
					&shared.Handler{
						Modules:  *m,
						Request:  r,
						Response: w,
						ParseBody: func(dto interface{}) error {
							err := http_helper.GetHTTPBody(r, &dto)
							if err != nil {
								return http_helper.GetHTTPError(errors.New("invalid JSON body"), w, 400)
							}

							return nil
						},
						GetPathParams: func() map[string]string {
							return mux.Vars(r)
						},
					},
				)
			},
		).Methods(route.method)
	})

	return router
}

func DisplayRoutes() {
	fmt.Println("\n--------- Available Routes --------")

	w := tabwriter.NewWriter(os.Stdout, 1, 1, 1, ' ', 0)

	colors := map[string]string{
		"GET":    "\033[34m",
		"POST":   "\033[32m",
		"PATCH":  "\033[33m",
		"PUT":    "\033[36m",
		"DELETE": "\033[31m",
	}

	Routes.Each(func(route *Route) {
		color := colors[route.method]

		message := fmt.Sprintf("%s\t%s[%s]%s", route.path, color, route.method, reset_color)
		fmt.Fprintln(w, message)
	})

	w.Flush()
}
