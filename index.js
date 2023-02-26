function detectZoom() {
	var ratio = 0,
		screen = window.screen,
		ua = navigator.userAgent.toLowerCase();
	
	if (window.devicePixelRatio !== undefined) {
		ratio = window.devicePixelRatio;
	}
	else if (~ua.indexOf('msie')) {
		if (screen.deviceXDPI && screen.logicalXDPI) {
			ratio = screen.deviceXDPI / screen.logicalXDPI;
		};
	}
	else if (window.outerWidth !== undefined && window.innerWidth !== undefined) {
		ratio = window.outerWidth / window.innerWidth;
	};
	return ratio;
};

function detectTheme(event) {
	switch (event.matches) {
		case true:
			return "dark";
			break;
		default:
			return "light";
			break;
	};
};

function detectThemeContrast() { // change Theme when Contrast on || change Theme when Contrast off || turn off Contrast
	for (let i = document.styleSheets[11].cssRules.length -1; i > -1; i--) {
		document.styleSheets[11].deleteRule(i);
	};
	switch (config.themeContrast) {
		case false: // change Theme when Contrast off || turn off Contrast
			coloring();
			break;
		default: // change Theme when Contrast on
			switch (__status__.theme) {
				case "night":
					config.themeContrast = !config.themeContrast;
					break;
				default:
					__status__.theme = `${__status__.theme}Contrast`;
					break;
			};
			coloring();
			break;
	};
};

function autoThemeChangeTo(event) {
	__status__.theme = detectTheme(event);
	detectThemeContrast()
};

function radioFaviconPaint(id, cls) {
	switch (cls){
		case undefined:
			break;
		default:
			Array.from(document.getElementsByClassName(`_${decls[DECLS.indexOf(cls)]}`)).forEach((svg) => {
				svg.style.opacity = 0;
			});
			break;
	}
	document.getElementById(`_${decls[DECLS.indexOf(id)]}`).style.opacity = 1;
};

function checkBoxFaviconPaint(entry, id) {
	switch (config[entry]) {
		case false:
			document.getElementById(`_${decls[DECLS.indexOf(id)]}`).height = document.getElementById(`_${decls[DECLS.indexOf(id)]}`).height;
			break;
		default:
			document.getElementById(`_${decls[DECLS.indexOf(id)]}`).style.opacity = 1;
			break;
	};
};

function themeContrastChangeTo() { // change Theme the same || turn on Contrast
	switch (config.themeContrast) {
		case !__status__.themeContrast: // turn on Contrast
			__status__.theme = `${__status__.theme}Contrast`;
			coloring();
			break;
		default: // change Theme the same
			radioFaviconPaint(`favicon-of-btn-bt-changeTheme-to-${config.theme}`, "favicon-of-btn-bt-changeTheme");
			localStorage.setItem("config.theme", config.theme);
			break;
	};
};

const MEDIA_QUERY_LIST = {
	"prefers-color-scheme": window.matchMedia("(prefers-color-scheme: dark)")
};

function themeChangeTo() {
	switch (config.theme) {
		case __status__.theme: // change Theme the same
			themeContrastChangeTo();
			break;
		default:
			switch (config.theme) {
				case "auto":
					switch (detectTheme(MEDIA_QUERY_LIST["prefers-color-scheme"])) {
						case __status__.theme: // change Theme the same
							themeContrastChangeTo();
							break;
						default:
							autoThemeChangeTo(MEDIA_QUERY_LIST["prefers-color-scheme"])
							MEDIA_QUERY_LIST["prefers-color-scheme"].removeListener(autoThemeChangeTo);
							MEDIA_QUERY_LIST["prefers-color-scheme"].addListener(autoThemeChangeTo);
							break;
					};
					break;
				default:
					__status__.theme = config.theme;
					detectThemeContrast()
					switch (config.theme) {
						case "night":
							document.styleSheets[11].insertRule(`#_${decls[DECLS.indexOf("switchTheme-to-contrast")]}::before { color: rgba(${THEME[__status__.theme].basicActiveColor}); }`, document.styleSheets[11].cssRules.length);
							document.styleSheets[11].insertRule(`._${decls[DECLS.indexOf("switchTheme-to-contrast")]}::after { color: rgba(${THEME[__status__.theme].discActiveColor}); }`, document.styleSheets[11].cssRules.length);
							document.styleSheets[11].insertRule(`#_${decls[DECLS.indexOf("switchTheme-to-contrast")]} { pointer-events: none; }`, document.styleSheets[11].cssRules.length);
							break;
					};
					MEDIA_QUERY_LIST["prefers-color-scheme"].removeListener(autoThemeChangeTo);
					break;
			};
			break;
	};
};

function progressBarGlobalPainting() {
	
};

var decls = [];
const DECLS = ["overlay", "barrier", "wrapper", "header", "progressBar", "progressBar-bt-global", "nav", "main", "brand", "logo", "radioButton", "switchButton", "button", "hyperlinkButton", "wrappingButton", "favicon-of-btn", "acrylic", "top-image", "left-in-main", "center-in-main", "right-in-main", "topicAbout", "name-in-topicAbout", "discription-in-topicAbout", "articleCard", "image-in-articleCard", "cover-in-articleCard", "main-in-articleCard", "title-in-main-in-articleCard", "content-in-main-in-articleCard", "link-in-main-in-articleCard", "info-in-main-in-articleCard", "author-in-info-in-main-in-articleCard", "timeStamp-in-info-in-main-in-articleCard", "menuFlyOut", "button-of-menuFlyOut", "flyout-of-menuFlyOut", "group-in-menuFlyOut", "button-of-menuFlyOut-bt-config", "favicon-of-btn-of-menuFlyOut-bt-config", "flyout-of-menuFlyOut-bt-config", "menuFlyOut-bt-config", "changeTheme", "favicon-of-btn-bt-changeTheme", "changeTheme-to-auto", "favicon-of-btn-bt-changeTheme-to-auto", "changeTheme-to-light", "favicon-of-btn-bt-changeTheme-to-light", "changeTheme-to-dark", "favicon-of-btn-bt-changeTheme-to-dark", "changeTheme-to-night", "favicon-of-btn-bt-changeTheme-to-night", "switchTheme", "switchTheme-to-contrast", "favicon-of-btn-bt-switchTheme-to-contrast", "favicon-of-btn-bt-switchTheme"];

