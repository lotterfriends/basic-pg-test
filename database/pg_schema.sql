CREATE TABLE IF NOT EXISTS petstore_ApiResponse (
  code INT DEFAULT NULL,
  type TEXT DEFAULT NULL,
  message TEXT DEFAULT NULL
);
CREATE TABLE IF NOT EXISTS petstore_Category (
  id SERIAL PRIMARY KEY,
  name TEXT DEFAULT NULL
);
CREATE TABLE IF NOT EXISTS petstore_inline_object (
  name TEXT DEFAULT NULL ,
  status TEXT DEFAULT NULL 
);
CREATE TABLE IF NOT EXISTS petstore_inline_object_1 (
  additionalMetadata TEXT DEFAULT NULL ,
  file BYTEA DEFAULT NULL 
);
CREATE TABLE IF NOT EXISTS petstore_Order (
  id SERIAL PRIMARY KEY,
  petId BIGINT DEFAULT NULL REFERENCES petstore_pet(id),
  quantity INT DEFAULT NULL,
  shipDate TIMESTAMP DEFAULT NULL,
  status ENUM('placed', 'approved', 'delivered')  ,
  complete BOOLEAN DEFAULT false
);
CREATE TABLE IF NOT EXISTS petstore_Pet (
  id SERIAL PRIMARY KEY,
  category TEXT DEFAULT NULL,
  name TEXT NOT NULL,
  photoUrls JSON NOT NULL,
  tags JSON DEFAULT NULL,
  status ENUM('available', 'pending', 'sold')  
);
CREATE TABLE IF NOT EXISTS petstore_Tag (
  id SERIAL PRIMARY KEY,
  name TEXT DEFAULT NULL
);
CREATE TABLE IF NOT EXISTS petstore_User (
  id SERIAL PRIMARY KEY,
  username TEXT DEFAULT NULL,
  firstName TEXT DEFAULT NULL,
  lastName TEXT DEFAULT NULL,
  email TEXT DEFAULT NULL,
  password TEXT DEFAULT NULL,
  phone TEXT DEFAULT NULL,
  userStatus INT DEFAULT NULL 
);
