# Variant Search App
This is a simple application for searching variants from a flat TSV file. The landing
page of this application will display the first 100 rows of the TSV file provided in `/data/variants.tsv`.
Search functionality will subset the TSV file by gene name and provide autocomplete suggestions
during user input.
 
## API
There are two endpoints:
* `/gene/<:gene_name>` This will subset the `variants.tsv` data to rows with the specified `gene_name`.
* `/autosuggest/<:char_>` This will return a list of gene names that start with the the specified `char_`. 

## Known Issues
This application was developed as a code assessment as part of an interview process with Invitae. As such, 
functionality was timeboxed to a week. The following are known issues that would be addressed next as part of
a continuing development process:
* Gene search only works when you type out the full gene name and press "Enter" or click the search icon. 
  Gene search fails in the following scenarios:
  * Selecting an item from the dropdown through keypress or click.
  * Multiple gene selections
* Clicking outside of the dropdown context removes the search text, but search functionality works.
* Clearing search terms from the search bar does not reset the table.
* No pagination in table.
* `Nucleotide Change` column does not expand. 
* Table columns do not sort
* UI unit tests
* UI docker container uses development build
* To change the path of the API, update the `baseURL` in `ui/src/util/API.js` 

##### Additional Considerations:
* Using ElasticSearch for search and autocomplete functionality
* Using MongoDB to persist TSV file.
            
## Built with
* [flask](http://flask.pocoo.org/) - Python-based API microframework.
* [React.js](https://reactjs.org/) - Javascript library for building user interfaces.
* [Semantic UI React](https://react.semantic-ui.com/) - Front-end development framework. 
* [nose](http://nose.readthedocs.io/en/latest/) - Python library for unit testing.
* [Docker](https://docs.docker.com/) - - Container platform for deployment.

## Installation and Deployment
Included in this repository are two Dockerfiles for the API and UI and a docker-compose file for 
launching containers for each. The application environment can be set up by building each docker image
```bash
docker build -t variant-search-api:latest .
docker build -t variant-search-ui:latest ./ui
```
and starting their respective docker containers.
```bash
docker-compose up -d api ui
```

## Unit testing
This uses nose for unit testing. To run all tests from the repository's root directory:
```bash
nosetests tests
```

## Authors
* **Zachary Zwiesler** - zackzwiesler@gmail.com
