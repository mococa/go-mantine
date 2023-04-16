package modules

import (
	awsclients "api/aws_clients"

	"gorm.io/gorm"
)

type Modules struct {
	User UserModule
}

func NewModules(db *gorm.DB) *Modules {
	clients := awsclients.NewAwsClients()

	return &Modules{
		User: NewUserModule(db, clients),
	}
}
