package dtos

import (
	"errors"

	"github.com/asaskevich/govalidator"
)

type UserLoginDTO struct {
	Credentials string `json:"credentials" valid:"required"`
}

func IsValidUserLoginDTO(dto *UserLoginDTO) error {
	result, _ := govalidator.ValidateStruct(dto)

	// TODO: Properly handle validation errors
	if !result {
		return errors.New("invalid body")
	}

	return nil
}
