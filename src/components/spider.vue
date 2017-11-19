<template>
  <div>
    <h1 class="text-center"><a href="/">爬虫 - 展示筛选</a></h1>
    <!--<button @click="getParam">get param</button>-->
    <div class="container">
      <template v-for="(post, index) in listPosts">
        <div class="row">
          <div class="col-md-8">
            <article>
              <header>
                <div contenteditable="true" class="text-center" v-html="post.post_title"
                     :id="'title-' + post.post_id"></div>
              </header>
              <div contenteditable="true" v-html="post.post_content" :id="'content-' + post.post_id">
              </div>
            </article>
          </div>
          <div class="col-md-4">
            <button class="btn btn-primary" @click="submitPost(post.post_id, index, 'submit')">提交</button>
            <button class="btn btn-danger" @click="submitPost(post.post_id, index, 'delete')">删除</button>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    data () {
      return {
        message: 'vue-spider',
        dbName: 'wp',
        posts: [
          {
            post_id: '0',
            post_title: '标题加载中...',
            post_content: '内容加载中...'
          }
        ]
      }
    },
    created () {
      // this.getPosts()
    },
    methods: {
      getPosts () {
        let self = this
        axios({
          method: 'post',
          url: 'http://spider-show.mazey.cn/interface/post.php',
          data: {
            name: self.getParam()
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
            self.posts = response.data
          })
          .catch(function (error) {
            console.log(error)
          })
      },
      submitPost (postId, index, act) {
        let self = this
        axios({
          method: 'post',
          url: 'http://spider-show.mazey.cn/interface/submit.php',
          data: {
            post_id: postId,
            post_title: document.getElementById('title-' + postId).innerHTML,
            post_content: document.getElementById('content-' + postId).innerHTML,
            act,
            name: self.getParam()
          },
          transformRequest: [function (data) {
            // Do whatever you want to transform the data
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
        self.posts.splice(index, 1)
        window.scrollTo(0, 0)
        if (self.posts.length === 0) {
          self.getPosts()
        }
      },
      getTitleAndContent (postId) {
        let arr = this.posts
        let retArr = []
        for (let i = 0, max = arr.length; i < max; i++) {
          let obj = arr[i]
          if (obj.post_id === postId) {
            retArr['post_title'] = obj.post_title
            retArr['post_content'] = obj.post_content
            return retArr
          }
        }
        return false
      },
      getParam () {
        let ret = this.$route.params.db || 'wp'
        return ret
      }
    },
    watch: {
      '$route' (val) {
        // console.log(val)
        // this.getPosts()
        // 路由改变传数据库名进vuex
        this.$store.commit('updateDbName', this.getParam())
        this.$store.dispatch('fetchPosts')
        console.log(this.getParam())
      }
    },
    mounted () {
      this.$store.dispatch('fetchPosts')
    },
    computed: {
      listPosts () {
        return this.$store.getters.getPosts
      }
    }
  }
</script>

<style scoped>
  div[id^="title-"] {
    font-family: inherit;
    font-weight: 500;
    line-height: 1.1;
    color: inherit;
    font-size: 30px;
    margin-top: 20px;
    margin-bottom: 10px;
    box-sizing: border-box;
    -webkit-margin-before: 0.83em;
    -webkit-margin-after: 0.83em;
    -webkit-margin-start: 0px;
    -webkit-margin-end: 0px;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
  }
</style>
