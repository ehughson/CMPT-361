var canvas; 
var gl; 
var program; 
var vBuffer, cBuffer, bBuffer;
var vPosition;
var vPositionBall, cBufferBall, vColorBall, vColor;
var projectionMatrix;
var oldx = 0;
var oldy = 0;
var modelViewMatrix=mat4();
var baseId = 0;
var projectionMatrix = ortho(-10, 10, -10, 10, -10, 10);
var Base = 0;
var lowerArmId=1;
var modelViewMatrixLoc;
var upperArmId=2;
var figure= [];
var mvStack= [];
var theta= [ 0, 0, 0];
var angle = 0;
var newlowerAngle;
var newupperAngle;
var LowerRobotArm = 1;
var UpperRobotArm = 2;
var baseHeight = 2.0;
var baseWidth  = 4.0;
var lowerHeight = 3.0;
var lowerWidth = 0.5;
var upperHeight= 3.0;
var upperWidth  = 0.5;
var inverseOn = 0; 
var inverseOff = 1; 
var mouse = [0, 0];
//from course notes
figure[0]= createNode(null,null,null,null);
figure[1] = createNode(null,null,null,null);
figure[2] = createNode(null,null,null,null);

function scaleAttributes(x, y, z) {
   var result = mat4();

   result[0][0] = x;
   result[1][1] = y;
   result[2][2] = z;

   return result;
}
var baseAngle = 0; 
var lowerAngle = 0 ;
var upperAngle = 0; 
//robot arm verticies
var points =[
vec4( -0.5,  0.0,  0.5, 1.0 ),
vec4( -0.5, -1.0,  0.5, 1.0 ),
vec4(  0.5, -1.0,  0.5, 1.0 ),
vec4( -0.5,  0.0,  0.5, 1.0 ),
vec4(  0.5, -1.0,  0.5, 1.0 ),
vec4(  0.5,  0.0,  0.5, 1.0 ),

vec4(  0.5,  0.0,  0.5, 1.0 ),
vec4(  0.5, -1.0,  0.5, 1.0 ),
vec4(  0.5, -1.0, -0.5, 1.0 ),
vec4(  0.5,  0.0,  0.5, 1.0 ),
vec4(  0.5, -1.0, -0.5, 1.0 ),
vec4(  0.5,  0.0, -0.5, 1.0 ),

vec4(  0.5, -1.0,  0.5, 1.0 ),
vec4( -0.5, -1.0,  0.5, 1.0 ),
vec4( -0.5, -1.0, -0.5, 1.0 ),
vec4(  0.5, -1.0,  0.5, 1.0 ),
vec4( -0.5, -1.0, -0.5, 1.0 ),
vec4(  0.5, -1.0, -0.5, 1.0 ),

 vec4(  0.5,  0.0, -0.5, 1.0 ),
 vec4( -0.5,  0.0, -0.5, 1.0 ),
 vec4( -0.5,  0.0,  0.5, 1.0 ),
 vec4(  0.5,  0.0, -0.5, 1.0 ),
 vec4( -0.5,  0.0,  0.5, 1.0 ),
 vec4(  0.5,  0.0,  0.5, 1.0 ),

 vec4( -0.5, -1.0, -0.5, 1.0 ),
 vec4( -0.5,  0.0, -0.5, 1.0 ),
 vec4(  0.5,  0.0, -0.5, 1.0 ),
 vec4( -0.5, -1.0, -0.5, 1.0 ),
 vec4(  0.5,  0.0, -0.5, 1.0 ),
 vec4(  0.5, -1.0, -0.5, 1.0 ),

 vec4( -0.5,  0.0, -0.5, 1.0 ),
 vec4( -0.5, -1.0, -0.5, 1.0 ),
 vec4( -0.5, -1.0,  0.5, 1.0 ),
 vec4( -0.5,  0.0, -0.5, 1.0 ),
 vec4( -0.5, -1.0,  0.5, 1.0 ),
 vec4( -0.5,  0.0,  0.5, 1.0 ) 
];






