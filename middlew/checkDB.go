package middlew

import (
	"net/http"

	"github.com/JhonatanSV/Twittor/db"
)

//CheckDB is the middleware that allows to know the state of the DB
func CheckDB(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		if db.CheckConnection() == 0 {
			http.Error(w, "Lost Connection with DataBase", 500)
			return
		}
		next.ServeHTTP(w, r)
	}
}
