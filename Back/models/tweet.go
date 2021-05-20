package models

//Tweet takes the body and extracts the message
type Tweet struct {
	Message string `bson:"message" json:"message"`
}
