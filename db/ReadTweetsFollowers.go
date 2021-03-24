package db

import (
	"context"
	"github.com/JhonatanSV/Twittor/models"
	"go.mongodb.org/mongo-driver/bson"
	"time"
)

//ReadFollowersTweets reads the tweets of my followers
func ReadFollowersTweets(ID string, page int) ([]models.TweetsFollowers, bool) {
	ctx, cancel := context.WithTimeout(context.Background(), time.Second*15)
	defer cancel()

	db := MongoCN.Database("twittor")
	col := db.Collection("relation")

	skip := (page - 1) * 20
	conditions := make([]bson.M, 0)
	conditions = append(conditions, bson.M{"$match": bson.M{"userid": ID}})
	conditions = append(conditions, bson.M{
		"$lookup": bson.M{
			"from":         "tweet",
			"localField":   "userrelationid",
			"foreignField": "userid",
			"as":           "tweet",
		}})
	conditions = append(conditions, bson.M{"$unwind": "$tweet"})
	conditions = append(conditions, bson.M{"$sort": bson.M{"tweet.date": -1}})
	conditions = append(conditions, bson.M{"$skip": skip})
	conditions = append(conditions, bson.M{"$limit": 20})

	cursor, err := col.Aggregate(ctx, conditions)
	var result []models.TweetsFollowers
	err = cursor.All(ctx, &result)

	if err != nil {
		return result, false
	}

	return result, true
}
