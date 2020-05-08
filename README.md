# interview_question
李玉飞--前端开发，面试实践题

### 3.Javascript 题
答：用一个循环
```js
function optimizeTable(item, num = 3) {
    let arr = [];
    for(let i=1;i<=num;i++){
      arr.push({
      	title :`标题${i}`,
      	key : i,
      	render: item => <a href={`http://hello.com/${i}`}>{item[i]}</a>
      });
    }
    return arr
}
```