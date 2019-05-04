//首页 推荐作者部分
//这部分我是自己写的，样式写的很烂...还没怎么学css...
1.首先编写
<WriterWrapper>  <WriterInfo>
eg:
<WriterWrapper>
	<p className="title">推荐作者</p>
	<WriteItem>
	  <img
	    className="writer-pic"
	    src="//cdn2.jianshu.io/assets/default_avatar/7-0993d41a595d6ab6ef17b19496eb2f21.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/180/h/180"
	    alt=""
	  />
	</WriteItem>
</WriterWrapper>

export const WriterWrapper = styled.div`
  overflow: hidden;
  width: 278px;
  border: 1px solid #dcdcdc;
  border-radius: 3px;
  height: 300px;
  text-align: center;
  .title {
    float: left;
    margin: 8px auto;
    padding-left: 10px;
    font-size: 14px;
    color: #969696;
  }
`;

export const WriteItem = styled.div`
  margin-top: 40px;
  .writer-pic {
    float: left;
    margin-left: 5px;
    padding: 11px;
    width: 40px;
    height: 40px;
    border-radius: 15px;
  }
`;