var colors =[
 vec4( 1.0, 0.0, 0.0, 1.0 ),  // red
 vec4( 1.0, 0.0, 0.0, 1.0 ),  // red
 vec4( 1.0, 0.0, 0.0, 1.0 ),  // red
 vec4( 1.0, 0.0, 0.0, 1.0 ),  // red
 vec4( 1.0, 0.0, 0.0, 1.0 ),  // red
 vec4( 1.0, 0.0, 0.0, 1.0 ),  // red

 vec4( 1.0, 1.0, 0.0, 1.0 ),  // yellow
 vec4( 1.0, 1.0, 0.0, 1.0 ),  // yellow
 vec4( 1.0, 1.0, 0.0, 1.0 ),  // yellow
 vec4( 1.0, 1.0, 0.0, 1.0 ),  // yellow
 vec4( 1.0, 1.0, 0.0, 1.0 ),  // yellow
 vec4( 1.0, 1.0, 0.0, 1.0 ),  // yellow

 vec4( 1.0, 0.0, 0.0, 1.0 ),  
 vec4( 1.0, 0.0, 0.0, 1.0 ),  
 vec4( 1.0, 0.0, 0.0, 1.0 ),  
 vec4( 1.0, 0.0, 0.0, 1.0 ),  
 vec4( 1.0, 0.0, 0.0, 1.0 ),  
 vec4( 1.0, 0.0, 0.0, 1.0 ),  

vec4( 1.0, 1.0, 0.0, 1.0 ), 
 vec4( 1.0, 1.0, 0.0, 1.0 ), 
 vec4( 1.0, 1.0, 0.0, 1.0 ),  
 vec4( 1.0, 1.0, 0.0, 1.0 ),  
 vec4( 1.0, 1.0, 0.0, 1.0 ),  
 vec4( 1.0, 1.0, 0.0, 1.0 ),  

 vec4( 1.0, 0.0, 0.0, 1.0 ), 
 vec4( 1.0, 0.0, 0.0, 1.0 ),  
 vec4( 1.0, 0.0, 0.0, 1.0 ),  
 vec4( 1.0, 0.0, 0.0, 1.0 ),  
 vec4( 1.0, 0.0, 0.0, 1.0 ),  
 vec4( 1.0, 0.0, 0.0, 1.0 ), 


vec4( 1.0, 1.0, 0.0, 1.0 ),  
 vec4( 1.0, 1.0, 0.0, 1.0 ),  
 vec4( 1.0, 1.0, 0.0, 1.0 ),  
 vec4( 1.0, 1.0, 0.0, 1.0 ),  
 vec4( 1.0, 1.0, 0.0, 1.0 ),  
 vec4( 1.0, 1.0, 0.0, 1.0 ),  


];

//ball vertiices

var ballPoints =[
	vec4(1.2,1.0,0.0,1.0),
	vec4(1.2,1.6,0.0,1.0),
	vec4(1.4,1.5,0.0,1.0),
	vec4(1.6,1.5,0.0,1.0),
	vec4(1.8,1.4,0.0,1.0),
	vec4(2.0,1.2,0.0,1.0),
	vec4(2.0,2.6,0.0,1.0),
	vec4(2.0,0.0,0.0,1.0),
	vec4(1.8,-0.2,0.0,1.0),
	vec4(1.6,-0.3,0.0,1.0),
	vec4(1.4,-0.4,0.0,1.0),
	vec4(1.2,-0.4,0.0,1.0),
	vec4(1.0,-0.4,0.0,1.0),
	vec4(0.8,-0.3,0.0,1.0),
	vec4(0.6,-0.2,0.0,1.0),
	vec4(0.4,0.0,0.0,1.0),
	vec4(0.2,0.6,0.0,1.0),
	vec4(0.4,1.2,0.0,1.0),
	vec4(0.6,1.4,0.0,1.0),
	vec4(0.8,1.5,0.0,1.0),
	vec4(1.0,1.6,0.0,1.0),
	vec4(1.2,1.6,0.0,1.0),
];

