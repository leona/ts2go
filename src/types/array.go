package types

type TS_array[T any] []T

func (t *TS_array[T]) Shift() T {
	if len(*t) == 0 {
		var zero T
		return zero
	}

	val := (*t)[0]
	*t = (*t)[1:]
	return val
}

func (t TS_array[T]) Slice(start int, end ...int) TS_array[T] {
	var endSlice int

	if len(end) == 0 {
		endSlice = len(t)
	} else {
		endSlice = end[0]
	}
	return t[start:endSlice]

}

func (t TS_array[T]) At(index int) T {
	return t[index]
}

func (t TS_array[T]) Concat(arr TS_array[T]) TS_array[T] {
	return append(t, arr...)
}

func (t TS_array[T]) CopyWithin(target int, start int, end ...int) TS_array[T] {
	var endSlice int

	if len(end) == 0 {
		endSlice = len(t)
	} else {
		endSlice = end[0]
	}
	copy(t[target:endSlice], t[start:endSlice])

	return t
}

// func (t TS_array[T]) Entries() TS_array[[2]T] {
// 	var arr [2]T
// 	var result TS_array[[2]T]
// 	for i := 0; i < len(t); i++ {
// 		arr[0] = t[i]
// 		arr[1] = t[i]
// 		result = append(result, arr)
// 	}
// 	return result
// }

func (t TS_array[T]) Every(callback func(value T, index int, array TS_array[T]) bool) bool {
	for i := 0; i < len(t); i++ {
		if !callback(t[i], i, t) {
			return false
		}
	}
	return true
}

func (t TS_array[T]) Fill(value T, start int, end ...int) TS_array[T] {
	var endSlice int
	if len(end) == 0 {
		endSlice = len(t)
	} else {
		endSlice = end[0]
	}
	for i := start; i < endSlice; i++ {
		t[i] = value
	}
	return t
}

func (t TS_array[T]) Filter(callback func(value T, index int, array TS_array[T]) bool) TS_array[T] {
	var result TS_array[T]
	for i := 0; i < len(t); i++ {
		if callback(t[i], i, t) {
			result = append(result, t[i])
		}
	}
	return result
}

func (t TS_array[T]) Find(callback func(value T, index int, array TS_array[T]) bool) T {
	for i := 0; i < len(t); i++ {
		if callback(t[i], i, t) {
			return t[i]
		}
	}
	var zero T
	return zero
}

func (t TS_array[T]) FindIndex(callback func(value T, index int, array TS_array[T]) bool) int {
	for i := 0; i < len(t); i++ {
		if callback(t[i], i, t) {
			return i
		}
	}
	return -1
}

func (t TS_array[T]) FindLast(callback func(value T, index int, array TS_array[T]) bool) T {
	for i := len(t) - 1; i >= 0; i-- {
		if callback(t[i], i, t) {
			return t[i]
		}
	}
	var zero T
	return zero
}

func (t TS_array[T]) FindLastIndex(callback func(value T, index int, array TS_array[T]) bool) int {
	for i := len(t) - 1; i >= 0; i-- {
		if callback(t[i], i, t) {
			return i
		}
	}
	return -1
}

// func (t TS_array[T]) Flat(depth ...int) TS_array[T] {
// 	var result TS_array[T]
// 	var depthValue int
// 	if len(depth) == 0 {
// 		depthValue = 1
// 	} else {
// 		depthValue = depth[0]
// 	}
// 	for i := 0; i < len(t); i++ {
// 		if depthValue > 0 {
// 			if _, ok := t[i].(TS_array[T]); ok {
// 				result = append(result, t[i].(TS_array[T]).Flat(depthValue-1)...)
// 			} else {
// 				result = append(result, t[i])
// 			}
// 		} else {
// 			result = append(result, t[i])
// 		}
// 	}
// 	return result
// }

// func (t TS_array[T]) FlatMap(callback func(value T, index int, array TS_array[T]) T, depth ...int) TS_array[T] {
// 	var result TS_array[T]
// 	var depthValue int
// 	if len(depth) == 0 {
// 		depthValue = 1
// 	} else {
// 		depthValue = depth[0]
// 	}
// 	for i := 0; i < len(t); i++ {
// 		if depthValue > 0 {
// 			if _, ok := t[i].(TS_array[T]); ok {
// 				result = append(result, t[i].(TS_array[T]).Flat(depthValue-1)...)
// 			} else {
// 				result = append(result, callback(t[i], i, t))
// 			}
// 		} else {
// 			result = append(result, callback(t[i], i, t))
// 		}
// 	}
// 	return result
// }

