# React中ref的使用

1. 在react中使用ref来操作DOM

   ```javascript
   在react中，可以用e.target获得DOM结点，另一个方法是使用ref
   handleInputChange(e) {
   	const value = this.input.value;
   	this.setState(() => ({
   		inputValue: value
   	}));
   }
   
   <div>
     <label htmlFor="insertArea">输入内容</label>
     <input 
       id="insertArea"
       className='input'
       value={this.state.inputValue}
       onChange={this.handleInputChange}
       ref={(input) => {this.input = input}}   #ref
     />
   	<button onClick={this.handleBtnClick}>提交</button>
   </div>
   
   handleInputChange(e) {
     const value = this.input.value;
     this.setState(() => ({
       inputValue: value
     }));
   }
   ```

   