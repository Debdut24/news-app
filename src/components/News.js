import React, { Component } from 'react'
import NewsItem from './NewsItem'


export default class News extends Component {
  constructor(){
    super();
    this.state = {
      articles:  [],
      pageNo:1,
      totalResults:10,
      pageSize:12,
      loading: false
    }
  }

  containerStyle = {
    display:"flex",
    flexDirection:"row",
    justifyContent:"space-around",
    flexWrap:"wrap"
  }

  async componentDidMount(){
    let url = `https://newsapi.org/v2/everything?q=anime&language=en&pageSize=12&apiKey=c57e8d6ef9eb416d80e301839d6988bd&page=${this.pageNo}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData.articles);
    let maxPages = parsedData.totalResults>100?10:parsedData.totalResults/this.pageSize;
    console.log(maxPages);
    this.setState({
      totalResults: parsedData.totalResults,
      articles: parsedData.articles 
    })
  }
  
  render()  
  {     
    return (
      <div className='container' style={this.containerStyle}>
        <div className='my-4' style={this.containerStyle}>
          {this.state.articles.map((i)=>{return <NewsItem key={i.url} title={i.title} description={i.description} imageUrl={i.urlToImage} newsUrl = {i.url}/>})}
        </div>
      </div>
      )
  }
}
