//Aqui los shaders estan el mismo archivo, pero se deben poner en distintos archivos
//Los shaders se complian en tiempos de ejecución, por lo que me dá eerors de todo menos de esto
//Como determinar los errroes en un shader

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

var a = 0;
var b = 0;
var c = 0;
var cont = 1;
var flag = 1;

window.onload = function init()
{

  window.onkeydown = function(event) {
        var key = String.fromCharCode(event.keyCode);
        switch(key) {
          case 'C':
            if(cont==0)
            {
              a = 0;
              b = 0;
              c = 0;
              flag = 0;
              cont = cont+1;
              render();
            }
            else if(cont==1)
            {
              a = 0;
              b = 0;
              c = -1;
              flag = 0.3;
              cont = cont+1;
              render();
            }
            else if (cont==2)
            {
              a = 0;
              b = 0;
              c = -3;
              flag = 0.5;
              cont = cont+1;
  						render();
            }
            else if (cont==3)
            {
              a = 0;
              b = 0;
              c = -6;
              flag = 0.6;
              cont = cont+1;
  						render();
            }
            else if (cont==4)
            {
              a = 0;
              b = 0;
              c = -10;
              flag = 0.8;
              cont = cont+1;
  						render();
            }
            else if (cont==5)
            {
              a = 0;
              b = 0;
              c = -14;
              flag = 1;
              cont = 0;
  						render();
            }

            break;

          case '68':
            b = b + 0.1;
						render();
            break;

          case '69':
            c = c + 0.1;
						render();s
            break;
        }
    };


const canvas=document.querySelector ('canvas');	//Selecciona el objeto
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;



const gl=canvas.getContext('webgl');	//Verifica si es o no nulo


if (!gl)
{
	throw new Error ('WebGL not supported');
}

var m4CG = {
	translation:function(tx,ty,tz){
		return [
			1,   0,   0, 0,
			0,   1,   0, 0,
			0,   0,   1, 0,
			tx, ty,  tz, 1,
		];
	},
	scaling:function(sx,sy,sz){
		return [
			sx,  0,  0, 0,
			 0, sy,  0, 0,
			 0,  0, sz, 0,
			 0,  0,  0, 1,
		];
	},
	shearing:function(ax){
		return [
			1,  ax,  0, 0,
			 0, 1,  0, 0,
			 0,  0, 1, 0,
			 0,  0,  0, 1,
		];
	},
	perspective: function(fieldOfViewInRadians, aspect, near, far) {
    var f = Math.tan(Math.PI * 0.5 - 0.5 * fieldOfViewInRadians);
    var rangeInv = 1.0 / (near - far);

    return [
      f / aspect, 0, 0, 0,
      0, f, 0, 0,
      0, 0, (near + far) * rangeInv, -1,
      0, 0, near * far * rangeInv * 2, 0
    ];
  },
};

const vertexShader = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(vertexShader, `
	precision mediump float;
	attribute vec3 position;
	attribute vec3 color;
	varying vec4 vColor;
	uniform mat4 matrixa;

  varying float v_fogDepth;
  varying vec4 vPosition;

	void main() {
			vColor = vec4(color, 1.0);
      vPosition = vec4(position, 1.0);
	    gl_Position = matrixa * vPosition;

      v_fogDepth = -(matrixa * vPosition).z;
}
`);
gl.compileShader(vertexShader);

const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(fragmentShader, `
	precision mediump float;
  uniform vec4 fogColor;
  uniform float flag;
  varying vec4 vColor;
  varying float v_fogDepth;
	void main() {

      gl_FragColor = gl_FragColor = vColor + (fogColor - vColor) * flag;
      //gl_FragColor = vColor;
	}
`);
gl.compileShader(fragmentShader);


const program = gl.createProgram();
gl.attachShader(program, vertexShader);
gl.attachShader(program, fragmentShader);
gl.linkProgram(program);

//gl.enable(gl.CULL_FACE);
gl.enable(gl.DEPTH_TEST);

const uniformLocations = {
	matrix:gl.getUniformLocation(program,`matrixa`),
};
////////////////////////////// Objeto1 - CUBO //////////////////////////////////
const vertexData1 = [
0.5,0.5,0.5,
0.5,-0.5,0.5,
-0.5,0.5,0.5,
-0.5,0.5,0.5,
0.5,-0.5,0.5,
-0.5,-0.5,0.5,
//
-0.5,0.5,0.5,
-0.5,-0.5,0.5,
-0.5,0.5,-0.5,
-0.5,0.5,-0.5,
-0.5,-0.5,0.5,
-0.5,-0.5,-0.5,
//
-0.5,0.5,-0.5,
-0.5,-0.5,-0.5,
0.5,0.5,-0.5,
0.5,0.5,-0.5,
-0.5,-0.5,-0.5,
0.5,-0.5,-0.5,
//
0.5,0.5,-0.5,
0.5,-0.5,-0.5,
0.5,0.5,0.5,
0.5,0.5,0.5,
0.5,-0.5,0.5,
0.5,-0.5,-0.5,
//
0.5,0.5,0.5,
0.5,0.5,-0.5,
-0.5,0.5,0.5,
-0.5,0.5,0.5,
0.5,0.5,-0.5,
-0.5,0.5,-0.5,
//
0.5,-0.5,0.5,
0.5,-0.5,-0.5,
-0.5,-0.5,0.5,
-0.5,-0.5,0.5,
0.5,-0.5,-0.5,
-0.5,-0.5,-0.5,
]

let colorData1 = [
                1,0,1,
                1,0,1,
                1,0,1,
                1,0,1,
                1,0,1,
                1,0,1,
								0,0,1,
								0,0,1,
								0,0,1,
								0,0,1,
								0,0,1,
								0,0,1,
								1,0,1,
								1,0,1,
								1,0,1,
								1,0,1,
								1,0,1,
								1,0,1,
								1,1,0,
								1,1,0,
								1,1,0,
								1,1,0,
								1,1,0,
								1,1,0,
								0,1,0,
								0,1,0,
								0,1,0,
								0,1,0,
								0,1,0,
								0,1,0,
								1,0.5,0,
								1,0.5,0,
								1,0.5,0,
								1,0.5,0,
								1,0.5,0,
								1,0.5,0,
							];




const buffer1 = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, buffer1);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexData1), gl.DYNAMIC_DRAW);