const THEME = {
	"light": {"absoluteColor": "255, 255, 255, 1", "absoluteInvertedColor": "0, 0, 0, 1", "basicColor": "26, 26, 26, 1", "basicActiveColor": "26, 26, 26, .61568", "discColor": "60.35, 60.35, 60.35, 1", "discActiveColor": "60.35, 60.35, 60.35, .61568", "miscColor": "165, 165, 165, 1", "basicBackgroundColor": "243, 243, 243, 1", "contentBackgroundColor": "249, 249, 249, 1", "layerCoverColor": "253, 253, 253, 1", "borderColor": "0, 0, 0, .15", "AcrylicBorderColor": "0, 0, 0, .15", "AcrylicBrushBlurAmount": "30", "AcrylicBrushTintLuminosityOpacity": "2.5", "AcrylicBrushTintColor": "255, 255, 255, 1", "AcrylicBrushTintOpacity": ".8", "AcrylicBrushNoiseOpacity": ".5", "buttonBackgroundColor": "255, 255, 255, .58431", "buttonBorderColor": "0, 0, 0, .07450", "buttonHoverBackgroundColor": "255, 255, 255, .31372", "buttonHoverBorderColor": "0, 0, 0, .29411", "buttonActiveBackgroundColor": "255, 255, 255, .25098", "buttonActiveBorderColor": "0, 0, 0, .08627", "buttonActiveColor": "0, 0, 0, .61568", "hyperlinkButtonColor": "41.5, 41.5, 41.5, 1", "hyperlinkButtonHoverBackgroundColor": "0, 0, 0, .03529", "hyperlinkButtonActiveBackgroundColor": "0, 0, 0, .02352", "hyperlinkButtonActiveColor": "59.5, 59.5, 59.5, 1", "wrappingButtonHoverColor": "0, 0, 0, .02352", "wrappingButtonActiveColor": "0, 0, 0, .03529", "buttonFaviconColor": "83, 83, 83, 1", "separatorColor": "0, 0, 0, .31372", "scrollbarColor": "0, 0, 0, .06274", "scrollbarThumbColor": "0, 0, 0, .17254", "scrollbarThumbHoverColor": "0, 0, 0, .27843", "scrollbarThumbActiveColor": "0, 0, 0, .48627", "scrollbarbuttonBackgroundColor": "163, 163, 163, 1", "tableZebraBackgroundColor": "0, 0, 0, 0.02941"},
	"dark": {"absoluteColor": "0, 0, 0, 1", "absoluteInvertedColor": "255, 255, 255, 1", "basicColor": "255, 255, 255, 1", "basicActiveColor": "255, 255, 255, .77647", "discColor": "216.75, 216.75, 216.75, 1", "discActiveColor": "216.75, 216.75, 216.75, .77647", "miscColor": "102, 102, 102, 1", "basicBackgroundColor": "32, 32, 32, 1", "contentBackgroundColor": "39, 39, 39, 1", "layerCoverColor": "50, 50, 50, 1", "borderColor": "255, 255, 255, .15", "AcrylicBorderColor": "0, 0, 0, .15", "AcrylicBrushBlurAmount": "30", "AcrylicBrushTintLuminosityOpacity": "2.5", "AcrylicBrushTintColor": "0, 0, 0, 1", "AcrylicBrushTintOpacity": ".8", "AcrylicBrushNoiseOpacity": ".5", "buttonBackgroundColor": "255, 255, 255, .05098", "buttonBorderColor": "0, 0, 0, .29019", "buttonHoverBackgroundColor": "255, 255, 255, .10588", "buttonHoverBorderColor": "0, 0, 0, .39607", "buttonActiveBackgroundColor": "255, 255, 255, .08627", "buttonActiveBorderColor": "0, 0, 0, .27058", "buttonActiveColor": "255, 255, 255, .77647", "hyperlinkButtonColor": "234, 234, 234, 1", "hyperlinkButtonHoverBackgroundColor": "255, 255, 255, .05882", "hyperlinkButtonActiveBackgroundColor": "255, 255, 255, .03529", "hyperlinkButtonActiveColor": "216, 216, 216, 1", "wrappingButtonHoverColor": "255, 255, 255, .03921", "wrappingButtonActiveColor": "255, 255, 255, .05882", "buttonFaviconColor": "207, 207, 207, 1", "separatorColor": "255, 255, 255, 1", "scrollbarColor": "255, 255, 255, .12549", "scrollbarThumbColor": "255, 255, 255, 0.20000", "scrollbarThumbHoverColor": "255, 255, 255, .30196", "scrollbarThumbActiveColor": "255, 255, 255, .50196", "scrollbarbuttonBackgroundColor": "128, 128, 128, 1", "tableZebraBackgroundColor": "255, 255, 255, .12156"},
	"night": {"absoluteColor": "0, 0, 0, 1", "absoluteInvertedColor": "255, 255, 255, 1", "basicColor": "230, 230, 230, 1", "basicActiveColor": "230, 230, 230, .71764", "discColor": "195.5, 195.5, 195.5, 1", "discActiveColor": "195.5, 195.5, 195.5, .71764", "miscColor": "86, 86, 86, 1", "basicBackgroundColor": "16, 16, 16, 1", "contentBackgroundColor": "23, 23, 23, 1", "layerCoverColor": "34, 34, 34, 1", "borderColor": "255, 255, 255, .15", "AcrylicBorderColor": "0, 0, 0, .15", "AcrylicBrushBlurAmount": "30", "AcrylicBrushTintLuminosityOpacity": "2.5", "AcrylicBrushTintColor": "0, 0, 0, 1", "AcrylicBrushTintOpacity": ".8", "AcrylicBrushNoiseOpacity": ".5", "buttonBackgroundColor": "255, 255, 255, .04705", "buttonBorderColor": "0, 0, 0, .42745", "buttonHoverBackgroundColor": "255, 255, 255, .09803", "buttonHoverBorderColor": "0, 0, 0, .53333", "buttonActiveBackgroundColor": "255, 255, 255, .08235", "buttonActiveBorderColor": "0, 0, 0, .37254", "buttonActiveColor": "255, 255, 255, .71764", "hyperlinkButtonColor": "218, 218, 218, 1", "hyperlinkButtonHoverBackgroundColor": "255, 255, 255, .05882", "hyperlinkButtonActiveBackgroundColor": "255, 255, 255, .03529", "hyperlinkButtonActiveColor": "200, 200, 200, 1", "wrappingButtonHoverColor": "255, 255, 255, .03921", "wrappingButtonActiveColor": "255, 255, 255, .05882", "buttonFaviconColor": "191, 191, 191, 1", "separatorColor": "255, 255, 255, 1", "scrollbarColor": "255, 255, 255, .11764", "scrollbarThumbColor": "255, 255, 255, .18431", "scrollbarThumbHoverColor": "255, 255, 255, .27450", "scrollbarThumbActiveColor": "255, 255, 255, .46274", "scrollbarbuttonBackgroundColor": "116, 116, 116, 1", "tableZebraBackgroundColor": "255, 255, 255, .10196"},
	"lightContrast": {},
	"darkContrast": {}
};

