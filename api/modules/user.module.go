package modules

import (
	awsclients "api/aws_clients"

	"github.com/aws/aws-sdk-go-v2/service/cognitoidentityprovider/types"
	"gorm.io/gorm"
)

/* -------------- Types -------------- */

type UserModule struct {
	Db         *gorm.DB
	awsClients *awsclients.AwsClients
}

/* -------------- Initialization -------------- */

func NewUserModule(db *gorm.DB, clients *awsclients.AwsClients) UserModule {
	return UserModule{db, clients}
}

/* -------------- Methods -------------- */
func (u *UserModule) Login(email string, password string) (*types.AuthenticationResultType, error) {
	return u.awsClients.Cognito.SignIn(email, password)
}

func (u *UserModule) Register(name, email, password string) (string, error) {
	sub, err := u.awsClients.Cognito.SignUp(name, email, password)
	if err != nil {
		return "", err
	}

	return sub, nil
}

func (u *UserModule) ConfirmUser(email string, code string) error {
	return u.awsClients.Cognito.ConfirmSignUp(email, code)
}

func (u *UserModule) ResendConfirmationCode(email string) error {
	return u.awsClients.Cognito.ResendConfirmationCode(email)
}

func (u *UserModule) RefreshTokens(refresh_token string) (*types.AuthenticationResultType, error) {
	return u.awsClients.Cognito.RefreshToken(refresh_token)
}

func (u *UserModule) ForgotPassword(email string) error {
	return u.awsClients.Cognito.ForgotPassword(email)
}

func (u *UserModule) ResetPassword(email, code, password string) error {
	return u.awsClients.Cognito.ResetPassword(email, code, password)
}
