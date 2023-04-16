package dtos

import (
	"errors"

	"github.com/asaskevich/govalidator"
)

type UserResetPasswordDTO struct {
	Email    string `json:"email" valid:"email,required"`
	Code     string `json:"code" valid:"required"`
	Password string `json:"password" valid:"required"`
}

func IsValidUserResetPasswordDTO(dto *UserResetPasswordDTO) error {
	result, _ := govalidator.ValidateStruct(dto)

	// TODO: Properly handle validation errors
	if !result {
		return errors.New("invalid body")
	}

	return nil
}
