package routes

import (
	"api/server/dtos"
	http_helper "api/server/helpers"
	types "api/shared"
	"encoding/base64"
	"errors"
	"net/http"
	"strings"
)

func handleLogin(h *types.Handler) {
	res := h.Response
	modules := h.Modules

	credentials := &dtos.UserLoginDTO{}

	if h.ParseBody(credentials) != nil {
		return
	}

	if dtos.IsValidUserLoginDTO(credentials) != nil {
		http_helper.GetHTTPError(errors.New("empty credentials"), res, 400)
		return
	}

	if !strings.Contains(credentials.Credentials, "Basic ") {
		http_helper.GetHTTPError(errors.New("credentials are not a Basic token"), res, 400)
		return
	}

	base64string := strings.Split(credentials.Credentials, "Basic ")[1]

	decoded_credentials, err := base64.StdEncoding.DecodeString(base64string)
	if http_helper.GetHTTPError(err, res, 400) != nil {
		return
	}

	split_credentials := strings.Split(string(decoded_credentials), ":")
	email, password := split_credentials[0], split_credentials[1]

	tokens, err := modules.User.Login(email, password)
	if http_helper.GetHTTPError(err, res, 500) != nil {
		return
	}

	http_helper.SetAuthCookies(res, tokens)

	http_helper.JsonResponse(
		res,
		http.StatusOK,
		tokens,
	)
}

func handleRegister(h *types.Handler) {
	res := h.Response
	modules := h.Modules

	credentials := &dtos.UserLoginDTO{}

	if h.ParseBody(credentials) != nil {
		return
	}

	if dtos.IsValidUserLoginDTO(credentials) != nil {
		http_helper.GetHTTPError(errors.New("invalid schema"), res, 400)
		return
	}

	decoded_credentials, err := base64.StdEncoding.DecodeString(credentials.Credentials)
	if http_helper.GetHTTPError(err, res, 400) != nil {
		return
	}

	split_credentials := strings.Split(string(decoded_credentials), ":")
	full_name, email, password := split_credentials[0], split_credentials[1], split_credentials[2]

	_, err = modules.User.Register(full_name, email, password)

	if http_helper.GetHTTPError(err, res, 500) != nil {
		return
	}

	http_helper.JsonResponse(
		res,
		http.StatusOK,
		nil,
	)
}

func handleConfirmUser(h *types.Handler) {
	res := h.Response
	modules := h.Modules

	body := &dtos.UserConfirmDTO{}

	if h.ParseBody(body) != nil {
		return
	}

	if dtos.IsValidUserConfirmDTO(body) != nil {
		http_helper.GetHTTPError(errors.New("invalid schema"), res, 500)
		return
	}

	err := modules.User.ConfirmUser(body.Email, body.Code)
	if http_helper.GetHTTPError(err, res, 500) != nil {
		return
	}

	http_helper.JsonResponse(
		res,
		http.StatusOK,
		nil,
	)
}

func handleResendConfirmationCode(h *types.Handler) {
	res := h.Response
	modules := h.Modules

	body := &dtos.UserResendConfirmationDTO{}

	if h.ParseBody(body) != nil {
		return
	}

	if dtos.IsValidUserResendConfirmationDTO(body) != nil {
		http_helper.GetHTTPError(errors.New("invalid schema"), res, 400)
		return
	}

	err := modules.User.ResendConfirmationCode(body.Email)
	if http_helper.GetHTTPError(err, res, 500) != nil {
		return
	}

	type response struct {
		Message string `json:"message"`
	}

	http_helper.JsonResponse(
		res,
		http.StatusOK,
		response{Message: "Ok"},
	)
}

func handleRefreshTokens(h *types.Handler) {
	req := h.Request
	res := h.Response
	modules := h.Modules

	refresh_token := req.Header.Get("Authorization")

	tokens, err := modules.User.RefreshTokens(refresh_token)
	if http_helper.GetHTTPError(err, res, 500) != nil {
		return
	}

	tokens.RefreshToken = &refresh_token

	http_helper.SetAuthCookies(res, tokens)

	http_helper.JsonResponse(
		res,
		http.StatusOK,
		tokens,
	)
}

func handleForgotPassword(h *types.Handler) {
	res := h.Response
	modules := h.Modules

	body := &dtos.UserForgotPasswordDTO{}

	if h.ParseBody(body) != nil {
		return
	}

	if dtos.IsValidUserForgotPasswordDTO(body) != nil {
		http_helper.GetHTTPError(errors.New("invalid schema"), res, 500)
		return
	}

	err := modules.User.ForgotPassword(body.Email)

	if err != nil {
		http_helper.GetHTTPError(err, res, 500)
		return
	}

	http_helper.JsonResponse(res, 200, nil)
}

func handleResetPassword(h *types.Handler) {
	res := h.Response
	modules := h.Modules

	body := &dtos.UserResetPasswordDTO{}

	if h.ParseBody(body) != nil {
		return
	}

	if dtos.IsValidUserResetPasswordDTO(body) != nil {
		http_helper.GetHTTPError(errors.New("invalid schema"), res, 500)
		return
	}

	err := modules.User.ResetPassword(body.Email, body.Code, body.Password)

	if err != nil {
		http_helper.GetHTTPError(err, res, 500)
		return
	}

	http_helper.JsonResponse(res, 200, nil)
}

func handleLogout(h *types.Handler) {
	http_helper.RemoveAuthCookies(h.Response)

	type response struct {
		Message string `json:"message"`
	}

	http_helper.JsonResponse(
		h.Response,
		http.StatusOK,
		response{Message: "Ok"},
	)
}

func init() {
	loginRoute := &Route{
		path:    "/sign-in",
		method:  "POST",
		handler: handleLogin,
	}

	registerRoute := &Route{
		path:    "/sign-up",
		method:  "POST",
		handler: handleRegister,
	}

	confirmUserRoute := &Route{
		path:    "/confirm-user",
		method:  "POST",
		handler: handleConfirmUser,
	}

	resendConfirmationCodeRoute := &Route{
		path:    "/resend-confirmation-code",
		method:  "POST",
		handler: handleResendConfirmationCode,
	}

	refreshTokensRoute := &Route{
		path:    "/refresh-tokens",
		method:  "GET",
		handler: handleRefreshTokens,
	}

	logoutRoute := &Route{
		path:    "/logout",
		method:  "GET",
		handler: handleLogout,
	}

	forgotPasswordRoute := &Route{
		path:    "/forgot-password",
		method:  "POST",
		handler: handleForgotPassword,
	}

	resetPasswordRoute := &Route{
		path:    "/reset-password",
		method:  "PUT",
		handler: handleResetPassword,
	}

	Routes.Push(loginRoute)
	Routes.Push(registerRoute)
	Routes.Push(forgotPasswordRoute)
	Routes.Push(resetPasswordRoute)
	Routes.Push(confirmUserRoute)
	Routes.Push(resendConfirmationCodeRoute)
	Routes.Push(refreshTokensRoute)
	Routes.Push(logoutRoute)

}
