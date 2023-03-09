# _(IACSD Coding Assessment Portal)_

### Document : 

#### System Requirement Specification

### Title :
System Requirement for _"IACSD Coding Assessment Portal"_

### Team : 
Direct Users : Admin(Examiner), Student

### Objective(Purpose) :
The  aim  of  this  document  is  to  explain  the  functionality  of  the  project  developed for  providing complete solution for Institution, Students as well as internal users (Examiners) through a single Gateway using internet/intranet. It will enable Institute to set up online Coding Exam, Students to give exam through virtual medium.
It is the outcome of rigorous consideration of the requirements of the institute.
This document will provide a baseline for design of the database, user interfaces, coding
& evaluation of test plans. It will be used as a solid foundation for continued product evaluation if needed in future.

### Definition, Acronyms and Abbreviations :
- IACSD : Institute for Advanced Computing & Software Development
- Portal: Personalized Online Web Application
- Module: Teaching Course for particular duration and topic
- Dashboard: Personalized information presented using  BI techniques such grid, score card, graph
- AWS: Amazon Web Services
- Azure: Microsoft Azure
- GCP: Google Cloud Platform 
- SRS : Software Requirement Specifications
- JDK : Java Development Kit
- JRE : Java Runtime Environment
- IDE : Integrated Development Environment
- GUI : Graphical User Interface
- FAQ : Frequently Asked Questions
- API : Application Program Interface


### References for Requirement Analysis and Design :
- Java Documentation 
- .NET Documentation
- React Documentation
- MongoDb Documentation
- Mysql Documentation
- IEEE recommended practices for SRS. ANSI / IEEE Std 830 – 1993.
- Open APIs

### Scope:
This System allows Examiner to maintain a list of questions  ,add or remove questions before the test begins.
Students can write the code once their session starts and can change their code multiple times in the given time slot.
Examiner can see the response of  all the students after the test ends for better evaluation.




### Functional Requirements :

- #### Create Exams
Examiner will have the ability to create coding exams and upload exam questions. They can also add multiple test cases for the codes, customize the mark distribution for a question and pick from a bunch of questions that are already designed by us.

- #### Administer Exams
Examiner can administer exams to students, view the responses of all students for better evaluation, change questions any number of times before the start.

- #### Grade Exams
Examiner can grade exams and view exam results. They can also view the number of students absent for the test Examiner

- #### View Exam Results
Examiner can view exam results and see how students performed on the exam.

- #### Student Dashboard
Students will be given the information of their exam through an email with their id and password. They can change their password for security purpose, start the exam once their session starts, check their code by clicking on the submit button to see if it matches all the test cases, and view all the questions once the test starts and they can start with any particular question.

- #### Examiner Dashboard
Examiner will be provided with a dashboard for students and Examiner. Dashboard will provide information using graph, score cards, key performance indicators as well as grid data presentation.



### Non Functional Requirements :

- #### Security

Registered examiner will allowed to view dashboard with  all information gathered from examination scheduled and conducted. 
Each Member will be to access system through authentication process. System will provide access to the content, operations using Role based security (Authorization) (Permissions based on Role). Using SSL in all transactions which will be performed stakeholder. It would protect confidential information shared by system. System will automatically log out of all stakeholder after some time due to inactiveness. System will block operations for inactive stakeholder and would redirect for authentication, system will have a feature that counts how many times a student has switched the tab, if it exceeds the limit set by the Examiner the student will be logged out. System will internally maintain secure communication channel between Servers ( Web Servers, App Servers, databse Server) Sensitive data will be always encrypted across communcation. User proper firewall to protect servers from outside fishing, vulnerable  attacks.

- #### Reliability
The system will backup business data on regular basis and recover in short time duration to keep system operational continuous  updates are maintained, continuous
Administration  is done to keep system operational. During peak hours system will maintain same user experience by managing load balancing .

- #### Availability
uptime:  24*7  available  90%

- #### Maintainability
A Commercial database software will be used to maintain System data Persistence. A readymade Web Server will be installed to host the Web Site to manage server capabilities. IT operations team will easily monitor and configure System using Administrative tools provided by Servers. Separate environment will be maintained for system for isolation in production, testing, and development.

- #### Portability
PDA: Portable Device Application System will provide portable User Interface ( HTML, CSS, JS) through users will be able to access the Web Site. System can be deployed to single server, to Linux, Cloud (Azure or AWS or GCP)

- #### Accessibility
Only registered members will be able to access the site and view the data after authentication. Management team can reject or approve updating, deletion requests based 
on role provided. Admin will be able to view daily, weekly, monthly dashboard.

- #### Durability
Requirements may include ensuring that the system can withstand the expected usage and traffic over time, and that the system and its components can be easily maintained or replaced as needed.

- #### Efficiency
Requirements may include ensuring that the system can perform its intended function with minimal resource usage, such as minimizing load times and ensuring fast response times for users.

- #### Modularity
Requirements may include designing the system with interchangeable components or modules, allowing for flexibility in maintenance, upgrade, and replacement of individual components, making the system more adaptable to change and less prone to failure. Additionally, it can also include designing the system to be easily extensible by adding new features, modules, or components.

- #### Scalability
Scalability is the measure of a system's ability to increase or decrease in performance and cost in response to changes in application and system processing demands.
System will be able to provide consistent user experience to stake holder as well as visitors irrespective of load.

- #### Safety
Website will be secure from malicious attack, fishing. Website portal functionalities are protected from outside with proper firewall 
configuration. Website portal will be always kept updated with latest anti-virus software. Business data will be backed up periodically to ensure safety of 
data using incremental back up strategy. Role based security will be applied for Application data and operations accessibility.
