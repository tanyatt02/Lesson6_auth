


module.exports = function formatTODO(arr){
    let list = []
    for (let i in arr){
        let done  = arr[i].done;
        let title = arr[i].title
        //деструктуризация не срабатывает - ???
        let s= done ? 'DONE - > '+title : 'TODO - > '+title
        list.push(s) 
    }
    return list
}