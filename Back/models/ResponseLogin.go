package models

//ResponseLogin has the token that return with the login
type ResponseLogin struct {
	Token string `json:"token,omitempty"`
}
