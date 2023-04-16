package dtos

import (
	"errors"

	"github.com/asaskevich/govalidator"
)

type UserResendConfirmationDTO struct {
	Email string `json:"email" valid:"required,email"`
}

func IsValidUserResendConfirmationDTO(dto *UserResendConfirmationDTO) error {
	result, _ := govalidator.ValidateStruct(dto)

	// TODO: Properly handle validation errors
	if !result {
		return errors.New("invalid body")
	}

	return nil
}
