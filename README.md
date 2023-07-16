<h6 >
	<a href="https://github.com/NicholasJWheeler">↩ Back To Nicholas Wheeler's Profile</a>
</h6>

<h1 align="center">🍅 Recipedia Website</h1><br>
<table align="center">
	<tr>
		<th>
			Directory
		</th>
	</tr>
	<tr>
		<td>
			<a href="#-about-the-class">🎓  About The Class</a><br><br>
			<a href="#%E2%84%B9-about-the-application">ℹ About The Application</a><br><br>
			<a href="#-recipedia-features">🧑‍🍳 Recipedia Features</a>
			<ul>
        <li><a href="#-user-authentication">🍓 User Authentication</a></li>
				<li><a href="#-ingredient-list-and-nosql-database">🫐 Ingredient List and NoSQL Database</a></li>
        <li><a href="#-javascript-and-firebase">🍌 JavaScript and Firebase</a></li>
				<li><a href="#-spoonacular-api">🥄 Spoonacular API</a></li>
			</ul>
			<a href="#-the-full-website">🔥 The Full Website</a><br><br>
		</td>
  	</tr>
	<tr>
		<td align="center">
			<a href="https://vscode.dev/github.com/NicholasJWheeler/Recipedia">🔍 Check out the code that made this project possible!</a>
		</td>
	</tr>
</table><br>

## 🎓 About The Class
#### CSE201 - Intro to Software Engineering
I took this during my sophomore year of college in the spring of 2021. This 15-week course covered different software development topics and explored all of the fundamental ideas of being part of a software development team and what kinds of team processes are used today. The course allowed me to work with a group of computer science students to develop any application that involved a catalog of items. Our team performed weekly check-ins with our client (the class TA) and we tracked our progress for 3 separate class presentations to display the development process.


<br><br><br>
## ℹ About The Application
Recipedia was created as the semester project for my CSE 201 class. Groups had to make any type of application as long as it involved a catalog of items, and bonus points would be granted if it utilized a database, website, or mobile application. My group liked the idea of creating a website for users to store the ingredients they currently had at home in a database, and then allow them to search for recipes they are interested in or have the website generate recipes they would likely be able to create based on their stored ingredients. As the class was divided into three development periods with presentations at the end of each, I divided the project's focus into three primary parts in the order as follows. First, the website needed to be created and a Firebase project needed to be instantiated that could be tied to the website. The first goal was to connect the website to the Firebase project and create email and password authentication as well as Google account authentication. The second phase was creating a NoSQL database using Firebase's CloudFirestore and allowing any authenticated user to add or remove ingredients to their personal collection. The final phase involved integrating the Spoonacular API into the Recipedia website and making proper calls with what ingredients a user currently had. The user would then be able to favorite generated or searched recipes to view later, in their "Favorites" list. Overall, I was the primary code developer in this project, where I wrote roughly 85% of the project's code myself and compiled all files together so they all worked in conjunction. This project strengthened my understanding of HTML5, Bootstrap, and CSS styling. In addition, I was able to teach myself JavaScript and how to manage a Firebase project integrated into a website, to manage web hosting and database connectivity. I enjoyed creating this project and working with fellow developers in a collaborative environment, and the final grade awarded for this project was 112% due to fulfilling all requirements and completing bonus objectives like website and database connectivity.

<br><br><br>
## 🧑‍🍳 Recipedia Features
### 🍓 User Authentication
To make this project more akin to a web application, I decided to implement user authentication as I believed it is a necessary skill to know for future web development, and utilizing Firebase for web hosting makes this process quite easy. I wanted to allow users the ability to log in using an Email + Password combination, or through an already-created Google account. Since Firebase is managed by Google, creating authentication using a Google account was automated through the use of a Firebase SDK and some JavaScript promises. The screenshots below detail what the user sees when logging in, along with a potential error message they could be met with when using the wrong email or password. If the user has not used Recipedia before, they can create an account by filling out the form fields and clicking "Sign Up" to register an email and password.<br><br>

