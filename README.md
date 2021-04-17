# NEXT Level -- A Complete Website. 
##

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