## 使用说明：
| 属性名		| 类型			|  说明													|
| --------		| -----:		| :----:												|
| date			| String		|  当前日期，格式支持YYYY-MM							|
| list			| Array			|  已经签到的时间列表，格式支持YYYY-MM-DD、MM-DD、DD	|
| day_change	|    function	|  点击日期时调用（上月和下月不会触发）										|
| date_change	|    function	|  当前日期改变时调用									|

```html
	<qian-dao
		:list="list"
		:date="date"
		@day_change="day_change_fun"
		@date_change="date_change_fun"
	></qian-dao>
```

```javascript
    // 签到
    import QianDao from "@/components/qian-dao/qian-dao.vue";
    export default {
		// 组件
		components: {
			// 签到
			QianDao,
		},
		data() {
			return {
				// 当前的日期
				date: "",
				// 已经签到的数据列表
				list: ["2020-05-10", "03-15", "20", "31"],
			}
		},
		// 方法
		methods: {
			// 点击天
			day_change_fun(day) {
				console.log(day);
				// 如果没有签到（可以补签）
				// if (!day.click) {
				// 	this.list.push(day.r);
				// }
				// 如果今天没有签到(只签到今天的)
				if (!day.click && day.type == "today") {
					this.list.push(day.r);
				}
			},
			// 日期改变时触发
			date_change_fun(date) {
				// 跟新日期
				this.date = date;
				// 清空已经签到的列表
				this.list = [];
				// 根据日期获取已经签到的列表然后赋值
				this.list = ["01"];
			},
		},
	}
```

Tips:
  * 有啥问题和建议或者错误不足之处，还望各位大神指出。
  * 如果问题急的话+QQ：806834390。答案：真。

### 历史版本
----
### V1.0.0   2020-05-29
抽空重新整理了下，将事件处理放在了父组件中实现，注释写的还算明白，相信聪明的你能够看懂
### V1.1.0   2020-06-01
优化了下css
