package db

import (
	"context"
	"time"

	"github.com/JhonatanSV/Twittor/models"
)

//DeleteRelation deletes the relation between users in the DB
func DeleteRelation(t models.Relation) (bool, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 15*time.Second)
	defer cancel()

	db := MongoCN.Database("twittor")
	col := db.Collection("relation")

	_, err := col.DeleteOne(ctx, t)

	if err != nil {
		return false, err
	}

	return true, nil
}
