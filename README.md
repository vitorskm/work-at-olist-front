![Logo of the project](./app/assets/imgs/olist_logo.png)

# Work at Olist Frontend &middot; [![Build Status](https://img.shields.io/travis/npm/npm/latest.svg?style=flat-square)](https://travis-ci.org/npm/npm) [![npm](https://img.shields.io/npm/v/npm.svg?style=flat-square)](https://www.npmjs.com/package/npm) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com) [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](https://github.com/your/your-project/blob/master/LICENSE)


This project aims to create a data validation layer for entries made to the Olist form. These validations are made in the name, email and password fields, where the last one has three steps: Minimum of 6 characters, at least 1 uppercase character and at least 1 number. This project consists of a hiring evaluation on Olist.

## Installing / Getting started

To get started you should first clone this repository from your computer running the follow command line

```
$ git clone https://github.com/vitorskm/work-at-olist-front.git
```

Open the project folder, install npm packages and build the component files using:

```
$ npm i
$ npm run build
```

Now the project contains a folder called **dist** that there's a bundle file generated.

After that you must have a Python and Flask installed and configured on your computer to run:

**On Unix Bash (Linux, Mac, etc.):**
```
$ export FLASK_RUN_PORT=8080
$ export FLASK_APP=server
$ flask run
```

**On Windows CMD:**
```
> set FLASK_RUN_PORT=8080
> set FLASK_APP=server
> flask run
```

If you don't have python and flask installed, just run:
```
$ npx http-server
```

Now do you have everything running as well, so open any modern browser later then IE11 (or equal) on `http://127.0.0.1:8080` address.

## Developing

### Built With
This application was developed using:
- HTML5
- JavaScript ES6
- CSS3
- Python 3.6.8
- Flask 0.12.2
- Babel 7.5.5
- Webpack 4.38.0
- Webcomponents 2.2.10

### Prerequisites
You should have installed on your computer

- Python 3.6.8
    - pip 9.0.1
        - flask ^0.12.2
- Node 10.15.1
    - npm 6.4.1

### Building

After code changes you must run the build script to create a new bundle for your application using the command line

```
npm run build
```


## Tests

For each component of this project there's a file end extension like `.spec.js` witch contains test descriptions for this application. To check if is everything ok, run:

```
npm run test
```

The output result must be something like this

```
Test [OlistInputComponent]
    Checks email input value
        ✓ should be a valid email value
        ✓ should be an invalid email value
    Checks name input value
        ✓ should be a valid name value
        ✓ should be an invalid name value
    Checks password input value
        ✓ should be a valid password value
        ✓ should be an invalid password value
    Checks repeat password input value
        ✓ should be a valid repeat password value
        ✓ should be an invalid repeat password value

Test [OlistPasswordLabelComponent]
    ✓ should be a valid label using CustomEvent
    ✓ should be an invalid label using CustomEvent

Test [OlistValidationStepsComponent]
    Checks steps number validations
        ✓ should create N validations steps as well
    Checks color validation
        ✓ should have a valid background color


  12 passing (79ms)
```

## Style guide

The style guide was made by Olist and was follow pixel by pixel according the style [here](https://www.figma.com/file/rsSlx8jDHls6nWXziElWTk/olist----front-end-test)


## Demonstration
The application demo can be find by cliking [here](https://watolist.herokuapp.com/) or using the following URL https://watolist.herokuapp.com/


## Licensing

Licensed under the MIT license:

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
