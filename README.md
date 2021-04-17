# NEXT Level -- A Complete Website. 
## Server Section

Live Api Link: https://nextlevel1.herokuapp.com/

### List of All EndPoints and purposes

Api Endpoint | Purpose
------------ | -------------
 /| Testing the server
/addAdmin | An Admin Can Add Another Admin
/addCourse | Ad Admin Can Add new course
/allCourses| All Courses in database
/course/:id|Course details of specific course
/addStudent| New Student enrolled course
/enrolledCourses| Course list of specific student
/addReview | Add Review by Student
/review | All Reviews
/deleteCourse/:id| Admin can delete course
/allStudents | Admin can check all students
/updateStatus | Admin can change status of a student
/isAdmin | check admin or not

### Dependencies
#### `body-parser` `cors` `dotenv` `express` `express-fileupload` `mongodb` `nodemon`

### For run this code in Local
1. Clone this repository using `git clone`
2. Hit `npm install` for installing dependencies. 
3. Create a mongodb account and create a database and collections. 
4. Create a `.env` file. Save your mongodb credential.
5. Run index.js. 
6. Enjoy