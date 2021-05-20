package routers

import (
	"encoding/json"
	"net/http"
	"time"

	"github.com/JhonatanSV/Twittor/db"
	"github.com/JhonatanSV/Twittor/jwt"
	"github.com/JhonatanSV/Twittor/models"
)

//Login loads the user
func Login(w http.ResponseWriter, r *http.Request) {
	w.Header().Add("Content-Type", "application/json")

	var t models.User

	err := json.NewDecoder(r.Body).Decode(&t)
	if err != nil {
		http.Error(w, "User and/or password incorrect"+err.Error(), 400)
		return
	}

	if len(t.Mail) == 0 {
		http.Error(w, "Mail is required"+err.Error(), 400)
		return
	}

	document, exist := db.TryLogin(t.Mail, t.Password)

	if exist == false {
		http.Error(w, "User and/or password incorrect", 400)
		return
	}

	jwtKey, err := jwt.GenerateJWT(document)
	if err != nil {
		http.Error(w, "There was an error during the loging "+err.Error(), 400)
		return
	}

	res := models.ResponseLogin{
		Token: jwtKey,
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(res)

	//Cookie
	expirationTime := time.Now().Add(24 * time.Hour)
	http.SetCookie(w, &http.Cookie{
		Name:    "token",
		Value:   jwtKey,
		Expires: expirationTime,
	})

}
