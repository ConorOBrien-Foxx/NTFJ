// NTFJ
// By Conor O'Brien and ETHProductions

var COMMANDS = "|#~^*@`()$:/{";

function NTFJStep(code,stack,i){
	if(i<code.length){
  	if(code[i]==1)stack.push((((t=stack.pop())|(u=stack.pop()))<2?1:255)-(t&u));
		else if(code[i]==2)stack.push(1);
		else if(code[i]==3)stack.push(0);
		else if(code[i]==4){i=stack.pop()-1;}
		else if(code[i]==5)d.innerHTML+=String.fromCharCode(stack.pop());
		else if(code[i]==6){
			if(stack[stack.length-1]>1){
				var e = ("00000000"+stack.pop().toString(2)).slice(-8).split("")
				stack = stack.concat(e.map(Number));
			} else stack.push(parseInt([0,0,0,0,0,0,0,0].map(function(){return stack.pop()||0}).reverse().join(""),2));
		}
	    else if(code[i]==7)console.log(stack);
	    else if(code[i]==8){
	    	var d = 1;
	    	if(!stack[stack.length-1]){
		    	while(i<code.length){
		    		i++;
		    		if(code[i]==9) d--;
		    		else if(code[i]==8) d++;
		    		if(!d) break;
		    	}
	    	}
	    }
	    else if(code[i]==10){stack.pop();}
	    else if(code[i]==11){r=stack.pop();stack.push(r,r)}
	    else if(code[i]==12){stack.push(stack.length)}
	    else if(code[i]==13){
	    	var N = stack.pop();
	    	while(N --> 0){
	    		var r=stack.shift();stack.push(r);
	    	}
	    }
	    setTimeout(NTFJStep,1,code,stack,i+1)
  } else {
  	k.disabled = false;
  }
}
function NTFJ(code,input){
	code = code.split("").map(function(x){return COMMANDS.indexOf(x)+1});
  d.innerHTML = "";
	for(var stack=(input||[]),i=0;i<code.length;i++){
		if(code[i]==1)stack.push((((t=stack.pop())|(u=stack.pop()))<2?1:255)-(t&u));
		else if(code[i]==2)stack.push(1);
		else if(code[i]==3)stack.push(0);
		else if(code[i]==4){i=stack.pop()-1;}
		else if(code[i]==5)d.innerHTML+=String.fromCharCode(stack.pop());
		else if(code[i]==6){
			if(stack[stack.length-1]>1){
				var e = ("00000000"+stack.pop().toString(2)).slice(-8).split("")
				stack = stack.concat(e.map(Number));
			} else stack.push(parseInt([0,0,0,0,0,0,0,0].map(function(){return stack.pop()||0}).reverse().join(""),2));
		}
		else if(code[i]==7)console.log(stack);
	    else if(code[i]==8){if(!stack[stack.length-1])while(code[++i]!=9&&i<code.length);}
	    else if(code[i]==10){stack.pop();}
	    else if(code[i]==11){r=stack.pop();stack.push(r,r)}
	    else if(code[i]==12){stack.push(stack.length)}
	    else if(code[i]==13){
	    	var N = stack.pop();
	    	while(N --> 0){
	    		var r=stack.shift();stack.push(r);
	    	}
	    }
	}
}

o.onclick = function(){NTFJ(c.value,q.value.split("").reverse().map(function(e){return e.charCodeAt()}))}

k.onclick = function(){d.innerHTML="";k.disabled=true;NTFJStep(c.value.split("").map(function(x){return COMMANDS.indexOf(x)+1}),q.value.split("").reverse().map(function(e){return e.charCodeAt()}),0)}
