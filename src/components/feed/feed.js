import Taro, { Component } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import more from '@src/asset/images/more.png'

import '@src/app.scss'
import './feed.scss'

export default class Feed extends Component {
  to = url => {
    Taro.navigateTo({
      url
    })
  }

  render() {
    const {
      feedSourceImg,
      feedSourceName,
      feedSourceTxt,
      question,
      answerCtnt,
      goodNum,
      commentNum,
      kid
    } = this.props
    return (
      <View className='feed'>
        <View className='flex flex-vertical-center feed-source'>
          <View className='avatar flex-1'>
            <Image src={feedSourceImg} />
          </View>
          <View className='flex-8'>
            <Text className='feed-source-txt'>
              {feedSourceName}
              {feedSourceTxt}
            </Text>
          </View>
          <View className='flex-1'>
            <Image className='item-more' mode='aspectFit' src={more} />
          </View>
        </View>
        <View className='feed-content'>
          <View
            className='question'
            onClick={() => this.to('/pages/question/question')}
          >
            <View className='question-link'>
              <Text>{question}</Text>
            </View>
          </View>
          <View className='answer-body'>
            <View>
              <Text
                className='answer-txt'
                onClick={() => this.to(`/pages/answers/answers?id=${kid}`)}
              >
                {answerCtnt}
              </Text>
            </View>
            <View className='answer-actions'>
              <View className='like dot'>
                <View>{goodNum} 赞同 </View>
              </View>
              <View className='comments dot'>
                <View>{commentNum} 评论 </View>
              </View>
              <View className='follow-it'>
                <View>关注问题</View>
              </View>
            </View>
          </View>
        </View>
      </View>
    )
  }
}
