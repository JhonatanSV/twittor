package db

import (
	"context"
	"time"

	"github.com/JhonatanSV/Twittor/models"
	"go.mongodb.org/mongo-driver/bson"
)

//CheckUserExist receive a mail and checks  if already exist
func CheckUserExist(mail string) (models.User, bool, string) {
	ctx, cancel := context.WithTimeout(context.Background(), 15*time.Second)
	defer cancel()

	db := MongoCN.Database("twittor")
	col := db.Collection("users")

	condition := bson.M{"mail": mail}

	var result models.User

	err := col.FindOne(ctx, condition).Decode(&result)
	ID := result.ID.Hex()

	if err != nil {
		return result, false, ID
	}

	return result, true, ID
}
