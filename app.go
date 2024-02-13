package main

import (
	"context"
	"fmt"
)

// App struct
type App struct {
	ctx context.Context
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

// Log In Success
func (a *App) LogInSuccess(name string) string {
	// return fmt.Sprintf("Welcome %s, You are now logged in!", name)
	// Shorten the message
	return fmt.Sprintf("Welcome %s, You are logged in!", name)
}

// Switch Account Success
func (a *App) SwitchAccountSuccess() string {
	return "You have switched accounts!"
}
