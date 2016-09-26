This example demonstrates authentication and authorization. It allows you to create todos, but what actions are visible change based on the permissions of the user logged in.

The example uses a real account in Auth0, so you don't have to set one up, and the example is already configured to use it.

![lore auth example login screen](https://cloud.githubusercontent.com/assets/2637399/18379405/412b0da6-7627-11e6-9851-f893f9cbbef9.png)

User registration is disabled, but there are two accounts pre-created to demonstrate authorization. One is an admin-type user, and the other is a normal-type user.

*Admin Credentials*
* username: admin@example.com
* password: password

*User Credentials*
* username: user@example.com
* password: password

When you log in as the admin user, you'll have permission to create, view, edit and delete todos. The admin dashboard looks like this:

![lore auth example admin dashboard](https://cloud.githubusercontent.com/assets/2637399/18379476/ae18b8c8-7627-11e6-8924-8709fa92e47e.png)

When you log in as the normal user, you'll only have permission to view and edit todos. The user dashboard looks like this:

![lore auth example user dashboard](https://cloud.githubusercontent.com/assets/2637399/18379488/bca9ceea-7627-11e6-90d8-0c470e3a0426.png)

This app uses the decorators in `lore-auth` to wrap components that control CRUD actions. These decorators will then render the child component it the user has permission, or render an empty component if they don't.
