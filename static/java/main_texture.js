//============================= ADD TEXTURE(prueba en la esfera)=============================================
//Aqui los shaders estan el mismo archivo, pero se deben poner en distintos archivos
//Los shaders se complian en tiempos de ejecución, por lo que me dá eerors de todo menos de esto
//Como determinar los errroes en un shader


const canvas=document.querySelector ('canvas');	//Selecciona el objeto
//canvas.width = window.innerWidth;
//canvas.height = window.innerHeight;

const gl=canvas.getContext('webgl');	//Veriica si es o no nulo

if (!gl)
{
	throw new Error ('WebGL not supported');
}

//Camera transformation ===========================================
const projectionMatrix=mat4.create();
mat4.perspective(projectionMatrix,
                75*Math.PI/180, //fov
                800/800, // canvas.width / canvas height,
                0.0001, //near
                1000, // far
                );

const finalMatrix=mat4.create();

const vertexData = [ //8 vertices
	-0.5, -0.5, 0.5,
	0.5, -0.5, 0.5,
	0.5, 0.5, 0.5,
	-0.5, 0.5, 0.5, 
	//
	-0.5, -0.5, -0.5,
	-0.5, 0.5, -0.5,
	0.5, 0.5, -0.5,
	0.5, -0.5, -0.5,
]


const indices=[  //12 indices
	3,2,1,
	3,1,0,
	//
	7,6,5,
	7,5,4,
	//
	6,2,3,
	6,3,5,
	//
	0,1,7,
	0,7,4,
	//
	1,2,6,
	1,6,7,
	//
	5,3,0,
	5,0,4,
]
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
};

// Create a texture.
var texture = gl.createTexture();
gl.bindTexture(gl.TEXTURE_2D, texture);
 
// Fill the texture with a 1x1 blue pixel.
gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE,
              new Uint8Array([0, 0, 255, 255]));
 
// Asynchronously load an image
var image = new Image();
image.crossOrigin = "anonymous";
image.src ="https://webglfundamentals.org/webgl/resources/f-texture.png";
image.addEventListener('load', function() {
  // Now that the image has loaded make copy it to the texture.
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA,gl.UNSIGNED_BYTE, image);
  gl.generateMipmap(gl.TEXTURE_2D);
});


const vertexShader = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(vertexShader, `
	//precision mediump float;
	attribute vec3 position;
	attribute vec2 a_texcoord;

	uniform mat4 matrix1;
	varying vec2 v_texcoord;
	void main() {
		gl_Position = matrix1 * vec4(position, 1.0);
		v_texcoord = a_texcoord;
	    
}
`);
gl.compileShader(vertexShader);

const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(fragmentShader, `
	precision mediump float;
	varying vec2 v_texcoord;
	
	// The texture.
	uniform sampler2D u_texture;

	void main() {
	    gl_FragColor = texture2D(u_texture, v_texcoord);
	}
`);
gl.compileShader(fragmentShader);

const buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexData), gl.STATIC_DRAW);

var Index_Buffer = gl.createBuffer();
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, Index_Buffer);
gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

 // provide texture coordinates for the rectangle.
 var texcoordBuffer = gl.createBuffer();
 gl.bindBuffer(gl.ARRAY_BUFFER, texcoordBuffer);


