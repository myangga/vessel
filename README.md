# Vessel

## Sails and Svelte

### This is an experiment. Please don't use this for anything important unless you know what you're doing!

## If you do want to use this, here's how to get going

### Grab this repository and `cd` into whatever folder you put it into
```shell
npx degit nemo-omen/vessel
```

```shell
cd vessel
```

### Install the dependencies
```shell
make install
```
Runs a Makefile that installs dependencies from both the main project folder
and the `api` folder wile using `docker-compose` to create a volume for the 
dockerized dev environment that comes with running the next step.

Alternatively, if you don't want to work in a dockerized environment, you can 
`npm install` once in the main directory, and once in the `/api` directory.

### Run the app in development
```shell
make dev
```
Runs `docker-compose --remove-orphans` without all the typing, setting up a dev environment

One day I may put all of the base project files into a container, we'll see.

If you're forgoing the virtual docker environment, you can also run `npm run all`
from the project's root directory.

Your app will be available at two addresses:

#### Backend: 
localhost:1337 => _Sails default_

#### Frontend:
localhost:5000 => _Svelte default_

### Don't forget to clean up after yourself
```shell
make down
# runs `docker-compose down` so you don't have volumes and images laying around everywhere
```
## Config
Default Sails config _mostly_ matches what you would get if you were to run `sails new <appname> --no-frontend`. Some changes have been made in order to make development faster.

### mongodb
You'll want to update the configured mongodb settings located in `/api/config/datastores.js`. Currently the default is set to `sails-mongodb` and the url is `mongodb://mongo/test`. If you like things to be super-easy, just change `test` to whatever you want you database to be named.

The `docker-compose.yml` included in this project spins up a mongo image, which is exposed at port `27018` rather than the default port of `27017`. This is to keep it from conflicting with any local mongo instances.

This mongo container is then accessed via `mongodb://mongo/<databasename>`

### Sails blueprint auto routes are on by default
You can change these settings in `/api/config/blueprints.js`.

Sails `config.blueprints.actions` and `config.blueprints.rest` are enabled by default. That means if you navigate to the `/api` folder and run `sails generate api hats` you'll be able to access the api at conventional REST endpoints:

GET: `http://localhost:1337/hats` -> returns all hats
GET: `http://localhost:1337/hats/abcdefg123` -> returns one hat
POST: `http://localhost:1337/hats` -> creates a hat, returns the created document
PATCH: `http://localhost:1337/hats/abcdefg123` -> updates a hat, returns the updated document
PUT: `http://localhost:1337/hats/abcdefg123` -> updates a hat, returns the updated document -- but Sails will tell you it prefers you to use `PATCH`
DELETE: `http://localhost:1337/hats/abcdefg123` -> deletes a hat, returns the deleted document

### Models config
You can change these settings in `/api/config/models.js`

Again, the defaults here have been set to get up and running as quickly as possible.

`schema: false` can be changed to `true` when you want to start validating any data coming through.

`migrate: alter` can be changed according to what you need. I don't know enough about Sails to mess with it yet.

All newly created documents will have the following attributes added automatically, you can change the attributes you want to include as needed:

```js
createdAt: { type: 'number', autoCreatedAt: true, },
updatedAt: { type: 'number', autoUpdatedAt: true, },
id: { type: 'string', columnName: '_id' },
```

### Things that might work to make this better:

[grunt-rollup](https://www.npmjs.com/package/grunt-rollup)

[Svelte Server-side component API](https://svelte.dev/docs#Server-side_component_API)

[Full stack development starter](https://medium.com/swlh/full-stack-development-starter-svelte-and-express-831aefee41c0)

[Express Svelte template](https://github.com/somi92/express-svelte-template)

[Svelte View Engine](https://www.npmjs.com/package/svelte-view-engine)

### or

Just bundle the Svelte app into the `assets/` directory

### Further reading

[machine-as-actions](https://github.com/sailshq/machine-as-action) - Sails uses this for their controllers

[node machine](https://node-machine.org/) - Sails uses this architecture for the controllers

