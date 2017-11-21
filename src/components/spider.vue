<style scoped lang="scss">
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
  .title{
    h1{
      text-align: center;
      &>a{
        text-decoration: none;
        color: #337ab7;
        font:{
          weight: normal;
          size: 36px;
        }
      }
    }
  }
</style>

<template>
  <el-container>
    <el-header class="title">
      <h1><a href="/">爬虫 - 展示筛选</a></h1>
    </el-header>
    <el-main>
      <template v-for="(post, index) in listPosts">
        <el-row type="flex" justify="space-around">
          <el-col :span="14">
            <article class="article">
              <header>
                <div contenteditable="true" v-html="post.post_title"
                     :id="'title-' + post.post_id"></div>
              </header>
              <div contenteditable="true" v-html="post.post_content" :id="'content-' + post.post_id">
              </div>
            </article>
          </el-col>
          <el-col :span="6">
            <el-button type="primary" @click="submitPost(post.post_id, index, 'submit')">提交</el-button>
            <el-button type="danger" @click="submitPost(post.post_id, index, 'delete')">删除</el-button>
          </el-col>
        </el-row>
      </template>
    </el-main>
  </el-container>
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
    methods: {
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
        self.$store.commit('splicePosts', index)
        window.scrollTo(0, 0)
        if (self.listPosts.length === 0) {
          self.$store.dispatch('fetchPosts')
        }
      },
      getParam () {
        let ret = this.$route.params.db || 'unknown'
        return ret
      }
    },
    watch: {
      '$route' (val) {
        // 路由改变传数据库名进vuex
        this.$store.commit('updateDbName', this.getParam())
        this.$store.dispatch('fetchPosts')
        console.log(this.getParam())
      }
    },
    mounted () {
      // 初始话也要传递数据库名
      this.$store.commit('updateDbName', this.getParam())
      this.$store.dispatch('fetchPosts')
    },
    computed: {
      listPosts () {
        return this.$store.getters.getPosts
      }
    }
  }
</script>
