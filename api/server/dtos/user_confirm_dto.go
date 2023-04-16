package dtos

import (
	"errors"

	"github.com/asaskevich/govalidator"
)

type UserConfirmDTO struct {
	Email string `json:"email" valid:"required,email"`
	Code  string `json:"code" valid:"required"`
}

func IsValidUserConfirmDTO(dto *UserConfirmDTO) error {
	result, _ := govalidator.ValidateStruct(dto)

	// TODO: Properly handle validation errors
	if !result {
		return errors.New("invalid body")
	}

	return nil
}
