<template>
  <div>
    <h1 class="text-center"><a href="/">爬虫 - 展示筛选</a></h1>
    {{ message }}
  </div>
</template>

<script>
import $ from 'jquery'
export default {
  data () {
    return {
      message: 'vue-spider'
    }
  },
  methods: {
    getTest () {
      $.ajax({
        type: 'get',
        async: true,
        url: 'http://spider-show.mazey.cn/interface/post.php',
        dataType: 'jsonp',
        jsonpCallback: 'callSuccess',
        success: function (data) {
          console.log(data)
        },
        error: function (data) {
          console.log('error: jsonp')
        }
      })
    }
  }
}
</script>
