package routers

import (
	"errors"
	"strings"

	"github.com/JhonatanSV/Twittor/db"
	"github.com/JhonatanSV/Twittor/models"
	jwt "github.com/dgrijalva/jwt-go"
)

//Mail is the value of the mail used in every EndPoint
var Mail string

//UserID is the value of the user used in every EndPoint
var UserID string

//ProcessToken works with the token to extract its values
func ProcessToken(tk string) (*models.Claim, bool, string, error) {
	myKey := []byte("MastersDelDesarrollo_grupodeFacebook")
	claims := &models.Claim{}

	splitToken := strings.Split(tk, "Bearer")
	if len(splitToken) != 2 {
		return nil, false, string(""), errors.New("Token format invalid")
	}

	tk = strings.TrimSpace(splitToken[1])

	tkn, err := jwt.ParseWithClaims(tk, claims, func(t *jwt.Token) (interface{}, error) {
		return myKey, nil
	})

	if err == nil {
		_, found, _ := db.CheckUserExist(claims.Mail)
		if found == true {
			Mail = claims.Mail
			UserID = claims.ID.Hex()
		}
		return claims, found, UserID, nil
	}

	if !tkn.Valid {
		return nil, false, string(""), errors.New("Invalid Token")
	}

	return nil, false, string(""), err

}
