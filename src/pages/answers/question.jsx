import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image, Button } from '@tarojs/components'

import './index.scss'

import img2 from '@src/asset/images/good-bad.png'
import img3 from '@src/asset/images/flag.png'
import img4 from '@src/asset/images/heart2.png'
import img5 from '@src/asset/images/star2.png'
import img6 from '@src/asset/images/comment.png'
import img7 from '@src/asset/images/icon1.jpeg'

export default class Question extends Component {
  config = {
    navigationBarTitleText: '回答'
  }
  constructor() {
    this.state = {
      qtitle: '',
      answerer: {},
      question: '',
      comment: 0,
      like: 0,
      watched: false
    }
  }

  componentWillMount() {
    this.getAnswerDeatil()
  }

  componentDidMount() {}

  to = url => {
    Taro.redirectTo({ url })
  }
  // 答者信息
  getAnswerDeatil() {
    console.log(this.$router.params)
    Taro.showLoading({ title: '加载中' })
    Taro.request({
      url:
        'https://www.easy-mock.com/mock/5d36675d2f825315de337263/zhihu/answerDeatil'
    })
      .then(res => {
        Taro.hideLoading()
        if (res.data.success) {
          const { qtitle, answerer, comment, like, question } = res.data.data
          this.setState({
            qtitle,
            answerer,
            question,
            like,
            comment
          })
        }
      })
      .catch(e => Taro.hideLoading())
  }
  // 关注
  handleWatch = () => {
    Taro.getStorage({
      key: 'token',
      success: async res => {
        if (!res.data) {
          await this.handleLogin()
        }

        const watched = this.state.watched
        this.setState({
          watched: !watched
        })
        // 异步操作
        // ...
      }, 
      fail: async () => {
        await this.handleLogin()

        const watched = this.state.watched
        this.setState({
          watched: !watched
        })
      }
    })
  }
  handleLogin() {
    return Taro.getUserInfo()
      .then(() => {
        Taro.showToast({
          title: '用户登录成功',
          icon: 'success'
        })
        Taro.setStorage({ key: 'token', data: true })
      })
      .catch(e =>
        Taro.showToast({
          title: '用户登录失败',
          icon: 'error'
        })
      )
  }
  render() {
    const { qtitle, question, answerer, like, comment, watched } = this.state
    return (
      <View className='answers'>
        {/* 问题标题 */}
        <View
          className='question'
          onClick={() => this.to('/pages/question/question')}
        >
          <Text className='question-title'>{qtitle}</Text>
        </View>
        {/* 答题内容 */}
        <View className='answerer-wrp'>
          <View className='bg-half' />
          <View className='answerer flex flex-horizion-center'>
            <View className='avatar flex-1'>
              <Image src={img7} />
            </View>
            <View className='answerer-info flex-1'>
              <Text className='answerer-name'>{answerer.name}</Text>
              <Text className='answerer-des'>{answerer.describle}</Text>
            </View>
            <View className='follow flex-1'>
              <Text onClick={this.handleWatch}>
                {watched ? '已关注' : '十 关注'}
              </Text>
              {/* <Button open-type='getUserInfo' onGetUserInfo={this.handleWatch}>
                {watchText}
              </Button> */}
            </View>
          </View>
        </View>

        <View className='answer-content'>
          <Text>{question}</Text>
        </View>

        <View className='answer-footer flex'>
          <View className='good flex-1'>
            <View className='good-bad'>
              <Image src={img2} />
            </View>
            <View className='good-num'>{like}</View>
          </View>
          <View className='operation-wrp flex-5'>
            <View className='operation flex flex-tab'>
              <View className='operation-btn flex-1'>
                <Image src={img3} />
                <Text>没有帮助</Text>
              </View>
              <View className='operation-btn flex-1'>
                <Image src={img4} />
                <Text>感谢</Text>
              </View>
              <View className='operation-btn flex-1'>
                <Image src={img5} />
                <Text>收藏</Text>
              </View>
              <View className='operation-btn flex-1'>
                <Image src={img6} />
                <Text>{comment}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    )
  }
}
