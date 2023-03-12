// [ip-num]  Version: 1.5.0. Released on: Friday, December 2nd, 2022, 5:47:08 PM  
 var ipnum=function(t){var e={};function i(r){if(e[r])return e[r].exports;var n=e[r]={i:r,l:!1,exports:{}};return t[r].call(n.exports,n,n.exports,i),n.l=!0,n.exports}return i.m=t,i.c=e,i.d=function(t,e,r){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},i.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(i.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)i.d(r,n,function(e){return t[e]}.bind(null,n));return r},i.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="",i(i.s=9)}([function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.matchingBitCount=e.intLog2=e.cidrPrefixToMaskBinaryString=e.leftPadWithZeroBit=e.dottedDecimalNotationToBinaryString=e.parseBinaryStringToBigInt=e.decimalNumberToOctetString=e.numberToBinaryString=void 0,e.numberToBinaryString=t=>t.toString(2),e.decimalNumberToOctetString=t=>{let i=e.numberToBinaryString(t);if(i.length>8)throw new Error("Given decimal in binary contains digits greater than an octet");return e.leftPadWithZeroBit(i,8)},e.parseBinaryStringToBigInt=t=>BigInt("0b"+t),e.dottedDecimalNotationToBinaryString=t=>t.split(".").reduce((t,i)=>t.concat(e.decimalNumberToOctetString(parseInt(i))),""),e.leftPadWithZeroBit=(t,e)=>{if(t.length>e)throw new Error("Given string is already longer than given final length after padding: "+e);return"0".repeat(e-t.length).concat(t)},e.cidrPrefixToMaskBinaryString=(t,e)=>{let i;if(i="IPv4"==e?32:128,t>i)throw Error("Value is greater than "+i);return`${"1".repeat(t)}${"0".repeat(i-t)}`},e.intLog2=t=>{let e=0;for(;t%2n===0n;){if(2n===t){e++;break}if((t>>=1n)%2n!==0n){e=0;break}e++}if(0==e)throw new Error(`The value of log2 for ${t.toString()} is not an integer`);return e},e.matchingBitCount=(t,e)=>{let i,r;t.length>=e.length?(i=t,r=e):(i=e,r=t);let n=0;for(;n<i.length&&i.charAt(n)===r.charAt(n);n++);return n}},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.Validator=void 0;const r=i(0),n=i(0),a=i(3),s=i(2),o=i(2);class g{static isWithinRange(t,e,i){return t>=e&&t<=i}static isValidAsnNumber(t){let e=this.isWithinRange(t,0n,this.THIRTY_TWO_BIT_SIZE);return[e,e?[]:[g.invalidAsnRangeMessage]]}static isValid16BitAsnNumber(t){let e=g.isWithinRange(t,0n,g.SIXTEEN_BIT_SIZE);return[e,e?[]:[g.invalid16BitAsnRangeMessage]]}static isValidIPv4Number(t){t="bigint"==typeof t?t:BigInt(t);let e=this.isWithinRange(t,0n,this.THIRTY_TWO_BIT_SIZE);return e?[e,[]]:[e,[g.invalidIPv4NumberMessage]]}static isValidIPv6Number(t){let e=this.isWithinRange(t,0n,this.ONE_HUNDRED_AND_TWENTY_EIGHT_BIT_SIZE);return e?[e,[]]:[e,[g.invalidIPv6NumberMessage]]}static isValidIPv4Octet(t){let e=this.isWithinRange(t,0n,this.EIGHT_BIT_SIZE);return[e,e?[]:[g.invalidOctetRangeMessage]]}static isValidIPv6Hexadecatet(t){let e=this.isWithinRange(t,0n,this.SIXTEEN_BIT_SIZE);return e?[e,[]]:[e,[g.invalidHexadecatetMessage]]}static isValidIPv4String(t){let e=t.split(".");if(4!=e.length||e.includes(""))return[!1,[g.invalidOctetCountMessage]];let i=e.every(t=>!!g.isNumeric(t)&&g.isValidIPv4Octet(BigInt(t))[0]);return i?(i=g.IPV4_PATTERN.test(t),[i,i?[]:[g.invalidIPv4PatternMessage]]):[!1,[g.invalidOctetRangeMessage]]}static isValidIPv6String(t){try{let e=a.expandIPv6Number(t).split(":");if(8!=e.length)return[!1,[g.invalidHexadecatetCountMessage]];let i=e.every(t=>!!g.isHexadecatet(t)&&g.isValidIPv6Hexadecatet(BigInt("0x"+t))[0]);return i?(i=g.IPV6_PATTERN.test(t),[i,i?[]:[g.invalidIPv6PatternMessage]]):[!1,[g.invalidHexadecatetMessage]]}catch(t){return[!1,[t]]}}static isValidPrefixValue(t,e){if("IPv4"===e){let e=g.isWithinRange(BigInt(t),0n,32n);return[e,e?[]:[g.invalidPrefixValueMessage]]}if("IPv6"===e){let e=g.isWithinRange(BigInt(t),0n,128n);return[e,e?[]:[g.invalidPrefixValueMessage]]}return[!1,[g.invalidInetNumType]]}static isValidIPv4Mask(t){let e=r.dottedDecimalNotationToBinaryString(t),i=g.IPV4_CONTIGUOUS_MASK_BIT_PATTERN.test(e);return i?[i,[]]:[i,[g.invalidMaskMessage]]}static isValidIPv6Mask(t){let e=o.hexadectetNotationToBinaryString(t),i=g.IPV6_CONTIGUOUS_MASK_BIT_PATTERN.test(e);return i?[i,[]]:[i,[g.invalidMaskMessage]]}static isValidIPv4CidrNotation(t){let e=t.split("/");if(2!==e.length||0===e[0].length||0===e[1].length)return[!1,[g.invalidIPv4CidrNotationMessage]];let i=e[0],r=e[1];if(isNaN(Number(r)))return[!1,[g.invalidIPv4CidrNotationMessage]];let[n,a]=g.isValidIPv4String(i),[s,o]=g.isValidPrefixValue(BigInt(r),"IPv4"),l=n&&s,u=a.concat(o);return l?[l,[]]:[l,u]}static isValidIPv4CidrRange(t){return g.isValidCidrRange(t,g.isValidIPv4CidrNotation,r.dottedDecimalNotationToBinaryString,t=>n.cidrPrefixToMaskBinaryString(t,"IPv4"))}static isValidIPv6CidrRange(t){return g.isValidCidrRange(t,g.isValidIPv6CidrNotation,s.colonHexadecimalNotationToBinaryString,t=>n.cidrPrefixToMaskBinaryString(t,"IPv6"))}static isValidCidrRange(t,e,i,r){let n=e(t);if(!n[0])return n;let a=t.split("/"),s=a[0],o=a[1],l=BigInt("0b"+i(s)),u=(l&BigInt("0b"+r(parseInt(o))))===l;return u?[u,[]]:[u,[g.InvalidIPCidrRangeMessage]]}static isValidIPv4RangeString(t){return this.isValidRange(t,g.isValidIPv4String,(t,e)=>BigInt("0b"+r.dottedDecimalNotationToBinaryString(t))>=BigInt("0b"+r.dottedDecimalNotationToBinaryString(e)))}static isValidIPv6RangeString(t){return this.isValidRange(t,g.isValidIPv6String,(t,e)=>BigInt("0b"+o.hexadectetNotationToBinaryString(t))>=BigInt("0b"+o.hexadectetNotationToBinaryString(e)))}static isValidRange(t,e,i){let r=t.split("-").map(t=>t.trim());if(2!==r.length||0===r[0].length||0===r[1].length)return[!1,[g.invalidRangeNotationMessage]];let n=r[0],a=r[1],[s,o]=e(n),[l,u]=e(a),d=s&&l;if(d&&i(n,a))return[!1,[g.invalidRangeFirstNotGreaterThanLastMessage]];let h=o.concat(u);return d?[d,[]]:[d,h]}static isValidIPv6CidrNotation(t){let e=g.IPV6_RANGE_PATTERN.test(t);return e?[e,[]]:[e,[g.invalidIPv6CidrNotationString]]}static isValidBinaryString(t){return/^([10])+$/.test(t)?[!0,[]]:[!1,[g.invalidBinaryStringErrorMessage]]}static isNumeric(t){return/^(\d+)$/.test(t)}static isHexadecatet(t){return/^[0-9A-Fa-f]{4}$/.test(t)}}e.Validator=g,g.IPV4_PATTERN=new RegExp(/^(0?[0-9]?[0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\.(0?[0-9]?[0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\.(0?[0-9]?[0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\.(0?[0-9]?[0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])$/),g.IPV6_PATTERN=new RegExp(/^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/),g.IPV4_RANGE_PATTERN=new RegExp(/^(0?[0-9]?[0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\.(0?[0-9]?[0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\.(0?[0-9]?[0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\.(0?[0-9]?[0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])(\/)([1-9]|[1-2][0-9]|3[0-2])$/),g.IPV6_RANGE_PATTERN=new RegExp(/^s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]d|1dd|[1-9]?d)(.(25[0-5]|2[0-4]d|1dd|[1-9]?d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]d|1dd|[1-9]?d)(.(25[0-5]|2[0-4]d|1dd|[1-9]?d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]d|1dd|[1-9]?d)(.(25[0-5]|2[0-4]d|1dd|[1-9]?d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]d|1dd|[1-9]?d)(.(25[0-5]|2[0-4]d|1dd|[1-9]?d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]d|1dd|[1-9]?d)(.(25[0-5]|2[0-4]d|1dd|[1-9]?d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]d|1dd|[1-9]?d)(.(25[0-5]|2[0-4]d|1dd|[1-9]?d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]d|1dd|[1-9]?d)(.(25[0-5]|2[0-4]d|1dd|[1-9]?d)){3}))|:)))(%.+)?s*(\/([0-9]|[1-9][0-9]|1[0-1][0-9]|12[0-8]))?$/),g.IPV4_CONTIGUOUS_MASK_BIT_PATTERN=new RegExp(/^(1){0,32}(0){0,32}$/),g.IPV6_CONTIGUOUS_MASK_BIT_PATTERN=new RegExp(/^(1){0,128}(0){0,128}$/),g.EIGHT_BIT_SIZE=BigInt("0b"+"1".repeat(8)),g.SIXTEEN_BIT_SIZE=BigInt("0b"+"1".repeat(16)),g.THIRTY_TWO_BIT_SIZE=BigInt("0b"+"1".repeat(32)),g.ONE_HUNDRED_AND_TWENTY_EIGHT_BIT_SIZE=BigInt("0b"+"1".repeat(128)),g.IPV4_SIZE=BigInt("4294967296"),g.IPV6_SIZE=BigInt("340282366920938463463374607431768211456"),g.invalidAsnRangeMessage="ASN number given less than zero or is greater than 32bit",g.invalid16BitAsnRangeMessage="ASN number given less than zero or is greater than 16bit",g.invalidIPv4NumberMessage="IPv4 number given less than zero or is greater than 32bit",g.invalidIPv6NumberMessage="IPv6 number given less than zero or is greater than 128bit",g.invalidOctetRangeMessage="Value given contains an invalid Octet; Value is less than zero or is greater than 8bit",g.invalidHexadecatetMessage="The value given is less than zero or is greater than 16bit",g.invalidOctetCountMessage="An IP4 number cannot have less or greater than 4 octets",g.invalidHexadecatetCountMessage="An IP6 number must have exactly 8 hexadecatet",g.invalidMaskMessage="The Mask is invalid",g.invalidPrefixValueMessage="A Prefix value cannot be less than 0 or greater than 32",g.invalidIPv4CidrNotationMessage="Cidr notation should be in the form [ip number]/[range]",g.InvalidIPCidrRangeMessage="Given IP number portion must is not the start of the range",g.invalidRangeNotationMessage="Range notation should be in the form [first ip]-[last ip]",g.invalidRangeFirstNotGreaterThanLastMessage="First IP in [first ip]-[last ip] must be less than Last IP",g.invalidIPv6CidrNotationString="A Cidr notation string should contain an IPv6 number and prefix",g.takeOutOfRangeSizeMessage="$count is greater than $size, the size of the range",g.cannotSplitSingleRangeErrorMessage="Cannot split an IP range with a single IP number",g.invalidInetNumType="Given ipNumType must be either InetNumType.IPv4 or InetNumType.IPv6",g.invalidBinaryStringErrorMessage="Binary string should contain only contiguous 1s and 0s",g.invalidIPRangeSizeMessage="Given size is zero or greater than maximum size of $iptype",g.invalidIPRangeSizeForCidrMessage="Given size can't be created via cidr prefix",g.invalidIPv4PatternMessage="Given IPv4 is not confirm to a valid IPv6 address",g.invalidIPv6PatternMessage="Given IPv6 is not confirm to a valid IPv6 address"},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.hexadectetNotationToBinaryString=e.binaryStringToHexadecimalString=e.colonHexadecimalNotationToBinaryString=e.hexadecimalStringToHexadecatetString=e.hexadecimalStringToBinaryString=e.bigIntToHexadecimalString=void 0;const r=i(3),n=i(0);e.bigIntToHexadecimalString=t=>t.toString(16),e.hexadecimalStringToBinaryString=t=>BigInt("0x"+t).toString(2),e.hexadecimalStringToHexadecatetString=t=>{let i=e.hexadecimalStringToBinaryString(t);if(i.length>16)throw new Error("Given decimal in binary contains digits greater than an Hexadecatet");return n.leftPadWithZeroBit(i,16)},e.colonHexadecimalNotationToBinaryString=t=>r.expandIPv6Number(t).split(":").reduce((t,i)=>t.concat(e.hexadecimalStringToHexadecatetString(i)),""),e.binaryStringToHexadecimalString=t=>BigInt("0b"+t).toString(16),e.hexadectetNotationToBinaryString=t=>r.expandIPv6Number(t).split(":").reduce((t,i)=>t.concat(n.leftPadWithZeroBit(e.hexadecimalStringToBinaryString(i),16)),"")},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.collapseIPv6Number=e.expandIPv6Number=void 0;const r=i(0),n=i(1);let a=t=>t.includes("/")?"/"+t.split("/")[1]:"";e.expandIPv6Number=t=>{let e=t=>t.map(t=>r.leftPadWithZeroBit(t,4)).join(":");if(/(:){3,}/.test(t))throw"given IPv6 contains consecutive : more than two";const i=a(t);if(t.includes("/")&&(t=t.split("/")[0]),!n.Validator.IPV6_PATTERN.test(t))throw Error(n.Validator.invalidIPv6PatternMessage);if(t.includes("::")){let r=t.split("::"),n=r[0],a=r[1],s=n.split(":").filter(t=>""!==t),o=a.split(":").filter(t=>""!==t),g=(t=>{let e=[];for(let i=0;i<t;i++)e.push("0000");return e.join(":")})(8-(s.length+o.length)),l=e(s);""!==l&&(l+=":");let u=e(o);return""!==u&&(u=":"+u),`${l}${g}${u}${i}`}return`${e(t.split(":"))}${i}`},e.collapseIPv6Number=t=>{const e=a(t);if(t.includes("/")&&(t=t.split("/")[0]),!n.Validator.IPV6_PATTERN.test(t))throw Error(n.Validator.invalidIPv6PatternMessage);let i=t.split(":").map(t=>{let e=t.replace(/^0+/,"");return""!==e?e:"0"}).join(":").replace(/((^0)?(:0){2,}|(^0)(:0){1,})/,":");return":"===i.slice(-1)?`${i}:${e}`:(i=i.replace(":0:","::"),`${i}${e}`)}},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.Hexadecatet=void 0;const r=i(1);class n{constructor(t){let e;e="string"==typeof t?parseInt(t,16):parseInt(String(t),16);let[i,n]=r.Validator.isValidIPv6Hexadecatet(BigInt(e));if(!i)throw Error(n.filter(t=>""!==t).toString());this.value=e}static fromString(t){return new n(t)}static fromNumber(t){return new n(t)}getValue(){return this.value}toString(){return this.value.toString(16)}}e.Hexadecatet=n},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.isIPv4=e.IPv6Mask=e.IPv4Mask=e.IPv6=e.Asn=e.IPv4=e.AbstractIPNum=void 0;const r=i(7),n=i(1),a=i(0),s=i(0),o=i(0),g=i(0),l=i(4),u=i(2),d=i(3),h=i(2);class c{getValue(){return this.value}toBinaryString(){return o.leftPadWithZeroBit(this.value.toString(2),this.bitSize)}hasNext(){return this.value<this.maximumBitSize}hasPrevious(){return this.value>0n}isEquals(t){return this.value===t.value}isLessThan(t){return this.value<t.value}isGreaterThan(t){return this.value>t.value}isLessThanOrEquals(t){return this.value<=t.value}isGreaterThanOrEquals(t){return this.value>=t.value}}e.AbstractIPNum=c;class f extends c{constructor(t){if(super(),this.bitSize=32,this.maximumBitSize=n.Validator.THIRTY_TWO_BIT_SIZE,this.type="IPv4",this.octets=[],this.separator=".","string"==typeof t){let[e,i]=this.constructFromDecimalDottedString(t);this.value=e,this.octets=i}else{let[e,i]=this.constructFromBigIntValue(t);this.value=e,this.octets=i}}static fromNumber(t){return new f(t)}static fromDecimalDottedString(t){return new f(t)}static fromString(t){return f.fromDecimalDottedString(t)}static fromBinaryString(t){let e=n.Validator.isValidBinaryString(t);if(e[0])return new f(s.parseBinaryStringToBigInt(t));throw Error(e[1].join(","))}toString(){return this.octets.map(t=>t.toString()).join(this.separator)}getOctets(){return this.octets}nextIPNumber(){return f.fromNumber(this.getValue()+1n)}previousIPNumber(){return f.fromNumber(this.getValue()-1n)}toIPv4MappedIPv6(){let t="1".repeat(16)+this.toBinaryString();return I.fromBinaryString(t)}constructFromDecimalDottedString(t){let e,i,[s,o]=n.Validator.isValidIPv4String(t);if(!s)throw new Error(o.filter(t=>""!==t).toString());return e=t.split(".").map(t=>r.Octet.fromString(t)),i=BigInt("0b"+a.dottedDecimalNotationToBinaryString(t)),[i,e]}constructFromBigIntValue(t){let[e,i]=n.Validator.isValidIPv4Number(t);if(!e)throw new Error(i.filter(t=>""!==t).toString());let r=g.numberToBinaryString(t);return[t="bigint"==typeof t?t:BigInt(t),this.binaryStringToDecimalOctets(r)]}binaryStringToDecimalOctets(t){return t.length<32&&(t=o.leftPadWithZeroBit(t,32)),t.match(/.{1,8}/g).map(t=>r.Octet.fromString(s.parseBinaryStringToBigInt(t).toString()))}}e.IPv4=f;class v extends c{constructor(t){if(super(),this.bitSize=32,this.maximumBitSize=n.Validator.THIRTY_TWO_BIT_SIZE,this.type="ASN","string"==typeof t)v.startWithASPrefix(t)?this.value=BigInt(parseInt(t.substring(2))):-1!=t.indexOf(".")?this.value=BigInt(this.parseFromDotNotation(t)):this.value=BigInt(parseInt(t));else{let e=BigInt(t),[i,r]=n.Validator.isValidAsnNumber(e);if(!i)throw Error(r.filter(t=>""!==t).toString());this.value=e}}static fromString(t){return new v(t)}static fromNumber(t){return new v(t)}static fromBinaryString(t){let e=n.Validator.isValidBinaryString(t);if(e[0])return new v(parseInt(t,2));throw Error(e[1].join(","))}toString(){let t=this.value.toString();return`${v.AS_PREFIX}${t}`}toASPlain(){return this.value.toString()}toASDot(){return this.value.valueOf()>=65536n?this.toASDotPlus():this.toASPlain()}toASDotPlus(){let t=this.value.valueOf()/65535n;return`${t}.${this.value.valueOf()%65535n-t}`}toBinaryString(){return g.numberToBinaryString(this.value)}is16Bit(){let[t]=n.Validator.isValid16BitAsnNumber(this.value);return t}is32Bit(){return!this.is16Bit()}nextIPNumber(){return new v(this.value.valueOf()+1n)}previousIPNumber(){return new v(this.value.valueOf()-1n)}static startWithASPrefix(t){return 0===t.indexOf(v.AS_PREFIX)}parseFromDotNotation(t){let e=t.split("."),i=parseInt(e[0]);return 65535*i+(parseInt(e[1])+i)}}e.Asn=v,v.AS_PREFIX="AS";class I extends c{constructor(t){if(super(),this.bitSize=128,this.maximumBitSize=n.Validator.ONE_HUNDRED_AND_TWENTY_EIGHT_BIT_SIZE,this.type="IPv6",this.hexadecatet=[],this.separator=":","string"==typeof t){let e=d.expandIPv6Number(t),[i,r]=this.constructFromHexadecimalDottedString(e);this.value=i,this.hexadecatet=r}else{let[e,i]=this.constructFromBigIntValue(t);this.value=e,this.hexadecatet=i}}static fromBigInt(t){return new I(t)}static fromHexadecatet(t){return new I(t)}static fromString(t){return I.fromHexadecatet(t)}static fromBinaryString(t){let e=n.Validator.isValidBinaryString(t);if(e[0]){let e=o.leftPadWithZeroBit(t,128);return new I(s.parseBinaryStringToBigInt(e))}throw Error(e[1].join(","))}static fromIPv4(t){return t.toIPv4MappedIPv6()}static fromIPv4DotDecimalString(t){return new f(t).toIPv4MappedIPv6()}toString(){let t=this.hexadecatet.map(t=>t.toString()).join(":");return this.hexadecatet.length<8?"::"+t:t}getHexadecatet(){return this.hexadecatet}nextIPNumber(){return I.fromBigInt(this.getValue()+1n)}previousIPNumber(){return I.fromBigInt(this.getValue()-1n)}constructFromBigIntValue(t){let[e,i]=n.Validator.isValidIPv6Number(t);if(!e)throw new Error(i.filter(t=>""!==t).toString());let r=g.numberToBinaryString(t);return[t,this.binaryStringToHexadecatets(r)]}constructFromHexadecimalDottedString(t){let[e,i]=n.Validator.isValidIPv6String(t);if(!e)throw new Error(i.filter(t=>""!==t).toString());let r=t.split(":").map(t=>l.Hexadecatet.fromString(t));return[BigInt("0b"+h.hexadectetNotationToBinaryString(t)),r]}binaryStringToHexadecatets(t){let e=u.binaryStringToHexadecimalString(t);for(;e.length%4!=0;)e="0"+e;return e.match(/.{1,4}/g).map(t=>l.Hexadecatet.fromString(t))}}e.IPv6=I;class S extends f{constructor(t){let e,i;if(super(t),this.octets=[],[e,i]=n.Validator.isValidIPv4Mask(t),!e)throw new Error(i.filter(t=>""!==t).toString());let s=t.split(".");this.octets=s.map(t=>r.Octet.fromString(t));let o=a.dottedDecimalNotationToBinaryString(t);this.prefix=(o.match(/1/g)||[]).length,this.value=BigInt("0b"+o)}static fromDecimalDottedString(t){return new S(t)}}e.IPv4Mask=S;class P extends I{constructor(t){let e,i;if(super(t),this.hexadecatet=[],[e,i]=n.Validator.isValidIPv6Mask(t),!e)throw new Error(i.filter(t=>""!==t).toString());let r=t.split(":");this.hexadecatet=r.map(t=>l.Hexadecatet.fromString(t));let a=h.hexadectetNotationToBinaryString(t);this.prefix=(a.match(/1/g)||[]).length,this.value=BigInt("0b"+a),this.value=BigInt("0b"+h.hexadectetNotationToBinaryString(t))}static fromHexadecatet(t){return new P(t)}}e.IPv6Mask=P,e.isIPv4=function(t){return 32===t.bitSize}},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.isIPv4Prefix=e.IPv6Prefix=e.IPv4Prefix=void 0;const r=i(1),n=i(5),a=i(0),s=i(2),o=i(4);class g{constructor(t){let e,i;if(this.type="IPv4",this.bitValue=32n,[e,i]=r.Validator.isValidPrefixValue(t,"IPv4"),!e)throw new Error(i.filter(t=>""!==t).toString());this.value=t}static fromNumber(t){return new g(t)}static fromRangeSize(t){let e=1n===t?32:32-u(t,r.Validator.IPV4_SIZE);return g.fromNumber(BigInt(e))}getValue(){return this.value}toString(){return this.value.toString()}toMask(){let t="1".repeat(Number(this.value)),e="0".repeat(Number(32n-this.value));return n.IPv4Mask.fromDecimalDottedString(this.toDecimalNotation(`${t}${e}`))}toRangeSize(){return 1n<<this.bitValue-this.getValue()}merge(){return new g(this.value-1n)}split(){return new g(this.value+1n)}toDecimalNotation(t){return`${a.parseBinaryStringToBigInt(t.substr(0,8))}.${a.parseBinaryStringToBigInt(t.substr(8,8))}.${a.parseBinaryStringToBigInt(t.substr(16,8))}.${a.parseBinaryStringToBigInt(t.substr(24,8))}`}}e.IPv4Prefix=g;class l{constructor(t){let e,i;if(this.type="IPv6",this.bitValue=128n,[e,i]=r.Validator.isValidPrefixValue(t,"IPv6"),!e)throw new Error(i.filter(t=>""!==t).toString());this.value=t}static fromNumber(t){return new l(t)}static fromRangeSize(t){let e=1n===t?128:128-u(t,r.Validator.IPV6_SIZE);return l.fromNumber(BigInt(e))}getValue(){return this.value}toString(){return this.value.toString()}toMask(){let t="1".repeat(Number(this.value)),e="0".repeat(128-Number(this.value));return n.IPv6Mask.fromHexadecatet(this.toHexadecatetNotation(`${t}${e}`))}toRangeSize(){return 1n<<this.bitValue-this.getValue()}merge(){return new l(this.value-1n)}split(){return new l(this.value+1n)}toHexadecatetNotation(t){return t.match(/.{1,16}/g).map(t=>o.Hexadecatet.fromString(s.binaryStringToHexadecimalString(t))).map(t=>t.toString()).join(":")}}function u(t,e){let i=e>r.Validator.IPV4_SIZE?"IPv6":"IPv4";if(t>e||0n===t)throw new Error(r.Validator.invalidIPRangeSizeMessage.replace("$iptype",i));try{return a.intLog2(t)}catch(t){throw new Error(r.Validator.invalidIPRangeSizeForCidrMessage)}}e.IPv6Prefix=l,e.isIPv4Prefix=function(t){return"IPv4"===t.type}},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.Octet=void 0;const r=i(1);class n{constructor(t){let e;e="string"==typeof t?parseInt(t):t;let[i,n]=r.Validator.isValidIPv4Octet(BigInt(e));if(!i)throw Error(n.filter(t=>""!==t).toString());this.value=e}static fromString(t){return new n(t)}static fromNumber(t){return new n(t)}getValue(){return this.value}toString(){return this.value.toString(10)}}e.Octet=n},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.isIPv4CidrRange=e.IPv6CidrRange=e.IPv4CidrRange=e.AbstractIPRange=e.RangedSet=void 0;const r=i(5),n=i(6),a=i(0),s=i(1);class o{constructor(t,e){if(this.first=t,this.last=e,t.isGreaterThan(e))throw new Error(`${t.toString()} should be lower than ${e.toString()}`);this.currentValue=t,this.bitValue=BigInt(t.bitSize)}static fromSingleIP(t){return new o(t,t)}static fromCidrRange(t){return new o(t.getFirst(),t.getLast())}static fromRangeString(t){let e=t.split("-").map(t=>t.trim());if(2!==e.length)throw new Error("Argument should be in the format firstip-lastip");let[i,n]=e,[a]=s.Validator.isValidIPv4String(i),[g]=s.Validator.isValidIPv4String(n),[l]=s.Validator.isValidIPv6String(i),[u]=s.Validator.isValidIPv6String(n);if(a&&g)return new o(r.IPv4.fromDecimalDottedString(i),r.IPv4.fromDecimalDottedString(n));if(l&&u)return new o(r.IPv6.fromHexadecatet(i),r.IPv6.fromHexadecatet(n));throw new Error("First IP and Last IP should be valid and same type")}getFirst(){return this.first}getLast(){return this.last}getSize(){return this.last.getValue()-this.first.getValue()+1n}toRangeString(){return`${this.getFirst()}-${this.getLast()}`}inside(t){return t.contains(this)}contains(t){let e=this.getFirst(),i=this.getLast(),r=t.getFirst(),n=t.getLast();return e.isLessThanOrEquals(r)&&i.isGreaterThanOrEquals(n)}isEquals(t){return this.getFirst().isEquals(t.getFirst())&&this.getLast().isEquals(t.getLast())}isLessThan(t){return!this.isEquals(t)&&(this.getFirst().isEquals(t.getFirst())?this.getSize()<t.getSize():this.getFirst().isLessThan(t.getFirst()))}isGreaterThan(t){return!this.isEquals(t)&&(this.getFirst().isEquals(t.getFirst())?this.getSize()>t.getSize():this.getFirst().isGreaterThan(t.getFirst()))}isOverlapping(t){let e=this.getFirst(),i=this.getLast(),r=t.getFirst(),n=t.getLast();return i.isGreaterThan(r)&&i.isLessThanOrEquals(n)&&e.isLessThan(r)||n.isGreaterThan(e)&&n.isLessThanOrEquals(i)&&r.isLessThan(e)}isCidrAble(){if(1n===this.getSize())return!0;try{let t=a.intLog2(this.getSize()),e=a.parseBinaryStringToBigInt(a.cidrPrefixToMaskBinaryString(t,r.isIPv4(this.currentValue)?"IPv4":"IPv6"));return this.first.getValue()===(e&this.first.getValue())}catch(t){return!1}}toCidrRange(){return r.isIPv4(this.currentValue)?this.toIPv4CidrRange():this.toIPv6CidrRange()}isConsecutive(t){let e=this.getFirst(),i=this.getLast(),r=t.getFirst(),n=t.getLast();return i.hasNext()&&i.nextIPNumber().isEquals(r)||n.hasNext()&&n.nextIPNumber().isEquals(e)}union(t){if(this.isEquals(t))return new o(t.getFirst(),t.getLast());if(this.isOverlapping(t))return this.getFirst().isLessThan(t.getFirst())?new o(this.getFirst(),t.getLast()):new o(t.getFirst(),this.getLast());if(this.contains(t))return new o(this.getFirst(),this.getLast());if(t.contains(this))return new o(t.getFirst(),t.getLast());throw new Error("Ranges do not overlap nor are equal")}prepend(t){if(t.getLast().nextIPNumber().isEquals(this.getFirst()))return new o(t.getFirst(),this.getLast());throw new Error("Range to prepend must be adjacent")}append(t){if(this.getLast().nextIPNumber().isEquals(t.getFirst()))return new o(this.getFirst(),t.getLast());throw new Error("Range to append must be adjacent")}subtract(t){if(!this.isOverlapping(t))throw new Error("Cannot subtract ranges that are not overlapping");if(!this.isLessThan(t))throw new Error("Cannot subtract a larger range from this range");return new o(this.getFirst(),t.getLast())}takeSubRange(t,e){if(t+e>this.getSize())throw new RangeError("Requested range is greater than what can be taken");if(0n===e)throw new Error("Sub range cannot be zero");let i=this.getFirst().value+t,n=r.isIPv4(this.getFirst())?r.IPv4.fromNumber(i):r.IPv6.fromBigInt(i),a=n.value+(e-1n),s=r.isIPv4(n)?r.IPv4.fromNumber(a):r.IPv6.fromBigInt(a);return new o(n,s)}difference(t){if(t.getSize()>this.getSize())throw new Error("Range is greater than range to be subtracted from");if(!this.contains(t))throw new Error("Range to subtract is not contained in this range");let e=[];try{e.push(new o(this.getFirst(),t.getFirst().previousIPNumber()))}catch(t){}try{e.push(new o(t.getLast().nextIPNumber(),this.getLast()))}catch(t){}return e}*take(t){let e=this.getFirst(),i=void 0===t?this.getSize().valueOf():t;for(;i>0;)i--,yield e,e=e.nextIPNumber()}*[Symbol.iterator](){yield*this.take()}toIPv4CidrRange(){let t=new l(r.IPv4.fromNumber(this.getFirst().getValue()),n.IPv4Prefix.fromRangeSize(this.getSize()));if(t.getFirst().isEquals(this.getFirst()))return t;throw new Error("Range cannot be converted to CIDR")}toIPv6CidrRange(){let t=new u(r.IPv6.fromBigInt(this.getFirst().getValue()),n.IPv6Prefix.fromRangeSize(this.getSize()));if(t.getFirst().isEquals(this.getFirst()))return t;throw new Error("Range cannot be converted to CIDR")}}e.RangedSet=o;class g{hasNextRange(){let t=this.getSize();return 2n**this.bitValue-t>=this.getFirst().getValue()+t}hasPreviousRange(){return this.getSize()<=this.getFirst().getValue()}toRangeSet(){return new o(this.getFirst(),this.getLast())}inside(t){return this.toRangeSet().inside(t.toRangeSet())}contains(t){return this.toRangeSet().contains(t.toRangeSet())}toRangeString(){return this.toRangeSet().toRangeString()}isOverlapping(t){return this.toRangeSet().isOverlapping(t.toRangeSet())}isConsecutive(t){return this.toRangeSet().isConsecutive(t.toRangeSet())}isCidrMergeable(t){const e=BigInt(a.matchingBitCount(this.getFirst().toBinaryString(),t.getFirst().toBinaryString()));return this.getPrefix().value-e===1n&&(this.isConsecutive(t)&&this.getSize()===t.getSize())}isMergeable(t){return this.isCidrMergeable(t)||this.contains(t)||this.inside(t)}isEquals(t){return this.toRangeSet().isEquals(t.toRangeSet())}merge(t){if(!this.isCidrMergeable(t))throw new Error(`Cannot merge. Ranges (${this.toRangeString()},${t.toRangeString()}) are not consecutive and/or of same size`);return this.newInstance(this.getFirst(),this.getPrefix().merge())}*takeStream(t){return this.toRangeSet().take(t)}*[Symbol.iterator](){yield*this.toRangeSet()}}e.AbstractIPRange=g;class l extends g{constructor(t,e){super(),this.ipv4=t,this.cidrPrefix=e,this.bitValue=32n}static fromCidr(t){let[e,i]=s.Validator.isValidIPv4CidrNotation(t);if(!e){let t=i.filter(t=>""!==t);throw new Error(t.join(" and "))}let a=t.split("/"),o=a[0],g=BigInt(parseInt(a[1]));return new l(r.IPv4.fromDecimalDottedString(o),n.IPv4Prefix.fromNumber(g))}getSize(){return this.cidrPrefix.toRangeSize()}toCidrString(){return`${this.ipv4.toString().toString()}/${this.cidrPrefix.toString()}`}toRangeString(){return super.toRangeString()}getFirst(){return r.IPv4.fromNumber(this.ipv4.getValue()&this.cidrPrefix.toMask().getValue())}getLast(){return d(this,this.ipv4)}newInstance(t,e){return new l(t,e)}getPrefix(){return this.cidrPrefix}isConsecutive(t){return super.isConsecutive(t)}contains(t){return super.contains(t)}inside(t){return super.inside(t)}isOverlapping(t){return super.isOverlapping(t)}take(t){let e=[this.getFirst()],i=this.getFirst();if(t>this.getSize()){let e=s.Validator.takeOutOfRangeSizeMessage.replace("$count",t.toString()).replace("$size",this.getSize().toString());throw new Error(e)}for(let r=0;r<t-1n;r++)e.push(i.nextIPNumber()),i=i.nextIPNumber();return e}split(){let t=this.cidrPrefix.getValue();if(32n===t)throw new Error("Cannot split an IP range with a single IP number");let e=n.IPv4Prefix.fromNumber(t+1n),i=this.getFirst(),r=new l(i,e),a=r.getLast().nextIPNumber();return[r,new l(a,e)]}splitInto(t){let e=t.getValue()-this.cidrPrefix.getValue();if(e<0)throw new Error("Prefix to split into is larger than source prefix");if(0n===e)return[new l(this.getFirst(),t)];if(1n===e)return this.split();{let t=this.split();for(;e>1;)t=t.flatMap(t=>t.split()),e-=1n;return t}}hasNextRange(){return super.hasNextRange()}hasPreviousRange(){return super.hasPreviousRange()}nextRange(){if(this.hasNextRange()){let t=this.getSize(),e=this.getFirst().getValue()+t;return new l(new r.IPv4(e),this.cidrPrefix)}}previousRange(){if(this.hasPreviousRange()){let t=this.getSize(),e=this.getFirst().getValue()-t;return new l(new r.IPv4(e),this.cidrPrefix)}}}e.IPv4CidrRange=l;class u extends g{constructor(t,e){super(),this.ipv6=t,this.cidrPrefix=e,this.bitValue=128n}static fromCidr(t){let[e,i]=s.Validator.isValidIPv6CidrNotation(t);if(!e)throw new Error(i.filter(t=>""!==t).toString());let a=t.split("/"),o=a[0],g=BigInt(parseInt(a[1]));return new u(r.IPv6.fromHexadecatet(o),n.IPv6Prefix.fromNumber(g))}getSize(){return this.cidrPrefix.toRangeSize()}toCidrString(){return`${this.ipv6.toString().toString()}/${this.cidrPrefix.toString()}`}toRangeString(){return super.toRangeString()}getFirst(){return r.IPv6.fromBigInt(this.ipv6.getValue()&this.cidrPrefix.toMask().getValue())}getLast(){return d(this,this.ipv6)}newInstance(t,e){return new u(t,e)}getPrefix(){return this.cidrPrefix}isConsecutive(t){return super.isConsecutive(t)}contains(t){return super.contains(t)}inside(t){return super.inside(t)}isOverlapping(t){return super.isOverlapping(t)}take(t){let e=[this.getFirst()],i=this.getFirst();if(t>this.getSize())throw new Error(`${t.toString()} is greater than ${this.getSize().toString()}, the size of the range`);for(var r=0;r<t-1n;r++)e.push(i.nextIPNumber()),i=i.nextIPNumber();return e}split(){let t=this.cidrPrefix.getValue();if(128n===t)throw new Error("Cannot split an IP range with a single IP number");let e=n.IPv6Prefix.fromNumber(t+1n),i=this.getFirst(),r=new u(i,e),a=r.getLast().nextIPNumber();return[r,new u(a,e)]}splitInto(t){let e=t.getValue()-this.cidrPrefix.getValue();if(e<0)throw new Error("Prefix to split into is larger than source prefix");if(0n===e)return[new u(this.getFirst(),t)];if(1n===e)return this.split();{let t=this.split();for(;e>1;)t=t.flatMap(t=>t.split()),e-=1n;return t}}hasNextRange(){return super.hasNextRange()}hasPreviousRange(){return super.hasPreviousRange()}nextRange(){if(this.hasNextRange()){let t=this.getSize(),e=this.getFirst().getValue()+t;return new u(new r.IPv6(e),this.cidrPrefix)}}previousRange(){if(this.hasPreviousRange()){let t=this.getSize(),e=this.getFirst().getValue()-t;return new u(new r.IPv6(e),this.cidrPrefix)}}}e.IPv6CidrRange=u;let d=(t,e)=>{let i=Number(t.bitValue.valueOf()),n=BigInt("0b"+"1".repeat(i)),s=t.cidrPrefix.toMask().getValue(),o=a.leftPadWithZeroBit((s^n).toString(2),i);return h(t)?r.IPv4.fromNumber(e.getValue()|a.parseBinaryStringToBigInt(o)):r.IPv6.fromBigInt(e.getValue()|a.parseBinaryStringToBigInt(o))};function h(t){return 32n===t.bitValue.valueOf()}e.isIPv4CidrRange=h},function(t,e,i){"use strict";var r=this&&this.__createBinding||(Object.create?function(t,e,i,r){void 0===r&&(r=i),Object.defineProperty(t,r,{enumerable:!0,get:function(){return e[i]}})}:function(t,e,i,r){void 0===r&&(r=i),t[r]=e[i]}),n=this&&this.__exportStar||function(t,e){for(var i in t)"default"===i||e.hasOwnProperty(i)||r(e,t,i)};Object.defineProperty(e,"__esModule",{value:!0}),n(i(0),e),n(i(4),e),n(i(2),e),n(i(5),e),n(i(10),e),n(i(11),e),n(i(8),e),n(i(3),e),n(i(7),e),n(i(6),e),n(i(1),e)},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0})},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.Pool=void 0;const r=i(8),n=i(6);class a{constructor(t){this.backingSet=new s,t.forEach(t=>{this.backingSet.add(t)})}static fromIP(t){let e=t.map(t=>r.RangedSet.fromSingleIP(t));return new a(e)}static fromRangeSet(t){return new a(t)}static fromCidrRanges(t){let e=t.map(t=>t.toRangeSet());return new a(e)}getRanges(){return this.backingSet.asArray()}aggregate(){let t=this.backingSet.asArray().reduce((t,e,i,r)=>{if(0==t.length)return t.push(e),t;{let i=t.pop(),r=i.toCidrRange(),n=e.toCidrRange();if(r.isCidrMergeable(n)){let e=r.merge(n);return t.push(e.toRangeSet()),t}return i.contains(e)?t.push(i):(t.push(i),t.push(e)),t}},[]),e=a.fromRangeSet(t);return e.getRanges().length!==this.getRanges().length?e.aggregate():e}getCidrRange(t){if(t.toRangeSize()>this.getSize())throw new Error("Not enough IP number in the pool for requested prefix: "+t);let e,i;t:for(let r of this.getRanges())for(let n=0n;n+t.toRangeSize()<=r.getSize();n+=1n)try{let i=r.takeSubRange(n,t.toRangeSize());e=i.toCidrRange();let a=r.difference(i);this.removeExact(r),this.add(a);break t}catch(t){if(t instanceof RangeError)continue t;i=t}if(e)return e;throw void 0===i?new Error("No range big enough in the pool for requested prefix: "+t):i}getCidrRanges(t){if(t.toRangeSize()>this.getSize())throw new Error("Prefix greater than pool");let e=(t,i,r)=>{try{let n=this.getCidrRange(i);r.push(n);let a=r.reduce((t,e)=>t+e.getSize(),0n);return t.toRangeSize()===a?r:e(t,i,r)}catch(a){let s=n.isIPv4Prefix(i)?n.IPv4Prefix.fromNumber(i.getValue()+1n):n.IPv6Prefix.fromNumber(i.getValue()+1n);return e(t,s,r)}};return e(t,t,[])}getSize(){return this.aggregate().getRanges().reduce((t,e)=>t+e.getSize(),0n)}resetWith(t){this.backingSet.clear(),this.backingSet=this.backingSet.add(t)}removeExact(t){let e=this.backingSet.removeExact(t),i=!this.backingSet.isEquals(e);return this.backingSet=e,i}removeOverlapping(t){let e=this.backingSet.removeOverlapping(t),i=!this.backingSet.isEquals(e);return this.backingSet=e,i}add(t){this.backingSet=this.backingSet.add(t)}clear(){this.backingSet.clear()}}e.Pool=a;class s{constructor(t){this.backingArray=t?this.sortArray(t):new Array}sortArray(t){return t.sort((t,e)=>t.isLessThan(e)?-1:t.isGreaterThan(e)?1:0),t}asArray(){return this.backingArray}isEquals(t){return this.backingArray.length===t.asArray().length&&this.backingArray.every((e,i)=>e.getSize()===t.asArray()[i].getSize())}add(t){let e=this.backingArray;return"push"in t?e=e.concat(t):e.push(t),new s(this.sortArray(e))}removeExact(t){let e=this.backingArray.filter(e=>"push"in t?void 0!==t.find(t=>t.isEquals(e)):!t.isEquals(e));return new s(this.sortArray(e))}removeOverlapping(t){let e=this.backingArray.flatMap(e=>{if("push"in t)return t.flatMap(t=>e.contains(t)?e.difference(t):e.inside(t)?new Array:e.isOverlapping(t)?[e.subtract(t)]:[t]);try{return e.difference(t)}catch(t){return e}});return new s(this.sortArray(e))}clear(){this.backingArray=[]}}}]);
//# sourceMappingURL=ip-num.js.map 