import 'isomorphic-fetch';
import React, { Component } from 'react';
import TagsInput from 'react-tagsinput';
import 'react-tagsinput/react-tagsinput.css';
import ReactQuill from 'react-quill';
import 'quill/dist/quill.snow.css';

class CreateArticlePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      content: '',
      tags: [],
    };

    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleTagsChange = this.handleTagsChange.bind(this);
    this.handleContentChange = this.handleContentChange.bind(this);
    this.handleSubmitClick = this.handleSubmitClick.bind(this);
    this.clearState = this.clearState.bind(this);
  }

  handleTitleChange = (t) => {
    this.setState({ title: t.target.value });
  }

  handleTagsChange(tags) {
    this.setState({ tags: tags });
  }

  handleContentChange = (con) => {
    this.setState({ content: con });
  }

  handleSubmitClick = () => {
    const confirm = window.confirm('確定要新增文章嗎？');
    if (confirm) {
      // fetch here
      fetch("/api/articles/", {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({ 
          title: this.state.title,
          content: this.state.content,
          tags: this.state.tags
        })
      })
      .then( () => this.clearState())
      .catch(function(res){ console.log(res) })
      .then( () => document.location.href= "#/articles");
    }
  }

  clearState = () => {
    this.setState({title: '', content: '', tags: [], tag: '',});
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <button
              className="btn btn-info pull-right"
              role="button"
              onClick={this.handleSubmitClick}
            >送出</button>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <input type="text" className="form-control" value={this.state.title} onChange={this.handleTitleChange} placeholder="New Title"></input>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <TagsInput value={this.state.tags} onChange={this.handleTagsChange}/> 
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <ReactQuill theme="snow" value={this.state.content} onChange={this.handleContentChange}/>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateArticlePage;
