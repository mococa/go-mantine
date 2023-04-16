package dtos

import (
	"errors"

	"github.com/asaskevich/govalidator"
)

type CreateUserDTO struct {
	Email    string `json:"email" valid:"required,email"`
	Password string `json:"password" valid:"required"`
	Name     string `json:"name" valid:"required"`
}

func IsValidCreateUserDTO(dto *CreateUserDTO) error {
	result, _ := govalidator.ValidateStruct(dto)

	// TODO: Properly handle validation errors
	if !result {
		return errors.New("invalid body")
	}

	return nil
}
