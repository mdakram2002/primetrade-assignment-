## Authentication Endpoints
**Method**	**Endpoint**	        **Description	                    Auth Required**
`
    POST	    /auth/register	            Register new user	            No
    POST	    /auth/login	                Login user	                    No
    GET	        /auth/profile	            Get user profile	            Yes
    PUT	        /auth/profile	            Update user profile	            Yes
`

## Task Endpoints
**Method**	**Endpoint**	        **Description	                    Auth Required**
`
    GET	        /tasks	                    Get all tasks (with filters)	Yes
    GET	        /tasks/stats	            Get task statistics	            Yes
    GET	        /tasks/:id	                Get single task	                Yes
    POST	    /tasks	                    Create new task	                Yes
    PUT	        /tasks/:id	                Update task	                    Yes
    DELETE	    /tasks/:id	                Delete task	                    Yes
`