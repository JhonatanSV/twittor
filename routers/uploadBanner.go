package routers

import (
	"io"
	"net/http"
	"os"
	"strings"

	"github.com/JhonatanSV/Twittor/db"
	"github.com/JhonatanSV/Twittor/models"
)

//UploadBanner uploads the banner to the server
func UploadBanner(w http.ResponseWriter, r *http.Request) {
	file, handler, err := r.FormFile("banner")
	var ext = strings.Split(handler.Filename, ".")[1]
	var archive string = "uploads/banners/" + UserID + "." + ext

	f, err := os.OpenFile(archive, os.O_WRONLY|os.O_CREATE, 0666)

	if err != nil {
		http.Error(w, "Error uploading the banner "+err.Error(), http.StatusBadRequest)
		return
	}

	_, err = io.Copy(f, file)

	if err != nil {
		http.Error(w, "Error copying the banner "+err.Error(), http.StatusBadRequest)
		return
	}

	var user models.User
	var status bool

	user.Banner = UserID + "." + ext
	status, err = db.ModifyRegister(user, UserID)

	if err != nil || status == false {
		http.Error(w, "Error writing the banner in the DB "+err.Error(), http.StatusBadRequest)
		return
	}

	w.Header().Set("content-type", "application/json")
	w.WriteHeader(http.StatusCreated)
}
