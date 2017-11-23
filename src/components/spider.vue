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
    text-align: center;
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
  .article{
    header>div{
      _text-align: center;
      display: flex;
      justify-content: center;
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
        <el-row _type="flex" _justify="space-around">
          <el-col :span="24">
            <article class="article">
              <header>
                <div contenteditable="true" v-html="post.post_title"
                     :id="'title-' + post.post_id"></div>
              </header>
              <div contenteditable="true" v-html="post.post_content" :id="'content-' + post.post_id">
              </div>
            </article>
          </el-col>
          <el-col :span="24">
            <el-button type="primary" @click="$store.dispatch('submitPost', {
              postId: post.post_id,
              index: index,
              act: 'submit'
            })" :loading="post.is_loading">提交</el-button>
            <el-button type="danger" @click="$store.dispatch('submitPost', {
              postId: post.post_id,
              index: index,
              act: 'delete'
            })" :loading="post.is_loading">删除</el-button>
          </el-col>
        </el-row>
      </template>
    </el-main>
  </el-container>
</template>

<script>
  export default {
    data () {
      return {
        message: 'vue-spider',
        dbName: 'wp',
        posts: [
          {
            post_id: '0',
            post_title: '标题加载中...',
            post_content: '内容加载中...',
            is_loading: false
          }
        ]
      }
    },
    methods: {
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