var config = {
	"theme": "auto",
	"themeContrast": false,
	"accentColor": "127, 127, 127",
	"accentAlpha": "0.9",
	"articlesPrintPerTime": 10,
	"articleSentencesSnap": 5
};

var __status__ = {
	"tmpUsed": 0,
	"theme": "",
	"themeContrast": false,
	"previousOpenCalling": null,
	"initialized": false,
	"topic": document.location.search.match(/(?<=t=)\w+/) ? document.location.search.match(/(?<=t=)\w+/)[0] : null,
	"article": document.location.search.match(/(?<=a=)\w+/) ? document.location.search.match(/(?<=a=)\w+/)[0] : null,
	"articlesPrinted": 0,
	"articlesPrinting": false
};

function coloring() {
	var dss2 = document.styleSheets[2];
	for (let i = dss2.cssRules.length - 1; i > -1; i--) {
		dss2.deleteRule(i)
	};
	dss2.insertRule(`::-webkit-scrollbar { background-color: rgba(${THEME[__status__.theme].scrollbarColor}); }`, dss2.cssRules.length);
	dss2.insertRule(`::-webkit-scrollbar-thumb { background-color: rgba(${THEME[__status__.theme].scrollbarThumbColor}); }`, dss2.cssRules.length);
	dss2.insertRule(`::-webkit-scrollbar-thumb:hover { background-color: rgba(${THEME[__status__.theme].scrollbarThumbHoverColor}); }`, dss2.cssRules.length);
	dss2.insertRule(`::-webkit-scrollbar-thumb:active { background-color: rgba(${THEME[__status__.theme].scrollbarThumbActiveColor}); }`, dss2.cssRules.length);
	dss2.insertRule(`::selection { color: white; background-color: rgba(${config.accentColor}, ${config.accentAlpha}); }`, dss2.cssRules.length);
	dss2.insertRule(`* { color: rgba(${THEME[__status__.theme].basicColor}); }`, dss2.cssRules.length);
	dss2.insertRule(`body { background-color: rgba(${THEME[__status__.theme].contentBackgroundColor}); }`, dss2.cssRules.length);
	dss2.insertRule(`hr { border-width: 0 0 1px 0; border-style: none none solid none; border-color: rgba(${THEME[__status__.theme].separatorColor}); }`, dss2.cssRules.length);
	dss2.insertRule(`table.zebra > tbody > tr:nth-of-type(odd) { background-color: rgba(${THEME[__status__.theme].tableZebraBackgroundColor}); }`, dss2.cssRules.length);
	dss2.insertRule(`svg * { fill: ${ToHex(THEME[__status__.theme].basicColor)}; }`, dss2.cssRules.length);
	dss2.insertRule(`._${decls[DECLS.indexOf("button")]} { background-color: rgba(${THEME[__status__.theme].buttonBackgroundColor}); box-shadow: rgba(${THEME[__status__.theme].buttonBorderColor}) 0 0 0 1px inset; }`, dss2.cssRules.length);
	dss2.insertRule(`._${decls[DECLS.indexOf("button")]}:hover { background-color: rgba(${THEME[__status__.theme].buttonHoverBackgroundColor}); box-shadow: rgba(${THEME[__status__.theme].buttonHoverBorderColor}) 0 0 0 1px inset; }`, dss2.cssRules.length);
	dss2.insertRule(`._${decls[DECLS.indexOf("button")]}:active { background-color: rgba(${THEME[__status__.theme].buttonActiveBackgroundColor}); box-shadow: rgba(${THEME[__status__.theme].buttonActiveBorderColor}) 0 0 0 1px inset; color: rgba(${THEME[__status__.theme].buttonActiveColor}); }`, dss2.cssRules.length);
	dss2.insertRule(`._${decls[DECLS.indexOf("hyperlinkButton")]}:hover { background-color: rgba(${THEME[__status__.theme].hyperlinkButtonHoverBackgroundColor}); }`, dss2.cssRules.length);
	dss2.insertRule(`._${decls[DECLS.indexOf("hyperlinkButton")]}:active { background-color: rgba(${THEME[__status__.theme].hyperlinkButtonActiveBackgroundColor}); color: rgba(${THEME[__status__.theme].hyperlinkButtonActiveColor}); }`, dss2.cssRules.length);
	dss2.insertRule(`._${decls[DECLS.indexOf("wrappingButton")]}:hover { background-color: rgba(${THEME[__status__.theme].wrappingButtonHoverColor}); }`, dss2.cssRules.length);
	dss2.insertRule(`._${decls[DECLS.indexOf("wrappingButton")]}:active { background-color: rgba(${THEME[__status__.theme].wrappingButtonActiveColor}); }`, dss2.cssRules.length);
	dss2.insertRule(`._${decls[DECLS.indexOf("wrappingButton")]}::after { color: rgba(${THEME[__status__.theme].discColor}); }`, dss2.cssRules.length);
	dss2.insertRule(`._${decls[DECLS.indexOf("wrappingButton")]}:active::before { color: rgba(${THEME[__status__.theme].basicActiveColor}); }`, dss2.cssRules.length);
	dss2.insertRule(`._${decls[DECLS.indexOf("wrappingButton")]}:active::after { color: rgba(${THEME[__status__.theme].discActiveColor}); }`, dss2.cssRules.length);
	dss2.insertRule(`._${decls[DECLS.indexOf("acrylic")]} { box-shadow: rgba(${THEME[__status__.theme].AcrylicBorderColor}) 0 0 0 1px inset; backdrop-filter: blur(${THEME[__status__.theme].AcrylicBrushBlurAmount}px) brightness(${THEME[__status__.theme].AcrylicBrushTintLuminosityOpacity}); }`, dss2.cssRules.length);
	dss2.insertRule(`._${decls[DECLS.indexOf("acrylic")]} > div::before { content: ""; position: absolute; top: 0; right: 0; bottom: 0; left: 0; opacity: ${THEME[__status__.theme].AcrylicBrushTintOpacity}; background-color: rgba(${THEME[__status__.theme].AcrylicBrushTintColor}); }`, dss2.cssRules.length);
	dss2.insertRule(`._${decls[DECLS.indexOf("acrylic")]} > div::after {
		content: ""; position: absolute; top: 0; right: 0; bottom: 0; left: 0; opacity: ${THEME[__status__.theme].AcrylicBrushNoiseOpacity}; background: url(data:image/png;base64,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);
	}`, dss2.cssRules.length);
	dss2.insertRule(`._${decls[DECLS.indexOf("articleCard")]} { box-shadow: rgba(${THEME[__status__.theme].borderColor}) 0 0 0 1px inset; }`, dss2.cssRules.length);
	dss2.insertRule(`._${decls[DECLS.indexOf("title-in-main-in-articleCard")]} a:active { color: rgba(${THEME[__status__.theme].basicActiveColor}); }`, dss2.cssRules.length);
	dss2.insertRule(`._${decls[DECLS.indexOf("info-in-main-in-articleCard")]} * { color: rgba(${THEME[__status__.theme].discColor}); }`, dss2.cssRules.length);
	dss2.insertRule(`._${decls[DECLS.indexOf("info-in-main-in-articleCard")]} a:active { color: rgba(${THEME[__status__.theme].discActiveColor}); }`, dss2.cssRules.length);
	dss2.insertRule(`#_${decls[DECLS.indexOf("logo")]} { color: rgba(${THEME[__status__.theme].basicColor}); }`, dss2.cssRules.length);
	dss2.insertRule(`#_${decls[DECLS.indexOf("top-image")]} { background: url() center / 100% no-repeat rgba(${THEME[__status__.theme].layerCoverColor}); }`, dss2.cssRules.length);
	switch (__status__.initialized) {
		case true:
			radioFaviconPaint( `favicon-of-btn-bt-changeTheme-to-${config.theme}`, "favicon-of-btn-bt-changeTheme");
			checkBoxFaviconPaint("themeContrast", "favicon-of-btn-bt-switchTheme-to-contrast");
			__status__.themeContrast = config.themeContrast;
			localStorage.setItem("config.theme", config.theme);
			localStorage.setItem("config.themeContrast", config.themeContrast);
			break;
	};
	dss2 = undefined;
};

