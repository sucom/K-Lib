/* ===========================================================================
 * K-Lib is the collection of javascript functions which simplifies
 * the interfaces for commonly-used methods, and makes the coding simple
 *
 * Author: Kumararaja <sucom.kumar@gmail.com>
 *
 * Dependency: (hard)
 * 1. jQuery: http://jquery.com/
 * 2. underscore: http://underscorejs.org/
 * Optional
 * {backbone}     : http://backbonejs.org/
 * {thorax}       : http://thoraxjs.org/ || https://github.com/walmartlabs/thorax
 *
 * {handlebars}   : http://handlebarsjs.com/ || https://github.com/wycats/handlebars.js/
 * {mustache}     : http://mustache.github.io/ || https://github.com/janl/mustache.js
 * {jquery-tmpl}  : https://github.com/BorisMoore/jquery-tmpl
 * {jsrender}     : http://www.jsviews.com/#jsrender || https://github.com/BorisMoore/jsrender
 * {dust}         : http://akdubya.github.io/dustjs/ || https://github.com/akdubya/dustjs
 * {hogan}        : http://twitter.github.io/hogan.js/ || https://github.com/twitter/hogan.js
 * {transparency} : http://leonidas.github.io/transparency/ || https://github.com/leonidas/transparency
 * {weld}         : https://github.com/tmpvar/weld
 * {doT}          : http://olado.github.io/doT/index.html || https://github.com/olado/doT
 * {tjs}          : https://github.com/jasonmoo/t.js
 *
 * THIS CODE LICENSE: The MIT License (MIT)

 Copyright (c) 2003 <Kumararaja: sucom.kumar@gmail.com>

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NON-INFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.

 * ===========================================================================
 */

/* Avoid 'console' errors in browsers that lack a console.*/
(function() {
  var method;
  var noop = function(){};
  var methods = [
      'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
      'exception', 'groupX', 'groupCollapsed', 'groupEndX', 'info', 'log',
      'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
      'timeStamp', 'trace', 'warn'
  ];
  var length = methods.length;
  var console = (window.console = window.console || {});
  while (length--) {
    method = methods[length];
    //Only stub undefined methods.
    if (!console[method]) {
        console[method] = noop;
    };
  };
}());

