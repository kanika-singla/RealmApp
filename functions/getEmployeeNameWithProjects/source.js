
/*
  This function is run when a GraphQL Query is made requesting your
  custom field name. The return value of this function is used to
  populate the resolver generated from your Payload Type.

  This function expects the following input object:

  {
    "type": "object",
    "title": "MyCustomResolverInput",
    "properties": {
      "name": {
        "type": "string"
      }
    },
    "required": ["name"]
  }
  {
    "type": "object",
    "title": "MyCustomResolverInput",
    "properties": {
      "emp_id": {
        "type": "string"
      }
    },
    "required": ["emp_id"]
  }

  And the following payload object:

  {
    "type": "object",
    "title": "MyCustomResolverResult",
    "properties": {
      "emp_name": {
        "type": "string"
      },
      "projects": {
        "type": "array"
      }
    }
  }
*/

exports = (input) => {
  //const token = context.values.get('token');
  const mongodb = context.services.get("mongodb-atlas");
  const employees = mongodb.db("employees").collection("employee_names");
  const projects = mongodb.db("employees").collection("projects");
  var query = { emp_id: input.emp_id };
  var emp_obj = employees.findOne(query);
  var proj_obj = projects.find(query,{p_name:1,_id:0});
  /*return Promise.all([emp_obj, proj_obj]).then( values => {
    return { emp_name: values[0], proj: values[1] }
  });*/
  var projects_array = [];
  Promise.all([proj_obj]).then( values => {
    //console.log(JSON.stringify(values[0]));
    for(var i=0;i<values[0].length;i++) {
      //console.log(values[0][i]);
      projects_array.push(values[0][i]['p_name']);
    }
    
  });
    return Promise.all([emp_obj, proj_obj]).then( values => {
      console.log(JSON.stringify(values[1])); console.log("knika");
    return {
      EmployeeName: values[0].emp_name, projects: values[1] }
  });
  }
