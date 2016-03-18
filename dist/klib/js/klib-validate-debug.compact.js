/* =========================================================================
 * K-Lib - Validate | (c) Kumararaja <sucom.kumar@gmail.com> | License (MIT)
 * =========================================================================
 */

function _fnRequired(a,t){var e=klib.getElValue(a);return _showValidateMsg(a,t,!klib.isBlank(e))}function _fnValidDigits(a,t){var e=$(a).val(),n=0===e.length||/^\d+$/.test(e);return _showValidateMsg(a,t,n)}function _fnValidNumbers(a,t){var e=$(a).val(),n=0===e.length||/^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(e);return _showValidateMsg(a,t,n)}function _fnValidInteger(a,t){var e=$(a).val(),n=0===e.length||/^-?\d+$/.test(e);return _showValidateMsg(a,t,n)}function _fnValidAlpha(a,t){var e=$(a).val(),n=0===e.length||!/[^a-z]/gi.test(e);return _showValidateMsg(a,t,n)}function _fnValidAlphaNumeric(a,t){var e=$(a).val(),n=0===e.length||!/[^a-z0-9]/gi.test(e);return _showValidateMsg(a,t,n)}function _fnValidPatternMatch(a,t){var e=$(a).val(),n=0===e.length;if(!n){var i=new RegExp($(a).data("validatePattern"),$(a).data("validatePatternOptions").replace(/!/g,""));n=i.test(e),$(a).data("validatePatternOptions").indexOf("!")>=0&&(n=!n)}return _showValidateMsg(a,t,n)}function _fnValidValueRange(a,t){var e=$(a).val(),n=0===e.length;if(!n&&(n=!1,/^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(e))){var i=klib.toFloat(e),l=(" "+($(a).data("validateRange")||"")+": ").split(":"),F=!klib.isBlank(l[0]),u=!klib.isBlank(l[1]),d=klib.toFloat(l[0]),r=klib.toFloat(l[1]);F&&u?n=i>=d&&r>=i:F?n=i>=d:u&&(n=r>=i)}return _showValidateMsg(a,t,n)}function _fnValidLengthMin(a,t){var e=$(a).val(),n=klib.toInt($(a).attr("minlength")),i=e.length>=n;return _showValidateMsg(a,t,i)}function _fnValidLengthMax(a,t){var e=$(a).val(),n=klib.toInt($(a).attr("maxlength")),i=e.length<=n;return _showValidateMsg(a,t,i)}function _fnValidLengths(a,t){var e=$(a).val(),n=e.length,i=klib.toInt($(a).attr("minlength")),l=klib.toInt($(a).attr("maxlength")),F=n>=i&&l>=n;return _showValidateMsg(a,t,F)}function _fnValidWordSize(a,t){var e=$(a).val(),n=_.max(_.map((""+e).replace(/[-\n]/g," ").split(" "),function(a){return a.length})),i=klib.toInt($(a).data("validWordSize"))||20,l=i>=n;return _showValidateMsg(a,t,l)}function _fnValidEmail(a,t){var e=$(a).val(),n=0===e.length;return n||(n=(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test(e)||/[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/i.test(e))&&/[a-z0-9]/i.test(e[e.length-1])),_showValidateMsg(a,t,n)}function _fnValidUrl(a,t){var e=$(a).val(),n=0===e.length;return n||(n=/^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(e)),_showValidateMsg(a,t,n)}function _isValidDate(a,t){var e=$(a).val(),n=0===e.length;if(!n){n=!1;var i,l,F,u=["","JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"],d=["","JANUARY","FEBRUARY","MARCH","APRIL","MAY","JUNE","JULY","AUGUST","SEPTEMBER","OCTOBER","NOVEMBER","DECEMBER"],r=$(a).data("validateFormat")||"YMD",f="^\\d{1,2}[\\/\\-\\.]\\d{1,2}[\\/\\-\\.]\\d{4}$",s=e.replace(/[^a-z]/gi,"");if(s){var o=_.indexOf(u,s.toUpperCase());0>=o&&(o=_.indexOf(d,s.toUpperCase())),o>0&&(e=e.replace(new RegExp(s,"gi"),o))}e=e.replace(/[^0-9]/g," ").normalizeStr().replace(/ /g,"/");var g=e.split("/");switch(r.toUpperCase()){case"YMD":f="^\\d{4}[\\/\\-\\.]\\d{1,2}[\\/\\-\\.]\\d{1,2}$",i=g[0],l=g[1],F=g[2];break;case"MDY":l=g[0],F=g[1],i=g[2];break;case"DMY":F=g[0],l=g[1],i=g[2]}if(new RegExp(f,"").test(e)){F=parseInt(F,10),l=parseInt(l,10),i=parseInt(i,10);var c=new Date(i,l-1,F);n=c.getFullYear()===i&&c.getMonth()===l-1&&c.getDate()===F}}return _showValidateMsg(a,t,n)}function _fnValidCardNo(a,t){var e=$(a).val(),n=0===e.length;if(!n)if(/[^0-9 \-]+/.test(e))n=!1;else{for(var i=0,l=0,F=!1,u=e.replace(/\D/g,""),d=u.length-1;d>=0;d--){var r=u.charAt(d);l=parseInt(r,10),F&&(l*=2)>9&&(l-=9),i+=l,F=!F}n=i%10===0}return _showValidateMsg(a,t,n)}function _fnValidIpv4(a,t){var e=$(a).val(),n=0===e.length;n||(n=/^(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)$/i.test(e)&&_.every(e.split("."),function(a){return a.length>1?!a.beginsWith("0"):!0})),_showValidateMsg(a,t,n)}function _fnValidIpv6(a,t){var e=$(a).val(),n=0===e.length;n||(n=/^((([0-9A-Fa-f]{1,4}:){7}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){6}:[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){5}:([0-9A-Fa-f]{1,4}:)?[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){4}:([0-9A-Fa-f]{1,4}:){0,2}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){3}:([0-9A-Fa-f]{1,4}:){0,3}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){2}:([0-9A-Fa-f]{1,4}:){0,4}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){6}((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|(([0-9A-Fa-f]{1,4}:){0,5}:((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|(::([0-9A-Fa-f]{1,4}:){0,5}((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|([0-9A-Fa-f]{1,4}::([0-9A-Fa-f]{1,4}:){0,5}[0-9A-Fa-f]{1,4})|(::([0-9A-Fa-f]{1,4}:){0,6}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){1,7}:))$/i.test(e)),_showValidateMsg(a,t,n)}function _fnValidIpAddress(a,t){var e=$(a).val(),n=0===e.length;if(!n){var i=e,l=klib.toInt($(a).data("validateIpaddressOctates")||4)-1,F=new RegExp("^(([01]?[0-9]?[0-9]|2([0-4][0-9]|5[0-5]))\\.){"+l+"}([01]?[0-9]?[0-9]|2([0-4][0-9]|5[0-5]))$","g");n=F.test(i)&&_.every(i.split("."),function(a){return a.length>1?!a.beginsWith("0"):!0}),_showValidateMsg(a,t,n);var u=$(a).data("validateIpaddressClass");if(n&&u){var d=i.split("."),r={A:{oct1:{B:0,E:127},oct2:{B:0,E:256},oct3:{B:0,E:256},oct4:{B:1,E:255}},B:{oct1:{B:127,E:192},oct2:{B:1,E:256},oct3:{B:0,E:256},oct4:{B:0,E:255}},C:{oct1:{B:191,E:224},oct2:{B:0,E:256},oct3:{B:1,E:256},oct4:{B:1,E:255}},D:{oct1:{B:223,E:240},oct2:{B:0,E:256},oct3:{B:0,E:256},oct4:{B:0,E:256}},E:{oct1:{B:239,E:255},oct2:{B:0,E:256},oct3:{B:0,E:256},oct4:{B:0,E:255}}};n=1*d[0]>r[u].oct1.B&&1*d[0]<r[u].oct1.E&&1*d[1]>=r[u].oct2.B&&1*d[1]<r[u].oct2.E&&1*d[2]>=r[u].oct3.B&&1*d[2]<r[u].oct3.E&&1*d[3]>r[u].oct4.B&&1*d[3]<r[u].oct4.E?!0:!1,_showValidateMsg(a,t,n)}}return n}function _fnValidSubnet(a,t){var e=$(a).val(),n=0===e.length;if(!n){var i=new RegExp("^((128|192|224|240|248|252|254)\\.0\\.0\\.0)|(255\\.(((0|128|192|224|240|248|252|254)\\.0\\.0)|(255\\.(((0|128|192|224|240|248|252|254)\\.0)|255\\.(0|128|192|224|240|248|252|254)))))$");n=i.test(e)&&_.every(e.split("."),function(a){return a.length>1?!a.beginsWith("0"):!0})}return _showValidateMsg(a,t,n)}function _fnValidPhoneUS(a,t){var e=$(a).val(),n=0===e.length;return n||(n=e.length>9&&e.match(/^(\+?1-?)?(\([2-9]\d{2}\)|[2-9]\d{2})-?[2-9]\d{2}-?\d{4}$/)),_showValidateMsg(a,t,n)}function _showValidateMsg(a,t,e,n){t=t||"",arguments.length>2&&_.isString(e)&&(n=e),arguments.length>2&&_.isBoolean(e)&&e&&(t=""),n=n||_validateAlertTemplate,a=$($(a).data("validateMsgEl")||a).get(0);var i=$(a).next(),l="";if($(i).attr("class")===$(n).attr("class")){if(t.beginsWith("i18n:","i")){var F=t.replace(/i18n:/gi,"");l="{html:'"+F+"'}",t=$.i18n.prop(F)}_isOnOfflineValidation||($(i).data("i18n",l),$(i).html(t))}else klib.isBlank(t)||($(n).insertAfter($(a)),_showValidateMsg(a,t,e,n));return e}function _clearValidateMsg(a){return _showValidateMsg(a),!0}var _isOnOfflineValidation,_validateAlertTemplate='<div class="errortxt break-txt" data-i18n=""></div>',_check={required:_fnRequired,digits:_fnValidDigits,numbers:_fnValidNumbers,integer:_fnValidInteger,alphabet:_fnValidAlpha,alphanumeric:_fnValidAlphaNumeric,pattern:_fnValidPatternMatch,range:_fnValidValueRange,fixedlength:_fnValidLengths,minlength:_fnValidLengthMin,maxlength:_fnValidLengthMax,email:_fnValidEmail,url:_fnValidUrl,date:_isValidDate,cardno:_fnValidCardNo,ipv4:_fnValidIpv4,ipv6:_fnValidIpv6,ipaddress:_fnValidIpAddress,subnetmask:_fnValidSubnet,phoneUS:_fnValidPhoneUS,wordsize:_fnValidWordSize},_offlineValidationRules={};klib.initDataValidation=function(a){var t=function(a){return a=a||{},_.each(_.keys(a),function(t){t.indexOf("_")>0&&(_.each(t.split("_"),function(e){a[e]?_.isArray(a[e])?a[e].push(a[t]):a[e]=[a[e],a[t]]:a[e]=[a[t]]}),delete a[t])}),a};a=a||"body";var e,n,i,l,F,u=$(a),d=u.data("validateElFilter")||"",r=t(klib.toJSON(u.data("validateCommon")||"{}")),f=u.data("offlineValidationStoreKey")||"",s=!klib.isBlank(f);s&&(_offlineValidationRules[f]={rules:{}}),u.find(d+"[data-validate]").each(function(a,u){var d=$(u).prop("id"),o={},g=$(u).data("validate");if(g&&g.indexOf("{")<0){var c=($(u).data("validateEvents")||"onBlur").replace(/[^a-z]/gi," ").normalizeStr().replace(/ /g,"_"),v=",offline:"+($(u).data("validateOffline")||"false"),h="{fn:"+g.replace(/[,;]/," ").normalizeStr().replace(/ /g,v+"},{fn:")+v+"}";g="{"+c+":["+h+"]}"}o=t(klib.toJSON(g)),_.each(_.keys(r),function(a){var t=r[a];_.isArray(t)||(t=[t]),_.each(t,function(t){if(e=!0,n="<",l=t.offline||!1,i=!1,t.el){var u=t.el.replace(/ /g,"").split(","),r=t.el.replace(/[< >!]/g,"").split(","),f=_.indexOf(r,d);e=f>=0,e&&(n=u[f].indexOf(">")>=0?">":"<",i=u[f].indexOf("!")>=0)}else t.ex&&(e=_.indexOf(t.ex.replace(/[< >!]/g,"").split(","),d)<0);e&&(F=_.omit(t,["el","ex"]),i&&(F=_.extend(F,{offline:!l})),o[a]||(o[a]=[]),o[a]="<"===n?_.union([F],o[a]):_.union(o[a],[F]))})}),_.each(_.keys(o),function(a){var t=a.substring(2,3).toLowerCase()+a.substring(3);_.isArray(o[a])||(o[a]=[o[a]]),s&&_.each(o[a],function(a){a.offline&&(_offlineValidationRules[f].rules[d]||(_offlineValidationRules[f].rules[d]=[]),_.indexOf(_offlineValidationRules[f].rules[d],a.fn)<0&&_offlineValidationRules[f].rules[d].push(a.fn))}),$(u).on(t,function(){_.every(o[a],function(a){return _.isArray(a)?_.every(a,function(a){return a.fn(u,a.msg||$(u).data("validateMsg")||"")}):a.fn(u,a.msg||$(u).data("validateMsg")||"")})})})})},klib.doDataValidation=function(a){var t=a.replace(/#/g,""),e="#"+t,n=$(e),i={};if(_offlineValidationRules[t]){var l=_offlineValidationRules[t].rules,F=function(a){var t=n.find("#"+a),e=klib.toBoolean(t.data("ignoreValidationIfInvisible"))&&!t.is(":visible");return e||(e=_.every(l[a],function(a){var e=a(t);return e||(i={errcode:2,el:t,fn:a}),e})),e};if($.isEmptyObject(l))i={errcode:1,errmsg:"Rules not found in scope ["+a+"]."};else{_isOnOfflineValidation=!0;_.every(_.keys(l),function(a){return F(a)});_isOnOfflineValidation=!1}}else i={errcode:1,errmsg:"Scope not found."};return i};