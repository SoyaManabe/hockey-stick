package entity

// Item is log models property
type Item struct {
	ID       uint   `json:"id"`
	Name     string `json:"name"`
	Category string `json:"category"`
	Price    int    `json:"price"`
	Date     string `json:"date"`
}
