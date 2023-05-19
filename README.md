# didaskoAPI
This program is a scheduling system for a university with unique month-to-month subject-instance scheduling requirements. Fundamentlaly, it facilitates CRUD operations for subjects, instances of those subjects and academics to be assigned to them.

To run the project, passwords must be supplied for the three user types and SQL Server connection information through the running environment. Additionally, a port number should be supplied otherwise the proejct will listen on port 5000.
Environment variable names:
Passwords:
adminPass
managerPass
academicsPass

Database Connection:
user
password
server
database

Port:
PORT

The connected database should have a table called "session" for HTTP session information and tables created according the to "createTables.sql" query in the "db" folder.
