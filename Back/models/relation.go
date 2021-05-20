package models

//Relation is the struct to save the relation between users
type Relation struct {
	UserID         string `bson:"userid" json:"userid"`
	UserRelationID string `bson:"userrelationid" json:"userrelationid"`
}