var ballColors=[
vec4( 1.0, 0.0, 0.0, 1.0 ),
vec4( 1.0, 0.0, 0.0, 1.0 ),
vec4( 1.0, 0.0, 0.0, 1.0 ),
vec4( 1.0, 0.0, 0.0, 1.0 ),
vec4( 1.0, 0.0, 0.0, 1.0 ),
vec4( 1.0, 0.0, 0.0, 1.0 ),
vec4( 1.0, 0.0, 0.0, 1.0 ),
vec4( 1.0, 0.0, 0.0, 1.0 ),
vec4( 1.0, 0.0, 0.0, 1.0 ),
vec4( 1.0, 0.0, 0.0, 1.0 ),
vec4( 1.0, 0.0, 0.0, 1.0 ),
vec4( 1.0, 0.0, 0.0, 1.0 ),
vec4( 1.0, 0.0, 0.0, 1.0 ),
vec4( 1.0, 0.0, 0.0, 1.0 ),
vec4( 1.0, 0.0, 0.0, 1.0 ),
vec4( 1.0, 0.0, 0.0, 1.0 ),
vec4( 1.0, 0.0, 0.0, 1.0 ),
vec4( 1.0, 0.0, 0.0, 1.0 ),
vec4( 1.0, 0.0, 0.0, 1.0 ),
vec4( 1.0, 0.0, 0.0, 1.0 ),
vec4( 1.0, 0.0, 0.0, 1.0 ),
vec4( 1.0, 0.0, 0.0, 1.0 )
];




 
//from course notes
function createNode(transform, render, sibling, child) {
		var node={
			transform: transform,
			render: render,
			sibling: sibling,
			child: child,
		}

		return node;
}



//from course notes
function initNodes(id){
	var m=mat4();
	switch(id){
		case baseId:
			m=rotate(theta[baseId],0,1,0);
			figure[baseId]= createNode(m,robotBase,null,lowerArmId)
			break;

		case lowerArmId:
			m = translate(0.0, lowerHeight*0.0001+baseHeight , 0.0);
			m = mult(m, rotate(theta[lowerArmId], 1, 0, 0));
			figure[lowerArmId]=createNode(m,lowerRobotArm,null,upperArmId)
			break;

		case upperArmId:
			m=translate(0.0, upperHeight *0.0001+lowerHeight, 0.0);
			m=mult(m, rotate(theta[upperArmId], 1, 0, 0) );
			figure[upperArmId]=createNode(m,upperRobotArm,null,null);
			break;

	}
}

//from course notes
function traverse(id){
	if(id==null)return;

	mvStack.push(modelViewMatrix);
	modelViewMatrix= mult(modelViewMatrix, figure[id].transform);
	figure[id].render();

	if( figure[id].child != null){
		traverse(figure[id].child)
	}

	modelViewMatrix= mvStack.pop();
	if(figure[id].sibling != null){
		traverse(figure[id].sibling);
	}

}
window.onload = function init(){
	canvas = document.getElementById( "gl-canvas" ); 
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    gl.viewport( 0, 0, canvas.width, canvas.height );

    gl.clearColor( 0.5, 0.5, 0.5, 1.0 );
    gl.enable( gl.DEPTH_TEST );
    program = initShaders( gl, "vertex-shader", "fragment-shader" );

    gl.useProgram( program );
    program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );
	//set up vertex buffers
    vBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW );

    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    cBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW );

    var vColor = gl.getAttribLocation( program, "vColor" );
    gl.vertexAttribPointer( vColor, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vColor );


	//set up ball buffers
    bBuffer = gl.createBuffer();
		gl.bindBuffer( gl.ARRAY_BUFFER, bBuffer );
		gl.bufferData( gl.ARRAY_BUFFER, flatten(ballPoints), gl.STATIC_DRAW );

		var vPositionBall= gl.getAttribLocation( program, "vPosition" );
		gl.vertexAttribPointer( vPositionBall, 4, gl.FLOAT, false, 0, 0 );
	    gl.enableVertexAttribArray( vPositionBall );

	    cBufferBall=gl.createBuffer();
	    gl.bindBuffer(gl.ARRAY_BUFFER,cBufferBall);
	    gl.bufferData(gl.ARRAY_BUFFER,flatten(ballColors),gl.STATIC_DRAW);

	    //set up sliders
    document.getElementById("sliderone").onchange = function(event) {
        baseAngle=event.target.value;
        //baseOn = 1; 
        var inverseOn = 0; 
		var inverseOff = 1; 

    };
    document.getElementById("slidertwo").onchange = function(event) {
          lowerAngle=event.target.value;
           //lowerArmOn = 1;\
         //console.log(theta[lowerArmId]);
         var inverseOn = 0; 
		var inverseOff = 1; 

    };
    document.getElementById("sliderthree").onchange = function(event) {
         upperAngle =event.target.value;
         var inverseOn = 0; 
		var inverseOff = 1; 

         //UpperArmOn = 1;
    };
    //initiate nodes
	initNodes(baseId);
	initNodes(lowerArmId);
	initNodes(upperArmId);

	
    modelViewMatrixLoc = gl.getUniformLocation(program, "modelViewMatrix");

	inverseOff = 1; 
	inverseOn = 0; 

	//calculate Inverse Kinematics 
	canvas.addEventListener("click",function (key){
	
	var mousePos= getMouse(canvas,key);

	//console.log(canvas.width/2);
	//console.log(mousePos.x);
	//console.log(mousePos.y);
	mouse[0] = mousePos.x;
	mouse[1] = mousePos.y;
	if(mousePos.x<= (canvas.width) && mousePos.y<=(canvas.height) && (canvas.height/2) > mousePos.y){ //top left
		oldx=((10*(((canvas.width) - mousePos.x)/(canvas.width) ))-1)*5;
		//console.log(oldx);
		oldy=((10 *((canvas.height) - mousePos.y)/(canvas.height))-1) *4;
		//console.log(oldy);
	}
	
	var x= oldx;
	var y= oldy;
	var targetDist =(Math.pow(x,2))+(Math.pow(y,2));
	initNodes(baseId);
	initNodes(lowerArmId);
	initNodes(upperArmId);
	document.getElementById("sliderone").value="0";
	document.getElementById("slidertwo").value="0";
	document.getElementById("sliderthree").value="0";

	var angle1 =(Math.cos(((targetDist) + (Math.pow(lowerHeight, 2)) - (Math.pow(upperHeight , 2)))/ (2*lowerHeight*Math.sqrt(targetDist))));
	var angle2 = (Math.cos(((Math.pow(lowerHeight, 2))+(Math.pow(upperHeight , 2))-((Math.pow(x,2))-(Math.pow(y,2)))))/ (2*lowerHeight*upperHeight )) ;
	newlowerAngle = ((Math.acos(x/Math.sqrt(targetDist)) - angle1)* (180/Math.PI)) - 90;
	newupperAngle = (Math.acos(x/Math.sqrt(targetDist)) - angle2 )* (180/2);
	inverseOn = 1;
	inverseOff = 0; 



},false);


    render();

}

