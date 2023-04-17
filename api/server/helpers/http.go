package helpers

import (
	"encoding/base64"
	"encoding/json"
	"errors"
	"fmt"
	"net/http"
	"os"
	"strings"
	"time"

	"github.com/aws/aws-sdk-go-v2/service/cognitoidentityprovider/types"
)

func GetHTTPBody(req *http.Request, model interface{}) error {
	err := json.NewDecoder(req.Body).Decode(model)
	return err
}

func GetHTTPError(err error, res http.ResponseWriter, status int) error {
	if err != nil {
		res.WriteHeader(status)

		res.Write([]byte(fmt.Sprintf(`{"message": "%s"}`, err.Error())))

		return err
	}

	return nil
}

func JsonResponse(w http.ResponseWriter, status int, response interface{}) {
	if response != nil {
		r, err := json.Marshal(response)

		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			w.Write([]byte(`{"message": "Error marshalling"}`))
			return
		}

		w.WriteHeader(status)
		w.Write([]byte(r))

		return
	}

	w.WriteHeader(http.StatusOK)

}

type Decoded struct {
	Sub             string `json:"sub"`
	Exp             int64  `json:"exp"`
	Iat             int64  `json:"iat"`
	Email           string `json:"email"`
	Iss             string `json:"iss"`
	CognitoUsername string `json:"cognito:username"`
	OriginJTI       string `json:"origin_jti"`
	Aud             string `json:"aud"`
	EventID         string `json:"event_id"`
	TokenUse        string `json:"token_use"`
	AuthTime        int64  `json:"auth_time"`
}

func decodeIDToken(token string) (*Decoded, error) {
	parts := strings.Split(token, ".")

	if len(parts) != 3 {
		return nil, errors.New("invalid token format")
	}

	payload, err := base64.RawStdEncoding.DecodeString(parts[1])
	if err != nil {
		return nil, errors.New("invalid payload")
	}

	claims := Decoded{}

	err = json.Unmarshal(payload, &claims)
	if err != nil {
		return nil, err
	}

	if claims.Exp < time.Now().Unix() {
		return nil, errors.New("token has expired")
	}

	return &claims, nil
}

func SetAuthCookies(res http.ResponseWriter, tokens *types.AuthenticationResultType) {
	domain := os.Getenv("DOMAIN")
	expires := time.Now().Add(time.Duration(tokens.ExpiresIn) * time.Second)

	http.SetCookie(res, &http.Cookie{
		Name:     "access_token",
		Value:    *tokens.AccessToken,
		Path:     "/",
		Expires:  expires,
		Secure:   true,
		Domain:   domain,
		SameSite: http.SameSiteNoneMode,
		HttpOnly: true,
		MaxAge:   int(tokens.ExpiresIn),
	})

	http.SetCookie(res, &http.Cookie{
		Name:     "id_token",
		Value:    *tokens.IdToken,
		Path:     "/",
		Expires:  expires,
		Secure:   true,
		Domain:   domain,
		SameSite: http.SameSiteNoneMode,
		HttpOnly: true,
		MaxAge:   int(tokens.ExpiresIn),
	})

	http.SetCookie(res, &http.Cookie{
		Name:     "refresh_token",
		Value:    *tokens.RefreshToken,
		Path:     "/",
		Expires:  expires,
		Secure:   true,
		Domain:   domain,
		SameSite: http.SameSiteNoneMode,
		HttpOnly: true,
		MaxAge:   int(tokens.ExpiresIn),
	})
}

func RemoveAuthCookies(res http.ResponseWriter) {
	domain := os.Getenv("DOMAIN")

	http.SetCookie(res, &http.Cookie{
		Name:     "id_token",
		MaxAge:   -1,
		Expires:  time.Now().Add(-100 * time.Hour),
		Path:     "/",
		Secure:   true,
		Domain:   domain,
		SameSite: http.SameSiteNoneMode,
		HttpOnly: true,
	})

	http.SetCookie(res, &http.Cookie{
		Name:     "access_token",
		MaxAge:   -1,
		Expires:  time.Now().Add(-100 * time.Hour),
		Path:     "/",
		Secure:   true,
		Domain:   domain,
		SameSite: http.SameSiteNoneMode,
		HttpOnly: true,
	})

	http.SetCookie(res, &http.Cookie{
		Name:     "refresh_token",
		MaxAge:   -1,
		Expires:  time.Now().Add(-100 * time.Hour),
		Path:     "/",
		Secure:   true,
		Domain:   domain,
		SameSite: http.SameSiteNoneMode,
		HttpOnly: true,
	})
}

func GetAuthorization(req *http.Request) (*Decoded, error) {
	cookie, err := req.Cookie("id_token")
	if err != nil {
		return nil, errors.New("no token was provided")
	}

	if cookie.Value == "" {
		return nil, errors.New("cookie token has no value in it")
	}

	return decodeIDToken(cookie.Value)
}
