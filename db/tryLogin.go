package db

import (
	"github.com/JhonatanSV/Twittor/models"
	"golang.org/x/crypto/bcrypt"
)

//TryLogin checks the user with de DB
func TryLogin(mail string, password string) (models.User, bool) {
	userF, found, _ := CheckUserExist(mail)
	if found == false {
		return userF, false
	}

	passwordBytes := []byte(password)
	passwordDB := []byte(userF.Password)

	err := bcrypt.CompareHashAndPassword(passwordDB, passwordBytes)

	if err != nil {
		return userF, false
	}

	return userF, true
}
