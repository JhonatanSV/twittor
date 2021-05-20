package db

import (
	"context"
	"fmt"
	"github.com/JhonatanSV/Twittor/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo/options"
	"time"
)

//ReadUsers reads the users registered in the system
func ReadUsers(ID string, page int64, search string, typeSearch string) ([]*models.User, bool) {
	ctx, cancel := context.WithTimeout(context.Background(), 15*time.Second)
	defer cancel()

	db := MongoCN.Database("twittor")
	col := db.Collection("users")

	var results []*models.User

	findOptions := options.Find()
	findOptions.SetSkip((page - 1) * 20)
	findOptions.SetLimit(20)

	query := bson.M{
		"name": bson.M{"$regex": `(?i)` + search},
	}

	cur, err := col.Find(ctx, query, findOptions)
	if err != nil {
		fmt.Println(err.Error())
		return results, false
	}

	var found, include bool

	for cur.Next(ctx) {
		var s models.User
		err := cur.Decode(&s)
		if err != nil {
			fmt.Println(err.Error())
			return results, false
		}
		var r models.Relation
		r.UserID = ID
		r.UserRelationID = s.ID.Hex()

		include = false

		found, err = ConsultRelation(r)
		if typeSearch == "new" && found == false {
			include = true
		}
		if typeSearch == "follow" && found == true {
			include = true
		}

		if r.UserRelationID == ID {
			include = false
		}

		if include == true {
			s.Password = ""
			s.Biography = ""
			s.WebSite = ""
			s.Location = ""
			s.Banner = ""
			s.Mail = ""

			results = append(results, &s)
		}
	}
	err = cur.Err()
	if err != nil {
		fmt.Println(err.Error())
		return results, false
	}
	cur.Close(ctx)
	return results, true
}