const colorBuffer1 = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer1);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colorData1), gl.DYNAMIC_DRAW);

const positionLocation1 = gl.getAttribLocation(program, `position`);
gl.enableVertexAttribArray(positionLocation1);
gl.bindBuffer(gl.ARRAY_BUFFER, buffer1);
gl.vertexAttribPointer(positionLocation1, 3, gl.FLOAT, false, 0, 0);

const colorLocation1 = gl.getAttribLocation(program, `color`);
gl.enableVertexAttribArray(colorLocation1);
gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer1);
gl.vertexAttribPointer(colorLocation1, 3, gl.FLOAT, false, 0, 0);


var fogColor = [0.8, 0.9, 1, 1];


function render()
{
	gl.useProgram(program);
	gl.bufferSubData(gl.ARRAY_BUFFER, 0, new Float32Array(vertexData1));
	gl.bufferSubData(gl.ARRAY_BUFFER, 0, new Float32Array(colorData1));
	gl.clearColor(0.5, 1.0, 0.5, 1.0)
	gl.clear(gl.COLOR_BUFFER_BIT)
	const matrix1=mat4.create();
	const modelMatrix1=mat4.create();
	const viewMatrix1=mat4.create();

	var projectionMatrix1 = m4CG.perspective(50 * Math.PI/180, canvas.width/canvas.height, 0.0001, 1000);

	const finalMatrix1 = mat4.create();
	const mvMatrix1 = mat4.create();
	const mvpMatrix1 = mat4.create();

	var translationMatrix1 = m4CG.translation(a,b,c);
	var translationViewMatrix1 = m4CG.translation(0.0,0.0, 5.0);

	mat4.multiply(modelMatrix1, modelMatrix1, translationMatrix1);
	mat4.multiply(viewMatrix1, viewMatrix1, translationViewMatrix1);
	mat4.invert(viewMatrix1, viewMatrix1);
	mat4.multiply(mvMatrix1, viewMatrix1, modelMatrix1);
	mat4.multiply(mvpMatrix1, projectionMatrix1, mvMatrix1);

  gl.uniform4fv( gl.getUniformLocation(program, "fog_color"), fogColor);
  gl.uniform1f(gl.getUniformLocation(program, "flag"),flag);
	gl.uniformMatrix4fv(uniformLocations.matrix, false, mvpMatrix1);
	gl.drawArrays(gl.TRIANGLES, 0,vertexData1.length / 3)
}
render();

////////////////////////////////////////////////////////////////////////////////
}
