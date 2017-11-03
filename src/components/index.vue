 <template>
   <div>
     <h1 class="text-center"><a href="/">爬虫 - 展示筛选</a></h1>
     {{ message }}
     <div class="container">
       <template v-for="post in posts">
         <div class="row">
           <div class="col-md-8">
             <article>
               <header>
                 <h2 class="text-center" v-html="post[0]"></h2>
               </header>
               <div contenteditable="true" v-html="post[1]">
               </div>
             </article>
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
       posts: [
         [
           '标题',
           '内容'
         ]
       ]
     }
   },
   created () {
     this.getTest()
   },
   methods: {
     getTest () {
       let self = this
       axios.post('http://spider-show.mazey.cn/interface/post.php', {
         firstName: 'Fred',
         lastName: 'Flintstone'
       })
         .then(function (response) {
           console.log(response.data)
           self.posts = response.data
         })
         .catch(function (error) {
           console.log(error)
         })
     }
   }
 }
 </script>
