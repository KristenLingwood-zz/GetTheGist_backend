DROP DATABASE IF EXISTS "getthegist";
CREATE DATABASE "getthegist";
\c "getthegist"
CREATE TABLE gists (
  id SERIAL PRIMARY KEY,
  filename TEXT NOT NULL,
  description TEXT,
  extension TEXT NOT NULL,
  content TEXT NOT NULL
);
INSERT INTO gists (filename, description, extension, content) values ('firstgist.md', 'initial gist', 'md', 'this is my very first gist!'),
('punny.js', 'pun generator', 'js', 'console.log("you are so punny")'),
('answer.js', 'answer alerts', 'js', 'window.alert("Ehhh close enough, you get the gist of it")')