// Fill the buffer with texture coordinates the F.
function setTexcoords(gl) {
	gl.bufferData(
		gl.ARRAY_BUFFER,
		new Float32Array([
		  // left column front
		  0, 0,
		  0, 1,
		  1, 0,
		  0, 1,
		  1, 1,
		  1, 0,
  
		  // top rung front
		  0, 0,
		  0, 1,
		  1, 0,
		  0, 1,
		  1, 1,
		  1, 0,
  
		  // middle rung front
		  0, 0,
		  0, 1,
		  1, 0,
		  0, 1,
		  1, 1,
		  1, 0,
  
		  // left column back
		  0, 0,
		  1, 0,
		  0, 1,
		  0, 1,
		  1, 0,
		  1, 1,
  
		  // top rung back
		  0, 0,
		  1, 0,
		  0, 1,
		  0, 1,
		  1, 0,
		  1, 1,
  
		  // middle rung back
		  0, 0,
		  1, 0,
		  0, 1,
		  0, 1,
		  1, 0,
		  1, 1,
  
		  // top
		  0, 0,
		  1, 0,
		  1, 1,
		  0, 0,
		  1, 1,
		  0, 1,
  
		  // top rung right
		  0, 0,
		  1, 0,
		  1, 1,
		  0, 0,
		  1, 1,
		  0, 1,
  
		  // under top rung
		  0, 0,
		  0, 1,
		  1, 1,
		  0, 0,
		  1, 1,
		  1, 0,
  
		  // between top rung and middle
		  0, 0,
		  1, 1,
		  0, 1,
		  0, 0,
		  1, 0,
		  1, 1,
  
		  // top of middle rung
		  0, 0,
		  1, 1,
		  0, 1,
		  0, 0,
		  1, 0,
		  1, 1,
  
		  // right of middle rung
		  0, 0,
		  1, 1,
		  0, 1,
		  0, 0,
		  1, 0,
		  1, 1,
  
		  // bottom of middle rung.
		  0, 0,
		  0, 1,
		  1, 1,
		  0, 0,
		  1, 1,
		  1, 0,
  
		  // right of bottom
		  0, 0,
		  1, 1,
		  0, 1,
		  0, 0,
		  1, 0,
		  1, 1,
  
		  // bottom
		  0, 0,
		  0, 1,
		  1, 1,
		  0, 0,
		  1, 1,
		  1, 0,
  
		  // left side
		  0, 0,
		  0, 1,
		  1, 1,
		  0, 0,
		  1, 1,
		  1, 0]),
		gl.STATIC_DRAW);
  }
 // Set Texcoords.
 setTexcoords(gl);

const program = gl.createProgram();
gl.attachShader(program, vertexShader);
gl.attachShader(program, fragmentShader);
gl.linkProgram(program);

const positionLocation = gl.getAttribLocation(program, `position`);
gl.enableVertexAttribArray(positionLocation);
gl.bindBuffer(gl.ARRAY_BUFFER, buffer);//esto no estaba
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, Index_Buffer); //agregado de los indices
gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false, 0, 0);

const texcoordLocation = gl.getAttribLocation(program, `a_texcoord`);
gl.enableVertexAttribArray(texcoordLocation);
gl.bindBuffer(gl.ARRAY_BUFFER, texcoordBuffer);
gl.vertexAttribPointer(texcoordLocation, 2, gl.FLOAT, false, 0, 0);

//
gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
gl.enable(gl.DEPTH_TEST);
gl.enable(gl.CULL_FACE);
gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
//
gl.useProgram(program);

const uniformLocations = {
	matrix:gl.getUniformLocation(program,`matrix1`),
	textureLocation:gl.getUniformLocation(program, `u_texture`),
};

const matrix2 = mat4.create();

var translationMatrix = m4CG.translation(0.2,0.2,0);//TRANSFORMACIÓN 1
var scaleMatrix = m4CG.scaling(0.6,0.6,0.6); //TRANSFORMACIÓN 2
//var shearingMatrix = m4CG.shearing(1.2); //TRANSFORMACIÓN 3
//var shadeMatrix = m4CG.scaling(-0.6,-0.4,0); //TRANSFORMACIÓN 4

mat4.multiply(matrix2,matrix2,translationMatrix);
mat4.multiply(matrix2,matrix2,scaleMatrix);
//mat4.multiply(matrix2,matrix2,shearingMatrix);
//mat4.multiply(matrix2,matrix2,shadeMatrix);
mat4.multiply(finalMatrix,projectionMatrix,matrix2);

//gl.uniformMatrix4fv(uniformLocations.matrix, false, matrix2);
//gl.drawArrays(gl.TRIANGLE_STRIP, 0, vertexData.length / 3);

function render()
{
	window.requestAnimationFrame(animate);
	//Rotation Transdormations
	gl.uniformMatrix4fv(uniformLocations.matrix, false, finalMatrix);
	gl.uniform1i(uniformLocations.textureLocation, 0);
	gl.drawArrays(gl.TRIANGLES, 0,vertexData.length / 3);
}
render();

function animate() {
    //---- requestAnimationFrame : Call drawScene again next frame
    requestAnimationFrame(animate);
    mat4.rotateX(matrix2, matrix2, Math.PI/2 /90);
	mat4.rotateY(matrix2, matrix2, Math.PI/2 /90);
	mat4.rotateZ(matrix2, matrix2, Math.PI/2 /90);
	gl.uniformMatrix4fv(uniformLocations.matrix, false, matrix2);
	//gl.uniform1i(textureLocation, 0);
    gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT,0); //nueva funcion "drawElements"
}
