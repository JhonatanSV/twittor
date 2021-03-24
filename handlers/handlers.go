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
	router.HandleFunc("/deletetweet", middlew.CheckDB(middlew.CheckJWT(routers.DeleteTweet))).Methods("DELETE")

	router.HandleFunc("/uploadbanner", middlew.CheckDB(middlew.CheckJWT(routers.UploadBanner))).Methods("POST")
	router.HandleFunc("/uploadavatar", middlew.CheckDB(middlew.CheckJWT(routers.UploadAvatar))).Methods("POST")
	router.HandleFunc("/getavatar", middlew.CheckDB(routers.GetAvatar)).Methods("GET")
	router.HandleFunc("/getbanner", middlew.CheckDB(routers.GetBanner)).Methods("GET")

	router.HandleFunc("/insertrelation", middlew.CheckDB(middlew.CheckJWT(routers.InsertRelation))).Methods("POST")
	router.HandleFunc("/deleterelation", middlew.CheckDB(middlew.CheckJWT(routers.DeleteRelation))).Methods("DELETE")
	router.HandleFunc("/consultrelation", middlew.CheckDB(middlew.CheckJWT(routers.ConsultRelation))).Methods("GET")

	router.HandleFunc("/userlist", middlew.CheckDB(middlew.CheckJWT(routers.UserList))).Methods("GET")
	router.HandleFunc("/readtweetsfollowers", middlew.CheckDB(middlew.CheckJWT(routers.ReadFollowersTweets))).Methods("GET")

	PORT := os.Getenv("PORT")

	if PORT == "" {
		PORT = "8080"
	}

	handler := cors.AllowAll().Handler(router)

	log.Fatal(http.ListenAndServe(":"+PORT, handler))

}
