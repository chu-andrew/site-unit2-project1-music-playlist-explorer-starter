
## Unit 2 Assignment: Music Playlist Explorer

Submitted by: Andrew Chu 

Estimated time spent: **19** hours spent in total

### Application Features

#### CORE FEATURES

- [x] **Display Playlists**
  - [x] Dynamically render playlists on the homepage using JavaScript.
  - [x] Fetch data from a provided JSON file and use it to create interactive playlist tiles.
  - [x] Each title should display the playlist's cover image, name, creator, and like count.

- [x] **Playlist Details**
  - [x] Create a modal view that displays detailed information about a playlist when a user clicks on a playlist tile.
  - [x] The modal should show the playlist's cover image, name, creator, and a list of songs, including their titles, artists, and durations.

- [x] **Like Playlists**
  - [x] Implement functionality to allow users to like playlists by clicking a heart icon on each playlist tile.
  - [x] Update the like count on the playlist tile when a playlist is liked or unliked.

- [x] **Shuffle Songs**
  - [x] Enable users to shuffle the songs within a playlist using a shuffle button in the playlist detail modal.
  - [x] Rearrange the songs in the modal view when the shuffle button is clicked.

#### STRETCH FEATURES

- [X] **Add New Playlists**
  - [X] Allow users to create new playlists.
  - [X] Users can input playlist name, creator, and add multiple songs with details like title, artist, and duration.

- [X] **Edit Existing Playlists**
  - [X] Enable users to modify the details of existing playlists.
  - [X] Add an edit button to each playlist tile.
  - [X] Users can update the name, creator, and songs of the playlist.

- [x] **Delete Playlists**
  - [x] Add a delete button to each playlist tile.
  - [x] When clicked, the playlist is removed from the display and data model.

- [x] **Search Functionality**
  - [x] Implement a search bar that allows users to filter playlists by name or creator.

- [x] **Sorting Options**
  - [x] Implement a dropdown or button options that allow users to sort the playlist by name, number of likes, or date added.

### Walkthrough Video

`TODO://` Add the embedded URL code to your animated app walkthrough below, `ADD_EMBEDDED_CODE_HERE`. Make sure the video actually renders and is playable when viewing this README. (🚫 Remove this paragraph after adding walkthrough video)

`ADD_EMBEDDED_CODE_HERE`

### Reflection

* Did the topics discussed in your labs prepare you to complete the assignment? Be specific, which features in your weekly assignment did you feel unprepared to complete?

The topics discussed in the labs generally prepared me to complete the assignment, especially the design of HTML+CSS elements and the use of JavaScript to add interactivity. However, one of the features I had to research further before implementing was the dynamic creation of elements (e.g. playlist cards/modals) based on data from a JSON file. I eventually went with an approach the intermixed JavaScript with some HTML in order to dynamically generate elements with the given data, which helped me see the motivation for libraries such as React.

* If you had more time, what would you have done differently? Would you have added additional features? Changed the way your project responded to a particular event, etc.
  
I would have prioritized cleaner code and frontend design if I had more time. Although I was able to implement the core and stretch features, I felt that the limited time meant that these features came at the cost of clean code and detailed fronted design. Also, since this was my first time working with vanilla JS + HTML + CSS, I wasn't quite sure of the best practices, and so I ended up writing messy code.

One of the biggest challenges I faced this week was prioritizing important tasks and planning ahead during the development process. In retrospect, I should have read through the design requirements more carefully so that I would not have to make excessive design changes during the execution process. Also, I learned the importance of prioritizing features ahead of styling changes--- I realized in the middle of the week that I had shifted too much time to the HTML+CSS design (our first task), instead of implementing all of the core+stretch features before going back and tweaking the styling. I'll be going into next week's project and also the capstone project with a strong focus on the planning stages and being more cognizant of which areas to prioritize spending my development time.

* Reflect on your project demo, what went well? Were there things that maybe didn't go as planned? Did you notice something that your peer did that you would like to try next time?

I enjoyed both presenting my project and seeing other interns' approach to the project. I saw many UI elements that were much more polished than my versions, and I would like to bring that same level of detailing to my future projects. Also, I noticed that some other projects tended to utilize a higher degree of JavaScript functionality (e.g. filter, map instead of looping) in comparison to my project. I think familiarity with JS will come with time and practice using these functions for projects.

### Open-source libraries used

No open-source libraries used. 
Font Awesome free icon library used for like, delete, and edit icons on playlist cards.

### Shout out

Give a shout out to somebody from your cohort that especially helped you during your project. This can be a fellow peer, instructor, TA, mentor, etc.

German and George were helpful in the debugging process of some CSS quirks, like the scrolling modals and centered playlist cards.
