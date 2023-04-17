package config

import "github.com/spf13/viper"

type Config struct {
	DB_URI            string `mapstructure:"DB_URI"`
	COGNITO_CLIENT_ID string `mapstructure:"COGNITO_CLIENT_ID"`
	DOMAIN            string `mapstructure:"DOMAIN"`
}

func LoadEnv() (config Config, err error) {
	viper.AddConfigPath(".")
	viper.SetConfigName("app")
	viper.SetConfigType("env")

	viper.AutomaticEnv()

	err = viper.ReadInConfig()
	if err != nil {
		viper.AutomaticEnv()
	}

	err = viper.Unmarshal(&config)

	return
}
