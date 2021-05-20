package db

import (
	"context"
	"time"

	"github.com/JhonatanSV/Twittor/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

//InsertTweet saves the tweet in the DB
func InsertTweet(t models.SaveTweet) (string, bool, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 15*time.Second)
	defer cancel()

	db := MongoCN.Database("twittor")
	col := db.Collection("tweet")

	register := bson.M{
		"userid":  t.UserID,
		"message": t.Message,
		"date":    t.Date,
	}

	result, err := col.InsertOne(ctx, register)
	if err != nil {
		return string(""), false, err
	}

	objID, _ := result.InsertedID.(primitive.ObjectID)

	return objID.String(), true, nil
}
