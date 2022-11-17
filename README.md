## Getting Started

The process started with figuring out how to read the CSV file and then convert it to JSON. I had done this a long time ago but it was not fresh in my memory and this is what took me the longest.

Since I had the JSON, I had to fix the 9.1K and 2.3M. This part of the code didn't turn out very pretty, but in the interest of time, it works.

I had asked Shane a question but had no answer, so I assumed category_1 and category_2 were different things and took the same values for each. (Followers and average engagement).

I proceeded to group the categories by followers and then by engagement, created an endpoint for each request and tested them with Postman to see if everything was ok.

Later I proceeded to print them on the screen.