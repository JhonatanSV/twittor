package db

import "golang.org/x/crypto/bcrypt"

//EncryptPassword encrypts the password of the new user
func EncryptPassword(pass string) (string, error) {
	cost := 8
	bytes, err := bcrypt.GenerateFromPassword([]byte(pass), cost)
	return string(bytes), err
}
