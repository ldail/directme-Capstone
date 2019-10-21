//Dependencies
import React from 'react'

//Components
import config from '../../../../config';

export default class AddTagForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      error: false
    }
  }

  addTagListing = (tagListing) => {
    let bodyText = JSON.stringify(tagListing);
    return fetch (`${config.API_ENDPOINT}/tag-listings`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(tagListing)
    })
    .then(res => {
      if (!res.ok) {
        throw new Error('error in fetch!')
      }
      return res.json();
    })
    .catch(e => console.log('error in fetch command'));
  }

  checkTag = () => {
    console.log(this.props.results);
    let find = this.props.results.tagNames.find(result => result.toLowerCase() === this.state.text.toLowerCase())
    if (find) {
      this.setState({error: true});
    }
    else {
      let tagSearch = this.props.state.tags.find(tag => {
        if (tag.name) {
          return tag.name.toLowerCase() === this.state.text.toLowerCase()
        }
      });
      let tag_id = '';
      let listing_id = this.props.id
      if (tagSearch) { // tag exists
        tag_id = tagSearch.id;
        let newListing = {description: this.props.info.description, id: listing_id, listing_id: listing_id, name: this.props.info.name, tag_id: tag_id, url: this.props.info.url}
        let tagListing = {tag_id: tag_id, listing_id: listing_id}
        console.log(tagListing);
        this.addTagListing(tagListing)
          .then(() => this.props.stateChange({
            listings: [
              ...this.props.state.listings,
              newListing
            ]
          }));
      }
      else { // tag doesn't already exist.
        //add the tag to the database
        let tag_id = this.props.state.tags.length + 2;
        let tagListing = {tag_id: tag_id, listing_id: listing_id}
        let newTag = {id: tag_id, name: this.state.text.toLowerCase()}
        let newListing = {description: this.props.info.description, id: listing_id, listing_id: listing_id, name: this.props.info.name, tag_id: tag_id, url: this.props.info.url}
        this.props.addNewTag(this.state.text.toLowerCase())
          .then(() => {
            this.addTagListing(tagListing)
              .then(() => {
                this.props.stateChange({
                  tags: [
                    ...this.props.state.tags,
                    newTag
                  ],
                  listings: [
                    ...this.props.state.listings,
                    newListing
                  ]

                })
              });
            });
        //add tag to the state, add tag_id and listing_id to tag_listings
      }
    }
  }

  validateText = (e) => {
    e.preventDefault();
    //check for only numbers and letters
    let letters = /^[0-9a-zA-Z]+$/
    if (this.state.text.match(letters)) {
      this.setState({erorr: false});
      this.checkTag();
    }
    else {
      this.setState({error: true});
    }
  }

  render() {
    let state = this.props.state || {}
    let addTag = state.addTag || {}
    let determinate = (addTag === this.props.id) ? true : false
    return (
      <>{determinate &&
        <form id='addTagForm' name='addTagForm' onSubmit={(e) => this.validateText(e)}>
        <input type="text" placeholder='tag' onChange={(e) => this.setState({text: e.target.value})} />
        <button type="submit">Add</button>
        {this.state.error && <div class="errorMessage">Please include only one new tag with only numbers or letters!</div>}
      </form>}
      </>
    )
  }
}