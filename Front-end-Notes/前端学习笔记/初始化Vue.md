# 初始化Vue

1. 创建vue项目

   ```
   vue create vue-learn   #项目名
   
   cd vue-learn    
   npm run serve    #启动vue服务
   
   
   #使用的是
   vue-cli@3
   vue@2.5
   ```

   

2. V-html 

   ```
   <div v-html="msg1">
   </div>
   
   data() {
     return {
       msg1:"<span style='color:red;'>HelloWorld</span>"
     }
   }
   
   这样输出的msg1是红色HelloWorld，而不会是'<span style='color:red;'>HelloWorld</span>'
   ```




3. 给html标签动态增加属性(动态class)

   ```html
   最推荐的方法：
   <div :class="obj">style obj</div>
   当 obj: {
           "text-1": true
         }
   时class有text-1这个属性，若为false，则无
   
     data() {
       return {
         msg1: "<span style='color:red;'>HelloWorld</span>",
         id: "txt",
         number: 1,
         seen: true,
         money: 100,
         a: 10,
         a1: "text-1",
         a2: "text-2",
         a3: true,
         obj: {
           "text-1": true
         }
       };
     },
   ```

   

4. 分组用法

   ```html
   想给每个输出的东西前面加个固定的字符：
       <ul>
         <template v-for="item in list">
           <li :key="item+1">hello</li>    #这里的key里+1是因为vue希望每个的index不同
           <li :key="item">{{item}}</li>
         </template>
       </ul>
       
     data() {
       return {
         list: ["a", "b", "c", "d"]
       };
     },
     
   页面输出： hello  a  hello  b hello  c  hello  d
   ```



5. 创建组件流程

   ```html
   1.新建一个组件 eg:com.vue
   2.该组件中，默认模板写好:
     <template lang="html">
       <div class="com">
       </div>
     </template>
   
     <script>
     export default {
     };
     </script>
   
     <style lang="css">
     </style>
   
   3.在父组件里App.vue里挂载这个组件
   	<template>
       ...
       <com />               (2)
   	</template>
   
   	<script>
   		...
       import com from "./components/com.vue";   (1)
   	</script>
   
   	export default {
   		name: "app",
   		components: {
   			...,
   			...,
   			com                 (3)
   	}
   }
   ```

   

6. 父组件和子组件之间如何传递数据: props + 自定义事件

   ```html
   父组件里：
   <com :age="age" @patch="msg"/>    (2) @patch是自定义事件 (00)
   
   <script>
   export default {
     name: "app",
     components: {
       HelloWorld,
       ev,
       com
     },
     data() {
       return {
         age: 18      (1)#父组件里的数据
       };
     },
     methods: {
       msg: function() {
         this.ages++;    #每次点击ages+=1   (00)
       }
     }
   };
   </script>
   
   子组件里：
   <template lang="html">
       <div class="com">
           child components
           {{ name }} {{ age }}     (2)#使用接收到的参数
         	<button type="button" name="button" @click="$emit('patch')">发送到父组件</button>               (00)
       </div>
   </template>
   
   <script>
   export default {
     props: ["age"],          (1)props里接收父组件传的参数
     data() {
       return {
         name: "com"
       };
     }
   };
   </script>
   ```



7. Slot 插槽

   ```html
   在父组件中：
   <template>
     <div>
       <com :age="ages" @patch="msg">
         <h1 slot='a'>加在上面</h1>    (3)
         <h1 slot='b'>加在下面</h1>    (4)
       </com>
     </div>
   </template>
   
   子组件里：
   <template lang="html">
       <div class="com">
         	<slot name='a'></slot>       (1)
           child components
           {{ name }} {{ age }}
           <button type="button" name="button" @click="$emit('patch')">发送到父组件</button>
         	<slot name='b'></slot>       (2)
       </div>
   </template>
   ```

   

8. Vuex基础

   ```
   在Vue里无法直接修改数据,修改只能在Mutation中去做
   -State里存储数据
   -Mutations里写对state中的数据进行的操作
   -Actions用来接收Vue components中的用户行为，进一步触发要做哪个提交，这个commit会带一个参数, 这个参数对应mutations里面要做的那个函数，mutations做了这个函数，会对应的修改state里的数据
   -state中数据修改后会重新render到vue components里，所以看得到变化
   ```

   

![image-20190414164405093](/Users/chenxi/Library/Application Support/typora-user-images/image-20190414164405093.png)

