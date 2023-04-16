package dtos

import (
	"errors"

	"github.com/asaskevich/govalidator"
)

type UserPasswordCheckDTO struct {
	HashedPassword   string `valid:"required"`
	UnhashedPassword string `json:"password" valid:"required"`
}

func IsValidUserPasswordCheckDTO(dto *UserPasswordCheckDTO) error {
	result, _ := govalidator.ValidateStruct(dto)

	// TODO: Properly handle validation errors
	if !result {
		return errors.New("invalid body")
	}

	return nil
}
