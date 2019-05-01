# 虚拟DOM中的Diff算法

1. **react底层优化可以把多次setState结合成一次setState，减少虚拟DOM比对的次数**

2. **在虚拟DOM比对的时候有个同层比对的概念**：Diff算法比对两个虚拟DOM，它会逐层的比对，若某一层发现不满足相同情况，就不会再向下比对了，直接废弃掉了，用新的替换就的DOM，这样会提升性能

   ![image-20190419152352880](/Users/chenxi/Library/Application Support/typora-user-images/image-20190419152352880.png)

   

3. **key值的概念**：

   (1) 为何react中在进行列表循环的时候需要key值，实际是为了提高虚拟DOM比对的性能

   (2) key值要保持稳定，在项目中能不用index做key值就不用index，因为如果你删除了某个值，整个数组的index都变了！

![image-20190419152554161](/Users/chenxi/Library/Application Support/typora-user-images/image-20190419152554161.png)

