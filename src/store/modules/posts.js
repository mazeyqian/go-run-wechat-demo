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
