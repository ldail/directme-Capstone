# Directme

## Links
* **[Live App](https://directme-client.ldail.now.sh/)**

* [Client Repository](https://github.com/ldail/directme-Capstone)
* [Server repository](https://github.com/ldail/directme-Capstone-server)
* [Kanban / Project Board](https://github.com/ldail/CapstoneI/projects)

## About
Directme is a modern web directory. Users can find new websites and communities via hubs and tags. Hubs are nested categories that a user can move through until they find a topic of interest. Tags allow a user to search by keywords to find listings. Users can contribute listings with any number of imaginable tags. If the tags match a hub's nested link, the listing will be displayed there as well.

Future deployment will include:
* User accounts that can save hubs, listings, and tags in their favorites.
* Vote for the best listings in each hub.
* Sort and filter the hubs, listings, and tags.
* Become editors of a hub and currate the best links for others.
* and much, more. Check the [Kanban / Project Board](https://github.com/ldail/CapstoneI/projects) for a list of upcoming releases.

## Technology 
* ReactJS
* Express
* Postgres
* HTML5
* CSS3
* Mocha
* Chai
* Supertest
* Enzyme
* Jest

## Screenshots

#### `MainHubs` View
![Hubs View](/src/images/Directme_hubs_screenshot.png)

#### `MainListings` View
![Listings View](/src/images/Directme_listings_screenshot.png)

#### `MainTags` View
![Tags View](/src/images/Directme_tags_screenshot.png)


## Details

Each Component is housed within its own folder. I took the best effort to separate out reusable functions as needed.
The hierarchy for the client is as follows:

1. Components
	1. Landing Page --> // *User greeted with an onboarding experience for their first time*
		1. goBack --> // *Landing-specific utility function to see the last message*
		1. goForward --> // *Landing-specific utility function to see the next message*
		1. LandingPage2 --> // *This houses the bulk of the landing page onboarding experience*
		1. Message --> // *The message that appears on the screen*
	1. Primary App --> // *This houses all of the main application*
		1. Header
			1. HeaderTitle
			1. LocationBar --> // *The breadcrumbs / location showing the deeply nested hubs a user enters*
			1. SearchBar --> // *Includes validation, calling to the API, and changing state*
		1. Main
			1. AddTagForm --> // *The input box, validation, API calls, and changing state for when a user adds a tag to a listing. Reusable*
			1. CatListing --> // *Lists a hub/category within the current hub. Reusable*
			1. LinkListing --> // *Lists an individual link. Reusable*
			1. MainHubs --> // *One of the major views of the website. Displays the hubs list*
			1. MainListings --> // *One of the major views of the website. Displays the listings list*
			1. MainNav --> // *Provides the user the option of switching between the major views.*
			1. MainTags --> // *One of the major views of the website. Displays the tags list*
			1. SubmitButton --> // *A button to submit links lives on every page on the application. Reusable*
		1. SubmitListing --> // *Submit form for listings including validation, API calls, state changes*
	1. utils --> // *These are utility functions used across the application.
1. FutureComponents --> // *Components under construction for future deployments*
1. images
1. tests