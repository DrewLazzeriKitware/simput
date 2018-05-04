!function(e){var a={};function t(i){if(a[i])return a[i].exports;var l=a[i]={i:i,l:!1,exports:{}};return e[i].call(l.exports,l,l.exports,t),l.l=!0,l.exports}t.m=e,t.c=a,t.d=function(e,a,i){t.o(e,a)||Object.defineProperty(e,a,{configurable:!1,enumerable:!0,get:i})},t.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},t.n=function(e){var a=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(a,"a",a),a},t.o=function(e,a){return Object.prototype.hasOwnProperty.call(e,a)},t.p="",t(t.s=5)}([function(e,a,t){"use strict";function i(e){return e.external||(e.external={}),e.external}function l(e,a,t){var l=i(a);a.data.Materials&&function(){var e=a.data.Materials;l.materials={},l.materialNames={};for(var t=function(a){var t=e[a].name,i=e[a].id,o={name:t};e[a].material&&(Object.keys(e[a].material).forEach(function(t){o[t]=e[a].material[t].value}),l.materials[i]=o,l.materialNames[t]=i)},i=0;i<e.length;i++)t(i)}()}function o(e,a,t){var l=i(a);a.data.Cells&&function(){var e=a.data.Cells;l.cells={};for(var t=function(a){var t=e[a].name,i=e[a].id,o={name:t};e[a].cell&&(Object.keys(e[a].cell).forEach(function(t){o[t]=e[a].cell[t].value}),l.cells[i]=o)},i=0;i<e.length;i++)t(i)}()}function r(e,a,t){var l=i(a);if(a.data.Rods){var o=a.data.Rods;l.rodsNames={0:"-"},l.rodsColors={0:"white"};for(var r=0;r<o.length;r++){var n=o[r],s=n.id,d=n.name;l.rodsNames[s]=d,l.rodsColors[s]="rgb("+o[r].rodInfo.color.value.map(function(e){return Math.floor(255*e)}).join(",")+")"}}}function n(e,a,t){var i=a.data.Materials,l={};if(a.data.Cells)for(var o=a.data.Cells,r=0;r<o.length;r++)o[r].cell.cell.value[0].mats.forEach(function(e){l[e]=!0});for(var n=0;n<i.length;n++)i[n].noDelete=i[n].id in l}function s(e,a,t){var i=a.data.Cells,l={};if(a.data.Rods)for(var o=a.data.Rods,r=0;r<o.length;r++)o[r].rodStack.rod.value[0].stack.forEach(function(e){l[e.cell]=!0});for(var n=0;n<i.length;n++)i[n].noDelete=i[n].id in l}function d(e,a,t){var i=a.data.Rods,l={};if(a.data.Maps)for(var o=a.data.Maps,r=0;r<o.length;r++)o[r].rodMap.map.value[0].grid.forEach(function(e){l[e]=!0});for(var n=0;n<i.length;n++)i[n].noDelete=i[n].id in l}function c(e,a,t,i){var l=e.viewName,o=e.nextViewName;if(a.data[l].length){if(-1===i.order.indexOf(o)){var r=1+i.order.indexOf(l);i.order.splice(r,0,o)}}else{var n=i.order.indexOf(o);-1!==n&&i.order.splice(n,1)}}e.exports=function(){Simput.registerHook("materialsToExternal",l),Simput.registerHook("cellsToExternal",o),Simput.registerHook("updateMaterialUsed",n),Simput.registerHook("updateCellUsed",s),Simput.registerHook("updateRodUsed",d),Simput.registerHook("addNextView",c),Simput.registerHook("rodsToExternal",r)}},function(e,a,t){"use strict";e.exports=function(e){return{results:{},model:e}}},function(e,a,t){"use strict";e.exports={scripts:["simput-external-vera.js"],defaultActiveView:"Specifications",order:["Specifications","Materials"],views:{Specifications:{label:"Specifications",attributes:["coreSpec","assemblySpec","baffleSpec"],hooks:[{type:"copyToExternal",src:"data.Specifications.0.assemblySpec.grid.value.0",dst:"assemblySize"},{type:"copyToExternal",src:"data.Specifications.0.assemblySpec.pitch.value.0",dst:"assemblyPitch"},{type:"copyToExternal",src:"data.Specifications.0.coreSpec.grid.value.0",dst:"coreSize"}]},Materials:{label:"Materials",attributes:["material"],size:-1,readOnly:!0,hooks:[{type:"copyParameterToViewName",attribute:"material.name"},{type:"specsToExternal"},{type:"materialsToExternal"},{type:"addNextView",viewName:"Materials",nextViewName:"Cells"}]},Cells:{label:"Cells",attributes:["cell"],hooks:[{type:"copyParameterToViewName",attribute:"cell.name"},{type:"cellsToExternal"},{type:"updateMaterialUsed"},{type:"addNextView",viewName:"Cells",nextViewName:"Rods"},{type:"copy",src:"data.Specifications.0.assemblySpec.pitch.value.0",dst:"cell.pitch"}],size:-1,readOnly:!0},Rods:{label:"Rods",attributes:["rodInfo","rodStack"],size:-1,readOnly:!0,hooks:[{type:"copyParameterToViewName",attribute:"rodInfo.name"},{type:"updateCellUsed"},{type:"copy",src:"data.Specifications.0.coreSpec.height.value.0",dst:"rodInfo.height"},{type:"rodsToExternal"},{type:"addNextView",viewName:"Rods",nextViewName:"Maps"}]},Maps:{label:"Rod maps",attributes:["mapInfo","rodMap"],size:-1,readOnly:!0,hooks:[{type:"updateRodUsed"},{type:"copyParameterToViewName",attribute:"mapInfo.name"}]},Core:{}},definitions:{coreSpec:{label:"Core Specifications",parameters:[{id:"grid",type:"int",size:1,default:15,label:"Size",help:"Size of the grid for the core"},{id:"height",type:"float",size:1,default:400,label:"Core height",help:"Height of the core in cm."}]},assemblySpec:{label:"Assembly Specifications",parameters:[{id:"grid",type:"int",size:1,default:17,label:"Size",help:"Size of the grid for an assembly"},{id:"pitch",type:"float",size:1,default:1.26,label:"Cell pitch",help:"Default cell pitch in assemblies"}]},baffleSpec:{label:"Baffle Specifications",parameters:[{id:"thick",type:"float",size:1,default:0,label:"Thickness"},{id:"gap",type:"float",size:1,default:0,label:"Gap"},{id:"material",type:"int",size:1,ui:"enum",domain:{dynamic:!0,external:"materialNames"},label:"Material"}]},material:{label:"Material definition",parameters:[{id:"name",type:"string",size:1,default:"",label:"Name"},{id:"color",propType:"Color",label:"Associated color",default:[.8,235/255,197/255],domain:{palette:["#8dd3c7","#ffffb3","#bebada","#fb8072","#80b1d3","#fdb462","#b3de69","#fccde5","#d9d9d9","#bc80bd","#ccebc5","#ffed6f","#51574a","#447c69","#74c493","#8e8c6d","#e4bf80","#e9d78e","#e2975d","#f19670","#e16552","#c94a53","#be5168","#a34974","#993767","#65387d","#4e2472","#9163b6","#e279a3","#e0598b","#7c9fb0","#5698c4","#9abf88"]}},{id:"density",type:"float",size:1,default:1,label:"Density"},{id:"thexp",type:"float",size:1,default:1,label:"Thermal Expansion Coefficient"},{id:"fractions",ui:"map",label:"Material fractions (material:fraction)"}]},cell:{label:"Cell definition",parameters:[{id:"name",type:"string",size:1,default:"",label:"Name"},{id:"pitch",type:"float",size:1,default:0,label:"Contact radius/pitch",domain:{readOnly:!0}},{id:"color",propType:"Color",label:"Associated color",default:[.8,235/255,197/255],domain:{palette:["#1b9e77","#d95f02","#7570b3","#e7298a","#66a61e","#e6ab02","#a6761d","#666666"]}},{id:"cell",propType:"CellEditor",size:1,default:{name:"Cell name",radii:[],mats:[]},domain:{dynamic:!0,external:"materials"},label:"Cell"}]},rodInfo:{label:"Rod description",parameters:[{id:"name",type:"string",size:1,default:"New Rod",label:"Name"},{id:"color",propType:"Color",label:"Associated color",default:[.8,235/255,197/255],domain:{palette:["#e41a1c","#377eb8","#4daf4a","#984ea3","#ff7f00","#ffff33","#a65628","#f781bf","#999999"]}},{id:"height",type:"string",size:1,default:"",label:"Rod height",domain:{readOnly:!0}}]},rodStack:{label:"Axial definition",parameters:[{id:"rod",propType:"RodEditor",size:1,default:{stack:[]},domain:{dynamic:!0,external:["cells","materials"]},label:"Rod"}]},mapInfo:{label:"Rod map",parameters:[{id:"name",type:"string",size:1,default:"Assembly",label:"Name"},{id:"color",propType:"Color",label:"Associated color",default:[.8,235/255,197/255],domain:{palette:["#e41a1c","#377eb8","#4daf4a","#984ea3","#ff7f00","#ffff33","#a65628","#f781bf","#999999"]}}]},rodMap:{label:"Layout definition",parameters:[{id:"map",propType:"MapEditor",size:1,default:{grid:[]},domain:{dynamic:!0,external:["assemblySize","rodsNames","rodsColors"]},label:"Rod"}]}}}},function(e,a,t){"use strict";e.exports={type:"vera",model:t(2),lang:{},convert:t(1),hooks:t(0),parse:null}},function(e,a,t){"use strict";var i,l="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};i=function(){return this}();try{i=i||Function("return this")()||(0,eval)("this")}catch(e){"object"===("undefined"==typeof window?"undefined":l(window))&&(i=window)}e.exports=i},function(e,a,t){(function(a){a.Simput||(a.Simput={}),a.Simput.types||(a.Simput.types={}),e.exports=a.Simput.types.vera=t(3)}).call(this,t(4))}]);