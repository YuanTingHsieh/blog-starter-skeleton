import 'isomorphic-fetch';
import React, { Component } from 'react';


class ArticlesPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
    };

    this.renderArticles = this.renderArticles.bind(this);
  }

  componentDidMount() {
    // fetch here
    fetch('/api/articles')
    .then(res => res.json())
    .then(json => { this.setState({ articles: json }); console.log(json); })
    .then( () => console.log(this.state.articles);)
  }

  renderArticles() {
    return this.state.articles.map((article, index) => {
      <tr><th><a href={`#/articles/${article.id}`}>{article.id}</a></th><th>{article.title}</th><th>{article.tags.join(' ')}</th></tr>
    });
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <table className="table table-striped table-bordered table-hover">
              <thead>
                <tr><th>ID</th><th>Title</th><th>Tags</th></tr>
              </thead>
              <tbody>
                {this.renderArticles()}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default ArticlesPage;
