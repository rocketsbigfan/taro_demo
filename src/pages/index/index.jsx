import Taro, { Component } from '@tarojs/taro'
import { View, Image, Input, ScrollView } from '@tarojs/components'

import Feed from '@c/feed/feed'

import searchPng from '../../asset/images/search.png'
import lightingPng from '../../asset/images/lighting.png'
// import { connect } from '@tarojs/redux'

// import { add, minus, asyncAdd } from '../../actions/counter'

import '@src/app.scss'
import './index.scss'

class Index extends Component {
  config = {
    navigationBarTitleText: '首页'
  }
  constructor() {
    super(...arguments)
    this.state = {
      loading: false,
      list: [],
      searchValue: ''
    }
  }
  componentDidMount() {
    this.getList()
    const query = Taro.createSelectorQuery()
      .select('.scroll-container')
      .boundingClientRect()

    query.exec(rect => console.log(rect))
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  async onPullDownRefresh() {
    await this.getList()
    Taro.stopPullDownRefresh()
  }
  onReachBottom() {
    this.appendNextPageList()
  }

  getList = () => {
    if (this.state.loading) return
    this.setState({
      loading: true
    })
    // 获取远程数据
    Taro.showLoading({ title: '加载中' })
    return Taro.request({
      url: 'https://www.easy-mock.com/mock/5d36675d2f825315de337263/zhihu/feed'
    })
      .then(res => {
        Taro.hideLoading()
        if (res.data.success) {
          this.setState({
            list: this.state.list.concat(res.data.data),
            loading: false
          })
        }
      })
      .catch(e => Taro.hideLoading())
  }

  inputChange = e => {
    this.setState({
      searchValue: e.target.value
    })
  }

  scrollToUpper = e => {
    this.getList()
  }
  appendNextPageList = () => {
    if (this.state.loading) {
      return
    }
    Taro.showLoading({ title: '加载中' })
    Taro.request({
      url: 'https://www.easy-mock.com/mock/5d36675d2f825315de337263/zhihu/feed'
    }).then(res => {
      Taro.hideLoading()
      const list = this.state.list
      if (res.data.success) {
        this.setState({
          list: list.concat(res.data.data)
        })
      }
    })
  }
  render() {
    return (
      <View className='index'>
        <ScrollView
          className='scroll-container'
          scrollY
          scrollWithAnimation
          lowerThreshold='30'
          upperThreshold='10'
          // onScrollToUpper={this.scrollToUpper}
          // onScrollToLower={this.appendNextPageList}
        >
          <View className='search flex flex-vertical-center'>
            <View className='search-left flex-8 flex flex-vertical-center'>
              <View className='flex-1'>
                <Image src={searchPng} />
              </View>
              <View className='flex-6'>
                <Input
                  type='text'
                  value={this.state.searchValue}
                  placeholder='搜索话题, 问题或人'
                  placeholderClass='search-placeholder'
                  onInput={this.inputChange}
                />
              </View>
              <View className='search-right flex flex-1'>
                <Image src={lightingPng} onClick={this.getList} />
              </View>
            </View>
          </View>
          {this.state.loading
            ? // <View className='txcenter'>加载中</View>
              ''
            : this.state.list.map(item => (
                <Feed
                  key={item.question_id}
                  feedSourceName={item.feed_source_name}
                  feedSourceTxt={item.feed_source_txt}
                  feedSourceImg={item.feed_source_img}
                  question={item.question}
                  answerCtnt={item.answer_ctnt}
                  goodNum={item.good_num}
                  commentNum={item.comment_num}
                  kid={item.question_id}
                />
              ))}
        </ScrollView>
      </View>
    )
  }
}

export default Index
