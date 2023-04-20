include .env
export

dev:
	go run main.go

build:
	CGO_ENABLED=0 go build -o api main.go

build_linux:
	env GOOS=linux GOARCH=amd64 go build -o ./bin/api main.go