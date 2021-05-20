package routers

import (
	"encoding/json"
	"net/http"

	"github.com/JhonatanSV/Twittor/db"
	"github.com/JhonatanSV/Twittor/models"
)

//ConsultRelation receives the id to consult the relation between users
func ConsultRelation(w http.ResponseWriter, r *http.Request) {
	ID := r.URL.Query().Get("id")

	var t models.Relation
	t.UserID = UserID
	t.UserRelationID = ID

	var response models.ResponseConsultRelation

	status, err := db.ConsultRelation(t)
	if err != nil || status == false {
		response.Status = false
	} else {
		response.Status = true
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(response)
}
