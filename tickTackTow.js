var Blocks = function() {
    this.user = null;
}
Blocks.prototype.setUser = function(user) {
    this.user = user;
};
Blocks.prototype.getUser = function() {
    if (this.user) {
        return this.user;
    } else {
        return null;
    }
};
Blocks.prototype.getCount = function() {
    return this.count;
}


window.UIComponent = {
    selector: "body",
    container: "<div class='container' style='width: 80%; height: 80%; background-color: #ccc; position: fixed; top: 0; bottom: 0; left: 0; right: 0; margin: 10%;'>User:<span id='user'>Host</span><div id='container'></div></div>",
    DOM: document.querySelector("body").attachShadow({ mode: "open" }),
    blocksArray: [],
    counter: 0
}
UIComponent.initialize = function(matrixLength) {
    for (var i = 0; i < matrixLength; i++) {
        var tempArray = []
        for (var j = 0; j < matrixLength; j++) {
            tempArray.push(new Blocks())
        }
        UIComponent.blocksArray.push(tempArray);
    }
}
UIComponent.renderUI = function() {
    var wrapper = document.createElement('div');
    wrapper.innerHTML = UIComponent.container;
    UIComponent.domNode = wrapper.firstChild;
    UIComponent.DOM.appendChild(UIComponent.domNode);
}
UIComponent.initializeGame = function(matrixLength) {
    
    UIComponent.initialize(matrixLength)
    UIComponent.renderUI();
    UIComponent.matrixLength = matrixLength;
    UIComponent.renderContents(UIComponent.matrixLength);
}
UIComponent.renderContents = function(matrixLength) {
    
    UIComponent.DOM.querySelector("#container").innerHTML = '';
    for (var i = 0; i < matrixLength; i++) {
        var html = "<ul style='width:306px;'>"
        for (var j = 0; j < matrixLength; j++) {
            var arg = {
                "i": i,
                "j": j
            };
            //arg=arg.toString();
            var disp = UIComponent.blocksArray[i][j].getUser() == 'Host' ? 'O' : 'X';
            var bg = UIComponent.blocksArray[i][j].getUser() == 'Host' ? '#50A940' : '#4051A9';
            if (UIComponent.blocksArray[i][j].getUser() == null) {
                disp = '';
                bg = '#fff';
            }
            console.log(disp)
            html += "<li style='background-color: " + bg + "; width: 100px; height: 100px;float:left; border: 1px solid #000; list-style: none;font-size: 80px;vertical-align:center;color:#fff;' onClick='UIComponent.allocateBlock(" + JSON.stringify(arg) + ");'>" + disp + "</li>";
        }
        html += "</ul>";
        UIComponent.DOM.querySelector("#container").innerHTML += html;
    }

}
UIComponent.allocateBlock = function(cordinates) {

    var user = UIComponent.DOM.getElementById('user');
    if (UIComponent.blocksArray[cordinates.i][cordinates.j].getUser() == null) {
        UIComponent.blocksArray[cordinates.i][cordinates.j].setUser(user.innerText);
        UIComponent.counter = UIComponent.counter + 1;
        UIComponent.renderContents(UIComponent.matrixLength);
        user.innerText == 'Host' ? user.innerText = 'Guest' : user.innerText = 'Host';
        console.log(user, cordinates)
    }
    // if (UIComponent.counter == UIComponent.matrixLength * UIComponent.matrixLength) {
    //     console.log("show result now!!!", UIComponent.checkResult()==null?"draw":UIComponent.checkResult())
    // }
    if(UIComponent.checkResult()!=null){
    	alert("hey user <b>"+UIComponent.checkResult()+"</b> WON!")
    	setTimeout(function() {
    		UIComponent.blocksArray=[];
    		UIComponent.initialize(UIComponent.matrixLength)
    		UIComponent.renderContents(UIComponent.matrixLength);
    	}, 2000);
    	
    }

}
UIComponent.checkResult = function() {
	//debugger;
    //case one when i=0
    var count = 1;
    var user = UIComponent.blocksArray[0][0].getUser();
    //checking horizontally
    for (var j = 1; j < UIComponent.matrixLength; j++) {
        if (user == UIComponent.blocksArray[0][j].getUser()) {
            count = count + 1;
        }else{
        	count=1;
        	user=null;
        	break;
        }
        if (count == UIComponent.matrixLength) {
            return user;
        }
    }
    //cheking vertically
    count = 1;
    var user = UIComponent.blocksArray[0][0].getUser();
    for (var j = 1; j < UIComponent.matrixLength; j++) {
        if (user == UIComponent.blocksArray[j][0].getUser()) {
            count = count + 1;
        }else{
        	count=1;
        	user=null;
        	break;
        }
        if (count == UIComponent.matrixLength) {
            return user;
        }
    }
    //cheking diagonally
    count = 1;
    var user = UIComponent.blocksArray[0][0].getUser();
    for (var j = 1; j < UIComponent.matrixLength; j++) {
        if (user == UIComponent.blocksArray[j][j].getUser()) {
            count = count + 1;
        }else{
        	count=1;
        	user=null;
        	break;
        }
        if (count == UIComponent.matrixLength) {
            return user;
        }
    }
    // cheking other vertically
    count=1
    for (var i = 1; i < UIComponent.matrixLength; i++) {
        user = UIComponent.blocksArray[0][i].getUser();
        for (var j = 1; j < UIComponent.matrixLength; j++) {
            if (user == UIComponent.blocksArray[j][i].getUser()) {
                count = count + 1;
            }else{
            	count=1;
            	user=null;
	        	break;
	        }
            if (count == UIComponent.matrixLength) {
                return user;
            }
        }
    }
    // checking other row horizontaly
    count=1
    for (var i = 1; i < UIComponent.matrixLength; i++) {
        user = UIComponent.blocksArray[i][0].getUser();
        for (var j = 1; j < UIComponent.matrixLength; j++) {
            if (user == UIComponent.blocksArray[i][j].getUser()) {
                count = count + 1;
            }else{
            	count=1;
            	user=null;
	        	break;
	        }
            if (count == UIComponent.matrixLength) {
                return user;
            }
        }
    }



}

UIComponent.initializeGame(3)


// reoccurance formula
//memoization // dynamic programming
//matrix,steps



//ab
