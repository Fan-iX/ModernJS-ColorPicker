(function () {
	let valueRanges = {
		RGB: { R: 255, G: 255, B: 255 },
		HSL: { H: 360, S: 100, L: 100 },
		HSV: { H: 360, S: 100, V: 100 },
		alpha: { alpha: 1 }
	}, panelAxis = {
		"RGB-R": { x: 'G', y: 'B' },
		"RGB-G": { x: 'B', y: 'R' },
		"RGB-B": { x: 'R', y: 'G' },
		"HSV-H": { x: 'S', y: 'V' },
		"HSV-S": { x: 'H', y: 'V' },
		"HSV-V": { x: 'H', y: 'S' }
	},
		startPoint, currentTarget, colorSavedPage = 0, colorSavedPageMax = 10, focusedSquare,
		colorWheel = document.getElementById('colorWheel'),
		colorPanel = document.getElementById('colorPanel'),

		sliderPanel = document.getElementById('sliderPanel'),
		sliderRgbR = document.getElementById('RGB-R'),
		sliderRgbG = document.getElementById('RGB-G'),
		sliderRgbB = document.getElementById('RGB-B'),
		sliderHsvH = document.getElementById('HSV-H'),
		sliderHsvV = document.getElementById('HSV-V'),
		sliderHsvS = document.getElementById('HSV-S'),

		sliderHslL = document.getElementById('HSL-L'),
		sliderHslS = document.getElementById('HSL-S'),

		sliderXAxis = document.getElementById('colorPanel-xAxis'),
		sliderYAxis = document.getElementById('colorPanel-yAxis'),
		sliderAlphaA = document.getElementById('alpha-alpha'),
		alphaMin = document.getElementById('alpha-min'),
		alphaMax = document.getElementById('alpha-max'),

		wrapper = document.getElementById('wrapper'),
		contrastPatch = document.getElementById('contrastPatch'),
		contrastPatch2White = document.getElementById('contrastPatch2White'),
		contrastPatch2Black = document.getElementById('contrastPatch2Black'),
		colorValues = document.getElementById('colorValues'),
		colorSquares = document.getElementById('colorSquares'),
		colorSquareSaved = document.getElementById('colorSquareSaved'),
		colorSquareSavedPrev = document.getElementById('cs-prev'),
		colorSquareSavedNext = document.getElementById('cs-next'),
		colorWheelCover = document.getElementById('colorWheel-cover'),
		colorWheelCursor = colorWheel.children[1],
		colorPanelCursor = colorPanel.children[0],
		colorInput = document.getElementById('colorInput'),
		colorWheelRadius = colorWheel.offsetHeight / 2;

	[
		'lightpink', 'pink', 'crimson', 'palevioletred', 'lavenderblush', 'hotpink', 'deeppink', 'mediumvioletred', 'orchid', 'fuchsia', 'magenta', 'darkmagenta', 'purple', 'violet', 'plum', 'thistle', 'mediumorchid', 'darkviolet', 'darkorchid', 'indigo', 'blueviolet', 'rebeccapurple', 'mediumpurple', 'mediumslateblue', 'slateblue', 'darkslateblue', 'blue', 'mediumblue', 'darkblue', 'navy', 'midnightblue', 'lavender', 'ghostwhite', 'royalblue', 'cornflowerblue', 'lightsteelblue', 'lightslategray', 'slategray', 'dodgerblue', 'aliceblue', 'steelblue', 'lightskyblue', 'skyblue', 'deepskyblue', 'lightblue', 'powderblue', 'cadetblue', 'aqua', 'cyan', 'darkturquoise', 'darkcyan', 'teal', 'darkslategray', 'paleturquoise', 'lightcyan', 'azure', 'mediumturquoise', 'lightseagreen', 'turquoise', 'aquamarine', 'mediumaquamarine', 'mediumspringgreen', 'mintcream', 'springgreen', 'mediumseagreen', 'seagreen', 'lime', 'green', 'darkgreen', 'limegreen', 'forestgreen', 'palegreen', 'lightgreen', 'darkseagreen', 'honeydew', 'chartreuse', 'lawngreen', 'greenyellow', 'darkolivegreen', 'yellowgreen', 'olivedrab', 'yellow', 'olive', 'lightgoldenrodyellow', 'lightyellow', 'beige', 'ivory', 'darkkhaki', 'khaki', 'palegoldenrod', 'lemonchiffon', 'gold', 'cornsilk', 'darkgoldenrod', 'goldenrod', 'floralwhite', 'wheat', 'oldlace', 'orange', 'moccasin', 'papayawhip', 'blanchedalmond', 'navajowhite', 'tan', 'antiquewhite', 'burlywood', 'darkorange', 'bisque', 'linen', 'peru', 'peachpuff', 'sandybrown', 'saddlebrown', 'chocolate', 'seashell', 'sienna', 'lightsalmon', 'orangered', 'coral', 'darksalmon', 'tomato', 'salmon', 'mistyrose', 'red', 'darkred', 'maroon', 'firebrick', 'brown', 'indianred', 'lightcoral', 'rosybrown', 'snow', 'white', 'whitesmoke', 'gainsboro', 'lightgray', 'silver', 'darkgray', 'gray', 'dimgray', 'black'
	].forEach((color) => {
		let square = document.createElement("div")
		square.className = "colorSquare"
		square.style.backgroundColor = square.dataset.name = color
		colorSquares.append(square)
	})

	colorValues.onmousedown = colorValues.onfocus = () => { colorValues.style.userSelect = "auto" }
	colorValues.onblur = () => { colorValues.style.userSelect = "none" }
	colorInput.onsearch = () => {
		if (/:\d/.test(colorInput.value)) {
			colorSavedPage = +colorInput.value.slice(1)
			renderSavedColor()
		} else curColor.setColor(colorInput.value)
	}

	for (i = 0; i < 19; i++) {
		let square = document.createElement("div")
		square.className = "colorSquare"
		square.id = "cs-" + i
		colorSquareSaved.append(square)
	}
	focusedSquare = document.getElementById("cs-0")
	focusedSquare.style.borderWidth = "3px"

	let savedColor = (localStorage.getItem("mjcp-colors") || "deepskyblue").split(";")
		.concat(Array(colorSavedPageMax).fill("")).slice(0, colorSavedPageMax)
		.map(a => a.split(",").concat(Array(19).fill("")).slice(0, 19))
	let curColor = window.curColor = new Color(savedColor[0][0] || "#7f7f7f00")
	curColor.setBackground(localStorage.getItem("mjcp-bg") || "#eee")
	curColor.onchange = () => {
		doRender(curColor);
		localStorage.setItem("mjcp-fg", curColor.HEX);
		localStorage.setItem("mjcp-bg", curColor.background.HEX);
	}

	function saveColor(ele, color, page) {
		page = page || colorSavedPage
		if (color == null) color = "#" + curColor.HEX
		if (window.Color.prototype.parse(color)[0].alpha == 0) color = ""
		if (ele == null) ele = savedColor[page].indexOf("")
		if (ele == -1) return
		if (ele.id) ele = +ele.id.split("-")[1]
		savedColor[page][ele] = color
		localStorage.setItem("mjcp-colors", savedColor.map(a => a.join(",").replace(/,+$/, "")).join(";").replace(/;+$/, ""))
		renderSavedColor()
	}

	function renderSavedColor() {
		savedColor[colorSavedPage].forEach((col, i) => {
			let square = document.getElementById("cs-" + i)
			square.dataset.name = square.style.backgroundColor = col
			if (!col) delete square.dataset.name
		})
	}
	renderSavedColor()

	window.addEventListener('mousedown', sliderDown);
	window.addEventListener('mouseup', function () {
		window.removeEventListener('mousemove', sliderMove);
	});
	window.addEventListener('contextmenu', (e) => {
		if (e.target !== colorValues) e.preventDefault()
	})


	function sliderDown(e) {
		if (e.target.parentNode === colorSquares) {
			curColor[e.button == 2 ? "setBackground" : "setColor"](e.target.dataset.name)
		} else if (e.target === alphaMin) {
			curColor[e.button == 2 ? "setBackground" : "setColor"]("transparent")
		} else if (e.target === alphaMax) {
			curColor[e.button == 2 ? "setBackground" : "setColor"]({ alpha: 1 }, "alpha")
		} else if (e.target === colorSquareSavedPrev) {
			colorSavedPage = (colorSavedPageMax + colorSavedPage - 1) % colorSavedPageMax
			renderSavedColor()
		} else if (e.target === colorSquareSavedNext) {
			colorSavedPage = (colorSavedPage + 1) % colorSavedPageMax
			renderSavedColor()
		} else if (e.target.parentNode === colorSquareSaved) {
			if (e.target !== focusedSquare && e.button == 0) {
				focusedSquare.style.borderWidth = ""
				focusedSquare = e.target
				focusedSquare.style.borderWidth = "3px"
			}
			curColor[e.button == 2 ? "setBackground" : "setColor"](e.target.dataset.name || "transparent")
		} else if (e.target === contrastPatch) {
			e.button == 2 ? curColor.saveAsBackground() : saveColor()
		} else {
			currentTarget = e.target
			startPoint = {
				left: currentTarget.getBoundingClientRect().left + window.pageXOffset - document.body.clientLeft,
				top: currentTarget.getBoundingClientRect().top + window.pageYOffset - document.body.clientTop,
			}
			if (currentTarget.parentNode === sliderPanel) {
				colorPanel.className = currentTarget.id
			}
			sliderMove(e)
			window.addEventListener('mousemove', sliderMove);
		}
	}

	function sliderMove(e) {
		let channel, model,
			x = e.pageX - startPoint.left,
			y = currentTarget.offsetHeight + startPoint.top - e.pageY,
			w = currentTarget.offsetWidth,
			h = currentTarget.offsetHeight;
		if (currentTarget === sliderXAxis) {
			e.preventDefault()
			model = colorPanel.className.split("-")[0]
			channel = panelAxis[colorPanel.className].x
			curColor.setColor({ [channel]: x / w * valueRanges[model][channel] }, model);
		} else if (currentTarget === sliderYAxis) {
			e.preventDefault()
			model = colorPanel.className.split("-")[0]
			channel = panelAxis[colorPanel.className].y
			curColor.setColor({ [channel]: y / h * valueRanges[model][channel] }, model);
		} else if (currentTarget.className == "slider-h") {
			e.preventDefault();
			[model, channel] = currentTarget.id.split("-");
			curColor.setColor({ [channel]: x / w * valueRanges[model][channel] }, model);
		} else if (currentTarget.className == "slider-v") {
			e.preventDefault();
			[model, channel] = currentTarget.id.split("-");
			curColor.setColor({ [channel]: y / h * valueRanges[model][channel] }, model);
		} else if (currentTarget === colorWheel) {
			x = x - w / 2
			y = y - h / 2
			curColor.setColor({
				H: (y < 0 ? 360 : 0) + (Math.atan2(y, x) * 180 / Math.PI),
				S: (Math.sqrt((x * x) + (y * y)) / (w / 2)) * 100
			}, 'HSL');
		} else if (currentTarget === colorPanel) {
			model = currentTarget.className.split("-")[0]
			channel = currentTarget.className
			curColor.setColor({
				[panelAxis[channel].x]: (e.pageX - startPoint.left) / currentTarget.offsetWidth * valueRanges[model][panelAxis[channel].x],
				[panelAxis[channel].y]: (1 - (e.pageY - startPoint.top) / currentTarget.offsetHeight) * valueRanges[model][panelAxis[channel].y]
			}, model);

		}
	}

	function doRender(color) {
		let BG = color.background,
			color_color = `rgba(${color.RGB.R},${color.RGB.G},${color.RGB.B},${color.alpha})`,
			color_RGB = `rgb(${color.RGB.R},${color.RGB.G},${color.RGB.B})`,
			color_BG = `rgba(${BG.RGB.R},${BG.RGB.G},${BG.RGB.B},${BG.alpha})`,
			gradient_rgbR = `rgb(0,${color.RGB.G},${color.RGB.B}),rgb(255,${color.RGB.G},${color.RGB.B})`,
			gradient_rgbG = `rgb(${color.RGB.R},0,${color.RGB.B}),rgb(${color.RGB.R},255,${color.RGB.B})`,
			gradient_rgbB = `rgb(${color.RGB.R},${color.RGB.G},0),rgb(${color.RGB.R},${color.RGB.G},255)`,
			gradient_hsvS = `rgba(255,255,255,${color.hsv.v}), hsl(${color.HSL.H},100%,50%,${color.hsv.v})`,
			color_hsvV = `hsl(${color.HSV.H},100%,50%,${color.hsv.s})`,
			gradient_hsvH = `
hsl(  0,${color.HSL.S}%,${color.HSL.L}%),
hsl( 60,${color.HSL.S}%,${color.HSL.L}%),
hsl(120,${color.HSL.S}%,${color.HSL.L}%),
hsl(180,${color.HSL.S}%,${color.HSL.L}%),
hsl(240,${color.HSL.S}%,${color.HSL.L}%),
hsl(300,${color.HSL.S}%,${color.HSL.L}%),
hsl(360,${color.HSL.S}%,${color.HSL.L}%)`,
			gradient_hslS = `
hsl(${color.HSL.H},  0%,${color.HSL.L}%),
hsl(${color.HSL.H}, 10%,${color.HSL.L}%),
hsl(${color.HSL.H}, 20%,${color.HSL.L}%),
hsl(${color.HSL.H}, 30%,${color.HSL.L}%),
hsl(${color.HSL.H}, 40%,${color.HSL.L}%),
hsl(${color.HSL.H}, 50%,${color.HSL.L}%),
hsl(${color.HSL.H}, 60%,${color.HSL.L}%),
hsl(${color.HSL.H}, 70%,${color.HSL.L}%),
hsl(${color.HSL.H}, 80%,${color.HSL.L}%),
hsl(${color.HSL.H}, 90%,${color.HSL.L}%),
hsl(${color.HSL.H},100%,${color.HSL.L}%)`,
			gradient_hslL = `
hsl(${color.HSL.H},${color.HSL.S}%,  0%),
hsl(${color.HSL.H},${color.HSL.S}%, 10%),
hsl(${color.HSL.H},${color.HSL.S}%, 20%),
hsl(${color.HSL.H},${color.HSL.S}%, 30%),
hsl(${color.HSL.H},${color.HSL.S}%, 40%),
hsl(${color.HSL.H},${color.HSL.S}%, 50%),
hsl(${color.HSL.H},${color.HSL.S}%, 60%),
hsl(${color.HSL.H},${color.HSL.S}%, 70%),
hsl(${color.HSL.H},${color.HSL.S}%, 80%),
hsl(${color.HSL.H},${color.HSL.S}%, 90%),
hsl(${color.HSL.H},${color.HSL.S}%,100%)`


		contrastPatch.style.backgroundColor = contrastPatch2Black.style.color = contrastPatch2White.style.color = color_color
		contrastPatch.children[0].innerText = contrastPatch.children[1].innerText =
			contrastPatch2White.children[0].innerText = contrastPatch2Black.children[0].innerText = '#' + color.HEX;
		contrastPatch2White.style.backgroundImage = contrastPatch2Black.style.backgroundImage = `linear-gradient(to right, ${color_BG} 50%, transparent 50%)`
		colorSquares.style.backgroundColor = colorSquareSaved.style.backgroundColor = color_BG

		colorValues.innerText = ''
		function selfSelectSpan(innerText) {
			let span = document.createElement("span")
			span.onclick = function () {
				let selection = window.getSelection();
				let range = document.createRange();
				range.selectNodeContents(this);
				selection.removeAllRanges();
				selection.addRange(range);
			}
			span.innerText=innerText
			return span
		}
		colorValues.append(selfSelectSpan("#"+color.HEX))
		colorValues.append(" ")
		colorValues.append(selfSelectSpan(color.cssName))
		colorValues.append("\n")
		colorValues.append(selfSelectSpan(`rgba(${color.RGB.R},${color.RGB.G},${color.RGB.B},${color.Alpha})`))
		colorValues.append("\n")
		colorValues.append(selfSelectSpan(`hsva(${color.HSV.H},${color.HSV.S},${color.HSV.V},${color.Alpha})`))
		colorValues.append("\n")
		colorValues.append(selfSelectSpan(`hsla(${color.HSL.H},${color.HSL.S},${color.HSL.L},${color.Alpha})`))
		colorValues.append("\n")
		colorValues.append(selfSelectSpan(`CMYK(${color.CMYK.C},${color.CMYK.M},${color.CMYK.Y},${color.CMYK.K})`))
		colorValues.append("\n")
		colorValues.append(selfSelectSpan(`CMY(${color.CMY.C},${color.CMY.M},${color.CMY.Y})`))
		colorValues.append("\n")
		colorValues.append(selfSelectSpan(`Lab(${color.Lab.L},${color.Lab.a},${color.Lab.b})`))

		wrapper.className = color.Luminance > 0.22 ? 'dark' : 'light'

		sliderRgbR.style.backgroundImage = `linear-gradient(to right,${gradient_rgbR})`
		sliderRgbG.style.backgroundImage = `linear-gradient(to right,${gradient_rgbG})`
		sliderRgbB.style.backgroundImage = `linear-gradient(to right,${gradient_rgbB})`

		sliderHsvS.style.backgroundImage = `linear-gradient(to right,${gradient_hsvS})`
		sliderHsvV.style.backgroundColor = color_hsvV
		sliderHsvH.style.backgroundImage = `linear-gradient(to right,${gradient_hsvH})`

		sliderHslS.style.backgroundImage = `linear-gradient(to top,${gradient_hslS})`
		sliderHslL.style.backgroundImage = `linear-gradient(to top,${gradient_hslL})`


		sliderAlphaA.style.backgroundColor = color_BG
		sliderAlphaA.style.backgroundImage = `linear-gradient(to top, transparent, ${color_RGB}`
		alphaMax.style.backgroundColor = color_RGB

		sliderRgbR.children[0].style.left = 100 * color.rgb.r + '%'
		sliderRgbG.children[0].style.left = 100 * color.rgb.g + '%'
		sliderRgbB.children[0].style.left = 100 * color.rgb.b + '%'
		sliderHsvH.children[0].style.left = 100 * color.hsv.h + '%'
		sliderHsvS.children[0].style.left = 100 * color.hsv.s + '%'
		sliderHsvV.children[0].style.left = 100 * color.hsv.v + '%'
		sliderHslS.children[0].style.top = 100 * (1 - color.hsl.s) + '%'
		sliderHslL.children[0].style.top = 100 * (1 - color.hsl.l) + '%'
		sliderAlphaA.children[0].style.top = 100 * (1 - color.alpha) + '%'

		colorWheelCover.style.opacity = Math.abs(1 - 2 * color.hsl.l);
		colorWheelCover.style.backgroundColor = color.hsl.l > 0.5 ? "#fff" : "#000"

		var x = Math.cos(Math.PI * 2 - color.hsl.h * Math.PI * 2),
			y = Math.sin(Math.PI * 2 - color.hsl.h * Math.PI * 2),
			r = color.hsl.s * colorWheelRadius;

		colorWheelCursor.style.left = (x * r + colorWheelRadius) + 'px'
		colorWheelCursor.style.top = (y * r + colorWheelRadius) + 'px'

		saveColor(focusedSquare)

		sliderXAxis.children[0].style.left =
			colorPanelCursor.style.left = 100 * color[colorPanel.className.split("-")[0].toLowerCase()][panelAxis[colorPanel.className].x.toLowerCase()] + '%'
		sliderYAxis.children[0].style.top =
			colorPanelCursor.style.top = 100 * (1 - color[colorPanel.className.split("-")[0].toLowerCase()][panelAxis[colorPanel.className].y.toLowerCase()]) + '%'

		if (colorPanel.className == 'RGB-R') {
			colorPanel.style.backgroundColor = `rgb(${color.RGB.R},0,0)`
			sliderXAxis.style.backgroundImage = `linear-gradient(to right,${gradient_rgbG})`
			sliderYAxis.style.backgroundImage = `linear-gradient(to top,  ${gradient_rgbB})`
		}
		if (colorPanel.className == 'RGB-G') {
			colorPanel.style.backgroundColor = `rgb(0,${color.RGB.G},0)`
			sliderXAxis.style.backgroundImage = `linear-gradient(to right,${gradient_rgbB})`
			sliderYAxis.style.backgroundImage = `linear-gradient(to top,  ${gradient_rgbR})`
		}
		if (colorPanel.className == 'RGB-B') {
			colorPanel.style.backgroundColor = `rgb(0,0,${color.RGB.B})`
			sliderXAxis.style.backgroundImage = `linear-gradient(to right,${gradient_rgbR})`
			sliderYAxis.style.backgroundImage = `linear-gradient(to top,  ${gradient_rgbG})`
		}
		if (colorPanel.className == 'HSV-H') {
			colorPanel.style.backgroundColor = `hsl(${color.HSL.H},100%,50%)`;
			sliderXAxis.style.backgroundColor = '#000'
			sliderXAxis.style.backgroundImage = `linear-gradient(to right, ${gradient_hsvS})`
			sliderYAxis.style.backgroundColor = color_hsvV
			sliderYAxis.style.backgroundImage = `linear-gradient(to top, #000, transparent)`
		};
		if (colorPanel.className == 'HSV-S') {
			colorPanel.style.backgroundColor = `hsl(0,0%,${100 - color.HSV.S}%)`
			sliderXAxis.style.backgroundImage = `linear-gradient(to right,${gradient_hsvH})`
			sliderYAxis.style.backgroundColor = color_hsvV
			sliderYAxis.style.backgroundImage = `linear-gradient(to top, #000, transparent)`
		}
		if (colorPanel.className == 'HSV-V') {
			colorPanel.style.backgroundColor = `hsl(0,0%,${color.HSV.V}%)`
			sliderXAxis.style.backgroundImage = `linear-gradient(to right,${gradient_hsvH})`
			sliderYAxis.style.backgroundColor = '#000'
			sliderYAxis.style.backgroundImage = `linear-gradient(to top,  ${gradient_hsvS})`
		}
	}
	doRender(curColor);
})()