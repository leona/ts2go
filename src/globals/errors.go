package globals

import (
	"log"
)

const RETURN_STATEMENT = "RETURN_STATEMENT"

func test_TryCatch() string {

	if result := TryCatch(func() interface{} {
		log.Println("exec")
		//panic("PANIC")
		return 555
	}, func() interface{} {
		log.Println("catch")
		return RETURN_STATEMENT
	}, func() interface{} {
		log.Println("finally")
		return nil
		//return 2222
	}); result != RETURN_STATEMENT {
		log.Println("TEST", result)
		if result == nil {
			return ""
		} else {
			return result.(string)
		}
	}

	log.Println("done")
	return ""
}

func TryCatch(callback func() (output interface{}), catch func() (output interface{}), finally func() (output interface{})) (output interface{}) {
	defer func() {
		if r := recover(); r != nil {
			output = catch()
		}

		output = finally()

	}()

	output = callback()
	return
}