func (t TS_array[T]) ForEach(callback func(value T, index int, array TS_array[T])) {
	for i := 0; i < len(t); i++ {
		callback(t[i], i, t)
	}
}

// func (t TS_array[T]) Includes(searchElement T, fromIndex ...int) bool {
// 	var fromIndexValue int
// 	if len(fromIndex) == 0 {
// 		fromIndexValue = 0
// 	} else {
// 		fromIndexValue = fromIndex[0]
// 	}
// 	for i := fromIndexValue; i < len(t); i++ {
// 		if t[i] == searchElement {
// 			return true
// 		}
// 	}
// 	return false
// }

// func (t TS_array[T]) IndexOf(searchElement T, fromIndex ...int) int {
// 	var fromIndexValue int
// 	if len(fromIndex) == 0 {
// 		fromIndexValue = 0
// 	} else {
// 		fromIndexValue = fromIndex[0]
// 	}
// 	for i := fromIndexValue; i < len(t); i++ {
// 		if t[i] == searchElement {
// 			return i
// 		}
// 	}
// 	return -1
// }

// func (t TS_array[T]) Join(separator ...string) string {
// 	var separatorValue string
// 	if len(separator) == 0 {
// 		separatorValue = ","
// 	} else {
// 		separatorValue = separator[0]
// 	}
// 	var result string
// 	for i := 0; i < len(t); i++ {
// 		if i == len(t)-1 {
// 			result += t[i].(string)
// 		} else {
// 			result += t[i].(string) + separatorValue
// 		}
// 	}
// 	return result
// }

func (t TS_array[T]) Keys() TS_array[int] {
	var result TS_array[int]
	for i := 0; i < len(t); i++ {
		result = append(result, i)
	}
	return result
}

// func (t TS_array[T]) LastIndexOf(searchElement T, fromIndex ...int) int {
// 	var fromIndexValue int
// 	if len(fromIndex) == 0 {
// 		fromIndexValue = len(t) - 1
// 	} else {
// 		fromIndexValue = fromIndex[0]
// 	}
// 	for i := fromIndexValue; i >= 0; i-- {
// 		if t[i] == searchElement {
// 			return i
// 		}
// 	}
// 	return -1
// }

func (t TS_array[T]) Map(callback func(value T, index int, array TS_array[T]) T) TS_array[T] {
	var result TS_array[T]
	for i := 0; i < len(t); i++ {
		result = append(result, callback(t[i], i, t))
	}
	return result
}

func (t TS_array[T]) Pop() T {
	if len(t) == 0 {
		var zero T
		return zero
	}
	val := t[len(t)-1]
	t = t[:len(t)-1]
	return val
}

func (t *TS_array[T]) Push(val T) int {
	*t = append(*t, val)
	return len(*t)
}

func (t TS_array[T]) Reduce(callback func(accumulator T, currentValue T, currentIndex int, array TS_array[T]) T, initialValue ...T) T {
	var initialValueValue T
	if len(initialValue) == 0 {
		initialValueValue = t[0]
	} else {
		initialValueValue = initialValue[0]
	}
	accumulator := initialValueValue
	for i := 0; i < len(t); i++ {
		accumulator = callback(accumulator, t[i], i, t)
	}
	return accumulator
}

func (t TS_array[T]) ReduceRight(callback func(accumulator T, currentValue T, currentIndex int, array TS_array[T]) T, initialValue ...T) T {
	var initialValueValue T
	if len(initialValue) == 0 {
		initialValueValue = t[len(t)-1]
	} else {
		initialValueValue = initialValue[0]
	}
	accumulator := initialValueValue
	for i := len(t) - 1; i >= 0; i-- {
		accumulator = callback(accumulator, t[i], i, t)
	}
	return accumulator
}

func (t *TS_array[T]) Reverse() TS_array[T] {
	for i := 0; i < len(*t)/2; i++ {
		(*t)[i], (*t)[len(*t)-1-i] = (*t)[len(*t)-1-i], (*t)[i]
	}
	return *t
}

func (t TS_array[T]) Some(callback func(value T, index int, array TS_array[T]) bool) bool {
	for i := 0; i < len(t); i++ {
		if callback(t[i], i, t) {
			return true
		}
	}
	return false
}

