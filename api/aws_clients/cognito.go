package awsclients

import (
	"context"
	"errors"
	"strings"

	"github.com/aws/aws-sdk-go-v2/aws"
	cognito "github.com/aws/aws-sdk-go-v2/service/cognitoidentityprovider"
	"github.com/aws/aws-sdk-go-v2/service/cognitoidentityprovider/types"
)

type CognitoClient interface {
	SignUp(email string, password string) (string, error)
	SignIn(email string, password string) (*types.AuthenticationResultType, error)

	ConfirmSignUp(email string, code string) error
	ResendConfirmationCode(email string) error

	ForgotPassword(email string) error
	ResetPassword(email string, code string, password string) error

	RefreshToken(token string) (*types.AuthenticationResultType, error)

	UpdateUserAttributes(sub string, attributes map[string]string) error
}

type awsCognito struct {
	client    *cognito.Client
	client_id string
}

func NewCognitoClient(config *aws.Config, client_id string) *awsCognito {
	client := cognito.NewFromConfig(*config)

	return &awsCognito{
		client:    client,
		client_id: client_id,
	}
}

func (c *awsCognito) SignUp(name, email, password string) (string, error) {
	input := &cognito.SignUpInput{
		ClientId: aws.String(c.client_id),
		Username: aws.String(email),
		Password: aws.String(password),
		UserAttributes: []types.AttributeType{
			{
				Name:  aws.String("email"),
				Value: aws.String(email),
			},
			{
				Name:  aws.String("picture"),
				Value: aws.String(""),
			},
			{
				Name:  aws.String("custom:full_name"),
				Value: aws.String(name),
			},
		},
	}

	res, err := c.client.SignUp(context.Background(), input)
	if err != nil {
		if strings.Contains(err.Error(), "UsernameExistsException") {
			err = errors.New("an account with the given email already exists")
		}

		return "", err
	}

	return *res.UserSub, nil
}

func (c *awsCognito) SignIn(email string, password string) (*types.AuthenticationResultType, error) {
	input := &cognito.InitiateAuthInput{
		ClientId: aws.String(c.client_id),
		AuthFlow: types.AuthFlowTypeUserPasswordAuth,
		AuthParameters: map[string]string{
			"USERNAME": email,
			"PASSWORD": password,
		},
	}

	res, err := c.client.InitiateAuth(context.Background(), input)
	if err != nil {
		if strings.Contains(err.Error(), "NotAuthorizedException") {
			err = errors.New("incorrect email or password")
		}

		if strings.Contains(err.Error(), "UserNotConfirmedException") {
			err = errors.New("user is not confirmed")
		}

		return nil, err
	}

	return res.AuthenticationResult, nil
}

func (c *awsCognito) ConfirmSignUp(email string, code string) error {
	input := &cognito.ConfirmSignUpInput{
		ClientId:         aws.String(c.client_id),
		Username:         aws.String(email),
		ConfirmationCode: aws.String(code),
	}

	_, err := c.client.ConfirmSignUp(context.Background(), input)
	if err != nil {
		if strings.Contains(err.Error(), "ExpiredCodeException") {
			err = errors.New("invalid code provided, please request a code again")
		}
		return err
	}

	return nil
}

func (c *awsCognito) ResendConfirmationCode(email string) error {
	input := &cognito.ResendConfirmationCodeInput{
		ClientId: aws.String(c.client_id),
		Username: aws.String(email),
	}

	_, err := c.client.ResendConfirmationCode(context.Background(), input)
	if err != nil {
		return err
	}

	return nil
}

func (c *awsCognito) UpdateUserAttributes(sub string, attributes map[string]string) error {
	input_attributes := []types.AttributeType{}

	for key, value := range attributes {
		input_attributes = append(input_attributes, types.AttributeType{
			Name:  aws.String(key),
			Value: aws.String(value),
		})
	}

	input := &cognito.AdminUpdateUserAttributesInput{
		UserPoolId:     aws.String(c.client_id),
		Username:       aws.String(sub),
		UserAttributes: input_attributes,
	}

	_, err := c.client.AdminUpdateUserAttributes(context.Background(), input)
	return err
}

func (c *awsCognito) RefreshToken(token string) (*types.AuthenticationResultType, error) {
	input := &cognito.InitiateAuthInput{
		ClientId: aws.String(c.client_id),
		AuthFlow: types.AuthFlowTypeRefreshTokenAuth,
		AuthParameters: map[string]string{
			"REFRESH_TOKEN": token,
		},
	}

	res, err := c.client.InitiateAuth(context.Background(), input)
	if err != nil {
		return nil, err
	}

	return res.AuthenticationResult, nil
}

func (c *awsCognito) ForgotPassword(email string) error {
	input := &cognito.ForgotPasswordInput{
		ClientId: aws.String(c.client_id),
		Username: aws.String(email),
	}

	_, err := c.client.ForgotPassword(context.Background(), input)
	if err != nil {
		return err
	}

	return nil
}

func (c *awsCognito) ResetPassword(email, code, password string) error {
	input := &cognito.ConfirmForgotPasswordInput{
		ClientId:         aws.String(c.client_id),
		Username:         aws.String(email),
		Password:         aws.String(password),
		ConfirmationCode: aws.String(code),
	}

	_, err := c.client.ConfirmForgotPassword(context.Background(), input)
	if err != nil {
		return err
	}

	return nil
}
