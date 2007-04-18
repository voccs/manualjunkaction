var MJA = {};

MJA.init = function(aPageId, aServerId) {
	var manualActionTargetFolder = document.getElementById('server.manualSpamActionTargetFolder').value;
	if (!manualActionTargetFolder) {
		manualActionTargetFolder = parent.accountManager.localFoldersServer.serverURI + "/Junk";
		document.getElementById('server.manualSpamActionTargetFolder').value = manualActionTargetFolder;
	}
	SetFolderPicker(manualActionTargetFolder, 'actionTargetFolder2');
};

MJA.updateManualMarkMode = function(aEnable) {
	if (aEnable)
		document.getElementById('broadcaster_manualMoveMode').removeAttribute('disabled');
	else
		document.getElementById('broadcaster_manualMoveMode').setAttribute('disabled', "true");    
	var prefs = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch);
	var defaultOn = prefs.getBoolPref("mail.spam.manualMark");
	if (defaultOn)
		document.getElementById('mjaWarning').setAttribute('hidden', aEnable ? "true" : "false");
};

// replace the existing onInit with mine
function onInit(aPageId, aServerId) {
	// manually adjust several pref UI elements
	document.getElementById('spamLevel').checked = document.getElementById('server.spamLevel').value > 0;
    
	var spamActionTargetAccount = document.getElementById('server.spamActionTargetAccount').value;
	if (!spamActionTargetAccount) {
		var server = GetMsgFolderFromUri(aServerId, false).server;
		if (server.canCreateFoldersOnServer && server.canSearchMessages)
			spamActionTargetAccount = parent.pendingServerId;
		else
			spamActionTargetAccount = parent.accountManager.localFoldersServer.serverURI;
		document.getElementById('server.spamActionTargetAccount').value = spamActionTargetAccount;
	}
	SetFolderPicker(spamActionTargetAccount, 'actionTargetAccount');
	var spamActionTargetFolder = document.getElementById('server.spamActionTargetFolder').value;
	if (!spamActionTargetFolder) {
		spamActionTargetFolder = parent.accountManager.localFoldersServer.serverURI + "/Junk";
		document.getElementById('server.spamActionTargetFolder').value = spamActionTargetFolder;
	}
	SetFolderPicker(spamActionTargetFolder, 'actionTargetFolder');
  
	// set up the whitelist UI
	document.getElementById("whiteListAbURI").value = document.getElementById("server.whiteListAbURI").value;

	// set up trusted IP headers
	var serverFilterList = document.getElementById("useServerFilterList");
	serverFilterList.value = document.getElementById("server.serverFilterName").value;
	if (!serverFilterList.selectedItem)
		serverFilterList.selectedIndex = 0;

	updateMoveTargetMode(document.getElementById('server.moveOnSpam').checked);
	MJA.init(aPageId, aServerId);
	MJA.updateManualMarkMode(document.getElementById('server.manualMark').checked);
}
