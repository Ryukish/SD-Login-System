# SD-Login-System
Description: 
You have been asked to build an admin portal that will allow your company internal employees to access the portal and perform admin functions on behalf of company clients.

Here are additional details:

(a) Admin portal is accessible only on company network to only company employees that have one of the "ADMIN" roles. 
(b) Access to the links is role based i.e. only authenticated internal employees with "ADMIN" role are able to access the portal and what links you can access once on the portal is determined based on what other roles you have. So, same link will not be visible to other admin who doesn't have appropriate role to access the link.
(c) There are five categories of applications and 5 admin roles for each category. Here are the details:

#             Category              Role                   Links                   Access                                                                                                                
========================================================================================================================================
1.            Global                   ADMIN                                 All Global links                                                                                   {Manage User Accounts, Assign Roles, Help Desk}
2.            Finance                FINANCE_ADMIN                             All Global links + All Finance Category links                                            {Finance Reports, Accounts Payable, Accounts Receivables, Tax}
3.            Sales                      SALES_ADMIN                  All Global links + All Sales Category links                                 {Sales Reports, Sales Leads, Sales Demo}
4.            HR                          HR_ADMIN                         All Global links + All HR Category links                                     {New Hire, On-boarding, Benefits, Payroll, Terminations, HR Reports}
5.            Engineering        ENGG_ADMIN                  All Global links + All Engineering Category links                   {Application Monitoring, Tech Support, App Development, App Admin, Release Management}

(d) The links redirect users to the admin application that is not developed by you. You are only providing links to the portal and redirect users to appropriate application.


* bcryptjs: used to hash passwords before we store them in our database
* express: sits on top of Node to make the routing, request handling, and responding easier to write
* is-empty: global function that will come in handy when we use validator
* jsonwebtoken: used for authorization
* mongoose: used to interact with MongoDB
* passport: used to authenticate requests, which it does through an extensible set of plugins known as strategies
* passport-jwt: passport strategy for authenticating with a JSON Web Token (JWT); lets you authenticate endpoints using a JWT
* validator: used to validate inputs (e.g. check for valid email format, confirming passwords match)
___________________________________________________________________________________________________________________________________