function topicPrinting() {
	document.getElementById(`_${decls[DECLS.indexOf("left-in-main")]}`).innerHTML = `
		<div id="_${decls[DECLS.indexOf("topicAbout")]}">
			<span id="_${decls[DECLS.indexOf("name-in-topicAbout")]}">${topic.name}</span>
			<span id="_${decls[DECLS.indexOf("discription-in-topicAbout")]}">${topic.discription}</span>
		</div>
	`
}

async function articlesPrinting() {
	var target = (articles.length > __status__.articlesPrinted + config.articlesPrintPerTime) ? (__status__.articlesPrinted + config.articlesPrintPerTime) : articles.length;
	var tmp = "";
	var article = {};
	for (let i = __status__.articlesPrinted; i < target; i++) {
		await fetch(`./topics/${__status__.topic}/${articles[i]}/index.json`)
			.then(response => response.json())
			.then(data => article = data);
		tmp += `
			<div id="_article-${articles[i]}" class="_${decls[DECLS.indexOf("articleCard")]}">
				<img class="_${decls[DECLS.indexOf("cover-in-articleCard")]}" src="./topics/${__status__.topic}/${articles[i]}/cover.png" onerror="this.remove();" />
				<div class="_${decls[DECLS.indexOf("main-in-articleCard")]}">
					<span class="_${decls[DECLS.indexOf("title-in-main-in-articleCard")]}"><a>${article.title}</a></span>
					<span class="_${decls[DECLS.indexOf("content-in-main-in-articleCard")]}">${article.content}</span>
					<span class="_${decls[DECLS.indexOf("link-in-main-in-articleCard")]} _${decls[DECLS.indexOf("button")]}"></span>
					<div class="_${decls[DECLS.indexOf("info-in-main-in-articleCard")]}">
						<span class="_${decls[DECLS.indexOf("author-in-info-in-main-in-articleCard")]}">By&nbsp<a>${article.author}</a></span>
						<span class="_${decls[DECLS.indexOf("timeStamp-in-info-in-main-in-articleCard")]}">${new Date(article.timeStamp).toLocaleDateString()}</span>
					</div>
				</div>
			</div>
		`;
		progressBarGlobalPainting()
	};
	document.getElementById(`_${decls[DECLS.indexOf("center-in-main")]}`).innerHTML += tmp;
	tmp = undefined;
	article = undefined;
	__status__.articlesPrinted = target;
	target = undefined;
	__status__.articlesPrinting = false;
};

