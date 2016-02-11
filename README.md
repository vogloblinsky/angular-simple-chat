# angular-simple-chat

[![devdependencies][devdepstat-image]][devdepstat-url] [![Build Status][travis-image]][travis-url]

[devdepstat-url]: https://david-dm.org/vogloblinsky/angular-simple-chat#info=devDependencies
[devdepstat-image]: https://david-dm.org/vogloblinsky/angular-simple-chat/dev-status.png
[travis-url]: https://travis-ci.org/vogloblinsky/angular-simple-chat
[travis-image]: https://travis-ci.org/vogloblinsky/angular-simple-chat.svg?branch=master

AngularJS chat directive

![AngularJS chat directive](https://raw.githubusercontent.com/vogloblinsky/angular-simple-chat/master/screenshot.png "AngularJS chat directive")

# Requirements

```json
"dependencies": {
  "angularjs": "~1.4.9",
  "angular-moment": "^0.10.3"
}
```

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
    to-user="AppView.guy"
></simple-chat>
```

# Documentation

## Params
* messages: array of messages to show. (required)
Message format is :
{id: 'string', text: 'string', userId: 'string', date: '1455120273886'}
* local-user: user object of the user using the app (required)
{userId: 'string', avatar: 'string', username: 'string'}
* to-user: user object of the other user using the chat (required)
{userId: 'string', avatar: 'string', username: 'string'}
* send-function: function called when user click on send button (required) 

* send-button-text: (optional)
* composer-placeholder-text: (optional)
* show-user-avatar: boolean (optional)

## Events

### simple-chat-message-posted
Event sended when local user send a message

# TODOS

- Display message "time ago" with these rules :
    + if message.date < 1 week && < 3 days ago : display " today/yesterday/the day before yesterday + HH:mm "
    + if message.date < 1 week && > 3 days ago : display " day + HH:mm "
    + if message.date > 1 week : display " day. X month (YYYY) + HH:mm "