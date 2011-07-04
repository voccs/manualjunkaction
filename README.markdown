ManualJunkAction
================

This is a Thunderbird add-on for opening up configuration of what happens
when a user manually marks a message as junk.  By default, the message is
moved to the designated Junk folder for the account, the same place mail
detected by Thunderbird to be junk goes.  If you don't want them in the
same folder, now you can differentiate between them.

You should acquire it from [addons.mozilla.org][1].  Thanks to the hard
work and commitment of folks at [BabelZilla][2], the add-on is available
in a few different localizations.

Development
-----------

This is a Make based project.  There are two main targets, one builds the
XPI appropriate for deployment (`all`), the other builds an XPI for
translation for upload to BabelZilla (`babelzilla`), which includes strings
that are used in the `install.rdf` and addons.mozilla.org and consequently
sit outside the normal flow of translation.

[1]: https://addons.mozilla.org/thunderbird/addon/manualjunkaction/
[2]: http://www.babelzilla.org/
