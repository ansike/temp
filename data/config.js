//key代表的是实际的url，前边的api已经在dev-server中进行了配置
//value代表json文件中的键，json中的值是返回给用户的数据
var data={
	"get":[
		{
			"key":"/misfz/task/taskDetail",
			"value":"taskDetail"
		},
		{
			"key":"/misfz/task/studentdetail",
			"value":"studentdetail"
		},
		{
			"key":"/misfz/task/unitdetail",
			"value":"unitdetail"
		}
	],
	"post":[
		{
			"key":"/notes1/note",
			"value":"sites"
		},
		
	]
}
module.exports = data;