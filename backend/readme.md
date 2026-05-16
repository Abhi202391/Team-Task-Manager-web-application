POST    /api/v1/auth/register
POST    /api/v1/auth/login
GET     /api/v1/auth/profile

POST    /api/v1/users
GET     /api/v1/users
GET     /api/v1/users/:id
PUT     /api/v1/users/:id
DELETE  /api/v1/users/:id

POST    /api/v1/projects
GET     /api/v1/projects
GET     /api/v1/projects/:id
PUT     /api/v1/projects/:id
DELETE  /api/v1/projects/:id

POST    /api/v1/projects/:projectId/members
DELETE  /api/v1/projects/:projectId/members/:userId

POST    /api/v1/tasks
GET     /api/v1/tasks
GET     /api/v1/tasks/:id
PUT     /api/v1/tasks/:id
DELETE  /api/v1/tasks/:id

GET     /api/v1/tasks/project/:projectId

POST    /api/v1/tasks/:taskId/attachments
DELETE  /api/v1/tasks/attachments/:id