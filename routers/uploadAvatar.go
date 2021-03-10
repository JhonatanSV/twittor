package routers

import (
	"io"
	"net/http"
	"os"
	"strings"

	"github.com/JhonatanSV/Twittor/db"
	"github.com/JhonatanSV/Twittor/models"
)

func UploadAvatar(w http.ResponseWriter, r *http.Request) {
	file, handler, err := r.FormFile("avatar")
	var ext = strings.Split(handler.Filename, ".")[1]
	var archive string = "uploads/avatars/" + UserID + "." + ext

	f, err := os.OpenFile(archive, os.O_WRONLY|os.O_CREATE, 0666)

	if err != nil {
		http.Error(w, "Error uploading the image "+err.Error(), http.StatusBadRequest)
		return
	}

	_, err = io.Copy(f, file)

	if err != nil {
		http.Error(w, "Error copying the image "+err.Error(), http.StatusBadRequest)
		return
	}

	var user models.User
	var status bool

	user.Avatar = UserID + "." + ext
	status, err = db.ModifyRegister(user, UserID)

	if err != nil || status == false {
		http.Error(w, "Error writing the avatar in the DB "+err.Error(), http.StatusBadRequest)
		return
	}

	w.Header().Set("content-type", "application/json")
	w.WriteHeader(http.StatusCreated)
}
