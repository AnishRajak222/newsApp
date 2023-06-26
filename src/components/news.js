import React, { Component } from 'react'
import Newsitem from './newsitem';
import Spinner from './spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export class news extends Component {
  static defaultProps = {
      country: 'in',
      pageSize: '6',
      category: 'general',
  }
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  }
   cfl = (string)=>{
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  constructor(props){
    super(props);
    this.state ={
      articles: [],
      loading: true,//false
      page:1,
      totalresults: 0//r
    }
    document.title = `${this.cfl(this.props.category)} - NewsHunt`;
  }

  async componentDidMount(){//let
    this.props.setProgress(10);
    const url= `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=55d0efbf09b147439472b863f7559858&page=${this.state.page}&pageSize=${this.props.pageSize}`;//c6a7f55ed69a4209989b3c27b7449fb0 --55d0efbf09b147439472b863f7559858 -- 2fa3501f02b54f948fee2491732ecc3d
    this.setState({loading: true});
    let data = await fetch(url);
    this.props.setProgress(40);
    let pdata = await data.json();
    this.props.setProgress(75);
    this.setState({loading: false});
    this.setState({articles: pdata.articles});
    this.setState({totalresults: pdata.totalResults});//r
    this.setState({page: this.state.page + 1});
    this.props.setProgress(100);
  }
   fetchMoreData = async () => {
    this.setState({page: this.state.page + 1});
    const url =  `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=55d0efbf09b147439472b863f7559858&page=${this.state.page}&pageSize=${this.props.pageSize}`//c6a7f55ed69a4209989b3c27b7449fb0 --55d0efbf09b147439472b863f7559858 -- 2fa3501f02b54f948fee2491732ecc3d
    this.setState({loading : true});
    let data = await fetch(url);
    let pdata = await data.json();
    this.setState({
      articles: (this.state.articles).concat(pdata.articles),
      totalresults: pdata.totalResults,//r
      loading: false,
    })
  };
  render() {
    return (
      <>
        <h1 className="text-center" style={{margin: '34px 0px'}}>NewsHunt - Top {this.cfl(this.props.category)} Headlines</h1>
        {this.state.loading && <Spinner/>}
        <InfiniteScroll
          dataLength={(this.state.articles).length}
          next={this.fetchMoreData}
          hasMore={(this.state.articles).length !== this.state.totalresults}//r
          loader={this.state.loading &&<Spinner/>}//r
        >
        <div className="container">
        <div className="row">
        {this.state.articles.map((element)=>{
              return  <div key={element.url} className="col-md-4">
                  <Newsitem title={element.title? element.title:""} description={element.description? element.description:""} imageUrl={element.urlToImage? element.urlToImage:"https://scitechdaily.com/images/Gamma-Ray-Burst-Artistic-Illustration-scaled.jpg"} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                </div>
            })}
        </div>
        </div>
        </InfiniteScroll>
      </>
    )
  }
}

export default news
