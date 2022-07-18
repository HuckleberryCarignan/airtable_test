# airtable_test
Cypress Test

# To run
- Install NPM packages
$ npm i
- Run headless 
$ npm run test
- run headed
$ npm run test-headed



Automation Task:  Complete (sort of)
 
There are still a few main issues that make this task very difficult.
 
1. CORS (Cross-Origin Resource Sharing) - I had major issues when dealing with logging in with the newly created user
2. Site Stability - Almost periodically, when creating a new Base, I would get a pop-up mentioning an error (please see the /airtable_test/taskIssues/siteNotStable.png)
3. Airtable WebSecurity - Tester needs to be white listed.  I would occasionally get the pop-up that I could not automate around (please see /airtable_test/taskIssues/SiteSecurityNotHelpful.png)
4. Automation Logic Hackery - The last bit of verification, I didn’t look at all the users, but knew that there were only two with that base and one had to have the user email I was looking for and the permissions.
 
All in all, of the 2 automation tasks:
1. Create a new account through the sign up flow
2. Sign into an existing account, create a new base, invite a new user as an Editor
The first is incredibly stable (not too shabby if I do say myself), the second has stability issues due to the above.

Improvments:
- Extract several of the Jquery gets into a seperate file - broken down by page model methodology.

