# Random Quote Machine by [@udenizdemirbilek](https://github.com/udenizdemirbilek)

## Home Screen 

Random quote is fetched at the start of the app by useEffect from "Quotable" and set as state using useState. 
The quote is displayed in the home screen.

## Button

Basic functionality of calling getQuote function so a new quote is fetched and displayed.

## Slide Down

React-native's PanResponder is used to detect swipe down gesture. Any time a gesture which has a difference of 150 units in the Y coordinates are detected, getQuote function is called.