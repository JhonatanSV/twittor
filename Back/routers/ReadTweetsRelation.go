package routers

import (
	"encoding/json"
	"github.com/JhonatanSV/Twittor/db"
	"net/http"
	"strconv"
)

//ReadFollowersTweets reads the tweets of every follower
func ReadFollowersTweets(w http.ResponseWriter, r *http.Request) {
	if len(r.URL.Query().Get("page")) < 1 {
		http.Error(w, "Have to send the page parameter", http.StatusBadRequest)
		return
	}

	page, err := strconv.Atoi(r.URL.Query().Get("page"))
	if err != nil {
		http.Error(w, "Have to send the page parameter hihger than 0", http.StatusBadRequest)
		return
	}

	response, correct := db.ReadFollowersTweets(UserID, page)
	if correct == false {
		http.Error(w, "Error trying to read the tweets", http.StatusBadRequest)
		return
	}

	w.Header().Set("Content-type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(response)
}
