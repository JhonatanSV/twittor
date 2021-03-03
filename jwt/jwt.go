package jwt

import (
	"time"

	"github.com/JhonatanSV/Twittor/models"
	jwt "github.com/dgrijalva/jwt-go"
)

//GenerateJWT makes the encryptation with JWT
func GenerateJWT(t models.User) (string, error) {
	myKey := []byte("MastersDelDesarrollo_grupodeFacebook")

	payload := jwt.MapClaims{
		"mail":      t.Mail,
		"name":      t.Name,
		"lastname":  t.LastName,
		"bithdate":  t.BirthDate,
		"biography": t.Biography,
		"location":  t.Location,
		"website":   t.WebSite,
		"_id":       t.ID.Hex(),
		"exp":       time.Now().Add(time.Hour * 24).Unix(),
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, payload)
	tokenStr, err := token.SignedString(myKey)

	if err != nil {
		return tokenStr, err
	}

	return tokenStr, nil
}
