package awsclients

import (
	api "api/config"
	"context"
	"fmt"

	"github.com/aws/aws-sdk-go-v2/config"
)

type AwsClients struct {
	Cognito *awsCognito
	S3      *awsS3
}

func NewAwsClients() *AwsClients {
	env, err := api.LoadEnv()
	if err != nil {
		panic(error.Error(fmt.Errorf("could not load env %s", err)))
	}

	cognito_client_id := env.COGNITO_CLIENT_ID

	cfg, err := config.LoadDefaultConfig(context.Background())
	if err != nil {
		panic(err)
	}

	return &AwsClients{
		Cognito: NewCognitoClient(&cfg, cognito_client_id),
		S3:      NewS3Client(&cfg),
	}
}
