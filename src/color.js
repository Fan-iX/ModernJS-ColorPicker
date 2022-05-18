(function () {
    let cssColors = {
        "aliceblue": "#f0f8ff", "antiquewhite": "#faebd7", "aqua": "#00ffff", "aquamarine": "#7fffd4",
        "azure": "#f0ffff", "beige": "#f5f5dc", "bisque": "#ffe4c4", "black": "#000000",
        "blanchedalmond": "#ffebcd", "blue": "#0000ff", "blueviolet": "#8a2be2", "brown": "#a52a2a",
        "burlywood": "#deb887", "cadetblue": "#5f9ea0", "chartreuse": "#7fff00", "chocolate": "#d2691e",
        "coral": "#ff7f50", "cornflowerblue": "#6495ed", "cornsilk": "#fff8dc", "crimson": "#dc143c",
        "cyan": "#00ffff", "darkblue": "#00008b", "darkcyan": "#008b8b", "darkgoldenrod": "#b8860b",
        "darkgray": "#a9a9a9", "darkgrey": "#a9a9a9", "darkgreen": "#006400", "darkkhaki": "#bdb76b",
        "darkmagenta": "#8b008b", "darkolivegreen": "#556b2f", "darkorange": "#ff8c00", "darkorchid": "#9932cc",
        "darkred": "#8b0000", "darksalmon": "#e9967a", "darkseagreen": "#8fbc8f", "darkslateblue": "#483d8b",
        "darkslategray": "#2f4f4f", "darkslategrey": "#2f4f4f", "darkturquoise": "#00ced1", "darkviolet": "#9400d3",
        "deeppink": "#ff1493", "deepskyblue": "#00bfff", "dimgray": "#696969", "dimgrey": "#696969",
        "dodgerblue": "#1e90ff", "firebrick": "#b22222", "floralwhite": "#fffaf0", "forestgreen": "#228b22",
        "fuchsia": "#ff00ff", "gainsboro": "#dcdcdc", "ghostwhite": "#f8f8ff", "gold": "#ffd700",
        "goldenrod": "#daa520", "gray": "#808080", "grey": "#808080", "green": "#008000",
        "greenyellow": "#adff2f", "honeydew": "#f0fff0", "hotpink": "#ff69b4", "indianred": "#cd5c5c",
        "indigo": "#4b0082", "ivory": "#fffff0", "khaki": "#f0e68c", "lavender": "#e6e6fa",
        "lavenderblush": "#fff0f5", "lawngreen": "#7cfc00", "lemonchiffon": "#fffacd", "lightblue": "#add8e6",
        "lightcoral": "#f08080", "lightcyan": "#e0ffff", "lightgoldenrodyellow": "#fafad2", "lightgray": "#d3d3d3",
        "lightgrey": "#d3d3d3", "lightgreen": "#90ee90", "lightpink": "#ffb6c1", "lightsalmon": "#ffa07a",
        "lightseagreen": "#20b2aa", "lightskyblue": "#87cefa", "lightslategray": "#778899", "lightslategrey": "#778899",
        "lightsteelblue": "#b0c4de", "lightyellow": "#ffffe0", "lime": "#00ff00", "limegreen": "#32cd32",
        "linen": "#faf0e6", "magenta": "#ff00ff", "maroon": "#800000", "mediumaquamarine": "#66cdaa",
        "mediumblue": "#0000cd", "mediumorchid": "#ba55d3", "mediumpurple": "#9370d8", "mediumseagreen": "#3cb371",
        "mediumslateblue": "#7b68ee", "mediumspringgreen": "#00fa9a", "mediumturquoise": "#48d1cc", "mediumvioletred": "#c71585",
        "midnightblue": "#191970", "mintcream": "#f5fffa", "mistyrose": "#ffe4e1", "moccasin": "#ffe4b5",
        "navajowhite": "#ffdead", "navy": "#000080", "oldlace": "#fdf5e6", "olive": "#808000",
        "olivedrab": "#6b8e23", "orange": "#ffa500", "orangered": "#ff4500", "orchid": "#da70d6",
        "palegoldenrod": "#eee8aa", "palegreen": "#98fb98", "paleturquoise": "#afeeee", "palevioletred": "#d87093",
        "papayawhip": "#ffefd5", "peachpuff": "#ffdab9", "peru": "#cd853f", "pink": "#ffc0cb",
        "plum": "#dda0dd", "powderblue": "#b0e0e6", "purple": "#800080", "rebeccapurple": "#663399",
        "red": "#ff0000", "rosybrown": "#bc8f8f", "royalblue": "#4169e1", "saddlebrown": "#8b4513",
        "salmon": "#fa8072", "sandybrown": "#f4a460", "seagreen": "#2e8b57", "seashell": "#fff5ee",
        "sienna": "#a0522d", "silver": "#c0c0c0", "skyblue": "#87ceeb", "slateblue": "#6a5acd",
        "slategray": "#708090", "slategrey": "#708090", "snow": "#fffafa", "springgreen": "#00ff7f",
        "steelblue": "#4682b4", "tan": "#d2b48c", "teal": "#008080", "thistle": "#d8bfd8", "tomato": "#ff6347",
        "turquoise": "#40e0d0", "violet": "#ee82ee", "wheat": "#f5deb3", "white": "#ffffff",
        "whitesmoke": "#f5f5f5", "yellow": "#ffff00", "yellowgreen": "#9acd32"
    }

    let _valueRanges = {
        RGB: { R: [0, 255], G: [0, 255], B: [0, 255] },
        HSV: { H: [0, 360], S: [0, 100], V: [0, 100] },
        HSL: { H: [0, 360], S: [0, 100], L: [0, 100] },
        CMY: { C: [0, 100], M: [0, 100], Y: [0, 100] },
        CMYK: { C: [0, 100], M: [0, 100], Y: [0, 100], K: [0, 100] },
        XYZ: { X: [0, 0.95047], Y: [0, 1], Z: [0, 1.08883] },
        Lab: { L: [0, 100], a: [-127, 127], b: [-127, 127] },
        Alpha: { alpha: [0, 1] }
    }

    let _fullName = {
        rgb: "RGB", hsv: "HSV", hsl: "HSL", cmy: "CMY", cmyk: "CMYK",
        xyz: "XYZ", lab: "Lab", alpha: "Alpha"
    }

    function _limitValue(value, range) {
        return (value > range[1] ? range[1] : value < range[0] ? range[0] : value);
    }

    class Color {
        constructor(color = "#fff", model) {
            this.setValue({ r: 0, g: 0, b: 0 })
            this.background = {}
            this.setBackground("#fff")
            this.setColor(color, model)
            this.alpha = 1
        }

        static cssColors = cssColors

        parse(color, model) {
            if (!color) return
            if (model && !(_fullName[model] || _valueRanges[model])) throw "Invalid color model"
            if (typeof color == "string") {
                if (cssColors[color]) color = cssColors[color]
                let m = color.match(/\s*(.*)\((.*)\)/)
                if (m) {
                    model = m[1].trim()
                    let _model = model.replace(/a$/, "")
                    if (!(_fullName[_model] || _valueRanges[_model])) throw "Invalid color model"
                    model = _fullName[_model] || _model
                    _model = model.split("")
                    if (m[1].trim().slice(-1).toLowerCase() == "a") _model.push("alpha")
                    color = m[2].split(",").reduce((obj, v, i) => (obj[_model[i]] = +v, obj), {})
                } else {
                    color = this.HEX2RGB(color)
                    model = "RGB"
                }
            }
            if (model == "alpha") model = "RGB"

            let alpha = color.alpha == 0 ? 0 : color.alpha || 1
            alpha = _limitValue(alpha, [0, 1])

            let _color = {}
            for (let channel of model) {
                _color[channel] = color[channel] || (this[model] && this[model][channel]) || 0
                if (color[channel] == 0) _color[channel] = 0
                _color[channel] = _limitValue(_color[channel], _valueRanges[model] ? _valueRanges[model][channel] : [0, 1])
            }
            _color.alpha = alpha
            return [_color, model]
        }

        parseStrict(color, model) {
            let _color = {}
            for (let channel of model) {
                _color[channel] = color[channel] || (this[model] && this[model][channel]) || 0
                if (color[channel] == 0) _color[channel] = 0
                _color[channel] = _limitValue(_color[channel], _valueRanges[model] ? _valueRanges[model][channel] : [0, 1])
            }
            return _color
        }

        setColor(color, model) {
            [color, model] = this.parse(color, model);
            [color, model] = this.scale(color, -1);
            this[model] = this.parseStrict(color, model);
            if (model == "hsl") this.hsv.h = color.h
            let rgb = this[model + "2rgb"](color)
            this.setValue(rgb)
            return (this)
        }

        setValue(rgb, alpha) {
            this.alpha = alpha || (rgb && rgb.alpha) || this.alpha
            if (alpha == 0 || (rgb && rgb.alpha) == 0) this.alpha = 0
            this.Alpha = Math.round(this.alpha * 100) / 100
            if (rgb) {
                rgb = { r: rgb.r, g: rgb.g, b: rgb.b }
                for (let model of ["rgb", "hsv", "hsl", 'lab', "xyz", "cmy", "cmyk"]) {
                    this[model] = this["rgb2" + model](rgb)
                }
                for (let model of ["RGB", "HSV", "HSL", 'Lab', "XYZ", "CMY", "CMYK"]) {
                    this[model] = this.scale(this[model.toLowerCase()])[0]
                }
                this.HEX = this.RGB2HEX(this.RGB, this.alpha)
                this.Luminance = this.getLuminance(rgb)
                this.EquivalentGray = this.getEquivalentGray(rgb)
                this.hueRGB = this.scale(this.hsv2rgb({ h: this.hsv.h, s: 1, v: 1 }), 1)[0]
                this.cssName = Object.keys(cssColors).filter(x => cssColors[x] == "#" + this.HEX.toLowerCase())[0]
            }
        }

        setBackground(color, model) {
            [color, model] = this.parse(color, model);
            [color, model] = this.scale(color, -1);
            this.background.alpha = color.alpha
            let rgb = this[model + "2rgb"](color)
            this.background.rgb = rgb
            this.background.RGB = this.scale(rgb, 1)[0]
        }
        saveAsBackground() {
            this.background.rgb = this.rgb
            this.background.RGB = this.RGB
            this.background.alpha = this.alpha
        }

        scale(value, scaleTo = 0, noAlpha) {
            let alpha = value.alpha
            delete value.alpha
            let modelFrom, modelTo, _model, _value = {}
            if (typeof scaleTo == "string") {
                if (!(_fullName[scaleTo] || _valueRanges[scaleTo])) throw "Invalid color model"
                modelFrom = _fullName[scaleTo] || scaleTo.toLowerCase()
            } else {
                modelFrom = Object.keys(value)
                _model = Object.keys(_valueRanges).filter((m) => modelFrom.every((x) => m.includes(x)))[0]
                if (_model) modelTo = (modelFrom = _model).toLowerCase()
                else {
                    _model = Object.keys(_fullName).filter((m) => modelFrom.every((x) => m.includes(x)))[0]
                    if (_model) modelTo = _fullName[modelFrom = _model]
                }
                if (!modelTo) throw "Invalid color model"
                if (scaleTo == 1) modelTo = _fullName[modelTo] || modelTo
                if (scaleTo == -1) modelTo = modelTo.toLowerCase()
            }
            if (modelFrom == modelTo) {
                for (let channel of modelFrom) _value[channel] = value[channel]
            } else if (modelTo == modelTo.toLowerCase()) {
                for (let channel of modelFrom) {
                    let range = _valueRanges[modelFrom][channel]
                    _value[channel.toLowerCase()] = (value[channel] - range[0]) / (range[1] - range[0])
                }
            } else {
                for (let channel of modelTo) {
                    let range = _valueRanges[modelTo][channel]
                    _value[channel] = range[0] + value[channel.toLowerCase()] * (range[1] - range[0])
                    if (["RGB", "HSV", "HSL", "CMY", "CMYK"].includes(modelTo))
                        _value[channel] = Math.round(_value[channel])
                    if (["XYZ", "Lab"].includes(modelTo))
                        _value[channel] = Math.round(_value[channel] * 100) / 100
                }
            }
            if (alpha && !noAlpha) _value.alpha = alpha
            return [_value, modelTo]
        }

        getLuminance(rgb) {
            var rgb = this.scale(rgb, -1)[0]
            rgb = [rgb.r, rgb.g, rgb.b].map((c) => c <= 0.03928 ? c / 12.92 : Math.pow(((c + 0.055) / 1.055), 2.4))
            return 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
        }

        getEquivalentGray(rgb) {
            var rgb = this.scale(rgb, -1)[0]
            return 0.298954 * rgb.r + 0.586434 * rgb.g + 0.114612 * rgb.b;
        }

        HEX2RGB(HEX) {
            HEX = HEX.replace(/^#+/, "")
            if ([1, 3, 4].includes(HEX.length)) HEX = HEX.split("").map(x => x + x).join("")
            return {
                R: +('0x' + HEX.slice(0, 2)),
                G: +('0x' + (HEX.slice(2, 4) || HEX.slice(0, 2))),
                B: +('0x' + (HEX.slice(4, 6) || HEX.slice(0, 2))),
                alpha: +('0x' + (HEX.slice(6, 8) || "ff")) / 255
            };
        }

        RGB2HEX(RGB, alpha = 1) {
            alpha = Math.round(alpha * 255)
            return (
                RGB.R.toString(16).padStart(2, "0") +
                RGB.G.toString(16).padStart(2, "0") +
                RGB.B.toString(16).padStart(2, "0") +
                (alpha == 255 ? "" : alpha.toString(16).padStart(2, "0"))
            ).toUpperCase();
        }

        rgb2rgb(rgb) { return rgb }

        rgb2hsv(rgb) {
            var r = rgb.r, g = rgb.g, b = rgb.b,
                k = 0, chroma, min, s;

            if (g < b) {
                g = b + (b = g, 0);
                k = -1;
            }
            min = b;
            if (r < g) {
                r = g + (g = r, 0);
                k = -2 / 6 - k;
                min = Math.min(g, b);
            }
            chroma = r - min;
            s = r ? (chroma / r) : (this.hsv && this.hsv.s) || 0;
            return {
                h: s < 1e-15 ? (this.hsv && this.hsv.h) || 0 :
                    chroma ? Math.abs(k + (g - b) / (6 * chroma)) || (1 - this.hsv.h < 0.5 ? 1 : 0) : (this.hsv && this.hsv.h) || 0,
                s: s,
                v: r
            };
        }

        hsv2rgb(hsv) {
            var h = hsv.h * 6,
                s = hsv.s,
                v = hsv.v,
                i = Math.floor(h),
                f = h - i,
                p = v * (1 - s),
                q = v * (1 - f * s),
                t = v * (1 - (1 - f) * s),
                mod = i % 6;

            return {
                r: [v, q, p, p, t, v][mod],
                g: [t, v, v, q, p, p][mod],
                b: [p, p, t, v, v, q][mod]
            };
        }

        hsv2hsl(hsv) {
            var l = (2 - hsv.s) * hsv.v,
                s = (l == 0 || l == 2) ? (this.hsl && this.hsl.s) || 0 : hsv.s * hsv.v / Math.min(l, 2 - l);

            return {
                h: hsv.h,
                s: s,
                l: l / 2
            };
        }

        hsl2hsv(hsl) {
            var v = hsl.l + hsl.s * Math.min(hsl.l, 1 - hsl.l),
                s = !v ? (this.hsl && this.hsl.s) || 0 : 2 - 2 * hsl.l / v
            return { h: hsl.h, s: s, v: v }
        }

        hsl2rgb(hsl) {
            return this.hsv2rgb(this.hsl2hsv(hsl))
        }

        rgb2hsl(rgb) {
            return this.hsv2hsl(this.rgb2hsv(rgb))
        }


        cmy2cmyk(cmy) {
            var k = Math.min(Math.min(cmy.c, cmy.m), cmy.y),
                t = 1 - k || -1;
            return {
                c: (cmy.c - k) / t,
                m: (cmy.m - k) / t,
                y: (cmy.y - k) / t,
                k: k
            };
        }

        rgb2cmy(rgb) {
            return {
                c: 1 - rgb.r,
                m: 1 - rgb.g,
                y: 1 - rgb.b
            };
        }

        cmy2rgb(cmy) {
            return {
                r: 1 - cmy.c,
                g: 1 - cmy.m,
                b: 1 - cmy.y
            };
        }

        cmyk2cmy(cmyk) {
            var k = cmyk.k;

            return {
                c: cmyk.c * (1 - k) + k,
                m: cmyk.m * (1 - k) + k,
                y: cmyk.y * (1 - k) + k
            };
        }

        cmyk2rgb(cmyk) {
            return this.cmy2rgb(this.cmyk2cmy(cmyk))
        }

        rgb2cmyk(rgb) {
            return this.cmy2cmyk(this.rgb2cmy(rgb))
        }

        xyz2rgb(xyz) {
            var M = {
                R: [3.2404542, -1.5371385, -0.4985314],
                G: [-0.9692660, 1.8760108, 0.0415560],
                B: [0.0556434, -0.2040259, 1.0572252]
            },
                X = xyz.x * 0.95047,
                Y = xyz.y,
                Z = xyz.z * 1.08883,
                r = X * M.R[0] + Y * M.R[1] + Z * M.R[2],
                g = X * M.G[0] + Y * M.G[1] + Z * M.G[2],
                b = X * M.B[0] + Y * M.B[1] + Z * M.B[2],
                N = 1 / 2.4;

            M = 0.0031308;

            r = (r > M ? 1.055 * Math.pow(r, N) - 0.055 : 12.92 * r);
            g = (g > M ? 1.055 * Math.pow(g, N) - 0.055 : 12.92 * g);
            b = (b > M ? 1.055 * Math.pow(b, N) - 0.055 : 12.92 * b);

            return {
                r: _limitValue(r, [0, 1]),
                g: _limitValue(g, [0, 1]),
                b: _limitValue(b, [0, 1])
            };
        }

        rgb2xyz(rgb) {
            var M = {
                X: [0.4124564, 0.3575761, 0.1804375],
                Y: [0.2126729, 0.7151522, 0.0721750],
                Z: [0.0193339, 0.1191920, 0.9503041]
            },
                r = rgb.r,
                g = rgb.g,
                b = rgb.b,
                N = 0.04045;

            r = (r > N ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92);
            g = (g > N ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92);
            b = (b > N ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92);

            return {
                x: (r * M.X[0] + g * M.X[1] + b * M.X[2]) / 0.95047,
                y: (r * M.Y[0] + g * M.Y[1] + b * M.Y[2]),
                z: (r * M.Z[0] + g * M.Z[1] + b * M.Z[2]) / 1.08883
            };
        }

        xyz2lab(xyz) {
            var X = xyz.x,
                Y = xyz.y,
                Z = xyz.z,
                N = 16 / 116, M = 1 / 3, K = 0.008856, L = 7.787037;

            X = X > K ? Math.pow(X, M) : (L * X) + N;
            Y = Y > K ? Math.pow(Y, M) : (L * Y) + N;
            Z = Z > K ? Math.pow(Z, M) : (L * Z) + N;

            return {
                l: _limitValue((1.16 * Y) - 0.16, [0, 1]),
                a: 1.953125 * (X - Y) + 0.5,
                b: 0.78125 * (Y - Z) + 0.5
            };
        }

        lab2xyz(Lab) {
            var Y = (Lab.l * 100 + 16) / 116,
                X = (Lab.a - 0.5) * 0.512 + Y,
                Z = Y - (Lab.b - 0.5) * 1.28,
                X3 = Math.pow(X, 3),
                Y3 = Math.pow(Y, 3),
                Z3 = Math.pow(Z, 3),
                N = 16 / 116, K = 0.008856, L = 7.787037;

            return {
                x: (X3 > K ? X3 : (X - N) / L),
                y: (Y3 > K ? Y3 : (Y - N) / L),
                z: (Z3 > K ? Z3 : (Z - N) / L)
            };
        }

        rgb2lab(rgb) {
            return this.xyz2lab(this.rgb2xyz(rgb));
        }

        lab2rgb(Lab) {
            return this.xyz2rgb(this.lab2xyz(Lab));
        }
    }
    window.Color = Color
})()