package routers

import (
	"encoding/json"
	"net/http"
	"time"

	"github.com/JhonatanSV/Twittor/db"
	"github.com/JhonatanSV/Twittor/models"
)

//SaveTweet receives the tweet to save and process the data
func SaveTweet(w http.ResponseWriter, r *http.Request) {
	var message models.Tweet
	err := json.NewDecoder(r.Body).Decode(&message)

	register := models.SaveTweet{
		UserID:  UserID,
		Message: message.Message,
		Date:    time.Now(),
	}

	_, status, err := db.InsertTweet(register)

	if err != nil {
		http.Error(w, "Ocurred and trying to insert the tweet, try again "+err.Error(), 400)
		return
	}

	if status == false {
		http.Error(w, "The tweet was not save", 400)
		return
	}

	w.WriteHeader(http.StatusCreated)
}
