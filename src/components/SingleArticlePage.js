import 'isomorphic-fetch';
import React, { Component, PropTypes } from 'react';

class SingleArticlePage extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      content: '',
      tags: [],
      isEditing: false,
    };
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleTagsChange = this.handleTagsChange.bind(this);
    this.handleContentChange = this.handleContentChange.bind(this);
    this.handleDelClick = this.handleDelClick.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
    this.renderTitle = this.renderTitle.bind(this);
    this.renderTags = this.renderTags.bind(this);
    this.renderContent = this.renderContent.bind(this);
  }

  componentDidMount() {
    // fetch with id
    fetch('/api/articles/'+this.props.id)
    .then(res => res.json())
    .then(json => { 
      this.setState({ title: json.title, content: json.content, tags: json.tags });
    });
  }

  componentDidUpdate() {
    // fetch with id
    fetch('/api/articles/'+this.props.id)
    .then(res => res.json())
    .then(json => { 
      this.setState({ title: json.title, content: json.content, tags: json.tags });
    });
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

  handleDelClick = () => {
    const confirm = window.confirm('Are you sure you want to delete this article?');
    if (confirm) {
      fetch('/api/articles/'+this.props.id, {
        method: 'DELETE'
      }).then( document.location.href = "#/articles");
    }
  };

  handleEditClick = () => {
    if(this.state.isEditing === false){
      this.setState({isEditing: true, });
    }
    else {
      this.setState({isEditing: false});
      fetch('/api/articles/'+this.props.id, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: this.state.title,
          content: this.state.content,
          tags: this.state.tags,
        }),
      });
    }
  };

  renderTitle = () => {
    if(this.state.isEditing){
      return <input type="text" className="form-control" value={this.state.title} onChange={this.handleTitleChange}></input>;
    }
    else {
      return <h1>{this.state.title}</h1>;
    }
  };

  renderTags = () => {
    if(this.state.isEditing){
      return <TagsInput value={this.state.tags} onChange={this.handleTagsChange}/>;
    }
    else {
      return <div>
        {this.state.tags.map((tag,index) => <button key={index}
          type="button"
          className="btn btn-secondary btn-sm">#{tag}</button>)}
      </div>;
    }
  };

  renderContent = () => {
    if(this.state.isEditing){
      return <ReactQuill theme="snow" value={this.state.content} onChange={this.handleQuillChange}/>;
    }
    else {
      return <div className="jumbotron" dangerouslySetInnerHTML={{__html: this.state.content}}/>;
    }
  };

  render() {
    const { isEditing } = this.state;
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="page-header">
              {this.renderTitle()}
            </div>
          </div>

        </div>
        <div className="row">
          <div className="col-md-12">
            {this.renderTags()}
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            {this.renderContent()}
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <button
              className="btn btn-info"
              role="button"
              onClick={this.handleEditClick}
            >{isEditing ? '確認' : '編輯'}</button>
            {isEditing ? null :
            <button
              className="btn btn-warning"
              role="button"
              onClick={this.handleDelClick}
            >刪除</button>
            }
          </div>
        </div>
      </div>
    );
  }
}

export default SingleArticlePage;
