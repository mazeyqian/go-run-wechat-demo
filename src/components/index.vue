 <template>
   <div>
     <h1 class="text-center"><a href="/">爬虫 - 展示筛选</a></h1>
     <div class="container">
       <template v-for="(post, index) in posts">
         <div class="row">
           <div class="col-md-8">
             <article>
               <header>
                 <h2 class="text-center" v-html="post.post_title"></h2>
               </header>
               <div contenteditable="true" v-html="post.post_content" :id="'content-' + post.post_id">
               </div>
             </article>
           </div>
           <div class="col-md-4">
             <button class="btn btn-primary" @click="submitPost(post.post_id, index)">提交</button>
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
           post_title: '标题',
           post_content: '内容'
         }
       ]
     }
   },
   created () {
     this.getPosts()
   },
   methods: {
     getPosts () {
       let self = this
       axios.post('http://spider-show.mazey.cn/interface/post.php', {
         firstName: 'Mazey',
         lastName: 'Qian'
       })
         .then(function (response) {
           console.log(response.data)
           self.posts = response.data
         })
         .catch(function (error) {
           console.log(error)
         })
     },
     submitPost (postId, index) {
       let self = this
       axios({
         method: 'post',
         url: 'http://spider-show.mazey.cn/interface/submit.php',
         data: {
           post_id: postId,
           post_title: self.getTitleAndContent(postId)['post_title'],
           post_content: self.getTitleAndContent(postId)['post_content']
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
     }
   }
 }
 </script>
