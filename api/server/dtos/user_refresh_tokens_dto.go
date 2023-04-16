package dtos

import (
	"errors"

	"github.com/asaskevich/govalidator"
)

type UserRefreshTokensDTO struct {
	RefreshToken string `json:"refresh_token" valid:"required"`
}

func IsValidUserRefreshTokensDTO(dto *UserRefreshTokensDTO) error {
	result, _ := govalidator.ValidateStruct(dto)

	// TODO: Properly handle validation errors
	if !result {
		return errors.New("invalid body")
	}

	return nil
}
