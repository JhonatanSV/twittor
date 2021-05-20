package models

import (
	jwt "github.com/dgrijalva/jwt-go"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

//Claim is the struct used to proccess the JWT
type Claim struct {
	Mail string             `json:"mail"`
	ID   primitive.ObjectID `bson:"_id" json:"_id,omitempty"`
	jwt.StandardClaims
}