func (t *TS_array[T]) Sort(compareFunc ...func(a T, b T) int) TS_array[T] {
	var compareFuncValue func(a T, b T) int
	if len(compareFunc) == 0 {
		compareFuncValue = func(a T, b T) int {
			return 0
		}
	} else {
		compareFuncValue = compareFunc[0]
	}
	for i := 0; i < len(*t); i++ {
		for j := i + 1; j < len(*t); j++ {
			if compareFuncValue((*t)[i], (*t)[j]) > 0 {
				(*t)[i], (*t)[j] = (*t)[j], (*t)[i]
			}
		}
	}
	return *t
}

func (t *TS_array[T]) Splice(start int, deleteCount ...int) TS_array[T] {
	var deleteCountValue int
	if len(deleteCount) == 0 {
		deleteCountValue = len(*t) - start
	} else {
		deleteCountValue = deleteCount[0]
	}
	var result TS_array[T]
	result = append(result, (*t)[start:start+deleteCountValue]...)
	*t = append((*t)[:start], (*t)[start+deleteCountValue:]...)
	return result
}

func (t *TS_array[T]) ToReversed() TS_array[T] {
	for i := 0; i < len(*t)/2; i++ {
		(*t)[i], (*t)[len(*t)-1-i] = (*t)[len(*t)-1-i], (*t)[i]
	}
	return *t
}

func (t *TS_array[T]) ToSorted(compareFunc ...func(a T, b T) int) TS_array[T] {
	var compareFuncValue func(a T, b T) int
	if len(compareFunc) == 0 {
		compareFuncValue = func(a T, b T) int {
			return 0
		}
	} else {
		compareFuncValue = compareFunc[0]
	}
	for i := 0; i < len(*t); i++ {
		for j := i + 1; j < len(*t); j++ {
			if compareFuncValue((*t)[i], (*t)[j]) > 0 {
				(*t)[i], (*t)[j] = (*t)[j], (*t)[i]
			}
		}
	}
	return *t
}

func (t *TS_array[T]) ToSpliced(start int, deleteCount ...int) TS_array[T] {
	var deleteCountValue int
	if len(deleteCount) == 0 {
		deleteCountValue = len(*t) - start
	} else {
		deleteCountValue = deleteCount[0]
	}
	var result TS_array[T]
	result = append(result, (*t)[start:start+deleteCountValue]...)
	*t = append((*t)[:start], (*t)[start+deleteCountValue:]...)
	return result
}

// func (t TS_array[T]) ToString() string {
// 	var result string
// 	for i := 0; i < len(t); i++ {
// 		if i == len(t)-1 {
// 			result += t[i].(string)
// 		} else {
// 			result += t[i].(string) + ","
// 		}
// 	}
// 	return result
// }

func (t *TS_array[T]) Unshift(val T) int {
	*t = append(TS_array[T]{val}, *t...)
	return len(*t)
}

func (t TS_array[T]) Values() TS_array[T] {
	var result TS_array[T]
	for i := 0; i < len(t); i++ {
		result = append(result, t[i])
	}
	return result
}

func (t TS_array[T]) With(index int, val T) TS_array[T] {
	if index == len(t) {
		t = append(t, val)
	} else {
		t = append(t[:index], append(TS_array[T]{val}, t[index:]...)...)
	}
	return t
}

// Array.prototype.concat()
// Array.prototype.copyWithin()
// Array.prototype.entries()
// Array.prototype.every()
// Array.prototype.fill()
// Array.prototype.filter()
// Array.prototype.find()
// Array.prototype.findIndex()
// Array.prototype.findLast()
// Array.prototype.findLastIndex()
// Array.prototype.flat()
// Array.prototype.flatMap()
// Array.prototype.forEach()
// Array.from()
// Array.fromAsync()
// Array.prototype.includes()
// Array.prototype.indexOf()
// Array.isArray()
// Array.prototype.join()
// Array.prototype.keys()
// Array.prototype.lastIndexOf()
// Array.prototype.map()
// Array.of()
// Array.prototype.pop()
// Array.prototype.push()
// Array.prototype.reduce()
// Array.prototype.reduceRight()
// Array.prototype.reverse()
// Array.prototype.shift()
// Array.prototype.slice()
// Array.prototype.some()
// Array.prototype.sort()
// Array.prototype.splice()
// Array.prototype.toLocaleString()
// Array.prototype.toReversed()
// Array.prototype.toSorted()
// Array.prototype.toSpliced()
// Array.prototype.toString()
// Array.prototype.unshift()
// Array.prototype.values()
// Array.prototype.with()
