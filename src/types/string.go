package types

import (
	"strings"
)

type TS_string string

func (t TS_string) Trim() TS_string {
	return TS_string(strings.TrimSpace(string(t)))
}

func (t TS_string) At(index int) TS_string {
	return TS_string(string(t)[index])
}

func (t TS_string) CharAt(index int) TS_string {
	return TS_string(string(t)[index])
}

func (t TS_string) CharCodeAt(index int) int {
	return int(string(t)[index])
}

func (t TS_string) CodePointAt(index int) int {
	return int(string(t)[index])
}

func (t TS_string) Concat(str string) TS_string {
	return TS_string(string(t) + str)
}

func (t TS_string) EndsWith(str string) bool {
	return strings.HasSuffix(string(t), str)
}

func (t TS_string) Includes(str string) bool {
	return strings.Contains(string(t), str)
}

func (t TS_string) IndexOf(str string) int {
	return strings.Index(string(t), str)
}

func (t TS_string) IsWellFormed() bool {
	return true
}

func (t TS_string) LastIndexOf(str string) int {
	return strings.LastIndex(string(t), str)
}

func (t TS_string) LocaleCompare(str string) int {
	if string(t) < str {
		return -1
	}

	if string(t) > str {
		return 1
	}

	return 0
}

// func (t TS_string) Match(regexp string) bool {
// 	return strings.Contains(string(t), regexp)
// }

// func (t TS_string) MatchAll(regexp string) bool {
// 	return strings.Contains(string(t), regexp)
// }

func (t TS_string) Normalize() TS_string {
	return TS_string(strings.TrimSpace(string(t)))
}

func (t TS_string) PadEnd(targetLength int, padString string) TS_string {
	return TS_string(strings.TrimSpace(string(t)))
}

func (t TS_string) PadStart(targetLength int, padString string) TS_string {
	return TS_string(strings.TrimSpace(string(t)))
}

func (t TS_string) Repeat(count int) TS_string {
	return TS_string(strings.Repeat(string(t), count))
}

func (t TS_string) Replace(searchValue string, replaceValue string) TS_string {
	return TS_string(strings.Replace(string(t), searchValue, replaceValue, -1))
}

func (t TS_string) ReplaceAll(searchValue string, replaceValue string) TS_string {
	return TS_string(strings.Replace(string(t), searchValue, replaceValue, -1))
}

func (t TS_string) Search(regexp string) int {
	return strings.Index(string(t), regexp)
}

func (t TS_string) Slice(start int, end int) TS_string {
	return TS_string(string(t)[start:end])
}

func (t TS_string) Split(separator string) []TS_string {
	split := strings.Split(string(t), separator)
	var result []TS_string
	for _, s := range split {
		result = append(result, TS_string(s))
	}
	return result
}

func (t TS_string) StartsWith(str string) bool {
	return strings.HasPrefix(string(t), str)
}

func (t TS_string) Substring(start int, end int) TS_string {
	return TS_string(string(t)[start:end])
}

func (t TS_string) ToLocaleLowerCase() TS_string {
	return TS_string(strings.ToLower(string(t)))
}

func (t TS_string) ToLocaleUpperCase() TS_string {
	return TS_string(strings.ToUpper(string(t)))
}

func (t TS_string) ToLowerCase() TS_string {
	return TS_string(strings.ToLower(string(t)))
}

func (t TS_string) ToString() TS_string {
	return TS_string(strings.TrimSpace(string(t)))
}

func (t TS_string) ToUpperCase() TS_string {
	return TS_string(strings.ToUpper(string(t)))
}

// func (t TS_string) ToWellFormed() TS_string {
// 	return TS_string(strings.TrimSpace(string(t)))
// }

// func (t TS_string) TrimEnd() TS_string {
// 	return TS_string(strings.TrimSpace(string(t)))
// }

// func (t TS_string) TrimStart() TS_string {
// 	return TS_string(strings.TrimSpace(string(t)))
// }

func (t TS_string) ValueOf() TS_string {
	return TS_string(strings.TrimSpace(string(t)))
}


// String.prototype.at()
// String.prototype.charAt()
// String.prototype.charCodeAt()
// String.prototype.codePointAt()
// String.prototype.concat()
// String.prototype.endsWith()
// String.prototype.includes()
// String.prototype.indexOf()
// String.prototype.isWellFormed()
// String.prototype.lastIndexOf()
// String.prototype.localeCompare()
// String.prototype.match()
// String.prototype.matchAll()
// String.prototype.normalize()
// String.prototype.padEnd()
// String.prototype.padStart()
// String.prototype.repeat()
// String.prototype.replace()
// String.prototype.replaceAll()
// String.prototype.search()
// String.prototype.slice()
// String.prototype.split()
// String.prototype.startsWith()
// String.prototype.substring()
// String.prototype.toLocaleLowerCase()
// String.prototype.toLocaleUpperCase()
// String.prototype.toLowerCase()
// String.prototype.toString()
// String.prototype.toUpperCase()
// String.prototype.toWellFormed()
// String.prototype.trim()
// String.prototype.trimEnd()
// String.prototype.trimStart()
// String.prototype.valueOf()