![](https://github.com/NicholasJWheeler/Recipedia/blob/main/Images/UserAuthentication1.png?raw=true)
<br><br>

![](https://github.com/NicholasJWheeler/Recipedia/blob/main/Images/UserAuthentication2.png?raw=true)
<br><br>

### 🫐 Ingredient List and NoSQL Database
In order for our application to fulfill the requirement of being a catalog, we had to incorporate the ability to store and recall items for users. We accomplished this goal by including the list of ingredients for people to add or subtract amounts from, which was managed by Firebase's Cloud Firestore database on the backend. This database was initialized along with the Recipedia Firebase project and was a NoSQL database so all items were associated with a unique "User ID" that is created with each new authorized account. The following screenshots display the ingredient list as well as an example of what the backend database stores to manage ingredient counts for each user. 
<br><br>

![](https://github.com/NicholasJWheeler/Recipedia/blob/main/Images/Database1.png?raw=true)
<br><br>

![](https://github.com/NicholasJWheeler/Recipedia/blob/main/Images/Database2.png?raw=true)
<br><br>

### 🍌 JavaScript and Firebase
When starting this project, I had no knowledge about hosting websites besides ones that are run on dedicated servers such as the Linux server at Miami University. A friend suggested that I look into Google's web hosting service called Firebase because it would also allow the Recipedia project to include a database and mobile application if needed in the future. I taught myself JavaScript and read the Firebase documentation and eventually got the Recipedia website running with its own URL. I learned that Firebase is an extremely flexible platform to build web applications on as it has many built-in SDKs and functions to jump-start the creation process, such as making user authentication a breeze. The following screenshots detail the backend of Firebase detailing statistics about the Recipedia project, as well as the code that connects the website to Firebase in JavaScript with one of the user authentication functions.
<br><br>

![](https://github.com/NicholasJWheeler/Recipedia/blob/main/Images/Firebase1.png?raw=true)
<br><br>

![](https://github.com/NicholasJWheeler/Recipedia/blob/main/Images/Firebase2.png?raw=true)
<br><br>

### 🥄 Spoonacular API
<b>API Used:</b>
<ul>
	<li><a href="https://spoonacular.com/food-api" target="_blank">Spoonacular's Food API</a></li>
</ul>
This project was the first time I worked with APIs, and I was surprised at how easy they were to use when integrating JavaScript into a website. The Spoonacular API is essentially a huge database of meals with extensive documentation on the ingredients and dietary contents of each dish. I realized that once we had our user's ingredients, we needed to be able to suggest likely dishes that they could make with their ingredients, so Spoonacular provided the perfect solution to our problem. <br><br>

On the Recipedia website, authenticated users can interact with the API through the "Search" page. Users will have either the option to search for a recipe by typing ingredients or names into the search bar or have a recipe recommended to them with the "Generate" button. The suggested recipe is based on the most abundant ingredient within the user's stored ingredients. The following screenshot displays an example of a returned recipe when typing "mango" into the search bar.<br><br>

![](https://github.com/NicholasJWheeler/Recipedia/blob/main/Images/Spoonacular1.png?raw=true)
<br><br>

Whenever the "Search" or "Generate" buttons are pressed, they will take their keywords either from the search bar or most abundant ingredient and send a GET request to the API and receive a JSON back. JavaScript is used to parse the JSON response and then HTML is applied to format the response into a small repeatable section that a user can click on to learn more about each recipe on the Spoonacular website. Users can also select the "Favorite" button to add a specific recipe to their favorites list for future reference. A user can remove any recipe from this list in the "Favorite Recipies" section by clicking on the respective red "Remove" button. The following screenshots display an example favorites list of recipes, as well as what type of content is being stored in the database to keep track of each user's favorite recipes.<br><br>

![](https://github.com/NicholasJWheeler/Recipedia/blob/main/Images/Spoonacular2.png?raw=true)
<br><br>

![](https://github.com/NicholasJWheeler/Recipedia/blob/main/Images/Spoonacular3.png?raw=true)
<br><br>

<br><br><br><br>

- - - -

<br>

<h3 align="center">
  🍳 You are ready to start cooking! 🍳
</h3>

<br>

- - - -


<br><br><br><br>

## 🔥 The Full Website

<p align="center">
	<img src="https://github.com/NicholasJWheeler/Recipedia/blob/main/Images/Final1.png?raw=true">
	<br><br>
	<img src="https://github.com/NicholasJWheeler/Recipedia/blob/main/Images/Final2.png?raw=true">
	<br><br>
	<img src="https://github.com/NicholasJWheeler/Recipedia/blob/main/Images/Final3.png?raw=true">
	<br><br>
	<img src="https://github.com/NicholasJWheeler/Recipedia/blob/main/Images/Final4.png?raw=true">
  <br><br>
  <img src="https://github.com/NicholasJWheeler/Recipedia/blob/main/Images/Final5.png?raw=true">
</p>

<br><br><br>

- - - -
<h6 align="center">
	<a align="center" href="#-back-to-nicholas-wheelers-profile">⬆ Back To The Top </a>
</h6>

- - - -

<h6 align="center">
	<a href="https://github.com/NicholasJWheeler">↩ Back To Nicholas Wheeler's Profile</a>
</h6>

- - - -

<h6 align="center">
  Copyright © Nicholas Wheeler 2023
</h6>

