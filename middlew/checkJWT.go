package middlew

import (
	"net/http"

	"github.com/JhonatanSV/Twittor/routers"
)

//CheckJWT allows to check the JWT that comes with the request
func CheckJWT(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		_, _, _, err := routers.ProcessToken(r.Header.Get("Authorization"))

		if err != nil {
			http.Error(w, "Error with the token "+err.Error(), http.StatusBadRequest)
			return
		}
		next.ServeHTTP(w, r)
	}
}
