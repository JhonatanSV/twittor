package routers

import (
	"encoding/json"
	"github.com/JhonatanSV/Twittor/db"
	"net/http"
	"strconv"
)

func UserList(w http.ResponseWriter, r *http.Request) {

	typeUser := r.URL.Query().Get("type")
	page := r.URL.Query().Get("page")
	search := r.URL.Query().Get("search")

	pagTemp, err := strconv.Atoi(page)
	if err != nil {
		http.Error(w, "Have to send the page parameter as an int higher than 0", http.StatusBadRequest)
		return
	}

	pag := int64(pagTemp)

	result, status := db.ReadUsers(UserID, pag, search, typeUser)
	if status == false {
		http.Error(w, "Error reading the users", http.StatusBadRequest)
		return
	}
	w.Header().Set("Content-type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(result)
}
