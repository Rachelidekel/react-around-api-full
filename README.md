# react-around-api-full

# Intro

It's an interactive React application, called 'Around The U.S.' where users can add, remove and like image cards. The front-end is connected to a self-built API server that handles these functionalities, as well as user registration and authorization handled by the back-end server.

The project is hoset on google could.

# Project description

- Users can create an account and post their images on the page, which functions as a photo wall shared with other users.
- The page consists of image cards which are rendered from an API server. User info and card data is stored in a MongoDB database.
- A token is saved in the user's localStorage, so signed in users can access the homepage directly without having to login again.
- New cards can be added by submitting a popup form that requires a title and an image URL as inputs. When the user clicks on the card, a modal window with full size image and image caption will open.
- Each card has a like button and a like counter that keeps track of the number of likes. Cards can also be unliked.
- Only cards that were added by the user itself can be deleted. A bin icon is displayed on these cards; clicking on this icon will open a modal window to confirm if the user wants to delete the card.
- The user can change profile information (profile image, name and description) by
  submitting the edit form.
- The project: backend and froned was deployed on a google cloud.

## Used technologies

The project is created with:

- HTML
- CSS
- JavaScript (ES6)
- React
- Node.js
- MongoDB
- Express

## links

- a link to repository with the complete React application which uses this API:
  [GitHub repository](https://github.com/Rachelidekel/react-around-api-full.git)

- a link to the website that hosts your API:
  [View live project](https://racheli-domain.students.nomoredomainssbs.ru/)

## Screenshots

Login and register screen

![Login form](https://user-images.githubusercontent.com/98940522/193232143-04b6a51f-414f-4c7d-8227-7d879b35471f.png)

Main page with image gallery

![Main page](https://user-images.githubusercontent.com/98940522/193230968-0016571a-1972-4082-af10-587005224b76.png)


Popup form to add image

![Add card form](https://user-images.githubusercontent.com/98940522/193231694-9020598b-700b-4017-9c82-2ed73647c78d.png)

Image popup

![Popup image](https://user-images.githubusercontent.com/98940522/193231375-58312ec1-1723-4319-abae-8edad54c49cd.png)

