import React, { Component } from 'react';
import StoryItem from "./components/StoryItem";

class App extends Component {
  state = {
    stories: [],
  }
  componentDidMount() {
    console.log('here')
    fetch('https://hacker-news.firebaseio.com/v0/topstories.json')
      .then(data => data.json())
      .then(data => {
        const firstTen = data.slice(0, 10);
        console.log(firstTen, 'ten');
        console.log(data, 'data');
        firstTen.forEach(id => {
          fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
            .then(data => data.json())
            .then(data => {
              this.setState({stories: [...this.state.stories, data]})
            })
        })
      })
  }
  renderStories() {
    return this.state.stories.map((story, key) => {
      return <StoryItem key={key} index={key} title={story.title}/>
    })
  }
  render() {
    return (
      <div className="App">
        {this.renderStories()}
      </div>
    );
  }
}

export default App;
