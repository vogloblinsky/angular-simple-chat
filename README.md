# angular-simple-chat

[![devdependencies][devdepstat-image]][devdepstat-url] [![Build Status][travis-image]][travis-url] [![codecov.io][codecov-image]][codecov-url] ![bower][bower-image]

[devdepstat-url]: https://david-dm.org/vogloblinsky/angular-simple-chat#info=devDependencies
[devdepstat-image]: https://david-dm.org/vogloblinsky/angular-simple-chat/dev-status.png
[travis-url]: https://travis-ci.org/vogloblinsky/angular-simple-chat
[travis-image]: https://travis-ci.org/vogloblinsky/angular-simple-chat.svg?branch=master
[codecov-url]: https://codecov.io/github/vogloblinsky/angular-simple-chat?branch=master
[codecov-image]: https://codecov.io/github/vogloblinsky/angular-simple-chat/coverage.svg?branch=master
[bower-image]: https://img.shields.io/bower/v/angular-simple-chat.svg

AngularJS chat directive

![AngularJS chat directive](https://raw.githubusercontent.com/vogloblinsky/angular-simple-chat/master/screenshot.png "AngularJS chat directive")

# Requirements

```json
"dependencies": {
  "angularjs": "~1.4.9"
}
```

angular-moment amTimeAgo copied internaly because of unit testing issue with angular-moment AMD configuration

# Installation

## Install with Bower

```bash
bower install --save angular-simple-chat
```

## Add the dependencies to your index.html manually or using tool like wiredep

```html
<!-- Dependencies -->
<script src="bower_components/angular/angular.js"></script>
<script src="bower_components/moment/moment.js"></script>
<script src="bower_components/angular-moment/angular-moment.js"></script>

<!-- Simple Chat -->
<link rel="stylesheet" href="bower_components/angular-simple-chat/dist/angular-simple-chat.min.css">
<script src="bower_components/angular-simple-chat/dist/angular-simple-chat.min.js"></script>
```

## Load the module in your app
```javascript
angular.module('app', ['angular-simple-chat']);
```

## Use it in any template
```html
<simple-chat
    messages="AppView.messages"
    local-user="AppView.you"
></simple-chat>
```

# Interaction

The component is just responsable of displaying messages, and writing them.
The synchronisation between different clients is not implemented.

# Running the examples

To run the examples page, just run

```shell
gulp serve
```

and open your browser on http://localhost:3000/examples/

# Description of attributes

| Attribute | Description | Required | Type | Binding |
| :------------- |:-------------| :-----:| :-----:| :-----:|
| messages | array of messages to show. Message format is : {id: 'string', text: 'string', userId: 'string', date: '1455120273886'}| Yes | Array | = |
| local-user | user object of the user using the chat. {userId: 'string', avatar: 'string', userName: 'string'}| Yes | Object | = |
| send-function | function called when user click on send button | No | Function | = |
| live-flag-function | function called to submit flags | No | Function | = |
| live-mode | configure live mode | No | Boolean | = |
| send-button-text | init send button text | No | String | @ |
| composer-placeholder-text | init composer placeholder text | No | String | @ |
| show-user-avatar | show/hide user avatar | No | Boolean | = |
| show-composer | show/hide composer | No | Boolean | = |
| show-bubble-infos | show/hide bubble infos | No | Boolean | = |

## Events

### simple-chat-message-posted
Event sended when local user send a message

# Live mode

While the first user is writing text on his side, the other user received directly the letters. 
The end of the bubble is catched when "Enter" key is pressed.
Flags are sended with liveFlagFunction to explain sequence who people writing text :
- startSentence
- endSentence

# TODOS

- Display message "time ago" with these rules :
    + if message.date < 1 week && < 3 days ago : display " today/yesterday/the day before yesterday + HH:mm "
    + if message.date < 1 week && > 3 days ago : display " day + HH:mm "
    + if message.date > 1 week : display " day. X month (YYYY) + HH:mm "

# Tests

## In terminal

- run chromedriver in one tab :

```shell
chromedriver  --port=4444 --url-base=wd/hub
```

- run tests in another one :

With gulp

```shell
gulp tests
```

With npm

```shell
npm run test-local-terminal
```

## In a browser

Access this url : 

http://YOUR_LOCAL_WEBSERVER/angular-simple-chat/node_modules/intern/client.html?config=tests/intern.local.browser