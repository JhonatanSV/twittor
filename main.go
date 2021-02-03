package main

import (
	"log"

	"github.com/JhonatanSV/Twittor/db"
	"github.com/JhonatanSV/Twittor/handlers"
)

func main() {
	if db.CheckConnection() == 0 {
		log.Fatal("Error in the connection to the DB")
	}

	handlers.Handlers()
}
