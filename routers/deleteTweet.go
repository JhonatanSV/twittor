package routers

import (
	"net/http"

	"github.com/JhonatanSV/Twittor/db"
)

//Delete tweet receives the id of the tweet to delete
func DeleteTweet(w http.ResponseWriter, r *http.Request) {
	ID := r.URL.Query().Get("id")
	if len(ID) < 1 {
		http.Error(w, "Have to send the ID parameter", http.StatusBadRequest)
		return
	}

	err := db.DeleteTweet(ID, UserID)
	if err != nil {
		http.Error(w, "Ocurred an error trying to delete the tweet "+err.Error(), http.StatusBadRequest)
		return
	}

	w.Header().Set("content-type", "application/json")
	w.WriteHeader(http.StatusCreated)
}
