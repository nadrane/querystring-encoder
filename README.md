Encode nested objects into query strings in a readable AND safe format.

# Usage

## Motivation

Today, numerous modules/strategies exist to encode query strings. They all have one of two flaws:

1.  They do encode nested objects, but they delimit nesting using unsafe URL characters, resulting in url string that looks like this (straight from the [qs](https://www.npmjs.com/package/qs) documentation):

`a%5Bb%5D=c`

2.  They do not permit encoding of nested objects.

The reason why the Node's `querystring` module does not allow nested objects is because this feature is not permitted in the official spec; the spec only permits a list of key value pairs. This configuration does not allow for enough flexibility when creating a RESTful API.

For example, suppose the client wants to filter a collection of cars, sorting them by price. The route might look like this:

`/api/cars?filter=honda&order=price`

This URI is seriously flawed. It makes it clear we want to order by a column called price, but where does the value Honda come into play? Where is that field stored in my database? What we really want is a route that looks like this:

`/api/cars?filter.make=honda&order=price`

Now it's clear that we are filtering the make of the car for anything matching the value Honda. We could add an additional filter on make if we like:

`/api/cars?filter.make=honda&filter.model=civic&order=price`

## Why Delimit with .?

The other most notable module implementing nested url encoding encodes strings like this:

`/api/cars?filter[make]=honda&filter[model]=civic&order=price`

after percent encoding, the url looks like this:

`filter%5Bmake%5D=honda&filter%5Bmodel%5D=civic&order=price`

The `[` and `]` characters are both considered unsafe in a URL and are required to be escaped. The URL becomes unreadable the moment this happens. Fortunately, the `.` is not considered unsafe and does not need to be escaped, making it the perfect character to express object nesting.
