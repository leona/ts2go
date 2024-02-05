# ts2go

Experimential TypeScript to Go transpiler. Supports an extremely limited subset of TypeScript features.

https://ts2go.nx.ie

## Why?

This is just a crazy experiment to learn more about ASTs. Should you use this? Probably not. But I've found it a fun experiment.

My goal for this was not to reach Go performance with Typescript, or to have 1-1 support, but just to be able to write simple applications (CLI tools etc.) in TypeScript and output a small, portable and low footprint binary.


### Roadmap
- disable any keyword and force strict typing
- enums
- classes
- impoved type inference
- support callbacks
- async await
- complete fetch, console, Date & process support
- float
- try/catch
- spread operators
- anonymous/named functions
- type params
- support constructors like new Date() but also static references like Date.now()
- support not capitalising variable names within a scoped function
- debug wrapper to print TS lines or comments
- error handling for unsupported features
- imports
- declaring multiple variables at once e.g. const test, test2 = "test"
- computed properties such as length
- pass by reference everywhere
- optimiser and debugger, crawl through and check for pushing string to int array etc.
- run tests in typescript & Go then compare
- seperate GoNode into multiple types
- casting
- utilise the reference IDs you can generate with asty
- optionals

Features this may never support
- enums
- interface properties
- inheritence
- same variable names different capitalisation
- partial imports, only import all
- mutating int to float
- var scoping
