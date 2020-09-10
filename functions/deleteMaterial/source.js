exports = function(arg){
    var db = context.values.get("db_name");
    var coll = context.values.get("coll_name");
    var collection = context.services.get("mongodb-atlas").db(db).collection(coll);
    var doc = collection.delete({MatId: arg.MatId});
  return doc;
};