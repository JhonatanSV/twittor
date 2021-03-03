package routers

import (
	"encoding/json"
	"enconding/json"
	"net/http"

	"github.com/JhonatanSV/Twittor/db"
)

func ViewProfile(w http.ResponseWriter, r *http.Request) {

	ID := r.URL.Query().Get("id")
	if len(ID) < 1 {
		http.Error(w, "Have to send the paramater ID", http.StatusBadRequest)
		return
	}

	profile, err := db.FindProfile(ID)
	if err != nil {
		http.Error(w, "Occurred an error trying to find the register "+err.Error(), 400)
		return
	}

	w.Header().Set("context-type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(profile)
}
