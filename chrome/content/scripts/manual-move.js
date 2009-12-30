var ManualJunkAction = {};

ManualJunkAction.inCycle = false;

// add this folder listener to every server's junk folder
ManualJunkAction.folderListener = {
	OnItemAdded: function(parentItem, item) {},
	OnItemRemoved: function(parentItem, item) {},
	OnItemPropertyChanged: function(item, property, oldValue, newValue) {},
	OnItemIntPropertyChanged: function(item, property, oldValue, newValue) {},
	OnItemBoolPropertyChanged: function(item, property, oldValue, newValue) {},
	OnItemUnicharPropertyChanged: function(item, property, oldValue, newValue){},
	OnItemPropertyFlagChanged: function(item, property, oldFlag, newFlag) {
		if (ManualJunkAction.inCycle) {
			ManualJunkAction.inCycle = false;
			ManualJunkAction.move();
		}
	},
	OnItemEvent: function(folder, event) {
		if (event.toString() == 'JunkStatusChanged') {
			ManualJunkAction.inCycle = true;
		}
	}
};

// AddFolderListener when mail window loads
ManualJunkAction.onLoad = function() {
    	var sess = Components.classes["@mozilla.org/messenger/services/session;1"].getService(Components.interfaces.nsIMsgMailSession);
	var flags = Components.interfaces.nsIFolderListener.all; 
	sess.AddFolderListener(ManualJunkAction.folderListener, flags);
};

// RemoveFolderListener when mail window unloads
ManualJunkAction.onUnload = function() {
    	var sess = Components.classes["@mozilla.org/messenger/services/session;1"].getService(Components.interfaces.nsIMsgMailSession);
	sess.RemoveFolderListener(ManualJunkAction.folderListener);
};

ManualJunkAction.move = function() {
	// get current selected messages
	var uris = gFolderDisplay.selectedMessageUris;
	for each (var uri in uris) {
		var hdr = messenger.msgHdrFromURI(uri);
		var origin = hdr.getStringProperty("junkscoreorigin");
		if (origin != "user") continue;

		var score = hdr.getStringProperty("junkscore");
		var isJunk = ((score != "") && (score != "0"));
		if (!isJunk) continue;

		var sKey = hdr.folder.server.key;

		// look up preference for server's manual folder
		var prefs = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch);

		// default actions enabled for manually marking
		var prefKey = "mail.spam.manualMark";
		var useDefault = prefs.getBoolPref(prefKey);

		// stop if the default is on... can't control how it
		// does message moving
		if (useDefault)
			return;

		// account-specific actions enabled for manually marking
		prefKey = "mail.server." + sKey + ".manualMark";
		var useAccountFolder = prefs.getBoolPref(prefKey);

		if (useAccountFolder) {
			// folder to move to if enabled
			prefKey = "mail.server."+sKey+".manualSpamActionTargetFolder";
			var manualFolderURI = prefs.getCharPref(prefKey);

			MsgMoveMessage(GetMsgFolderFromUri(manualFolderURI));
		}
	}
}

window.addEventListener("load", ManualJunkAction.onLoad, false);
window.addEventListener("unload", ManualJunkAction.onUnload, false);
