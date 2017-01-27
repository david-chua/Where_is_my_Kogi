# Where_is_my_Kogi

The technologies used for this project was javascript, html/css, node.js, mongo.
For the project, I first created the server file which would act as the mainframe that connects all my other files. I didn't create a seeds file because through my use of having a user add their information, my users were then saved into the database that I connected in mongo. From there, my approach was to complete a working users page before tackling the second model, which was restaurants.

I created two models for the project: users and restaurants. In terms of the ERD for the models. Since there's only two so far, it is fairly simple.

ERD:

User: {
  name: String,
  username: String,
  email: String,
  password_digest: String,
  restaurants: {
    name: String,
    phone: String,
    address: String,
    city: String,
    state: String,
    zip: Number,
    mfhours: String,
    sathours: String,
    sunhours: String,
    most_popular: String,
    favorite_dish: String
  },
  created_at: Date,
  updated_at: Date
}

Each user will have their name, username, email, and password, and a collection of restaurants that they've been at.

As for my wireframes. I wanted to keep it simple. Just have the basic routing to work before I design my application.

![Wireframe](/public/css/images/thumbnail_WireFrame_Page.png)
