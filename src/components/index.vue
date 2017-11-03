 <template>
   <div>
     {{ message }}
   </div>
 </template>

 <script>
 import axios from 'axios'
 export default {
   data () {
     return {
       message: 'vue-spider'
     }
   },
   created () {
     this.getTest()
   },
   methods: {
     getTest () {
       axios.post('http://spider-show.mazey.cn/interface/post.php', {
         firstName: 'Fred',
         lastName: 'Flintstone'
       })
         .then(function (response) {
           console.log(response.data)
         })
         .catch(function (error) {
           console.log(error)
         })
     }
   }
 }
 </script>
