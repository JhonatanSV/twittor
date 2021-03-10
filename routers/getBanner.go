package routers

import (
	"io"
	"net/http"
	"os"

	"github.com/JhonatanSV/Twittor/db"
)

//GetBanner send the banner to HTTP
func GetBanner(w http.ResponseWriter, r *http.Request) {
	ID := r.URL.Query().Get("id")
	if len(ID) < 1 {
		http.Error(w, "Have to send the ID parameter", http.StatusBadRequest)
		return
	}

	profile, err := db.FindProfile(ID)

	if err != nil {
		http.Error(w, "User not found", http.StatusBadRequest)
		return
	}

	OpenFile, err := os.Open("uploads/banners/" + profile.Banner)

	if err != nil {
		http.Error(w, "Banner not found", http.StatusBadRequest)
		return
	}

	_, err = io.Copy(w, OpenFile)

	if err != nil {
		http.Error(w, "Error copying the banner", http.StatusBadRequest)
		return
	}

}
