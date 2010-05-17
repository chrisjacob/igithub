#### iGitHub
iGitHub is all about READING GitHub repository source code on you iPhone & iPod Touch. 

It is not concerned with commits, networks, watching, forks, etc... Just navigating your projects folders and viewing your files... *fast and simple!*

#### Staging URL
http://igithub.heroku.com/

#### Tech
* Rails 2.3.5
* jQTouch 1.0 beta 2 release 109
* jQuery 1.3.2

#### Todo
* Start by watching http://railscasts.com/episodes/199-mobile-devices
* Get basic JQTouch Demo app up and running.
* Change to the 'Apple' jQTouch theme.
* Modify jQTouch Demo app markup to provide a proof-of-concept for what the real app will feel like.
* Install gem http://github.com/fcoury/octopi/ - Octopi is a Ruby interface to GitHub API v2 (http://develop.github.com).'
* Setup igithub-demo repository on GitHub to test against. Add folders/files.
* Get the Root tree structure for chrisjacob/igithub-demo (using Commit API + Object API).
* Convert Root tree structure to jQTouch list markup.
* Navigate up/down Repo tree in jQTouch.
* Open RAW repository blob files in jQTouch view (Object API).

#### Ideas iPhone/iPod Touch
* Folder Navigation: Portrait View = Slide/Pop navigation. Landscape = Nested tree.
* File Viewing: Portrait View = Slide/Pop navigation. Landscape = Fullscreen.
* File Viewing: "Syntax Highlighting" button to toggle on/off - use Ultraviolet (http://ultraviolet.rubyforge.org/), Railscast: http://railscasts.com/episodes/207-syntax-highlighting
* File/Folder Viewing: "Show in GitHub" button that toggles between igithub and github.
* History: Click 'Title' to bring up history of: files | folders | users | all <- filters.

#### Ideas iPad
* Similar UI to an IDE (such as Textmate). Folder tree navigation down left side. Tabbed content area to display code.