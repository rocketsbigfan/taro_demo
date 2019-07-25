import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'

import './index.scss'

import img1 from '../../asset/images/eye.png'
import img2 from '../../asset/images/comment2.png'
import img3 from '../../asset/images/invite.png'
import img4 from '../../asset/images/write.png'
import img5 from '../../asset/images/icon1.jpeg'

export default class Question extends Component {
  config = {
    navigationBarTitleText: '问题'
  }
  constructor() {
    this.state = {
      question: {
        view: 0,
        comment: 0
      },
      answers: []
    }
  }
  componentWillMount() {
    this.getDetail()
  }

  componentDidMount() {}

  to = url => {
    console.log(111)
    Taro.redirectTo({ url })
  }
  back = () => {
    Taro.navigateBack({ delta: 1 })
  }

  getDetail() {
    Taro.showLoading({ title: '加载中' })
    Taro.request({
      url:
        'https://www.easy-mock.com/mock/5d36675d2f825315de337263/zhihu/problemDetail'
    }).then(res => {
      console.log(res)
      if (res.data.success) {
        this.setState({
          question: res.data.data.question,
          answers: res.data.data.answers
        })
      }
      Taro.hideLoading()
    })
  }

  render() {
    const { question, answers } = this.state
    return (
      <View className='index'>
        <View className='question-wrp'>
          <View className='question-item'>
            <View className='que-tag'>
              {question.tag.map((item, index) => {
                return (
                  <Text className='tag' key={index}>
                    {item}
                  </Text>
                )
              })}
            </View>
            <View className='que-title'>{question.title}</View>
            <View className='que-content'>{question.content}</View>
            <View className='que-follow'>
              <View className='left'>
                <View className='watch'>
                  <Image src={img1} />
                  <Text>{question.view}</Text>
                </View>
                <View className='comment'>
                  <Image src={img2} />
                  <Text>{question.comment}</Text>
                </View>
              </View>
              <View className='right'>关注</View>
            </View>
          </View>
          <View className='que-operate flex flex-vertical-center flex-horizion-center'>
            <View className='invite flex-1 flex-item flex flex-vertical-center flex-horizion-center'>
              <Image src={img3} />
              <Text>邀请回答</Text>
            </View>
            <View className='write flex-1 flex-item flex flex-vertical-center flex-horizion-center'>
              <Image src={img4} />
              <Text>写回答</Text>
            </View>
          </View>
        </View>

        <View className='answer-feed'>
          {answers.map(item => {
            return (
              <View className='feed' key={item.id}>
                <View className='feed-source'>
                  <View>
                    <View className='avatar'>
                      <Image src={img5} />
                    </View>
                    <Text className='answer-name'>{item.name}</Text>
                  </View>
                </View>
                <View className='feed-content'>
                  <View
                    className='answer-body'
                    onClick={() =>
                      this.to(`/pages/answers/answers?id=${item.id}`)
                    }
                  >
                    <View>
                      <Text className='answer-txt'>{item.content}</Text>
                    </View>
                    <View className='answer-actions'>
                      <View className='like dot'>
                        <View>{item.like} 赞同 </View>
                      </View>
                      <View className='comments dot'>
                        <View>{item.comment} 评论 </View>
                      </View>
                      <View className='time'>
                        <View>{item.time}</View>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            )
          })}
        </View>
      </View>
    )
  }
}
