# Frontend App created with NEXT.JS

### To start the project

Run `npm install` to install all dependencies and then run `npm run dev` to start the project.

> __Warning__
> Sometimes development build ignores some errors and runs the application, but production build don't allow those errors. So always check your builds using `npm run build` before commiting any changes to the code.

### Deployment
We are deploying our app on azure using github actions.
As the name suggest: 
- **prod_deployment** branch is used for our production deployment.
- **stage_deployment** branch is used for our staging deployment.

> __Note__
> All our braches are protected. To contribute create your own branch from `development` branch and raise a merge request once you add your changes.

You can access our deployed apps at
|        Staging App          |    Production App   |
| --------------------------- | ------------------- |
|   https://staging.waaw.ca   |   https://waaw.ca   |

### API Documentation
- Our API documentation is available [here](https://staging-api/swagger-ui.html)
- All endpoints are configured within our `next.config.js` file for ease of use.
- Usage for our APIs can be found in `services` folder.
- All API call should be done using our own helper class `fetchWrapper` which contains methods for `get`, `post`, `put`, `delete` and also `form-data post request` with some other methods.