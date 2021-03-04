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
func ReadTweets(ID string, page int64) ([]*models.ReturnTweets, bool) {
	ctx, cancel := context.WithTimeout(context.Background(), 15*time.Second)
	defer cancel()

	db := MongoCN.Database("twittor")
	col := db.Collection("tweet")

	var result []*models.ReturnTweets

	condition := bson.M{
		"userid": ID,
	}

	options := options.Find()
	options.SetLimit(LimitPagination)
	options.SetSort(bson.D{{Key: "date", Value: -1}})
	options.SetSkip((page - 1) * LimitPagination)

	cursor, err := col.Find(ctx, condition, options)

	if err != nil {
		log.Fatal(err.Error())
		return result, false
	}

	for cursor.Next(context.TODO()) {
		var register models.ReturnTweets
		err := cursor.Decode(&register)

		if err != nil {
			return result, false
		}
		result = append(result, &register)
	}

	return result, true
}
