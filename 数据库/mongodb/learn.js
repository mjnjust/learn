db.getCollection('test').find({})

db.getCollection('test').aggregate([{$match:{'comments.user':'lilei'}}])
db.getCollection('test').aggregate([{$match:{'comments.user':'lilei'}},{$unwind:'$comments'},{$match:{'comments.user':'lilei'}}])

db.getCollection('test').aggregate([{$sort:{'weShare':1,'weboShare':1}}])


db.getCollection('test').insertMany(
[
    {name:'test1',author:'zhangsan',score:1,comments:[{user:'lilei'},{user:'lixiao'}],wxShare:10,weboShare:20,createTime:new Date()},
    {name:'test2',author:'zhangsan',score:4,comments:[{user:'lilei'},{user:'wangxiaoer'}],wxShare:10,weboShare:20,createTime:new Date()},
    {name:'test3',author:'lisi',score:4,comments:[{user:'lilei'},{user:'lixiao'}],wxShare:10,weboShare:20,createTime:new Date()},
    {name:'test4',author:'wangwu',score:5,comments:[{user:'wangxiaoer'},{user:'wangxiaoer'}],wxShare:10,weboShare:20,createTime:new Date()},
    {name:'test5',author:'lisi',score:3,comments:[{user:'zhaobin'},{user:'lixiao'}],wxShare:10,weboShare:20,createTime:new Date()},
    {name:'test6',author:'lisi',score:6,comments:[{user:'liyang'},{user:'lixiao'}],wxShare:10,weboShare:20,createTime:new Date()}
    ]
)
    
db.getCollection('test').find({})
    
db.getCollection('test').mapReduce(
function(){emit(this.name,this.wxShare)},
function(key,values){return Arrays.sum(values)},
{out:'result'}
)


db.getCollection('test').mapReduce(
function(){
    emit(this.author,{wx:this.wxShare,webo:this.weboShare})
},
function(key,values){
    var result = {wx:0,webo:0}
    for(var i in values){
        result.wx+=values[i].ex
        result.webo+=values[i].webo
    }
    return result
},
{out:'result'}
)
    
    

    
