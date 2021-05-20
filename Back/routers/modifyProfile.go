package routers

import (
	"encoding/json"
	"net/http"

	"github.com/JhonatanSV/Twittor/db"
	"github.com/JhonatanSV/Twittor/models"
)

//ModifyProfile allows to communicate with the db and the request
func ModifyProfile(w http.ResponseWriter, r *http.Request) {

	var t models.User

	err := json.NewDecoder(r.Body).Decode(&t)

	if err != nil {
		http.Error(w, "Incorrect Data "+err.Error(), 400)
		return
	}

	var status bool

	status, err = db.ModifyRegister(t, UserID)
	if err != nil {
		http.Error(w, "Ocurred an error trying to modify the register, retry later "+err.Error(), 400)
		return
	}

	if status == false {
		http.Error(w, "The register was not modify", 400)
	}

	w.WriteHeader(http.StatusCreated)
}
