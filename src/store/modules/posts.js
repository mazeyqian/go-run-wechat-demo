import axios from 'axios'

const state = {
  dbName: 'wp',
  postsLength: 10,
  posts: [
    {
      post_id: 0,
      post_title: '',
      post_content: ''
    }
  ]
}

const getters = {
  getPosts: state => state.posts
}

// state取出axios所要传递参数
const actions = {
  fetchPosts ({commit, state}) {
    axios({
      method: 'post',
      url: 'http://spider-show.mazey.cn/interface/post.php',
      data: {
        name: state.dbName
      },
      transformRequest: [function (data) {
        let ret = ''
        for (let it in data) {
          ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
        }
        return ret
      }]
    })
      .then(function (res) {
        console.log(res.data)
        commit('updatePosts', res.data)
      })
      .catch(function (error) {
        console.log(error)
      })
  },
  submitPost ({commit, dispatch, state}, obj) {
    axios({
      method: 'post',
      url: 'http://spider-show.mazey.cn/interface/submit.php',
      data: {
        post_id: obj.postId,
        post_title: document.getElementById('title-' + obj.postId).innerHTML,
        post_content: document.getElementById('content-' + obj.postId).innerHTML,
        act: obj.act,
        name: this.$route.params.db
      },
      transformRequest: [function (data) {
        let ret = ''
        for (let it in data) {
          ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
        }
        return ret
      }]
    })
      .then(function (response) {
        console.log(response.data)
      })
      .catch(function (error) {
        console.log(error)
      })
    commit('splicePosts', obj.index)
    window.scrollTo(0, 0)
    if (state.length === 0) {
      dispatch('fetchPosts')
    }
  }
}

const mutations = {
  updateDbName (state, dbName) {
    state.dbName = dbName
  },
  updatePosts (state, posts) {
    state.posts = posts
  },
  splicePosts (state, index) {
    state.posts.splice(index, 1)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
