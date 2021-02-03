package db

import (
	"context"
	"log"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

//MongoCN is the full connection
var MongoCN = ConnectDB()
var clientOptions = options.Client().ApplyURI("mongodb+srv://jsandovalv:twittor123*@ClusterTwittor.a224t.mongodb.net/ClusterTwittor?retryWrites=true&w=majority")

/*ConnectDB allows to connect the DB*/
func ConnectDB() *mongo.Client {
	client, err := mongo.Connect(context.TODO(), clientOptions)

	if err != nil {
		log.Fatal(err.Error())
		return client
	}

	err = client.Ping(context.TODO(), nil)

	if err != nil {
		log.Fatal(err.Error())
		return client
	}

	log.Println("Connection Successful")
	return client
}

//CheckConnection does a ping to the DB
func CheckConnection() int {
	err := MongoCN.Ping(context.TODO(), nil)

	if err != nil {
		return 0
	}

	return 1
}
