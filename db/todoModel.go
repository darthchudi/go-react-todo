package db

import (
	"time"
)

type TodoModel struct {
	ID          uint `gorm:"primary_key"`
	CreatedAt   time.Time
	UpdatedAt   time.Time
	Description string
	Completed   bool ` gorm: "default: false" `
}

func (TodoModel) TableName() string {
	return "todos"
}