function  getMouse(canvas, evt) {
  var rect = canvas.getBoundingClientRect(), 
      scaleX = canvas.width / rect.width,   
      scaleY = canvas.height / rect.height;  

  return {
    x: (evt.clientX - rect.left) * scaleX,   
    y: (evt.clientY - rect.top) * scaleY    
}
}


function robotBase() {
    var scaled = scaleAttributes(baseWidth , baseHeight , baseWidth);
    var instanceMatrix = mult( translate( 0.0, baseHeight , 0.0 ), scaled);
    var t = mult(modelViewMatrix, instanceMatrix);
    gl.uniformMatrix4fv(modelViewMatrixLoc,  false, flatten(t));
    gl.drawArrays( gl.TRIANGLES, 0, points.length);
}

function lowerRobotArm()
{
    var scaled = scaleAttributes(lowerWidth, lowerHeight, lowerWidth);
    var instanceMatrix = mult( translate( 0.0, lowerHeight, 0.0 ), scaled);
    var t = mult(modelViewMatrix, instanceMatrix);
    gl.uniformMatrix4fv( modelViewMatrixLoc,  false, flatten(t));
    gl.drawArrays( gl.TRIANGLES, 0, points.length );
}


function upperRobotArm() {
    var scaled = scaleAttributes( upperWidth , upperHeight ,  upperWidth );
    var instanceMatrix = mult(translate( 0.0, upperHeight , 0.0 ),scaled);
    var t = mult(modelViewMatrix, instanceMatrix);
    gl.uniformMatrix4fv( modelViewMatrixLoc,  false, flatten(t));
    gl.drawArrays( gl.TRIANGLES, 0, points.length );
}