/* K-Lib begins */
(function() {

  /* Establish the win object, `window` in the browser */
  var win = this;
  var doc = win.document;
  var loc = win.document.location;

  /* Save the previous value of the `klib` variable. */
  var myklib = win.klib;

  /* Create a safe reference to the klib object for use below. */
  var klib = function(obj) {
    if (obj instanceof klib) return obj;
    if (!(this instanceof klib)) return new klib(obj);
  };

  /* Expose klib to window */
  win.klib = klib;

  /* Current version. */
  klib.VERSION = '1.0.0';

  /* isIE or isNonIE */
  var isById   = (document.getElementById);
  var isByName = (document.all);

  klib.isIE    = (this.document.all)? true : false;
  klib.isNonIE = (document.getElementById&&!document.all)? true : false;

  /* IE does not support console when developer tool is off; also does not support group & groupEnd methods */
  klib.consoleGrpIndent = 0;
  function consoleGrpB(gName) {
    klib.consoleGrpIndent++;
    console.log(gName.pad(klib.consoleGrpIndent,">>",2));
  };
  function consoleGrpE(gName) {
    console.log(gName.pad(klib.consoleGrpIndent,"<<",2));
    klib.consoleGrpIndent--;
  };
  if (!console['group']) console['group'] = consoleGrpB;
  if (!console['groupEnd']) console['groupEnd'] = consoleGrpE;

  /* ********************************************************* */
  /*NEW String Methods trim, normalize, beginsWith, endsWith
   var str                    = " I am a      string ";

   str.trim()                 = "I am a      string";
   str.isBlank()           = false;
   str.isNumber()             = false;
   str.normalize()            = "I am a string";
   str.beginsWith("I am")     = "true";
   str.beginsWith("i am")     = "false";
   str.beginsWith("i am","i") = "true"; // case insensitive
   str.endsWith("ing")        = "true";
   str.endsWith("iNg")        = "false";
   str.endsWith("InG","i")    = "true"; // case insensitive
   ("     ").ifBlank(str)     = " I am a      string ";
   ("     ").ifBlank()        = "";
   (str).ifBlank()            = "I am a      string";
   */
  if ( !(new String).trim ){
    String.prototype.trim = function() {return (this.replace(/^\s+|\s+$/g,''));};
  };
  if ( !(new String).isBlank ){
    String.prototype.isBlank = function() {return (this.trim()=="");};
  };
  if ( !(new String).ifBlank ){
    String.prototype.ifBlank = function(forNullStr) {
      forNullStr = forNullStr || "";
      return (this.isBlank()? ((""+forNullStr).trim()) : (this.trim()));
    };
  };
  if ( !(new String).isNumber ){
    String.prototype.isNumber = function() { return ((((""+this).replace(/[0-9.]/g, "")).trim()).length==0); };
  };
  if ( !(new String).normalize && (new String).trim ){
    String.prototype.normalize = String.prototype.normalise = function() {return (this).trim().replace(/\s+/g,' ');};
  };
  if ( !(new String).beginsWith ){
    String.prototype.beginsWith = function(str,i){i=(i)?'i':'';var re=new RegExp('^'+str,i);return ((this).normalize().match(re)) ? true : false ;};
  };
  if ( !(new String).endsWith ){
    String.prototype.endsWith = function(str,i){i=(i)?'gi':'g';var re=new RegExp(str+'$',i);return ((this).normalize().match(re)) ? true : false ;};
  };
  if ( !(new String).equals ){
    String.prototype.equals = function(arg) {return (this==arg);};
  };
  if ( !(new String).equalsIgnoreCase ){
    String.prototype.equalsIgnoreCase = function(arg) {return ((new String(this.toLowerCase())==(new String(arg)).toLowerCase()));};
  };
  if ( !(new String).toProperCase ){
    String.prototype.toProperCase = function(normalize) { return ((this).normalize().toLowerCase().replace(/^(.)|\s(.)/g, function($1) {return $1.toUpperCase();})); };
  };
  if ( !(new String).toJSON ){
    String.prototype.toJSON = function() {
      return ( this.isBlank()? null : (eval("("+this+")")) );
    };
  };
  if ( !(new String).toBoolean ){
    String.prototype.toBoolean = function() {
      var retValue = true;
      switch ((""+this).trim().toLowerCase())
      { case          "":
        case         "0":
        case        "-0":
        case       "NaN":
        case      "null":
        case     "false":
        case "undefined": retValue = false; break;
      };
      return ( retValue );
    };
  };

  if (!(new Boolean).toValue) {
    Boolean.prototype.toValue = function(tValue, fValue) {
      if (typeof tValue == "undefined") tValue = true;
      if (typeof fValue == "undefined") fValue = false;
      return ((this.valueOf())? (tValue) : (fValue));
    };
  };
  if (!(new Boolean).toHtml) {
    Boolean.prototype.toHtml = function(tElId, fElId) {
      return $((this.valueOf())? tElId : fElId).html();
    };
  };

  /*
   * String.pad(length: Integer, [padString: String = " "], [type: Integer = 0]): String
   * Returns: the string with a padString padded on the left, right or both sides.
   * length: amount of characters that the string must have
   * padString: string that will be concatenated
   * type: specifies the side where the concatenation will happen, where: 0 = left, 1 = right and 2 = both sides
   */
  if ( !(new String).pad )
  { String.prototype.pad = function(l, s, t){
    for(var ps="",i=0; i<l; i++) { ps += s; };
    return (((t===0||t===2)?ps:"")+this+((t===1||t===2)?ps:""));
    };
  };

  /* isBlank / isEmpty / isNull */
  klib.isBlank = klib.isEmpty = klib.isNull = function(src) { return ( (src)? ((""+src).trim() == '') : true ); };

  klib.isNumber = function (str)
  { return ((((""+str).replace(/[0-9.]/g, "")).trim()).length==0);
  };

  klib.toBoolean  = function(str)
  { var retValue = true;
    switch ((""+str).trim().toLowerCase())
    { case          "":
      case         "0":
      case        "-0":
      case       "NaN":
      case      "null":
      case     "false":
      case "undefined": retValue = false; break;
    };
    return ( retValue );

  };
  klib.toJSON = function(str)
  { return ( klib.isBlank(str)? null : (eval("("+str+")")) );
  };

  klib.toInt = function(str)
  { str = (""+str).replace(/[^+-0123456789.]/g, "");
    str = klib.isBlank(str)? "0" : ((str.indexOf(".")>=0)? str.substring(0, str.indexOf(".")) : str);
    return(parseInt(str*1));
  };

  klib.toFloat = function(str)
  { str = (""+str).replace(/[^+-0123456789.]/g, "");
    str = klib.isBlank(str)? "0" : str;
    return(parseFloat(str*(1.0)));
  };

  klib.ifBlank = klib.ifEmpty = klib.ifNull = function(src, replaceWithIfBlank)
  { replaceWithIfBlank = (""+(replaceWithIfBlank || "")).trim();
    return ( klib.isBlank(src)? (replaceWithIfBlank) : ((""+src).trim()) ) ;
  };

  /* now: Browser's current timestamp */
  klib.now  = function() { return (""+((new Date()).getTime())); };

  /* year: Browser's current year +/- N */
  klib.year = function(n) { n=n||0;return ((new Date()).getFullYear()+(klib.toInt(n))); };

  /*String to Array; klib.range("N1..N2:STEP")
  * y-N..y+N : y=CurrentYear*/
  klib.range = function(rangeSpec){
    var retValue = [];
    var rSpec = (rangeSpec.toUpperCase()).split("..");
    var rangeB = ""+rSpec[0];
    var rangeE = ""+rSpec[1];
    var rStep  = "1";
    if (rangeE.indexOf(":")>0)
    { rangeE = ""+(rSpec[1].split(":"))[0];
      rStep  = ""+(rSpec[1].split(":"))[1];
    };
    if (rangeB.indexOf("Y")>=0)
    { rangeB = klib.year( (rangeB.split(/[^0-9+-]/))[1] );
    };
    if (rangeE.indexOf("Y")>=0)
    { rangeE = klib.year( (rangeE.split(/[^0-9+-]/))[1] );
    };
    var rB = klib.toInt(rangeB);
    var rE = klib.toInt(rangeE);
    var rS = klib.toInt(rStep);
    retValue = (rangeB>rangeE)? ((_.range(rE, (rB)+1, rS)).reverse()) : (_.range(rB, (rE)+1, rS));
    return retValue;
  };

  klib.checkAndPreventKey = function(e, disableKeys)
  { if (!disableKeys) disableKeys = "";
    var withShiftKey = (disableKeys.indexOf("+shift")>=0);
    var keyCode = ""+e.keyCode;
    var retValue = (( ((disableKeys.pad(1,',',2)).indexOf(keyCode.pad(1,',',2))>=0) && (withShiftKey? ((e.shiftKey)? true : false) : ((!e.shiftKey)? true : false))));
    if (retValue) {
      e.preventDefault();
      console.info("Key ["+keyCode+(withShiftKey?"+Shift":"")+"] has been disabled in this element.");
    };
    return retValue;
  };

  klib._trackAndControlKey = function(e)
  { var keyElement  = e.currentTarget;
    var disableKeys = (""+$(keyElement).data("disableKeys")).toLowerCase();
    var keyCode = ""+e.keyCode;
    var withShiftKey = (disableKeys.indexOf("+shift")>=0);
    klib.checkAndPreventKey(e, disableKeys);

    var changeFocusNext = (!klib.isBlank((""+$(keyElement).data("focusNext")).replace(/undefined/,"").toLowerCase()));
    var changeFocusPrev = (!klib.isBlank((""+$(keyElement).data("focusBack")).replace(/undefined/,"").toLowerCase()));
    if (changeFocusNext && (klib.checkAndPreventKey(e, "9")))
    { $($(keyElement).data("focusNext")).get(0).focus();
    };
    if (changeFocusPrev && (klib.checkAndPreventKey(e, "9,+shift")))
    { $($(keyElement).data("focusBack")).get(0).focus();
    };
  };

  klib.initKeyTracking = function()
  { var elementsToTrackKeys = (arguments.length)? arguments[0] : "[data-disable-keys],[data-focus-next],[data-focus-back]";
    console.info("Finding Key-Tracking for element(s): "+elementsToTrackKeys);
    $(elementsToTrackKeys).each(function(index, element){
      $(element).keydown(klib._trackAndControlKey);
      console.info("kLib is tracking keys on element:");
      console.info(element);
    });
  };

  klib.getDocObj = function(objId)
  { var jqSelector = (objId.beginsWith("#")? "" : "#") + objId ;
    return ( $(jqSelector).get(0) );
  };
  klib.getDocObjs = function(objId)
  { var jqSelector = (objId.beginsWith("#")? "" : "#") + objId ;
    return ( $(jqSelector).get() );
  };

  /* setFocus: */
  klib.setFocus = function(objId, isSelect)
  { var oFocus = klib.getDocObj(objId);
    if (oFocus!=null)
    { oFocus.focus();
      if (isSelect) oFocus.select();
    };
  };

  /* Check DOM has requested element */
  klib.isElementExist = function(elSelector)
  { return (!$.isEmptyObject($(elSelector).get()));
  };

  klib.swapObjClass = function(objIDs, removeClass, addClass)
  { $(objIDs).removeClass(removeClass);
    $(objIDs).addClass(addClass);
  };

  /* docObjValue: returns oldValue; sets newValue if provided */
  klib.docObjValue = function(objId, newValue)
  { var reqObj   = klib.getDocObj(objId);
    var retValue = "";
    if (reqObj != null)
    { retValue = reqObj.value;
      if (arguments.length===2)
      { reqObj.value = newValue;
      };
    };
    return (retValue);
  };

  /* <select> tag related */
  /* get options Selected Index : Get / Set by Index*/
  klib.optionSelectedIndex = function(objId, newSelIdx)
  { var retValue = -1;
    oLstObj = klib.getDocObj(objId);
    if (oLstObj!=null)
    { retValue = oLstObj.selectedIndex;
      if (arguments.length===2)
      { oLstObj.selectedIndex = newSelIdx;
      };
    };
    return (retValue);
  };
  /* get options Index : for value */
  klib.optionIndexOfValue = function(objId, optValue)
  { var retValue = -1;
    oLstObj = klib.getDocObj(objId);
    if (oLstObj!=null)
    { for (i = 0; i <oLstObj.length; i++)
      { if ((""+optValue).equalsIgnoreCase(oLstObj.options[i].value))
        { retValue = i;
          break;
        };
      };
    };
    return (retValue);
  };
  /* get options Index : for Text */
  klib.optionIndexOfText = function(objId, optText)
  { var retValue = -1;
    oLstObj = klib.getDocObj(objId);
    if (oLstObj!=null)
    { for (i = 0; i <oLstObj.length; i++)
      { if (optText.equalsIgnoreCase(oLstObj.options[i].text))
        { retValue = i;
          break;
        };
      };
    };
    return (retValue);
  };
  /* get options Index : for value begins with */
  klib.optionIndexOfValueBeginsWith = function(objId, optValue)
  { var retValue = -1;
    oLstObj = klib.getDocObj(objId);
    if (oLstObj!=null)
    { for (i = 0; i <oLstObj.length; i++)
      { if ((oLstObj.options[i].value).beginsWith(optValue, "i"))
        { retValue = i;
          break;
        };
      };
    };
    return (retValue);
  };

  /*Get Value / Text for selected Index*/
  klib.optionsSelectedValues = function(objId, delimiter)
  { objId = (objId.beginsWith("#")? "" : "#") + objId;
    delimiter = delimiter || ",";
    return ($.map(($(objId+" option:selected")), function(option){return (option.value);}).join(delimiter));
  };
  klib.optionsSelectedTexts = function(objId, delimiter)
  { objId = (objId.beginsWith("#")? "" : "#") + objId;
    delimiter = delimiter || ",";
    return ($.map(($(objId+" option:selected")), function(option){return (option.text);}).join(delimiter));
  };

  /*Get Value / Text for given Index*/
  klib.optionValueOfIndex = function(objId, sIndex)
  { retValue = "";
    oLstObj = klib.getDocObj(objId);
    if ((oLstObj!=null) && (sIndex>=0) && (sIndex<oLstObj.length))
    { retValue = oLstObj.options[sIndex].value;
    };
    return (retValue);
  };
  klib.optionTextOfIndex = function(objId, sIndex)
  { retValue = "";
    oLstObj = klib.getDocObj(objId);
    if ((oLstObj!=null) && (sIndex>=0) && (sIndex<oLstObj.length))
    { retValue = oLstObj.options[sIndex].text;
    };
    return (retValue);
  };

  /*Set Selected options for Value*/
  klib.selectOptionForValue = function(objId, selValue)
  { var retValue = -1;
    oLstObj = klib.getDocObj(objId);
    if (oLstObj!=null)
    { retValue = klib.optionIndexOfValue(objId, selValue);
      oLstObj.selectedIndex = retValue;
    };
    return (retValue);
  };
  klib.selectOptionForValueBeginsWith = function(objId, selValue)
  { var retValue = -1;
    oLstObj = klib.getDocObj(objId);
    if (oLstObj!=null)
    { retValue = klib.optionIndexOfValueBeginsWith(objId, selValue);
      oLstObj.selectedIndex = retValue;
    };
    return (retValue);
  };
  klib.selectOptionsForValues = function(objId, selValues, valDelimitChar)
  { valDelimitChar = valDelimitChar || ",";
    selValues = (valDelimitChar+selValues+valDelimitChar).toLowerCase();
    oLstObj = klib.getDocObj(objId);
    if (oLstObj!=null)
    { for (i = 0; i <oLstObj.length; i++)
      { optValue = (valDelimitChar+(oLstObj.options[i].value)+valDelimitChar).toLowerCase();
        oLstObj.options[i].selected = (selValues.indexOf(optValue)>=0);
      };
    };
  };
  klib.selectOptionForText = function(objId, selText)
  { var retValue = -1;
    oLstObj = klib.getDocObj(objId);
    if (oLstObj!=null)
    { retValue = klib.optionIndexOfText(objId, selText);
      oLstObj.selectedIndex = retValue;
    };
    return (retValue);
  };
  klib.selectOptionsAll = function(objId)
  { oLstObj = klib.getDocObj(objId);
    if (oLstObj!=null)
    { for (i = 0; i<oLstObj.length; i++)
      { oLstObj.options[i].selected = true;
      };
    };
  };
  klib.selectOptionsNone = function(objId)
  { oLstObj = klib.getDocObj(objId);
    if (oLstObj!=null)
    { for (i = 0; i<oLstObj.length; i++)
    { oLstObj.options[i].selected = false;
    };
    };
  };
  /*Add / Remove Options*/
  klib.optionsReduceToLength = function(objID, nLen)
  { nLen = nLen || 0;
    oSelOptList = klib.getDocObj(objID);
    if (oSelOptList!=null)
    { klib.selectOptionsNone(objID);
      oSelOptList.length = nLen;
    };
  };
  klib.optionsRemoveAll = function(objID)
  { klib.optionsReduceToLength(objID, 0);
  };
  klib.optionRemoveForIndex = function(objId, optIndex){
    objId = (objId.beginsWith("#")? "" : "#") + objId;
    oLstObj = klib.getDocObj(objId);
    if (oLstObj!=null)
    { if ((""+optIndex).equalsIgnoreCase("first")) optIndex = 0;
      if ((""+optIndex).equalsIgnoreCase("last")) optIndex = (oLstObj.length-1);
      oLstObj.remove(optIndex);
    };
  };
  klib.optionRemoveForValue   = function(objId, optValue){
    klib.optionRemoveForIndex(objId, klib.optionIndexOfValue(objId, optValue));
  };
  klib.optionRemoveForText    = function(objId, optText){
    klib.optionRemoveForIndex(objId, klib.optionIndexOfText(objId, optText));
  };
  klib.optionRemoveForValueBeginsWith = function(objId, optValueBeginsWith){
    klib.optionRemoveForIndex(objId, klib.optionIndexOfValueBeginsWith(objId, optValueBeginsWith));
  };

  klib.optionAppend = function(objID, optValue, optText)
  { var retValue = -1;
    oSelOptList = klib.getDocObj(objID);
    if (oSelOptList!=null)
    { nOptPos = oSelOptList.length;
      oSelOptList.length = nOptPos+1;
      oSelOptList.options[nOptPos].value = optValue;
      oSelOptList.options[nOptPos].text  = optText;
      retValue = nOptPos;
    };
    return (retValue);
  };

  /*
   * Usage: klib.optionsLoad(elSelector, list, beginsAt, sortBy)
   * elSelector = "#SelectElementID"; //jQuery selector by ID
   * list = [ 0, 1, ... ]; //Number Array
   * list = ["optValue0", "optValue1", ... ]; //String Array
   * list = {"optValue0":"optText0", "optValue1":"optText1", "optValue2":"optText2", ... }; //Object with Key Value Pair
   * beginsAt = -1 => Add to existing list; 0=> reset to 0; n=> reset to n; before Load
   * sortBy = 0=> NO Sort; 1=> SortBy Key; 2=> SortBy Text;
   */
  klib.optionsLoad = function(elSelector, list, beginsAt, sortBy)
  { var sortByAttr = ["", "key", "value"];
    beginsAt = beginsAt || 0;
    sortBy = sortBy || 0;
    if ((_.isString(list)) && (list.indexOf("..")>0))
    { list = klib.range(list);
    };

    if (beginsAt>=0) { klib.optionsReduceToLength(elSelector, beginsAt); };
    if (_.isArray(list))
    { _.each(list, function(opt){
      klib.optionAppend(elSelector, opt, opt);
      });
    }
    else
    { if (sortBy>0)
      { var listArray = [];
        for (var key in list) {
          listArray.push({key:key,value:list[key]});
        };
        var listSorted = _.sortBy(listArray, sortByAttr[sortBy]);
        _.each(listSorted, function(opt){
          klib.optionAppend(elSelector, opt.key, opt.value);
        });
      }
      else
      { _.each(list, function(value, key){
        klib.optionAppend(elSelector, key, value);
        });
      };
    };
  };

  /* Radio & Checkbox related */
  /* checkedState: returns old Checked State {true|false}; sets newState {true | false} if provided */
  klib.checkedState = function(objId, newState)
  { retValue = false;
    objChk = klib.getDocObj(objId);
    if (objChk!=null)
    { retValue = objChk.checked;
      if (arguments.length===2)
      { objChk.checked = newState;
      };
    };
    return (retValue);
  };
  klib.isChecked = function(formId, eName)
  { return (($("input[name="+eName+"]:checked", formId).length)>0);
  };
  klib.radioSelectedValue = function(formId, rName)
  { var retValue = ($("input[name="+rName+"]:checked", formId).val());
    return (retValue? retValue : "");
  };
  klib.radioClearSelection = function(formId, rName)
  { ($("input[name="+rName+"]:checked", formId).attr("checked", false));
  };
  klib.radioSelectForValue = function(formId, rName, sValue)
  { $("input[name="+rName+"]:radio", formId).each(function(){ this.checked = ((this.value).equalsIgnoreCase(sValue)); });
  };
  klib.checkboxCheckedValues = function(formId, cbName, delimiter)
  { delimiter = delimiter || ",";
    return ($("input[name="+cbName+"]:checked", formId).map(function(){return this.value;}).get().join(delimiter));
  };

  klib.sleep = function(sec)
  { var dt = new Date();
    dt.setTime(dt.getTime() + (sec*1000));
    while (new Date().getTime() < dt.getTime());
  };

  klib.filterJSON = function(jsonData, xFilter)
  { return $(jsonData).filter(function(index, item) {
    for( var i in xFilter ) {
      if( ! item[i].toString().match( xFilter[i] ) ) return null;
    };
    return item;
  });
  };

  /* randomPassword: Random Password for requested length */
  klib.randomPassword = function(passLen)
  { var chars = "9a8b77C8D9E8F7G6H5I4J3c6d5e4f32L3M4N5P6Qg2h3i4j5kV6W5X4Y3Z26m7n8p9q8r7s6t5u4v3w2x3y4z5A6BK7R8S9T8U7";
    var pass = "";
    for(var x=0;x<passLen;x++)
    { var i = Math.floor(Math.random() * (chars).length);
      pass += chars.charAt(i);
    };
    return pass;
  };

  /* rand: Random number between min - max */
  klib.rand = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  klib.htmlEncode = function(value)
  { return $('<div/>').text(value).html();
  };
  klib.htmlDecode = function(value)
  { return $('<div/>').html(value).text();
  };

  klib.parseKeyStr = function(keyName, changeToLowerCase)
  { return ((changeToLowerCase? keyName.toLowerCase() : keyName).replace(/[^_0-9A-Za-z]/g, ""));
  };
  klib.setObjProperty = function(obj, keyNameStr, propValue, keyToLowerCase)
  { var xObj  = obj, oKey; keyToLowerCase = keyToLowerCase || false;
    var oKeys = keyNameStr.split(/(?=[A-Z])/); /*Default: camelCase | TitleCase*/
    var keyIdentifier = $.trim(keyNameStr.replace(/[0-9A-Za-z]/g, ""));
    if (keyIdentifier && (keyIdentifier!=""))
    { oKeys = keyNameStr.split(keyIdentifier[0]);
    };

    while (oKeys.length > 1) {
      oKey = klib.parseKeyStr(oKeys.shift(), keyToLowerCase);
      if ($.trim(oKey)!="")
      { if (typeof xObj[oKey] == "undefined") xObj[oKey] = {};
        xObj = xObj[oKey];
      };
    };
    oKey = klib.parseKeyStr(oKeys.shift(), keyToLowerCase);
    xObj[oKey] = propValue;

    return obj;
  };

  /* Serialize form elements to Json Object
   * $("#formId").serializeFormToJson(obj, keyNameToLowerCase);
   * keyNameToLowerCase: converts form element names to its correponding lowercase obj's attribute
   * obj: Optional; creates/returns new JSON if not provided; overwrite & append attributes on the given obj if provided
   * */
  $.fn.serializeFormToJSON = $.fn.serializeFormToObject = function(obj, keyNameToLowerCase, strPrefixToIgnore) {
    var a = this.serializeArray();
    var o = (typeof obj === "object")? obj : {};
    var c = (typeof obj === "boolean")? obj : (keyNameToLowerCase || false);
    var kParse = $(this).data("serializeIgnorePrefix");
    if (strPrefixToIgnore) kParse = strPrefixToIgnore;
    $.each(a, function() {
      var oKeyStr = (kParse)? (this.name).replace(kParse, "") : this.name;
      o = klib.setObjProperty(o, oKeyStr, this.value, c);
    });
    return o;
  };

  klib.serializeFormToJSON = klib.serializeFormToObject = function(formSelector, obj, keyNameToLowerCase, strPrefixToIgnore)
  { return $(formSelector).serializeFormToJSON(obj, keyNameToLowerCase, strPrefixToIgnore);
  };

  /* find(jsonObject, 'key1.key2.key3[0].key4'); */
  klib.find = klib.locate = function(obj, path) {
    var tObj = obj, retValue;
    if (typeof eval("tObj."+path) != "undefined") retValue = eval("tObj."+path);
    return retValue;
  };
  klib.has = klib.hasKey = function(obj, path)
  { var tObj = obj;
    return (typeof eval("tObj."+path) != "undefined");
  };

  /*Get All keys like X-Path with dot and [] notations */
  klib.keysDotted = function(a) {
    a = a || {};
    var list = [],xConnectorB,xConnectorE,curKey;
    (function(o, r) {
      r = r || '';
      if (typeof o != 'object') {
        return true;
      };
      for (var c in o) {
        curKey = r.substring(1);
        xConnectorB = (klib.isNumber(c))? "[" : ".";
        xConnectorE = (((curKey) && (xConnectorB == "[")) ? "]" : "");
        if (arguments.callee(o[c], r + xConnectorB  + c + xConnectorE)) {
          list.push( (curKey) + (((curKey)? xConnectorB : "")) + c + (xConnectorE) );
        };
      };
      return false;
    })(a);
    return list;
  };

  klib.keysCamelCase = function(a) {
    return (_.map(klib.keysDotted(a), function(name){
      var newName = (name).replace(/\./g," ").toProperCase().replace(/ /g, "");
      return (newName[0].toLowerCase()+newName.substring(1));
    } ));
  };

  klib.keysTitleCase = function(a) {
    return (_.map(klib.keysDotted(a), function(name){
      return ((name).replace(/\./g," ").toProperCase().replace(/ /g, ""));
    } ));
  };

  $.cachedScript = function(url, options) {
    /* allow user to set any option except for dataType, cache, and url */
    options = $.extend(options || {}, {
      dataType: "script",
      cache: true,
      url: url
    });
    console.info("$.cachedScript('"+url+"')");
    /* Use $.ajax() since it is more flexible than $.getScript
     * Return the jqXHR object so we can chain callbacks
     */
    return $.ajax(options);
  };

  $.cachedStyle = function(styleId, url, options) {
    /* allow user to set any option except for dataType, cache, and url */
    options = $.extend(options || {}, {
      dataType: "text",
      cache: true,
      url: url,
      success: function(cssStyles) {
        $("head").append("<style id='"+(styleId)+"' type='text/css'>"+cssStyles+"<\/style>");
      }
    });
    console.info("$.cachedScript('"+url+"')");
    /* Use $.ajax() since it is more flexible than $.getScript
     * Return the jqXHR object so we can chain callbacks
     */
    return $.ajax(options);
  };

  /* Add Script Tag */
  klib.addScript = function(scriptId, scriptSrc)
  { scriptId   = scriptId.replace(/#/,"");
    console.group("kAddScript");
    if (!klib.isElementExist("#kScriptsCotainer"))
    { console.info("#kScriptsCotainer NOT Found! Creating one...");
      $('body').append("<div id='kScriptsCotainer' style='display:none' rel='Dynamic Scripts Container'></div>");
    };
    if (klib.isElementExist("#"+scriptId))
    { console.info("script ["+scriptId+"] already found in local.");
    }
    else
    { console.info("script ["+scriptId+"] NOT found. Added script tag with src ["+scriptSrc+"]");
      $("#kScriptsCotainer").append("<script id='"+(scriptId)+"' type='text/javascript' src='"+scriptSrc+"'><\/script>");
    };
    console.groupEnd("kAddScript");
  };

  /* Add Style Tag */
  klib.addStyle = function(styleId, styleSrc)
  { styleId   = styleId.replace(/#/,"");
    console.group("kAddStyle");
    if (!klib.isElementExist("#kStylesCotainer"))
    { console.info("#kStylesCotainer NOT Found! Creating one...");
      $('body').append("<div id='kStylesCotainer' style='display:none' rel='Dynamic Styles Container'></div>");
    };
    if (klib.isElementExist("#"+styleId))
    { console.info("style ["+styleId+"] already found in local.");
    }
    else
    { console.info("style ["+styleId+"] NOT found. Added link tag with href ["+styleSrc+"]");
      $("#kStylesCotainer").append("<link id='"+(styleId)+"' rel='stylesheet' type='text/css' href='"+styleSrc+"'\/>");
    };
    console.groupEnd("kAddStyle");
  };

  /* Loading script */
  klib.loadScript = function(scriptId, scriptPath, useScriptTag, tAjaxRequests)
  { scriptId   = scriptId.replace(/#/,"");
    useScriptTag = useScriptTag || false;
    tAjaxRequests = tAjaxRequests || [];
    console.group("kScriptsLoad");
    if (klib.isBlank(scriptPath))
    { console.error("script path ["+scriptPath+"] for ["+scriptId+"] NOT defined.");
    }
    else
    { if (useScriptTag)
      { klib.addScript(scriptId, scriptPath);
      }
      else
      { /* load script script-URL */
        tAjaxRequests.push(
          $.cachedScript(scriptPath).done(function(script, textStatus) {
            console.info("Loaded script ["+scriptId+"] from ["+scriptPath+"]. STATUS: "+textStatus);
          })
        );
      };
    };
    console.groupEnd("kScriptsLoad");
    return (tAjaxRequests);
  };

  /* Loading style */
  klib.loadStyle = function(styleId, stylePath, useStyleTag, tAjaxRequests)
  { styleId   = styleId.replace(/#/,"");
    useStyleTag = useStyleTag || false;
    tAjaxRequests = tAjaxRequests || [];
    console.group("kStylesLoad");
    if (klib.isBlank(stylePath))
    { console.error("style path ["+stylePath+"] for ["+styleId+"] NOT defined.");
    }
    else
    { if (useStyleTag)
      { klib.addStyle(styleId, stylePath);
      }
      else
      { /* load style style-URL */
        tAjaxRequests.push(
          $.cachedStyle(styleId, stylePath).done(function(style, textStatus) {
            console.info("Loaded style ["+styleId+"] from ["+stylePath+"]. STATUS: "+textStatus);
          })
        );
      };
    };
    console.groupEnd("kStylesLoad");
    return (tAjaxRequests);
  };

  /* Add Template script to BODY */
  klib.addTemplateScript = function(tmplId, tmplBody, tmplType)
  { tmplId   = tmplId.replace(/#/,"");
    if (!klib.isElementExist("#kViewTemplateCotainer"))
    { console.info("#kViewTemplateCotainer NOT Found! Creating one...");
      $('body').append("<div id='kViewTemplateCotainer' style='display:none' rel='Template Container'></div>");
    };
    switch(tmplType)
    { case "x-weld-template":
      case "x-transparency-template":
        console.info("Adding <div id='"+(tmplId)+"' style='display:none' rel='html/"+tmplType+"' />");
        $("#kViewTemplateCotainer").append("<div id='"+(tmplId)+"' style='display:none' rel='html/"+tmplType+"'>"+tmplBody+"<\/div>");
        break;
      default:
        console.info("Adding <script id='"+(tmplId)+"' type='text/"+tmplType+"'>");
        $("#kViewTemplateCotainer").append("<script id='"+(tmplId)+"' type='text/"+tmplType+"'>"+tmplBody+"<\/script>");
        break;
    };
  };

  /* Load external jquery-tmpl content as jquery-tmpl script */
  klib.loadTemplate = function(tmplId, tmplPath, templateType, viewContainderId, tAjaxRequests)
  { tmplId   = tmplId.replace(/#/,"");
    tmplPath = tmplPath.ifBlank("inline");
    templateType = templateType || "x-template";
    viewContainderId = viewContainderId || "#DummyInlineTemplateContainer";
    tAjaxRequests = tAjaxRequests || [];
    console.group("kTemplateAjaxQue");
    if (!klib.isElementExist("#"+tmplId))
    { console.info("Template["+tmplId+"] of ["+templateType+"] NOT found. loading from ["+tmplPath+"]");
      if (tmplPath.equalsIgnoreCase("inline"))
      { var inlineTemplate = $(viewContainderId).html();
        if (klib.isBlank(inlineTemplate))
        { console.error("Template["+tmplId+"] of ["+templateType+"] NOT defined inline.");
        }
        else
        { klib.addTemplateScript(tmplId, inlineTemplate, templateType);
          $(viewContainderId).html("");
        };
      }
      else if (!tmplPath.equalsIgnoreCase("script"))
      { /* load from templdate-URL */
        tAjaxRequests.push(
          $.get(tmplPath, function(template){
            klib.addTemplateScript(tmplId, template, templateType);
            console.info("Loaded Template["+tmplId+"] of ["+templateType+"] from ["+tmplPath+"]");
          })
        );
      }
      else
      { console.error("Template["+tmplId+"] of ["+templateType+"] NOT defined in <script>.");
      };
    }
    else
    { if (klib.isBlank(($("#"+tmplId).html())))
      { console.warn("Template["+tmplId+"] of ["+templateType+"] script found EMPTY!");
        var externalPath = ""+$("#"+tmplId).attr("path");
        if (!klib.isBlank((externalPath)))
        { templateType = ((($("#"+tmplId).attr("type")).ifBlank(templateType)).toLowerCase()).replace(/text\//gi, "");
          console.info("prepare/remove to re-load Template["+tmplId+"]  of ["+templateType+"] from external path: ["+externalPath+"]");
          $("#"+tmplId).remove();
          tAjaxRequests = klib.loadTemplate(tmplId, externalPath, templateType, viewContainderId, tAjaxRequests);
        };
      }
      else
      { console.info("Template["+tmplId+"]  of ["+templateType+"] already found in local.");
      };
    };
    console.groupEnd("kTemplateAjaxQue");

    return (tAjaxRequests);
  };

  klib.loadTemplatesCollection = function(templateCollectionId, dataTemplatesCollectionUrl)
  { templateCollectionId = (templateCollectionId.beginsWith("#")? "" : "#")+templateCollectionId;
    var retValue = {};
    if (!klib.isElementExist(templateCollectionId))
    { console.info(templateCollectionId+" NOT Found! Creating one...");
      if (!klib.isElementExist("#kViewTemplateCotainer"))
      { console.info("#kViewTemplateCotainer NOT Found! Creating one...");
        $('body').append("<div id='kViewTemplateCotainer' style='display:none' rel='Template Container'></div>");
      };
      $("#kViewTemplateCotainer").append("<div id='"+(templateCollectionId.substring(1))+"' style='display:none' rel='Template Collection Container'></div>");

      $.ajaxSetup({async: false}); /*wait till this template collection loads*/
      $.ajax({
        url: dataTemplatesCollectionUrl,
        cache: true,
        dataType: "html",
        async: false,
        success: function (result){
          $(templateCollectionId).html(result);
          console.info("Loaded Template Collection ["+templateCollectionId+"] from ["+dataTemplatesCollectionUrl+"]");

          /* Read all script id(s) in collection */
          console.info("Found following templates in Template Collection.");
          $(templateCollectionId+" script").each(function(index, element){
            retValue[$(element).attr("id")] = 'script';
          });
          console.info({o:retValue});

          $.ajaxSetup({async: true});
        },
        error: function(jqXHR, textStatus, errorThrown){
          console.error("Failed Loading Template Collection ["+templateCollectionId+"] from ["+dataTemplatesCollectionUrl+"]. ["+textStatus+":"+errorThrown+"]");
        }
      });
    }
    else
    { console.info(templateCollectionId+" Found! skip template collection load from "+dataTemplatesCollectionUrl);
    };
    return (retValue);
  };

  /* each kRender's view and model will be stored in renderHistory */
  klib.viewModels    = {};
  klib.renderHistory = {};
  klib.renderHistoryMax = 100;

  /*
   * klib.render("#containerID")
   *
   * OR
   *
   uOption = {
    data                      : {}    // Data(JSON Object) to be used in templates; for html data-attribute see dataUrl

   ,dataUrl                   : ""    // External Data(JSON) URL | local:dataModelVariableName
   ,dataParams                : {}    // dataUrl Params (NO EQUIVALENT data-attribute)
   ,dataModel                 : ""    // External Data(JSON) "key" for DataObject; default: "data"; may use name-space x.y.z (with the cost of performance)
   ,dataModelType             : ""    // "Backbone" | "Thorax" applicable only for local data eg: data or dataUrl:"local:XXXXXX"
   ,dataCache                 : false // External Data(JSON) Cache

   ,dataTemplatesCollectionUrl: ""    // location of single file containing all the templates; helps to load all templates in single request. use "dataTemplate" to define primary tempate to be used for rendering
   ,dataTemplates             : {}    // Templates to be used for rendering {tmplID:'inline', tmplID:'script', tmplID:'URL'}
   ,dataTemplateEngine        : ""    // handlebars | underscore | underscore-as-mustache | mustache | jqtmpl | jsrender | dust | hogan | transparency | weld | doT | tjs
   ,dataTemplate              : ""    // Primary Template ID ==> content may be inline or <script>
                                      // dataTemplate = dataTemplates[0]; if dataTemplate is not defined

   ,dataScripts               : {}    // scripts (js) to be loaded along with templates
   ,dataScriptsCache          : true  // cache of dataScripts

   ,dataStyles                : {}    // styles (css) to be loaded along with templates
   ,dataStylesCache           : true  // cache of dataStyles

   ,dataRenderEngine          : ""    // jqTmpl | Backbone | Thorax | jsRender | dust (| dustRender) | dustStream
   ,dataRenderCallback        : ""    // single javascript function name to run after render

   ,dataViewId                : ""    // Used only for RenderEngine:Thorax, to locate in Thorax.Views collection
   ,dataRenderId              : ""    // Render Id, may be used to locate in klib.renderHistory[dataRenderId], auto-generated key if not defined
   ,dataWeldConfig            : {}    // Weld Template Configuration Optional
   };
   
   klib.render("#containerID", uOption);
   */
  klib.render = function(viewContainderId, uOptions)
  { var retValue = {id:"", view:{}, model:{}, cron: ""};
    var kAjaxRequestsQue = [];

    var kDefaultTemplateConfig = {
        "jqtmpl"      : {"engine":"jqtmpl"        , "template":"x-jquery-tmpl"                }
      , "backbone"    : {"engine":"underscore"    , "template":"x-underscore-template"        }
      , "thorax"      : {"engine":"handlebars"    , "template":"x-handlebars-template"        }
      , "jsrender"    : {"engine":"jsrender"      , "template":"x-jsrender-template"          }
      , "dust"        : {"engine":"dust"          , "template":"x-dust-template"              }
      , "dustrender"  : {"engine":"dust"          , "template":"x-dust-template"              }
      , "duststream"  : {"engine":"dust"          , "template":"x-dust-template"              }
      , "hogan"       : {"engine":"hogan"         , "template":"x-hogan-template"             }
      , "transparency": {"engine":"transparency"  , "template":"x-transparency-template"      }
      , "weld"        : {"engine":"weld"          , "template":"x-weld-template"              }
      , "dot"         : {"engine":"dot"           , "template":"x-dot-template"               }
      , "tjs"         : {"engine":"tjs"           , "template":"x-tjs-template"               }

      , "unknown"     : {"engine":"unknown"       , "template":"x-unknown-template"           }
    };
    /*kDefaultTemplateConfig[kRenderEngineKey].engine
      kDefaultTemplateConfig[kRenderEngineKey].template*/

    var noOfArgs     = arguments.length;
    var useOptions   = (noOfArgs > 1);
    var useParamData = (useOptions && uOptions.hasOwnProperty('data'));
    var dataFound    = true;

    var kRVOptions = {
        data               : {}
      , dataUrl            : ""
      , dataParams         : {}
      , dataModel          : ""
      , dataModelType       : ""
      , dataCache          : false

      , dataTemplatesCollectionUrl: ""
      , dataTemplates      : {}
      , dataTemplateEngine : ""
      , dataTemplate       : ""

      , dataScripts        : {}
      , dataScriptsCache   : true

      , dataStyles         : {}
      , dataStylesCache    : true

      , dataRenderEngine   : ""
      , dataRenderCallback : ""

      , dataViewId         : ""
      , dataRenderId       : ""
      , dataWeldConfig     : {}
    };

    if (useOptions)
    { /* for each user option set/override internal kRVOptions */
      for(var key in uOptions) { kRVOptions[key] = uOptions[key]; };
    };

    /*Render Id*/
    var kRenderId = (""+$(viewContainderId).data("renderId")).replace(/undefined/, "");
    if (!klib.isBlank(kRVOptions.dataRenderId))
    { kRenderId = kRVOptions.dataRenderId;
    };
    retValue.id = (kRenderId.ifBlank(("kRender"+(klib.now())+(klib.rand(1000,9999)))));

    /* Render Engine */
    var kRenderEngine = (""+$(viewContainderId).data("renderEngine")).replace(/undefined/, "");
    if (!klib.isBlank(kRVOptions.dataRenderEngine))
    { kRenderEngine = kRVOptions.dataRenderEngine;
    };
    kRenderEngine = (kRenderEngine.ifBlank("unknown")).toLowerCase();
    var kRenderEngineKey = kRenderEngine;
    if (!kDefaultTemplateConfig.hasOwnProperty(kRenderEngineKey))
    { kRenderEngineKey = "unknown"; kRenderEngine += "-unknown";
    };
    var kTemplateType = kDefaultTemplateConfig[kRenderEngineKey].template;

    var kTemplateEngine = (""+$(viewContainderId).data("templateEngine")).replace(/undefined/, "");
    if (!klib.isBlank(kRVOptions.dataTemplateEngine))
    { kTemplateEngine = kRVOptions.dataTemplateEngine;
    };
    kTemplateEngine = (kTemplateEngine.ifBlank(kDefaultTemplateConfig[kRenderEngineKey].engine)).toLowerCase();
    switch(kTemplateEngine)
    { case "dust":
        { if (kRenderEngine=="unknown")
          { kRenderEngineKey=kRenderEngine = "dustrender";
            kTemplateType=kDefaultTemplateConfig[kRenderEngineKey].template;
          };
        };
        break;
      case "dot":
      case "tjs":
      case "weld":
      case "hogan":
      case "transparency":
        if (kRenderEngine=="unknown")
        { kRenderEngineKey=kRenderEngine=kTemplateEngine;
          kTemplateType=kDefaultTemplateConfig[kRenderEngineKey].template;
        };
        break;
    };

    var kViewId = (""+$(viewContainderId).data("viewId")).replace(/undefined/, "");
    if (!klib.isBlank(kRVOptions.dataViewId))
    { kViewId = kRVOptions.dataViewId;
    };
    kViewId = (kViewId.ifBlank(("kView"+(klib.now())+(klib.rand(1000,9999)))));

    var kViewDataModelType = (""+$(viewContainderId).data("modelType")).replace(/undefined/, "");
    if (!klib.isBlank(kRVOptions.dataModelType))
    { kViewDataModelType = kRVOptions.dataModelType;
    };
    kViewDataModelType = (kViewDataModelType.ifBlank()).toLowerCase();

    /* Load Data */
    console.group("kDataModel");
    var dataModelName = (""+$(viewContainderId).data("model")).replace(/undefined/, ""), viewDataModelName;
    if (!klib.isBlank(kRVOptions.dataModel))
    { dataModelName = kRVOptions.dataModel;
    };
    var dataModelUrl = (""+$(viewContainderId).data("url")).replace(/undefined/, "");
    if (!klib.isBlank(kRVOptions.dataUrl))
    { dataModelUrl = kRVOptions.dataUrl;
    };
    var isLocalDataModel = (useParamData || (dataModelUrl.beginsWith("local:","i")));
    var defaultDataModelName = (dataModelUrl.beginsWith("local:","i"))? dataModelUrl.replace(/local:/gi, "") : "data";
    dataModelName = dataModelName.ifBlank(defaultDataModelName);
    viewDataModelName = dataModelName.replace(/\./g, "_");

    var kTemplateModelData = {};
    if (useParamData)
    { kTemplateModelData[viewDataModelName] = kRVOptions.data;
      console.info("Loaded data model ["+dataModelName+"] from argument");
    }
    else
    { if (!(useOptions && uOptions.hasOwnProperty('dataCache'))) /* NOT provided in Render Request */
      { /* Read from view container [data-cache='{true|false}'] */
        var dataCacheInTagData = (""+$(viewContainderId).data("cache")).replace(/undefined/, "");
        if (!klib.isBlank(dataCacheInTagData))
        { kRVOptions.dataCache = dataCacheInTagData.toBoolean();
          console.info("Override [data-cache] with [data-cache] option in tag-attribute: "+kRVOptions.dataCache);
        };
      }
      else
      { console.info("Override [data-cache] with user option [dataCache]: "+kRVOptions.dataCache);
      };

      if (klib.isBlank(dataModelUrl))
      { /*dataFound = false;*/
        console.warn("Model Data ["+dataModelName+"] or [data-url] NOT found! Check the arguments or html markup. Rendering with empty data {}.");
        kTemplateModelData[viewDataModelName] = {};
      }
      else
      { if (dataModelUrl.beginsWith("local:","i"))
        { /*Local DataModel*/
          var localDataModelName = dataModelUrl.replace(/local:/gi, "");
          var localDataModelObj = {};
          if (typeof eval("("+localDataModelName+")") != "undefined")
          { /*localDataModelObj = eval("("+localDataModelName+")");*/
            eval("(localDataModelObj="+localDataModelName+")");
          };
          console.info("Using LOCAL Data Model: "+localDataModelName);
          if (klib.isBlank(kViewDataModelType))
          { if (dataModelName.indexOf(".")>0)
            { kTemplateModelData[viewDataModelName] = klib.hasKey(localDataModelObj, dataModelName)? klib.find(localDataModelObj,dataModelName) : localDataModelObj;
            }else
            { kTemplateModelData[viewDataModelName] = localDataModelObj.hasOwnProperty(dataModelName)? localDataModelObj[dataModelName] : localDataModelObj;
            };
          }
          else
          { kTemplateModelData[viewDataModelName] = localDataModelObj;
          };
        }
        else
        { /*External Data Source*/
          console.info("Request Data ["+dataModelName+"] [cache:"+(kRVOptions.dataCache)+"] from URL =>"+dataModelUrl);
          kAjaxRequestsQue.push(
            $.ajax({
              url: dataModelUrl,
              data: kRVOptions.dataParams,
              cache: kRVOptions.dataCache,
              dataType: "text",
              success: function (result){
                oResult = (""+result).toJSON();
                if (dataModelName.indexOf(".")>0)
                { kTemplateModelData[viewDataModelName] = klib.hasKey(oResult,dataModelName)? klib.find(oResult,dataModelName) : oResult;
                }
                else
                { kTemplateModelData[viewDataModelName] = oResult.hasOwnProperty(dataModelName)? oResult[dataModelName] : oResult;
                };
                console.info("Loaded data model ["+dataModelName+"] from ["+dataModelUrl+"]");
              }
            })
          );
        };
      };
    };
    console.info({o:kTemplateModelData});
    console.groupEnd("kDataModel");

    if (dataFound)
    { /* Load Templates */
      var vTemplate2RenderInTag = (""+$(viewContainderId).data("template")).replace(/undefined/, "");
      var vTemplatesList = (""+$(viewContainderId).data("templates")).ifBlank("{}");
      var vTemplates = eval("("+ vTemplatesList +")");
      /* Check the option to override */
      if (!$.isEmptyObject(kRVOptions.dataTemplates))
      { vTemplates = kRVOptions.dataTemplates;
        vTemplatesList = ""+(JSON.stringify(vTemplates));
      };

      /* if Template list not provided in data-templates;
       * 1: Check options
       * 2: if not in options check data-template
       * */
      if ((!vTemplates) || ($.isEmptyObject(vTemplates)))
      { var xTemplatesList = "";
        if (klib.isBlank(kRVOptions.dataTemplate))
        { if (!klib.isBlank(vTemplate2RenderInTag))
          { xTemplatesList = "{"+vTemplate2RenderInTag+":''}";
          }
          else
          { xTemplatesList = "{kDynTmpl"+(klib.now())+(klib.rand(1000,9999))+":''}";
          };
        }
        else
        { xTemplatesList = "{"+kRVOptions.dataTemplate+":''}";
        };
        vTemplates = eval("("+ xTemplatesList +")");
      };

      console.group("kView");

      var dataTemplatesCollectionUrl = (""+$(viewContainderId).data("templatesCollectionUrl")).replace(/undefined/, "");
      if (!klib.isBlank(kRVOptions.dataTemplatesCollectionUrl))
      { dataTemplatesCollectionUrl = kRVOptions.dataTemplatesCollectionUrl;
      };
      if (!klib.isBlank(dataTemplatesCollectionUrl))
      { var templateCollectionId = viewContainderId+"_TemplatesCollection";
        klib.loadTemplatesCollection(templateCollectionId, dataTemplatesCollectionUrl);
      };

      if (vTemplates && (!$.isEmptyObject(vTemplates)))
      { console.info("Templates of ["+kTemplateType+"] to be used in view container ["+viewContainderId+"] => "+JSON.stringify(vTemplates));
        var vTemplateNames = _.keys(vTemplates);

        console.group("kLoadingTemplates");
        _.each(vTemplateNames, function(tmplId){
          kAjaxRequestsQue = klib.loadTemplate(tmplId, vTemplates[tmplId], kTemplateType, viewContainderId, kAjaxRequestsQue);
        });

        var vTemplate2Render = (vTemplateNames[0].beginsWith("#")? "" : "#")+vTemplateNames[0];
        if (klib.isBlank(kRVOptions.dataTemplate))
        { /* Check in data-template property if any */
          if (!klib.isBlank(vTemplate2RenderInTag))
          { vTemplate2Render = ((vTemplate2RenderInTag).beginsWith("#")? "" : "#")+vTemplate2RenderInTag;
          };
        }
        else
        { /* Check in Options if any */
          vTemplate2Render = ((kRVOptions.dataTemplate).beginsWith("#")? "" : "#")+kRVOptions.dataTemplate;
        };

        /* Loading Primary Template if needed */
        var vTemplate2RenderName = vTemplate2Render.replace(/#/,"");
        if (vTemplatesList.indexOf(vTemplate2RenderName)<0)
        { kAjaxRequestsQue = klib.loadTemplate(vTemplate2RenderName, '', kTemplateType, viewContainderId, kAjaxRequestsQue);
        };

        console.info("External Data/Templates Loading Status: "+JSON.stringify(kAjaxRequestsQue));
        console.groupEnd("kLoadingTemplates");

        /* Load Styles Begins */
        console.group("kLoadingViewStyles");
        if (!(useOptions && uOptions.hasOwnProperty('dataStylesCache'))) /* NOT provided in Render Request */
        { /* Read from view container [data-styles-cache='{true|false}'] */
          var stylesCacheInTagData = (""+$(viewContainderId).data("stylesCache")).replace(/undefined/, "");
          if (!klib.isBlank(stylesCacheInTagData))
          { kRVOptions.dataStylesCache = stylesCacheInTagData.toBoolean();
            console.info("Override [data-styles-cache] with [data-styles-cache] option in tag-attribute: "+kRVOptions.dataStylesCache);
          };
        }
        else
        { console.info("Override [data-styles-cache] with user option [dataStylesCache]: "+kRVOptions.dataStylesCache);
        };

        var vStylesList = (""+$(viewContainderId).data("styles")).ifBlank("{}");
        var vStyles = eval("("+ vStylesList +")");
        /* Check the option to override */
        if (!$.isEmptyObject(kRVOptions.dataStyles))
        { vStyles = kRVOptions.dataStyles;
        };

        if (vStyles && (!$.isEmptyObject(vStyles)))
        { console.info("External styles to be loaded [cache:"+(kRVOptions.dataStylesCache)+"] along with view container ["+viewContainderId+"] => "+JSON.stringify(vStyles));
          var vStylesNames = _.keys(vStyles);

          console.group("kLoadingStyles");
          _.each(vStylesNames, function(styleId){
            kAjaxRequestsQue = klib.loadStyle(styleId, vStyles[styleId], kRVOptions.dataStylesCache, kAjaxRequestsQue);
          });
          console.info("External Styles Loading Status: "+JSON.stringify(kAjaxRequestsQue));
          console.groupEnd("kLoadingStyles");
        }
        else
        { console.info("No styles defined [data-styles] in view container ["+viewContainderId+"] to load.");
        };
        console.groupEnd("kLoadingViewStyles");
        /* Load Styles Ends */

        /* Load Scripts Begins */
        console.group("kLoadingViewScripts");
        if (!(useOptions && uOptions.hasOwnProperty('dataScriptsCache'))) /* NOT provided in Render Request */
        { /* Read from view container [data-scripts-cache='{true|false}'] */
          var scriptsCacheInTagData = (""+$(viewContainderId).data("scriptsCache")).replace(/undefined/, "");
          if (!klib.isBlank(scriptsCacheInTagData))
          { kRVOptions.dataScriptsCache = scriptsCacheInTagData.toBoolean();
            console.info("Override [data-scripts-cache] with [data-scripts-cache] option in tag-attribute: "+kRVOptions.dataScriptsCache);
          };
        }
        else
        { console.info("Override [data-scripts-cache] with user option [dataScriptsCache]: "+kRVOptions.dataScriptsCache);
        };

        var vScriptsList = (""+$(viewContainderId).data("scripts")).ifBlank("{}");
        var vScripts = eval("("+ vScriptsList +")");
        /* Check the option to override */
        if (!$.isEmptyObject(kRVOptions.dataScripts))
        { vScripts = kRVOptions.dataScripts;
        };

        if (vScripts && (!$.isEmptyObject(vScripts)))
        { console.info("External scripts to be loaded [cache:"+(kRVOptions.dataScriptsCache)+"] along with view container ["+viewContainderId+"] => "+JSON.stringify(vScripts));
          var vScriptsNames = _.keys(vScripts);

          console.group("kLoadingScripts");
          _.each(vScriptsNames, function(scriptId){
            kAjaxRequestsQue = klib.loadScript(scriptId, vScripts[scriptId], kRVOptions.dataScriptsCache, kAjaxRequestsQue);
          });
          console.info("External Scripts Loading Status: "+JSON.stringify(kAjaxRequestsQue));
          console.groupEnd("kLoadingScripts");
        }
        else
        { console.info("No scripts defined [data-scripts] in view container ["+viewContainderId+"] to load.");
        };
        console.groupEnd("kLoadingViewScripts");
        /* Load Scripts Ends */

        $.when.apply($, kAjaxRequestsQue)
          .then(function() {

            /* Reset Template Engine for Thorax and Dust */
            switch(kRenderEngine)
            { case "thorax"    : kTemplateEngine="thorax";  break;
              case "dust"      :
              case "dustrender":
              case "duststream": kTemplateEngine = "dust";  break;
            };

            console.group("kRender["+kRenderEngine+"*"+kTemplateEngine+"] - klib.renderHistory["+retValue.id+"]");
            console.info("Rendering "+viewContainderId+" using master template: "+vTemplate2Render);
            $(viewContainderId).html("");
            try {
              retValue.model = kTemplateModelData[viewDataModelName];
              var kViewModel = kTemplateModelData[viewDataModelName], compiledTemplate;
              switch(kRenderEngine)
              { case "backbone"  :
                  if (!(isLocalDataModel && (!klib.isBlank(kViewDataModelType))))
                  { retValue.model = new Backbone.Model(retValue.model);
                    kViewModel = retValue.model.toJSON();
                  };
                  break;
                case "thorax"    :
                  if (!(isLocalDataModel && (!klib.isBlank(kViewDataModelType))))
                  { kViewModel = retValue.model = new Thorax.Model(retValue.model);
                  };
                  break;
                case "dust"      :
                case "dustrender":
                case "duststream":
                  if (!(isLocalDataModel && (!klib.isBlank(kViewDataModelType))))
                  { kViewModel = retValue.model = dust.makeBase(retValue.model);
                  };
                  break;

                default :
                  if (isLocalDataModel && (!klib.isBlank(kViewDataModelType)))
                  { switch (kViewDataModelType)
                    { case "backbone" :
                      case "thorax":
                        kViewModel = retValue.model.toJSON();
                        break;
                    };
                  };
                  break;
              };
              klib.viewModels[retValue.id] = retValue.model;

              switch(kTemplateEngine)
              { case "jqtmpl" :
                  compiledTemplate = $(vTemplate2Render).tmpl( kViewModel );
                  break;

                case "jsrender" :
                  compiledTemplate = ($.templates(vTemplate2Render)).render(kViewModel);
                  break;

                case "underscore":
                  compiledTemplate = (_.template($(vTemplate2Render).html()))(kViewModel);
                  break;

                case "underscore-as-mustache" :
                  var tSettings = {
                      interpolate : /\{\{(.+?)\}\}/g                  /* {{ title }}                        => <strong>pancakes<strong> */
                    , escape      : /\{\{\{(.+?)\}\}\}/g              /* {{{ title }}}                      => &lt;strong&gt;pancakes&lt;strong&gt; */
                  };
                  compiledTemplate = _.template($(vTemplate2Render).html(), kViewModel, tSettings);
                  break;

                case "mustache" :
                  compiledTemplate = (Mustache.compile($(vTemplate2Render).html()))(kViewModel);
                  break;

                case "handlebar"  :
                case "handlebars" :
                  compiledTemplate = (Handlebars.compile($(vTemplate2Render).html()))(kViewModel);
                  break;

                case "thorax" :
                  compiledTemplate = "thorax-in-built-handlebars";
                  break;

                case "dust" :
                  compiledTemplate = dust.compile($(vTemplate2Render).html(), (vTemplate2Render.substring(1)+"Dust"));
                  dust.loadSource(compiledTemplate);
                  break;

                case "hogan" :
                  compiledTemplate = (Hogan.compile($(vTemplate2Render).html())).render(kViewModel);
                  break;

                case "transparency" :
                  var templateBeforeCompile = $(vTemplate2Render).html();
                  $(vTemplate2Render).render(kViewModel);
                  compiledTemplate = $(vTemplate2Render).html();
                  $(vTemplate2Render).html(templateBeforeCompile);
                  break;

                case "weld" :
                  var templateBeforeCompile = $(vTemplate2Render).html();
                  weld($(vTemplate2Render)[0], kViewModel, kRVOptions.dataWeldConfig);
                  compiledTemplate = $(vTemplate2Render).html();
                  $(vTemplate2Render).html(templateBeforeCompile);
                  break;

                case "dot":
                  compiledTemplate = (doT.template($(vTemplate2Render).html()))(kViewModel);
                  break;

                case "tjs":
                  compiledTemplate = (new t($(vTemplate2Render).html())).render(kViewModel);
                  break;

                default : compiledTemplate = $(vTemplate2Render).html(); break;
              };

              switch (kRenderEngine)
              { case "jqtmpl":
                { retValue.view  = compiledTemplate;
                  (retValue.view).appendTo(viewContainderId);
                };
                break;

                case "backbone":
                { retValue.view  = new (Backbone.View.extend({
                      el    : viewContainderId
                    , render: function(){
                      this.$el.html(compiledTemplate);
                      return this;
                      }
                  }));
                  (retValue.view).render();
                };
                break;

                case "thorax":
                { retValue.view  = new Thorax.View({
                      name  : kViewId
                    , el    : viewContainderId
                    , model : kViewModel
                    , template: Handlebars.compile($(vTemplate2Render).html())
                  });
                  (retValue.view).render();
                };
                break;

                case "dust":
                case "dustrender":
                { dust.render((vTemplate2Render.substring(1)+"Dust"), kViewModel, function(err, out){
                    retValue.view = out;
                    $(viewContainderId).html(retValue.view);
                  });
                };
                break;
                case "duststream":
                { retValue.view = dust.stream((vTemplate2Render.substring(1)+"Dust"), kViewModel);
                  (retValue.view)
                    .on("data", function(out) {
                      $(viewContainderId).html(out);
                    })
                    .on("end", function() {
                    })
                    .on("error", function(err) {
                    });
                };
                break;

                default : /*jsrender and others*/
                { retValue.view  = compiledTemplate;
                  $(viewContainderId).html(retValue.view);
                };
                break;
              };
              console.info("Render: SUCCESS");
              var rhKeys = _.keys(klib.renderHistory);
              var rhLen = rhKeys.length;
              if (rhLen>klib.renderHistoryMax)
              { $.each(rhKeys.splice(0, rhLen-(klib.renderHistoryMax)), function(index, key){ delete klib.renderHistory[key]; });
              };
              retValue.cron = ""+klib.now();
              klib.renderHistory[retValue.id] = retValue;

              /*run callback if any*/
              var fnCallbackAfterRender = (""+$(viewContainderId).data("renderCallback")).replace(/undefined/, "");
              if (!klib.isBlank(kRVOptions.dataRenderCallback))
              { fnCallbackAfterRender = kRVOptions.dataRenderCallback;
              };
              if (!klib.isBlank(fnCallbackAfterRender))
              { eval("("+fnCallbackAfterRender+"(retValue))");
              };

              /*Deep/Child Render*/
              $("[rel='kRender']", viewContainderId).kRender();
            }
            catch(e){
              console.error("Error Rendering: "+e.message);
            };
            console.groupEnd("kRender["+kRenderEngine+"*"+kTemplateEngine+"] - klib.renderHistory["+retValue.id+"]");
          })
          .fail(function(){
            console.error("External Data/Templates/Styles/Scripts Loading failed! Unexpected!! Check the template Path / Network. Rendering aborted.");
          });
      }
      else
      { console.error("No templates defined [data-templates] in view container ["+viewContainderId+"] to render. Check HTML markup.");
      };
      console.groupEnd("kView");
    };
    return (retValue);
  }

  /* Internal wrapper for jQuery.kRender */
  function __renderView(obj, opt) {
    var retValue;
    var viewContainderId = $(obj).attr("id");
    if (klib.isBlank(viewContainderId))
    { viewContainderId = "kViewContainer-"+(klib.now())+"-"+klib.rand(1000,9999);
      $(obj).attr("id", viewContainderId);
      console.info("Render NewViewContainerID: "+viewContainderId);
    };
    if ((opt) && (!$.isEmptyObject(opt)))
    { retValue = klib.render("#"+viewContainderId, opt);
    }
    else
    { retValue = klib.render("#"+viewContainderId);
    };
    return retValue;
  };

  /* Extend to jQuery as
   *
   * $("#viewContainer").kRender({})
   *
   * OR
   *
   * $.kRender("#viewContainer", {})
   *
   * */
  $.fn.extend({
    kRender: function(opt) {
      this.each(function(){
        __renderView(this, opt);
      });
    }
  });
  $.extend({
    kRender: function(obj, opt) {
      $(obj).kRender(opt);
    }
  });

  $(document).ready(function(){
    /*Key Tracking*/
    klib.initKeyTracking();

    /*Render jquery-tmpl based views*/
    console.info("Find and Render [rel='kRender']");
    $("[rel='kRender']").kRender();
  });

})(this);

console.info("klib loaded.");
