package handlers

import (
	"log"
	"net/http"
	"os"

	"github.com/JhonatanSV/Twittor/middlew"
	"github.com/JhonatanSV/Twittor/routers"
	"github.com/gorilla/mux"
	"github.com/rs/cors"
)

//Handlers sets the port, the handler and listen the server
func Handlers() {
	router := mux.NewRouter()

	router.HandleFunc("/register", middlew.CheckDB(routers.Register)).Methods("POST")
	router.HandleFunc("/login", middlew.CheckDB(routers.Login)).Methods("POST")
	router.HandleFunc("/viewprofile", middlew.CheckDB(middlew.CheckJWT(routers.ViewProfile))).Methods("GET")
	router.HandleFunc("/modifyprofile", middlew.CheckDB(middlew.CheckJWT(routers.ModifyProfile))).Methods("PUT")
	router.HandleFunc("/savetweet", middlew.CheckDB(middlew.CheckJWT(routers.SaveTweet))).Methods("POST")
	router.HandleFunc("/readtweet", middlew.CheckDB(middlew.CheckJWT(routers.ReadTweets))).Methods("GET")

	PORT := os.Getenv("PORT")

	if PORT == "" {
		PORT = "8080"
	}

	handler := cors.AllowAll().Handler(router)

	log.Fatal(http.ListenAndServe(":"+PORT, handler))

}