var render = function() {

    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );

    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
    gl.vertexAttribPointer(vPosition,4,gl.FLOAT,false,0,0);
    gl.uniformMatrix4fv( gl.getUniformLocation(program, "projectionMatrix"),  false, flatten(projectionMatrix));
    gl.uniformMatrix4fv( modelViewMatrixLoc,  false, flatten(modelViewMatrix));
    traverse(baseId);
	
    checkMove();
	if(inverseOn == 1 && inverseOff == 0){
			ball= mult(scaleAttributes(0.005,0.005,0.05),mat4());
			var ballmodelViewMatrix= mult(scaleAttributes(mouse[0],mouse[1],1), ball);
	    	gl.bindBuffer(gl.ARRAY_BUFFER, bBuffer);
	   		gl.vertexAttribPointer(vPositionBall,4, gl.FLOAT,false,0,0);
		    projectionMatrix = ortho(-10, 10, -10, 10, -10, 10);
		    //console.log(ballmodelViewMatrix);
		    gl.uniformMatrix4fv( gl.getUniformLocation(program, "projectionMatrix"),  false, flatten(projectionMatrix));
		    gl.uniformMatrix4fv(gl.getUniformLocation( program, "modelViewMatrix"), false, flatten(ballmodelViewMatrix));
			//gl.drawArrays( gl.TRIANGLE_FAN, 0, ballPoints.length);

			 }
    requestAnimFrame(render);
}


function checkMove() {
	//smooth movement for arm when screen is clicked for IK
	if(inverseOn == 1 && inverseOff == 0){
			if (newlowerAngle <0){
				if(newupperAngle<0){
					if(theta[UpperRobotArm]>=newupperAngle){
					theta[UpperRobotArm]-=0.8;
					initNodes(upperArmId);
				}
					if(theta[LowerRobotArm ]>=newlowerAngle ){
					theta[LowerRobotArm ]-=0.8;
					initNodes(lowerArmId);
				}
				 if(theta[UpperRobotArm]<=newupperAngle && theta[LowerRobotArm ]<=newlowerAngle){
				 	inverseOff = 1; 
				    inverseOn = 0; 
					straighten();
				 }
				}else{
					if(theta[UpperRobotArm]<=newupperAngle){
						theta[UpperRobotArm]+=0.8;
						initNodes(upperArmId);}
					if(theta[LowerRobotArm ]>=newlowerAngle ){
					theta[LowerRobotArm ]-=0.8;
					initNodes(lowerArmId);
				}
                 if(theta[UpperRobotArm]>=newupperAngle && theta[LowerRobotArm ]<=newlowerAngle){
				 	inverseOff = 1; 
				    inverseOn = 0; 
					straighten();
				 }
				}

			}
		
			else if (newlowerAngle >0){
				if(newupperAngle<0){
					if(theta[UpperRobotArm]>=newupperAngle){
					theta[UpperRobotArm]-=0.8;
					initNodes(upperArmId);}

					if(theta[LowerRobotArm ]<=newlowerAngle ){
					theta[LowerRobotArm ]+=0.8;
					initNodes(lowerArmId);
					}
					if(theta[UpperRobotArm]<=newupperAngle && theta[LowerRobotArm ]>=newlowerAngle){
				 	inverseOff = 1; 
				    inverseOn = 0; 
					straighten();
				 }			
				}else{
					if(theta[UpperRobotArm]<=newupperAngle){
						theta[UpperRobotArm]+=0.8;
						initNodes(upperArmId);}
						if(theta[LowerRobotArm ]<=newlowerAngle ){
							theta[LowerRobotArm ]+=0.8;
							initNodes(lowerArmId);
						}
					}
					 if(theta[UpperRobotArm]>=newupperAngle && (theta[LowerRobotArm ]>=newlowerAngle)){
				 	inverseOff = 1; 
				    inverseOn = 0; 
					straighten();
				 }
				}
    
   
}
//smooth movement for arm given boundaries 
 if(inverseOn == 0 && inverseOff == 1){
	if(theta[baseId]>baseAngle){
        	theta[baseId]-=1;
        	initNodes(baseId);
      }
      else if(theta[baseId]<baseAngle){
        theta[baseId]+=1;
        initNodes(baseId);
      }
  
 	  if(theta[lowerArmId]>lowerAngle){
        theta[lowerArmId]-=0.5;
        initNodes(lowerArmId);
      }
      else if(theta[lowerArmId]<lowerAngle){
        theta[lowerArmId]+=0.5;
        initNodes(lowerArmId);
      }
	 if(theta[upperArmId]>upperAngle){
        theta[upperArmId]-=0.5;
        initNodes(upperArmId);
      }
      else if(theta[upperArmId]<upperAngle){
        theta[upperArmId]+=0.5;
        initNodes(upperArmId);
      }
    }
}



function straighten(){ 
	upperAngle=0;
    lowerAngle=0;
    baseAngle=0; 
	return; 
}














