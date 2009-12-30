var MJA = {};

MJA.init = function() {
    var manualActionTargetFolder = document.getElementById('server.manualSpamActionTargetFolder').value;
    var am = Components.classes["@mozilla.org/messenger/account-manager;1"]
                       .getService(Components.interfaces.nsIMsgAccountManager);
    if (!manualActionTargetFolder) {
        manualActionTargetFolder = am.localFoldersServer.serverURI + "/Junk";
        document.getElementById('server.manualSpamActionTargetFolder').value = manualActionTargetFolder;
    }

    try {
        var folder = GetMsgFolderFromUri(manualActionTargetFolder);
        var longFolderName = document.getElementById("bundle_messenger")
                                .getFormattedString("verboseFolderFormat",
                                [folder.prettyName, folder.server.prettyName]);
        document.getElementById("manualActionTargetFolder")
            .setAttribute("label", longFolderName);
    } catch (e) {  // OK for folder to not exist
    }

    MJA.updateManualMarkMode(document.getElementById('server.manualMark').checked);
};

MJA.updateManualMarkMode = function(aEnable) {
    if (aEnable) {
        document.getElementById('broadcaster_manualMoveMode').setAttribute('disabled', false);
    } else {
        document.getElementById('broadcaster_manualMoveMode').setAttribute('disabled', true);
    }
    var prefs = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch);
    var defaultOn = prefs.getBoolPref("mail.spam.manualMark");
    document.getElementById('mjaWarning').setAttribute('hidden', (aEnable && defaultOn) ? "false" : "true");
};

MJA.load = function() {
    MJA.init();
    window.addEventListener("unload", MJA.unload, false);
};

MJA.unload = function() {
    window.removeEventListener("load", MJA.load);
    window.removeEventListener("unload", MJA.unload);
};

window.addEventListener("load", MJA.load, false);
