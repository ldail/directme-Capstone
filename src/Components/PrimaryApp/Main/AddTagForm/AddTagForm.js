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


  checkTag = () => {
    let tags = this.props.state.tags;
    let find = this.props.results.tagNames.find(result => result.toLowerCase() === this.state.text.toLowerCase())
    if (find) {
      this.setState({error: true});
    }
    else {
      this.setState({text: ''})
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
        this.props.addTagListing(tagListing)
          .then(() => this.props.stateChange({
            listings: [
              ...this.props.state.listings,
              newListing
            ]
          }));
      }
      else { // tag doesn't already exist.
        //add the tag to the database
        this.props.addNewTag(this.state.text.toLowerCase())
        .then(tagReturn => {
          let tagListing = {tag_id: tagReturn.id, listing_id: listing_id}
          this.props.addTagListing(tagListing)
            .then(listingReturn => {
              let newListing = {description: this.props.info.description, id: listing_id, listing_id: listing_id, name: this.props.info.name, tag_id: tagReturn.id, url: this.props.info.url}
              this.props.stateChange({
                tags: [
                  ...tags,
                  tagReturn
                ],
                listings: [
                  ...this.props.state.listings,
                  newListing
                ]

              })
            });
          });
        
      }
    }
  }

  validateText = (e) => {
    e.preventDefault();
    //check for only numbers and letters
    let letters = /^[0-9a-zA-Z]+$/
    if (this.state.text.match(letters)) {
      this.setState({error: false});
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
        <div>
        <form id='addTagForm' name='addTagForm' onSubmit={(e) => this.validateText(e)}>
        <input type="text" placeholder='tag' onChange={(e) => this.setState({text: e.target.value})}/>
        <button type="submit"></button>
        </form>
        {this.state.error && <div class="errorMessage">Please include only one new tag with only numbers or letters!</div>}
      </div>}
      </>
    )
  }
}