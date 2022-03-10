User Onboarding

1. Signup - 
   a. register a user in database by getting name, mobileNumber (Unique), emailId (Unique) and password (Should be encrypted using bcrypt)
   b. validate whether entered mobile number or email id already exists in db if not create the user otherwise throw error response
   c. before storing password, encrypt it using bcrypt npm package
   d. after inserting data in db, create a jwt token and send it in response.
   
2. Login -
   a. Get emailId and passoword as input data
   b. validate if email id exists, if not the throw error response
   c. check if entered password matches to that present in db if not throw error response
   d. Generate jwt token if emailid and password match and send response