async function main() {
	var decl = "";
	for (let i = decls.length; i < DECLS.length; i++) {
		decl = `${ALPHABET[Math.trunc(Math.random() * 36)] + ALPHABET[Math.trunc(Math.random() * 36)] + ALPHABET[Math.trunc(Math.random() * 36)] + ALPHABET[Math.trunc(Math.random() * 36)] + ALPHABET[Math.trunc(Math.random() * 36)]}`;
		switch (decls.includes(decl)){
			case false:
				decls.push(decl);
				break;
			default:
				i--;
				break;
		};
	};
	decl = undefined;
	var dss0 = document.styleSheets[0];
	dss0.insertRule(`._${decls[DECLS.indexOf("button")]}, ._${decls[DECLS.indexOf("hyperlinkButton")]}, ._${decls[DECLS.indexOf("wrappingButton")]} { align-items: center; }`, dss0.cssRules.length);
	dss0.insertRule(`._${decls[DECLS.indexOf("favicon-of-btn")]} { order: -1; pointer-events: none; }`, dss0.cssRules.length);
	dss0.insertRule(`._${decls[DECLS.indexOf("wrappingButton")]} { width: calc(100% - 10px); height: 36px; margin: 2px 0; z-index: 2; }`, dss0.cssRules.length);
	dss0.insertRule(`._${decls[DECLS.indexOf("wrappingButton")]}::before { flex: 1; }`, dss0.cssRules.length);
	dss0.insertRule(`._${decls[DECLS.indexOf("wrappingButton")]}::after { margin: 0 40px 0 0; }`, dss0.cssRules.length);
	dss0.insertRule(`._${decls[DECLS.indexOf("menuFlyOut")]} { flex-direction: column; }`, dss0.cssRules.length);
	dss0.insertRule(`._${decls[DECLS.indexOf("group-in-menuFlyOut")]} { width: 100%; padding: 3px 0; flex-direction: column; align-items: center; z-index: 2; }`, dss0.cssRules.length);
	dss0.insertRule(`._${decls[DECLS.indexOf("flyout-of-menuFlyOut")]} { display: none; position: absolute; height: 0; overflow-y: hidden; transition: cubic-bezier(0, 0, 0, 1) height .3s; }`, dss0.cssRules.length);
	dss0.insertRule(`._${decls[DECLS.indexOf("acrylic")]} { box-shadow: 0 12px 20px rgba(0, 0, 0, .15); }`, dss0.cssRules.length);
	dss0.insertRule(`._${decls[DECLS.indexOf("acrylic")]} > div { position: relative; width: 100%; }`, dss0.cssRules.length);
	dss0.insertRule(`._${decls[DECLS.indexOf("articleCard")]} { margin: 10px 0; flex-direction: column; }`, dss0.cssRules.length);
	dss0.insertRule(`._${decls[DECLS.indexOf("cover-in-articleCard")]} { width: 100%; border-radius: 5px 5px 0 0; }`, dss0.cssRules.length);
	dss0.insertRule(`._${decls[DECLS.indexOf("main-in-articleCard")]} { padding: 0 2%; flex-direction: column; }`, dss0.cssRules.length);
	dss0.insertRule(`._${decls[DECLS.indexOf("title-in-main-in-articleCard")]} * { font-family: Georgia, 'Times New Roman', Times, serif; }`, dss0.cssRules.length);
	dss0.insertRule(`._${decls[DECLS.indexOf("title-in-main-in-articleCard")]} { padding: 20px 0; align-self: start; }`, dss0.cssRules.length);
	dss0.insertRule(`._${decls[DECLS.indexOf("title-in-main-in-articleCard")]} * { font-size: 20px; }`, dss0.cssRules.length);
	dss0.insertRule(`._${decls[DECLS.indexOf("content-in-main-in-articleCard")]}, ._${decls[DECLS.indexOf("content-in-main-in-articleCard")]} * { font-size: 16px; flex-direction: column; }`, dss0.cssRules.length);
	dss0.insertRule(`._${decls[DECLS.indexOf("content-in-main-in-articleCard")]} > img { width: fit-content; align-self: center; }`, dss0.cssRules.length);
	dss0.insertRule(`._${decls[DECLS.indexOf("link-in-main-in-articleCard")]} { height: 36px; align-self: end; }`, dss0.cssRules.length);
	dss0.insertRule(`._${decls[DECLS.indexOf("link-in-main-in-articleCard")]}::after { margin: 0 15px; content: "Article\u0020page\u0020>"; }`, dss0.cssRules.length);
	dss0.insertRule(`._${decls[DECLS.indexOf("info-in-main-in-articleCard")]} { height: 49px; justify-content: space-between; align-items: center; }`, dss0.cssRules.length);
	dss0.insertRule(`#_${decls[DECLS.indexOf("barrier")]} { position: absolute; top: 0; width:100%; z-index: -1; }`, dss0.cssRules.length);
	dss0.insertRule(`#_${decls[DECLS.indexOf("wrapper")]}, #_${decls[DECLS.indexOf("header")]} { width:100%; flex-direction: column; align-items: center; }`, dss0.cssRules.length);
	dss0.insertRule(`#_${decls[DECLS.indexOf("progressBar-bt-global")]} { position: fixed; width:100%; height: 3px; }`, dss0.cssRules.length);
	dss0.insertRule(`#_${decls[DECLS.indexOf("nav")]}, #_${decls[DECLS.indexOf("main")]} { width: 85%; }`, dss0.cssRules.length);
	dss0.insertRule(`#_${decls[DECLS.indexOf("nav")]} { height: 54px; margin: 0 0 2px 0; justify-content: space-between; align-items: center; }`, dss0.cssRules.length);
	dss0.insertRule(`#_${decls[DECLS.indexOf("top-image")]} { width: 85%; height: 0; padding-top: 17.73%; }`, dss0.cssRules.length);
	dss0.insertRule(`#_${decls[DECLS.indexOf("logo")]} { width: 48px; height: 24px; }`, dss0.cssRules.length);
	dss0.insertRule(`#_${decls[DECLS.indexOf("logo")]}::after { position: relative; top: -4px; left: 6px; content: "Tremo"; font-size: 20px; font-weight: 600; filter: grayscale(1); }`, dss0.cssRules.length);
	dss0.insertRule(`#_${decls[DECLS.indexOf("button-of-menuFlyOut-bt-config")]} { width: 40px; height: 36px; }`, dss0.cssRules.length);
	dss0.insertRule(`#_${decls[DECLS.indexOf("flyout-of-menuFlyOut-bt-config")]} { top: 42px; right: 7.5%; width: 298px; }`, dss0.cssRules.length);
	dss0.insertRule(`#_${decls[DECLS.indexOf("changeTheme-to-auto")]}::before { content: "Auto"; }`, dss0.cssRules.length);
	dss0.insertRule(`#_${decls[DECLS.indexOf("changeTheme-to-light")]}::before { content: "Light"; }`, dss0.cssRules.length);
	dss0.insertRule(`#_${decls[DECLS.indexOf("changeTheme-to-dark")]}::before { content: "Dark"; }`, dss0.cssRules.length);
	dss0.insertRule(`#_${decls[DECLS.indexOf("changeTheme-to-night")]}::before { content: "Night"; }`, dss0.cssRules.length);
	dss0.insertRule(`#_${decls[DECLS.indexOf("switchTheme-to-contrast")]}::before { content: "Contrast"; }`, dss0.cssRules.length);
	dss0.insertRule(`#_${decls[DECLS.indexOf("switchTheme-to-contrast")]}::after { content: "Coming soon..."; }`, dss0.cssRules.length);
	dss0.insertRule(`#_${decls[DECLS.indexOf("main")]} { padding: 21px 7.5%; justify-content: space-between; }`, dss0.cssRules.length);
	dss0.insertRule(`#_${decls[DECLS.indexOf("main")]} > div { flex-direction: column; }`, dss0.cssRules.length);
	dss0.insertRule(`#_${decls[DECLS.indexOf("left-in-main")]}, #_${decls[DECLS.indexOf("right-in-main")]} { width: 24%; }`, dss0.cssRules.length);
	dss0.insertRule(`#_${decls[DECLS.indexOf("center-in-main")]} { width: 48%; }`, dss0.cssRules.length);
	dss0.insertRule(`#_${decls[DECLS.indexOf("topicAbout")]} { flex-direction: column; }`, dss0.cssRules.length);
	dss0.insertRule(`#_${decls[DECLS.indexOf("name-in-topicAbout")]} { margin: 0 0 9px 0; font-size: 36px; font-weight: 100; line-height: 1; }`, dss0.cssRules.length);
	dss0.insertRule(`#_${decls[DECLS.indexOf("discription-in-topicAbout")]} { font-size: 16px; }`, dss0.cssRules.length);
	dss0 = undefined;
	switch (localStorage["config.theme"]) {
		case undefined:
			break;
		default:
			config.theme = localStorage["config.theme"]
			config.themeContrast = JSON.parse(localStorage["config.themeContrast"])
			break;
	};
	themeChangeTo();
	document.querySelector("body").innerHTML = `
		<div id="_${decls[DECLS.indexOf("wrapper")]}">
			<div id="_${decls[DECLS.indexOf("header")]}">
				<div id="_${decls[DECLS.indexOf("nav")]}">
					<div id="_${decls[DECLS.indexOf("brand")]}">
						<div id="_${decls[DECLS.indexOf("logo")]}">
							<svg width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" version="1.1">
								<g transform="translate(0,24) scale(0.0025,-0.0025)">
									<path d="M2649 7207 c-52 -19 -99 -50 -136 -89 -30 -32 -2293 -3787 -2293 -3806 0 -11 450 -295 457 -288 3 3 258 429 568 948 309 519 568 943 574 943 7 0 335 -546 730 -1213 395 -667 731 -1227 747 -1244 76 -80 215 -103 315 -50 30 16 67 46 84 68 16 22 347 583 735 1247 541 927 707 1204 716 1194 6 -6 350 -561 765 -1232 415 -671 767 -1232 783 -1247 66 -61 210 -77 301 -34 28 13 64 39 81 57 32 35 2309 3717 2303 3724 -2 1 -105 66 -228 144 -179 113 -227 139 -237 129 -6 -7 -265 -424 -575 -927 -511 -831 -564 -912 -576 -895 -8 11 -361 570 -785 1244 -424 674 -785 1240 -802 1258 -75 81 -176 99 -276 50 -31 -15 -67 -40 -82 -55 -14 -15 -340 -563 -723 -1218 -383 -654 -702 -1195 -708 -1202 -9 -10 -172 254 -732 1185 -396 658 -733 1211 -748 1229 -59 67 -186 107 -258 80z"/>
								</g>
							</svg>
						</div>
					</div>
					<div id="_${decls[DECLS.indexOf("button-of-menuFlyOut-bt-config")]}" class="_${decls[DECLS.indexOf("button-of-menuFlyOut")]} _${decls[DECLS.indexOf("hyperlinkButton")]}" data-pop-id="config" data-pop-type="menuFlyOut">
						<svg id="_${decls[DECLS.indexOf("favicon-of-btn-of-menuFlyOut-bt-config")]}" class="_${decls[DECLS.indexOf("favicon-of-btn")]}" width="40" height="36" viewBox="0 0 40 36" xmlns="http://www.w3.org/2000/svg" version="1.1">
						  <g transform="translate(12,10)">
							<path d="M1 13a.75 .75 0 0 1 .75 -.75h12.5a.75 .75 0 0 1 0 1.5h-12.5a.75 .75 0 0 1 -.75 -.75zm0 -5a.75 .75 0 0 1 .75 -.75h12.5a.75 .75 0 0 1 0 1.5h-12.5a.75 .75 0 0 1 -.75 -.75zm0 -5a.75 .75 0 0 1 .75 -.75h12.5a.75 .75 0 0 1 0 1.5h-12.5a.75 .75 0 0 1 -.75 -.75z"></path>
						  </g>
						</svg>
					</div>
				</div>
				<div id="_${decls[DECLS.indexOf("top-image")]}"></div>
			</div>
			<div id="_${decls[DECLS.indexOf("main")]}">
				<div id="_${decls[DECLS.indexOf("left-in-main")]}"></div>
				<div id="_${decls[DECLS.indexOf("center-in-main")]}"></div>
				<div id="_${decls[DECLS.indexOf("right-in-main")]}"></div>
			</div>
		</div>
		
		<div id="_${decls[DECLS.indexOf("overlay")]}">
			<span id="_${decls[DECLS.indexOf("progressBar-bt-global")]}" class="_${decls[DECLS.indexOf("progressBar")]}"></span>
		</div>
		
		<div id="_${decls[DECLS.indexOf("barrier")]}">
			<div id="_${decls[DECLS.indexOf("flyout-of-menuFlyOut-bt-config")]}" class="_${decls[DECLS.indexOf("flyout-of-menuFlyOut")]} _${decls[DECLS.indexOf("acrylic")]}">
				<div id="_${decls[DECLS.indexOf("menuFlyOut-bt-config")]}" class="_${decls[DECLS.indexOf("menuFlyOut")]}">
					<div class="_${decls[DECLS.indexOf("group-in-menuFlyOut")]}">
						<div id="_${decls[DECLS.indexOf("changeTheme-to-auto")]}" class="_${decls[DECLS.indexOf("changeTheme")]} _${decls[DECLS.indexOf("radioButton")]} _${decls[DECLS.indexOf("wrappingButton")]}">
							<svg id="_${decls[DECLS.indexOf("favicon-of-btn-bt-changeTheme-to-auto")]}" class="_${decls[DECLS.indexOf("favicon-of-btn-bt-changeTheme")]} _${decls[DECLS.indexOf("favicon-of-btn")]}" width="40" height="36" viewBox="0 0 40 36" xmlns="http://www.w3.org/2000/svg" style="opacity: 0;">
								<g>
									<ellipse ry="2.5" rx="2.5" cy="18" cx="20"/>
								</g>
							</svg>
						</div>
						<div id="_${decls[DECLS.indexOf("changeTheme-to-light")]}" class="_${decls[DECLS.indexOf("changeTheme")]} _${decls[DECLS.indexOf("radioButton")]} _${decls[DECLS.indexOf("wrappingButton")]}">
							<svg id="_${decls[DECLS.indexOf("favicon-of-btn-bt-changeTheme-to-light")]}" class="_${decls[DECLS.indexOf("favicon-of-btn-bt-changeTheme")]} _${decls[DECLS.indexOf("favicon-of-btn")]}" width="40" height="36" viewBox="0 0 40 36" xmlns="http://www.w3.org/2000/svg" style="opacity: 0;">
								<g>
									<ellipse ry="2.5" rx="2.5" cy="18" cx="20"/>
								</g>
							</svg>
						</div>
						<div id="_${decls[DECLS.indexOf("changeTheme-to-dark")]}" class="_${decls[DECLS.indexOf("changeTheme")]} _${decls[DECLS.indexOf("radioButton")]} _${decls[DECLS.indexOf("wrappingButton")]}">
							<svg id="_${decls[DECLS.indexOf("favicon-of-btn-bt-changeTheme-to-dark")]}" class="_${decls[DECLS.indexOf("favicon-of-btn-bt-changeTheme")]} _${decls[DECLS.indexOf("favicon-of-btn")]}" width="40" height="36" viewBox="0 0 40 36" xmlns="http://www.w3.org/2000/svg" style="opacity: 0;">
								<g>
									<ellipse ry="2.5" rx="2.5" cy="18" cx="20"/>
								</g>
							</svg>
						</div>
						<div id="_${decls[DECLS.indexOf("changeTheme-to-night")]}" class="_${decls[DECLS.indexOf("changeTheme")]} _${decls[DECLS.indexOf("radioButton")]} _${decls[DECLS.indexOf("wrappingButton")]}">
							<svg id="_${decls[DECLS.indexOf("favicon-of-btn-bt-changeTheme-to-night")]}" class="_${decls[DECLS.indexOf("favicon-of-btn-bt-changeTheme")]} _${decls[DECLS.indexOf("favicon-of-btn")]}" width="40" height="36" viewBox="0 0 40 36" xmlns="http://www.w3.org/2000/svg" style="opacity: 0;">
								<g>
									<ellipse ry="2.5" rx="2.5" cy="18" cx="20"/>
								</g>
							</svg>
						</div>
					</div>
					<hr />
					<div class="_${decls[DECLS.indexOf("group-in-menuFlyOut")]}">
						<div id="_${decls[DECLS.indexOf("switchTheme-to-contrast")]}" class="_${decls[DECLS.indexOf("switchTheme")]} _${decls[DECLS.indexOf("switchButton")]} _${decls[DECLS.indexOf("wrappingButton")]}">
							<svg id="_${decls[DECLS.indexOf("favicon-of-btn-bt-switchTheme-to-contrast")]}" class="_${decls[DECLS.indexOf("favicon-of-btn-bt-switchTheme")]} _${decls[DECLS.indexOf("favicon-of-btn")]}" width="40" height="36" viewBox="0 0 40 36" xmlns="http://www.w3.org/2000/svg" style="opacity: 0;">
								<g transform="translate(3.5,3) scale(2,2)">
									<path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
								</g>
							</svg>
						</div>
					</div>
				</div>
			</div>
		</div>
	`;
	radioFaviconPaint(`favicon-of-btn-bt-changeTheme-to-${config.theme}`);
	checkBoxFaviconPaint("themeContrast", "favicon-of-btn-bt-switchTheme-to-contrast");
	__status__.initialized = true;
	await fetch(`./topics/${__status__.topic}/about.json`)
		.then(response => response.json())
		.then(data => topic = data);
	topicPrinting();
	await fetch(`./topics/${__status__.topic}/index.json`)
		.then(response => response.json())
		.then(data => articles = data);
	articlesPrinting();
};
main();

