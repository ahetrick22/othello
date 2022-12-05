# Othello

## How to Run
The app can run locally with either yarn or npm: `npm install` and `npm start`.

## Dependencies
(In addition to the expected dependencies of a React app built with CRA)

### Chakra UI
I chose to use Chakra UI for styling. It's definitely overkill for this project, but it's a nice extensible package that I happened to know how to use already, so it'd be easy to add additional styling and features.

### Prettier
I added prettier as a dev dependency for code formatting - this can be further configured by IDE, which is how I did it, but scripts/pre-commit hooks could also be added for it if desired.

## Decisions
- *Hash for grid construction over nested array*: I chose to map the board by unique position and store the adjacent positions in the grid's setup to avoid nested arrays as much as possible. As an example, the first 2 rows of the board are structured like this (extra 0s added for spacing):
- `00` `01` `02` `03` `04` `05` `06` `07`
- `08` `09` `10` `11` `12` `13` `14` `15`

And square `6` (as an example) will be initialized as follows:
```
{
    6: {
    current: 'notPlayed',
    adjacents: {
            top: null,
            topLeft: null,
            topRight: null,
            left: 5,
            right: 7,
            bottomLeft: 13,
            bottom: 14,
            bottomRight: 15,
        }
    }   
}
```

This also kept things relatively simple for directional lookups.

- *Recursion for `checkSquare`*: In combination with storing the adjacent square positions, this makes checking around the selected square in a given direction out as far as necessary extensible to any size.
- *Local state usage*: Because this app wasn't that complicated, I chose to just store the grid and current turn in local state, and pass the grid through to functions with the business logic when needed. This makes those functions more easily able to be tested once you get to the point of adding tests. Of course, it could be moved to context or Redux or anything else in order to avoid prop drilling, but it wasn't nested deeply enough here to become confusing to me.

## Extensions & Refactors

These are features that could easily be supported & things I would refactor given more time.

- *Extract out utils*: refactor `handleSquareSelect` and `isRemainingValidMove` in order to make those functions more testable, more single purpose, and possibly to share portions of the code between them.
- *Adjustable grid size*: because of the way I wrote the logic, this will support any even number for the square grid if you wanted to play on a grid of 6x6, 10x10, 12x12, etc. instead of 8x8. You could even move it to local state instead of setting it as a constant so that the user could toggle it. 
- *Different personalization options*: One common option in these kinds of games is to allow for different color schemes to be selected. You could offer different background colors or different piece colors (although you'd have to change the score labels, too). 
- *Saving state in local storage*: One nice option might be to store the state (grid & current turn) in local storage so that if you were to reload the page, it could pick up right where you left off.


## Project Initiation Details
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). See below for their README.

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
