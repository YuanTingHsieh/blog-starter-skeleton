import 'isomorphic-fetch';
import React, { Component } from 'react';


class ArticlesPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
    };
  }

  componentDidMount() {
    // fetch here
    fetch('/api/articles')
      .then(res => res.json())
      .then(json => { this.setState({ articles: articles }); });
  }

  renderArticles() {
    return this.state.articles.map((article, index) => {
      <tr><th><a href={`/${item._id}`}>{article.id}</a></th><th>{article.title}</th><th>{article.tags.join(' ')}</th></tr>
    });
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <table class="table table-striped table-bordered table-hover">
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
