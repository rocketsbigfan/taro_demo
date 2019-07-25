import Taro, { Component } from '@tarojs/taro'
import { View, SwiperItem, ScrollView, Swiper, Image } from '@tarojs/components'
import Feed from '@c/feed/feed'
import img1 from '@src/asset/images/24213.jpg'
import img2 from '@src/asset/images/24280.jpg'
import img3 from '@src/asset/images/1444983318907-_DSC1826.jpg'
import img4 from '@src/asset/images/icon1.jpeg'
import img5 from '@src/asset/images/icon8.jpg'
import img6 from '@src/asset/images/icon9.jpeg'

import './discovery.scss'

export default class Question extends Component {
  config = {
    navigationBarTitleText: '发现'
  }
  constructor() {
    this.state = {
      navTab: [
        {
          id: 1,
          txt: '推荐'
        },
        {
          id: 2,
          txt: '圆桌'
        },
        {
          id: 3,
          txt: '热门'
        },
        {
          id: 4,
          txt: '收藏'
        }
      ],
      currentNavtab: 1,
      feed: [],
      loading: false
    }
  }

  componentWillMount() {
    this.getRecommand()
  }

  componentDidMount() {}

  getRecommand = () => {
    Taro.showLoading({ title: '加载中' })
    return Taro.request({
      url:
        'https://www.easy-mock.com/mock/5d36675d2f825315de337263/zhihu/discovery_re'
    }).then(res => {
      if (res.data.success) {
        this.setState({
          feed: res.data.data
        })
      }
      Taro.hideLoading()
    })
  }

  switchTab = id => {
    this.setState({
      currentNavtab: id
    })
  }

  appendNextPageList = () => {
    if (this.state.loading) {
      return
    }
    Taro.showLoading({ title: '加载中' })
    Taro.request({
      url:
        'https://www.easy-mock.com/mock/5d36675d2f825315de337263/zhihu/discovery_re'
    }).then(res => {
      Taro.hideLoading()
      const feed = this.state.feed
      if (res.data.success) {
        this.setState({
          feed: feed.concat(res.data.data)
        })
      }
    })
  }

  async onPullDownRefresh() {
    await this.getRecommand()
    Taro.stopPullDownRefresh()
  }

  async onReachBottom() {
    await this.appendNextPageList()
  }

  render() {
    return (
      <View className='discovery'>
        <View className='top-tab flex flex-horizion-center'>
          {this.state.navTab.map(item => {
            return (
              <View
                className={
                  this.state.currentNavtab === item.id
                    ? 'toptab flex-1 active'
                    : 'toptab flex-1'
                }
                key={item.id}
                onClick={() => this.switchTab(item.id)}
              >
                {item.txt}
              </View>
            )
          })}
        </View>
        <ScrollView
          scrollY
          className='container discovery withtab'
          lowerThreshold='30'
          upperThreshold='10'
          // onScrollToLower={this.appendNextPageList}
          // onScrollToUpper={this.appendNextPageList}
        >
          <View hidden={this.state.currentNavtab == 1 ? false : true}>
            <Swiper
              indicatorDots='true'
              autoplay='true'
              interval='5000'
              duration='500'
              className='activity'
            >
              {[img1, img2, img3].map((item, index) => (
                <SwiperItem key={index}>
                  <Image
                    src={item}
                    className='slide-image'
                    width='355'
                    height='375'
                  />
                </SwiperItem>
              ))}
            </Swiper>

            {this.state.feed.map((item, index) => {
              return (
                <Feed
                  key={`dis_${index}`}
                  feedSourceImg={img4}
                  feedSourceName={item.feed_source_name}
                  feedSourceTxt={item.feed_source_txt}
                  question={item.question}
                  goodNum={item.good_num}
                  commentNum={item.comment_num}
                  answerCtnt={item.answer_ctnt}
                  kid={item.question_id}
                />
              )
            })}
          </View>
          <View
            className='txcenter'
            hidden={this.state.currentNavtab == 2 ? false : true}
          >
            2
          </View>
          <View
            className='txcenter'
            hidden={this.state.currentNavtab == 3 ? false : true}
          >
            3
          </View>
          <View
            className='txcenter'
            hidden={this.state.currentNavtab == 4 ? false : true}
          >
            4
          </View>
        </ScrollView>
      </View>
    )
  }
}
