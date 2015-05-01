######## START HERE ########
# To start, any line that starts with a `#`
# is automatically ignored. A `#` anywhere
# else is just treated like a regular `#`.
#
# Use markdown syntax to style your stories:
# <http://daringfireball.net/projects/markdown/syntax>

$1: This is your start screen
Use a dollar sign `$` followed by some text
(without spaces or symbols) and then a colon.
The text after that colon is the title of that
screen. The text you're reading right now is
the content of that screen.

The start screen is always named `$1` or `$START`

When you're writing your story, you should tell
your user what they can enter to continue onto
the next screen. For example, on this screen,
you can enter "continue" to go to the next screen.

# You specify valid screens the user can go to
# using an arrow `->` followed by the ID of the
# screen the user can go to.
# You can specify alternate screens the user can
# go to using a slash. Think of it as typing
# "or" - that is, this/that
# A user can enter the ID `2` or `continue` to
# go to the next screen.
->$2/continue

$2: This is the second screen
This screen has lots of content.

You can enter "run", "jog" or "walk" to continue.
->$run/jog
->$walk

$run: Run! Ruuunnn!!!
Look behind you! Or don't! Just run away!!!

This screen doesn't go anywhere, so it automatically
ends the story.

$walk: Man...you're slow.
Run faster! Type "run" to start running. Type "walk"
to continue walking...

->$walk
->$run
