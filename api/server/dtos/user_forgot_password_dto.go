package dtos

import (
	"errors"

	"github.com/asaskevich/govalidator"
)

type UserForgotPasswordDTO struct {
	Email string `json:"email" valid:"email,required"`
}

func IsValidUserForgotPasswordDTO(dto *UserForgotPasswordDTO) error {
	result, _ := govalidator.ValidateStruct(dto)

	// TODO: Properly handle validation errors
	if !result {
		return errors.New("invalid body")
	}

	return nil
}
