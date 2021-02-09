package routers

import (
	"encoding/json"
	"net/http"

	"github.com/JhonatanSV/Twittor/db"
	"github.com/JhonatanSV/Twittor/models"
)

// Register is the function to create a new user in the DB
func Register(w http.ResponseWriter, r *http.Request) {
	var t models.User
	err := json.NewDecoder(r.Body).Decode(&t)

	if err != nil {
		http.Error(w, "Error in received data"+err.Error(), 400)
		return
	}

	if len(t.Mail) == 0 {
		http.Error(w, "Mail is required", 400)
		return
	}
	if len(t.Password) < 6 {
		http.Error(w, "The password needs to have minimum 6 characters ", 400)
		return
	}

	_, found, _ := db.CheckUserExist(t.Mail)

	if found {
		http.Error(w, "The user already exist", 400)
		return
	}

	_, status, err := db.InsertReg(t)
	if err != nil {
		http.Error(w, "an error occurred while trying to register the new user"+err.Error(), 400)
		return
	}

	if status == false {
		http.Error(w, "Fail during the insert of the new user", 400)
		return
	}

	w.WriteHeader(http.StatusCreated)

}
