# 0.1.1 (29-10-2023)
---

Spaghetti code Highlights

- Regenerate button now correctly updates the message tree, current node, and "works" at every iteration. 
- MessageNode is now reactive, temporarily I'm using an observer pattern and when the message array changes in the pattern I update the MessageNode parent, causing a re-render. 
This is dirty, but momentarily works and allows to display the features we're interesting in delivering.
- Fixed the colors of the message blocks being wrong after redirection

