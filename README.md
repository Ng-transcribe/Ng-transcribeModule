# NgTranscribe

A simple and intuitive library to support Internationalisation in Angular applications.

Inspired by https://github.com/ngx-translate/core

This library is mainly concentrated on not having any impacts for testing the components individually or integrate it with libraries like storybook. Support of Angular versions below 8.2 is not considered. 
The project is in the begining stages and doesn't have features like 'loading translation files from a server' and 'language change at runtime'. They will be added soon based on the community needs.

## How to add it to your project?

First you need to install the npm package:

```sh
npm install ng-transcribe --save
```
or

```sh
yarn add ng-transcribe
```

## How to use it in your project?

Less configuration is the motto, All you've to do is add the library in imports of the module which uses the features. Either you've only one app module or a shared module which is getting injected in all the modules or the module which gets loaded lazily, all we have to do is

```ts
import { NgTranscribeModule } from 'ng-transcribe'

@NgModule({
    imports: [
        CommonModule,
        NgTranscribeModule
    ]
})

```

Remember to export the module if you've added this inside a shared module.

Create a locale.js file inside src folder similar to below example

```js
locale = {
    configuration: {
        language : 'pl',
        fallback: 'en'
    },
    en : {
        "welcome": "Welcome",
        LOGIN : {
            "log_in": "Log in",
            "username": "Username",
            "password": "Password"
        }
    },
    pl : {
        LOGIN : {
            "log_in": "Zaloguj sie",
            "username": "Nazwa Użytkownika"
        }
    }
}
```
The file above is self explanatory, we set which is the language we have to pick the codes from and where do we have to look for if some code is missing in the primary language. We recommend using snake case for keys and not use '.'(period) as it will have adverse effects in picking the right value.

One last thing, add the language file in scripts array of angular.json

```ts
scripts: ["src/locale.js"]
```

That's it, start using,

```html
<h3>{{'welcome' | translate}}</h3>
```

It is straight-forward to use keys which are nested

```html
<span>{{'LOGIN.log_in' | translate}}</span>
```

Did you get the same question which I got, How do we pass the values dynamically? Brillient,

```js
 "welcome_message" : "Hello #{arg1}"
```
Add the strings which are to be replaced at runtime inside brackets and preceded it with a pound symbol like above. and pass the arguments as arrays. we believe this will work for all the cases and don't see any reason to go via a key value pair agruments

```html
<span>{{'welcome_message' : translate:['world']}}</span>
```
We can have any number of such identifiers, as long as we maintainn the order of arguments passed.

You can also specify html as the content and use it in your templates.
```js
{
    "welcome": "hello <b>world!</b>"
}
```

To render them, simply use the innerHTML attribute with the pipe on any element.
<h2 [innerHTML]="'welcome' | translate"></h2>

You can construct the translation keys dynamically in your templates
```html
<p>{{ 'LANGUAGES.' + language | translate }}</p>
```
Where languages is an array member of your component:
languages = 'en'

Not to mention, there are no restrictions if you want to add the translate pipe along with built-in/custom pipes.
```html
<span>{{'hello' | lowercase | translate}}</span>
```

Now, Let us see an example on how to use the APIs of the library. 

```ts
import { NgTranscribeService } from 'ng-translate'

export class Home implements OnInit {
  constructor (private _translate: NgTranscribeService) {}

  ngOnInit() {
    console.log(this._translate.t('LOGIN.log_in'))
  }
}
```

## Configuration
`language : 'pl' ` : Primary language from which the values to be picked up.

`fallback: 'en' ` : Secondary language from which the values to be picked up if the requested key is not present in the primary language hash


## Supported methods

`t(key, args) `: accepts a key and the arguments array[optional] and returns the translated string

`update('key', 'value') `: accepts two strings which will be added as a new key/value pair if the key doesn't exists, updates the value if the key already exists.

To all the methods above key can have a string which represents the nesting structure. 
```js 
update('LOGIN.log_in', 'Sign Up')
```  
