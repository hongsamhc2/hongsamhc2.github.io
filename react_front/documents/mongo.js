use admin;
db.createUser(
  {
    user: "admin",
    pwd: "core001*",
    roles: [ { role: "userAdminAnyDatabase", db: "admin" } ]
  }
)

use wordmaker;
db.createUser(
  {
    user: "wordmaker",
    pwd: "core001*",
    roles: [ { role: "readWrite", db: "wordmaker" },
             { role: "read", db: "reporting" } ]
  }
)

use aiserver;
db.createUser(
  {
    user: "aiserver",
    pwd: "core001*",
    roles: [ { role: "readWrite", db: "aiserver" },
             { role: "read", db: "reporting" } ]
  }
)