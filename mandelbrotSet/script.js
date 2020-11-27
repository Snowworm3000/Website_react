// create an offscreen canvas
// var canvas = document.createElement("canvas");
// var ctx = canvas.getContext("2d");

// document.body.appendChild(canvas);

canvas = document.getElementById("canvas")
var ctx = canvas.getContext("2d");

let width = 500, height = 500;


// size the canvas to your desired image
canvas.width = width;
canvas.height = height;

// get the imageData and pixel array from the canvas
var imgData = ctx.createImageData(width, height);
var data = imgData.data;


const minS = document.getElementById("min")
const maxS = document.getElementById("max")

function round(n){
    return Math.floor(n+0.5);
}

function map(value, inputS, inputE, outputS, outputE){
    let slope = (outputE - outputS) / (inputE - inputS)
    return outputS + slope * (value - inputS);
}

minS.addEventListener("input",move)
maxS.addEventListener("input",move)

move()
function move(){
console.log(minS.value,maxS.value)
let count = maxIterations = 100
for (let x = 0; x < width; x++){
    for (let y = 0; y < height; y++){

        let a = map(x, 0, width, -minS.value, maxS.value);
        let b = map(y,0,height,-minS.value,maxS.value);

        let ca = a;
        let cb = b;


        let n = 0;

        while (n < maxIterations){
            let aa = a*a - b*b;
            let bb = 2*a*b;

            a = aa + ca;
            b = bb + cb;
            if (a * a + b * b > 16) {
                break;
              }

            n++;
        }


        let hue = map(n,0,maxIterations,0,1)

        let colour = hslToRgb(hue,1,0.5)

        // let bright = map(n,0,maxIterations,0,255);
        bright = map(n,0,maxIterations,0,255);

        if(n == maxIterations){
            // bright = 0
            colour = [0,0,0]
        }



        // console.log(a)
        let pos = (x + y * width) * 4;
        data[pos] = colour[0] //red
        data[pos+1] = colour[1] //green
        data[pos+2] = colour[2] //blue
        data[pos+3] = 255 //alpha
    }
}

// put the modified pixels back on the canvas
ctx.putImageData(imgData, 0, 0);

}








/**
 * Converts an HSL color value to RGB. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes h, s, and l are contained in the set [0, 1] and
 * returns r, g, and b in the set [0, 255].
 *
 * @param   {number}  h       The hue
 * @param   {number}  s       The saturation
 * @param   {number}  l       The lightness
 * @return  {Array}           The RGB representation
 */
function hslToRgb(h, s, l){
    var r, g, b;

    if(s == 0){
        r = g = b = l; // achromatic
    }else{
        var hue2rgb = function hue2rgb(p, q, t){
            if(t < 0) t += 1;
            if(t > 1) t -= 1;
            if(t < 1/6) return p + (q - p) * 6 * t;
            if(t < 1/2) return q;
            if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        }

        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }

    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}