document.onclick = (event) => {
	switch (__status__.previousOpenCalling) {
		case null:
			break;
		default:
			switch (event.target.id === `_${decls[DECLS.indexOf("barrier")]}` || event.target.classList.contains(`_${decls[DECLS.indexOf("wrappingButton")]}`) || event.target.classList.contains(`_${decls[DECLS.indexOf("button")]}`)) {
				case true:
					for (let i = document.styleSheets[10].cssRules.length -1; i > -1; i--) {
						document.styleSheets[10].deleteRule(i);
					};
					__status__.previousOpenCalling = null;
					break;
			};
			break;
	};
	switch (event.target.classList.contains(`_${decls[DECLS.indexOf("button-of-menuFlyOut")]}`)) {
		case true:
			document.styleSheets[10].insertRule(`#_${decls[DECLS.indexOf("barrier")]} { z-index: 1; }`, document.styleSheets[10].cssRules.length);
			document.styleSheets[10].insertRule(`#_${decls[DECLS.indexOf(`flyout-of-${event.target.dataset.popType}-bt-${event.target.dataset.popId}`)]} { display: flex; }`, document.styleSheets[10].cssRules.length);
			document.styleSheets[10].insertRule(`#_${decls[DECLS.indexOf(`flyout-of-${event.target.dataset.popType}-bt-${event.target.dataset.popId}`)]} { height: ${document.getElementById(`_${decls[DECLS.indexOf(`flyout-of-${event.target.dataset.popType}-bt-${event.target.dataset.popId}`)]}`).scrollHeight}px; }`, document.styleSheets[10].cssRules.length);
			__status__.previousOpenCalling = event.target.dataset.popId;
			break;
	};
	switch (event.target.classList.contains(`_${decls[DECLS.indexOf("changeTheme")]}`) || event.target.classList.contains(`_${decls[DECLS.indexOf("switchTheme")]}`)) {
		case true:
			switch (event.target.id) {
				case `_${decls[DECLS.indexOf("changeTheme-to-auto")]}`:
					config.theme = "auto";
					break;
				case `_${decls[DECLS.indexOf("changeTheme-to-light")]}`:
					config.theme = "light";
					break;
				case `_${decls[DECLS.indexOf("changeTheme-to-dark")]}`:
					config.theme = "dark";
					break;
				case `_${decls[DECLS.indexOf("changeTheme-to-night")]}`:
					config.theme = "night";
					break;
				case `_${decls[DECLS.indexOf("switchTheme-to-contrast")]}`:
					config.themeContrast = !config.themeContrast
					break;
			};
			themeChangeTo();
			break;
	};
};

document.onscroll = () => {
	switch (Math.round(document.querySelector(`._${decls[DECLS.indexOf("articleCard")]}:last-of-type`).getBoundingClientRect().bottom) <= window.innerHeight && __status__.articlesPrinted < articles.length && __status__.articlesPrinting === false) {
		case true:
			__status__.articlesPrinting = true;
			articlesPrinting();
			break;
	};
};

const resizeObserver = new ResizeObserver((entries) => {
	for (const entry of entries) {
		document.getElementById(`_${decls[DECLS.indexOf("barrier")]}`).style.height = entry.borderBoxSize[0].blockSize + "px";
	};
});

resizeObserver.observe(document.getElementById(`_${decls[DECLS.indexOf("wrapper")]}`));

// with love.