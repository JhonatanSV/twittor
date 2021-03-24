package db

import (
	"context"
	"log"
	"time"

	"github.com/JhonatanSV/Twittor/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo/options"
)

//LimitPagination is the number of results per page
var LimitPagination int64 = 20

//ReadTweets reads the tweets of an user
func ReadTweets(ID string, page int64) ([]*models.ReturnTweet, bool) {
	ctx, cancel := context.WithTimeout(context.Background(), 15*time.Second)
	defer cancel()

	db := MongoCN.Database("twittor")
	col := db.Collection("tweet")

	var result []*models.ReturnTweet

	condition := bson.M{
		"userid": ID,
	}

	searchOptions := options.Find()
	searchOptions.SetLimit(LimitPagination)
	searchOptions.SetSort(bson.D{{Key: "date", Value: -1}})
	searchOptions.SetSkip((page - 1) * LimitPagination)

	cursor, err := col.Find(ctx, condition, searchOptions)

	if err != nil {
		log.Fatal(err.Error())
		return result, false
	}

	for cursor.Next(context.TODO()) {
		var register models.ReturnTweet
		err := cursor.Decode(&register)

		if err != nil {
			return result, false
		}
		result = append(result, &register)
	}

	return result, true
}
