package db

import (
	"context"
	"time"

	"github.com/JhonatanSV/Twittor/models"
)

//InsertRelation saves the relation in the DB
func InsertRelation(t models.Relation) (bool, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 15*time.Second)
	defer cancel()

	db := MongoCN.Database("twittor")
	col := db.Collection("relation")

	_, err := col.InsertOne(ctx, t)

	if err != nil {
		return false, err
	}

	return true, nil
}
