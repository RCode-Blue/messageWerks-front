# MessageWerks
A demo app that logs in a user and displays information on businesses linked to the account. Logged in users are able to edit business details, Admin users are able to edit both user and business details.

This repo is the front-end portion of the project

## Features
- Uses React with hooks
- Uses typology as breadcrumbs
- Stores session data in localStorage
- Admin account presents with different colours


## Programming notes:
### Folder structure
- `\src`: Source code is located here
- `\src\assets`: Images
- `\src\components`: React components
- `\src\config`: Settings to be used in this project
- `\src\contexts`: React contexts
- `\src\helpers`: Helper functions
- `\src\styles`: Stylesheets
  

#### Source Code


#### Styling
- All stylesheets are located in the `styles` folder.
- All styles are imported into `styles.scss` which is then imported into the `src\components\app.js` file. This is the only stylesheet import that takes place.
- `\base` is for imports from external sources and style settings for the "standard" HTML tags.
- `\externals` is for custom external materials
- `\shared` is for common classes


## Running the Code:
- Clone this repo
- run `npm install` to install packages
- run `npm run dev` 
