# React/Redux Boilerplate

Because of the simplicity of the React/Redux dataflow, the easiest way to introduce a new resource is often to copy 
and modify existing project files.  Then you just have to update some file references, change the API endpoint, and 
off you go.

The main problems with this are:

1. It's easy to make a mistake.  If you miss one rename, point to the wrong endpoint, forget to copy a file (sometimes 
a folder) you end up with errors.  And while they aren't hard to interpret once you're comfortable with the flow and
adding new resources, it can be difficult and uncomfortable for new people getting started, or people who aren't as
comfortable debugging React applications.

2. One of the hardest problems to detect and solve in React is the browser infinite loop problem.  This is surprisingly
easy to trigger and really painful to solve the first time you see it.  It's also a nightmare scenario for newer 
developers, as they also need to know how to kill a task in a browser. Frustrating, slow, and energy draining. Happens
more often if your dataflow has any lazy-loading type behavior (fetch data only when components request it).

3. Hard to introduce sweeping changes, like logging requests as they happen. Each cross-cutting concern needs to be
added to all the files. And even if there's a disciplined approach taken on the team, it's still easy to forget to 
modify a file once you have 5, 10, 20 sets of boilerplate for various API endpoints.
