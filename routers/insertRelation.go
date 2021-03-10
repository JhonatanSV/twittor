package routers

import (
	"net/http"

	"github.com/JhonatanSV/Twittor/db"
	"github.com/JhonatanSV/Twittor/models"
)

//InsertRelation does the register of the relation between users
func InsertRelation(w http.ResponseWriter, r *http.Request) {
	ID := r.URL.Query().Get("id")
	if len(ID) < 1 {
		http.Error(w, "Have to send the ID parameter", http.StatusBadRequest)
		return
	}

	var t models.Relation
	t.UserID = UserID
	t.UserRelationID = ID

	status, err := db.InsertRelation(t)

	if err != nil {
		http.Error(w, "Ocurred an error trying to insert the relation "+err.Error(), http.StatusBadRequest)
		return
	}

	if status == false {
		http.Error(w, "The relation was not saved "+err.Error(), http.StatusBadRequest)
		return
	}

	w.WriteHeader(http.StatusCreated)
}
