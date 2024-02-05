package globals

import (
	"fmt"
)

type console struct{}

func (c *console) Log(v ...interface{}) {
	fmt.Println(v...)
}

func (c *console) Info(v ...interface{}) {
	fmt.Println(v...)
}

func (c *console) Warn(v ...interface{}) {
	fmt.Println(v...)
}

func (c *console) Error(v ...interface{}) {
	fmt.Println(v...)
}

var Console = console{}
