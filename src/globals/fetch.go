package globals

import (
	"encoding/json"
	"io"
	"net/http"
)

type HttpMethod string

const (
	GET     HttpMethod = "GET"
	POST               = "POST"
	PUT                = "PUT"
	DELETE             = "DELETE"
	PATCH              = "PATCH"
	HEAD               = "HEAD"
	OPTIONS            = "OPTIONS"
)

type HttpMode string

const (
	CORS        HttpMode = "cors"
	NO_CORS              = "no-cors"
	SAME_ORIGIN          = "same-origin"
	NAVIGATE             = "navigate"
	WEBSOCKET            = "websocket"
)

type HttpCredentials string

const (
	OMIT        Credentials = "omit"
	SAME_ORIGIN             = "same-origin"
	INCLUDE                 = "include"
)

type HttpCache string

const (
	DEFAULT        Cache = "default"
	NO_STORE             = "no-store"
	RELOAD               = "reload"
	NO_CACHE             = "no-cache"
	FORCE_CACHE          = "force-cache"
	ONLY_IF_CACHED       = "only-if-cached"
)

type HttpRedirect string

const (
	FOLLOW Redirect = "follow"
	MANUAL          = "manual"
	ERROR           = "error"
)

type HttpReferrerPolicy string

const (
	NO_REFERRER                     ReferrerPolicy = "no-referrer"
	NO_REFERRER_WHEN_DOWNGRADE                     = "no-referrer-when-downgrade"
	ORIGIN                                         = "origin"
	ORIGIN_WHEN_CROSS_ORIGIN                       = "origin-when-cross-origin"
	SAME_ORIGIN                                    = "same-origin"
	STRICT_ORIGIN                                  = "strict-origin"
	STRICT_ORIGIN_WHEN_CROSS_ORIGIN                = "strict-origin-when-cross-origin"
	UNSAFE_URL                                     = "unsafe-url"
)

type HttpStatus int

const ()

type HttpResponseType string

const (
	BASIC ResponseType = "basic"
	CORS               = "cors"
)

type Request struct {
	Method             HttpMethod
	Headers            map[string]string
	Body               interface{}
	Mode               HttpMode
	Credentials        HttpCredentials
	Cache              HttpCache
	Redirect           HttpRedirect
	Referrer           string
	HttpReferrerPolicy HttpReferrerPolicy
	Integrity          string
	Keepalive          bool
	// Signal func() // TODO
	// priority
}

type Response struct {
	Body       io.ByteReader
	BodyUsed   bool
	Headers    map[string]string
	Ok         bool
	Redirected bool
	Status     HttpStatus
	StatusText HttpStatusText
	Type       HttpResponseType
	Url        string
}

func (r *Response) Json() interface{} {
	// TODO
}

func (r *Response) Text() string {
	// TODO
}

// JS web api fetch
// func Fetch(...any) {
// 	url := args[0]
// 	request := args[1]

// 	test := Request{
// 		Method: request.Method
// 	}
// 	req, err := http.NewRequest(http.MethodGet, requestURL, nil)
// 	if err != nil {
// 		fmt.Printf("client: could not create request: %s\n", err)
// 		os.Exit(1)
// 	}

// 	res, err := http.DefaultClient.Do(req)
// 	if err != nil {
// 		fmt.Printf("client: error making http request: %s\n", err)
// 		os.Exit(1)
// 	}

// 	fmt.Printf("client: got response!\n")
// 	fmt.Printf("client: status code: %d\n", res.StatusCode)

// 	resBody, err := ioutil.ReadAll(res.Body)
// 	if err != nil {
// 		fmt.Printf("client: could not read response body: %s\n", err)
// 		os.Exit(1)
// 	}
// 	fmt.Printf("client: response body: %s\n", resBody)
// }
