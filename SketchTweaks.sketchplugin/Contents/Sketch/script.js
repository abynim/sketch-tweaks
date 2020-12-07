var go = function(context) {

  const osString = NSProcessInfo.processInfo().operatingSystemVersionString();
  const osVersion = parseFloat(osString.componentsSeparatedByString(" ")[1]);
  const sketchVersion = parseFloat(NSBundle.mainBundle().objectForInfoDictionaryKey("CFBundleShortVersionString"));
  if(!osVersion || osVersion < 10.15 || !sketchVersion || sketchVersion < 70.0) {
    const message = "Tweaks is only supported on macOS 10.15 (Catalina) with Sketch 70 or above.";
    context.document ? context.document.showMessage(message) : console.log(message);
    return;
  }

  try { Propane.go(context); }
  catch(e) {
      if(Mocha.sharedRuntime().loadFrameworkWithName_inDirectory('Propane', NSBundle.bundleWithURL(context.plugin.url()).resourceURL().path())) {
          Propane.go(context);
      }
  }
}
