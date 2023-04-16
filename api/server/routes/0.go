package routes

import (
	types "api/shared"
)

func init() {
	handle := func(h *types.Handler) {
		res := h.Response

		res.Write([]byte("Hello world from API!"))
	}

	route := &Route{
		path:    "/",
		method:  "GET",
		handler: handle,
	}

	Routes.Push(route)
}
