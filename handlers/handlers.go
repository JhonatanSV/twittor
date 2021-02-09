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

	router.HandleFunc("/register",middlew.CheckDB(routers.Register)).Methods("POST")

	PORT := os.Getenv("PORT")

	if PORT == "" {
		PORT = "8080"
	}

	handler := cors.AllowAll().Handler(router)
	
	log.Fatal(http.ListenAndServe(":"+PORT, handler))

}
