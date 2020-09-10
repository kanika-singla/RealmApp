exports = function(arg){
    var db = context.values.get("db_name");
    var coll = context.values.get("coll_name");
    var collection = context.services.get("mongodb-atlas").db(db).collection(coll);
    var query_str = {};
    if(arg.MatId) {
      query_str = { "MatId": arg.MatId };
    } 
    console.log(JSON.stringify(query_str));
    var docs = collection.find(query_str);
  return docs;
};