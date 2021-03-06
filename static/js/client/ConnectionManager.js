var ConnectionManager = function(){
    //Create a socket.
    this.socket = io({
        reconnection: false
    });

    //Log messages.
    this.socket.on("log", function(a){
        console.log(a);
    });
}

ConnectionManager.prototype.ready = function(handler, on_end){
    var self = this;

    //we are ready.
    this.socket.on("ready", function(data){
        //ready to start
        handler.call(this, self.socket, data.delay, data.side, data.name, data.opponent, data.game_type);
    });

    var end_msg = undefined;

    this.socket.once("end_game", function(m){
        end_msg = m;
    });

    //disconnect handler
    this.socket.on("disconnect", function(){
        on_end(end_msg);
    });
}

ConnectionManager.prototype.render = function(handler) {


    this.socket.on("add_gobj", function(data){
        handler.call(this, "add_gobj", data);
    })

    this.socket.on("move_gobj", function(data){
        handler.call(this, "move_gobj", data);
    })

    this.socket.on("remove_gobj", function(data){
        handler.call(this, "remove_gobj", data);
    });

    this.socket.on("ghostify_snake", function(data){
        handler.call(this, "ghostify_snake", data);
    });

    this.socket.on("unghostify_snake", function(data){
        handler.call(this, "unghostify_snake", data);
    });

    this.socket.on("blink_type", function(data){
        handler.call(this, "blink_type", data);
    });

    this.socket.on("flip_screen", function(data){
        handler.call(this, "flip_screen", data);
    });

    this.socket.on("beer", function(data){
        handler.call(this, "beer", data);
    });

    this.socket.on("mushroom_snake", function(data){
        handler.call(this, "mushroom_snake", data);
    });

    this.socket.on("mushroom_field", function(data){
        handler.call(this, "mushroom_field", data);
    });
}

ConnectionManager.prototype.update_score = function(handler) {
	this.socket.on("update_score", function(data){
        handler.call(this, data);
    });
}


ConnectionManager.prototype.start = function(name){
    //Send Client Event to server
    this.socket.emit("lobby_begin", name);
}

ConnectionManager.prototype.host = function(on_request, game_type){
    //on_request = function(form, respond){respond(true); }

    var self = this;

    this.socket.removeEventListener("lobby_answer_request");

    this.socket.on("lobby_answer_request", function(from){
        on_request(from, function(answer){
            self.socket.emit("lobby_answer_request", answer?true:false);
        });
    })

    //We are creating a new lobby
    this.socket.emit("lobby_new", game_type);
}


ConnectionManager.prototype.joinLobby = function(name, on_response){

    this.socket.removeEventListener("lobby_request_join");

    this.socket.on("lobby_request_join", on_response);
    this.socket.emit("lobby_request_join", name);
}

ConnectionManager.prototype.list = function(callback){
    this.socket.once("lobby_list", callback);
    this.socket.emit("lobby_list");
}

ConnectionManager.prototype.disconnect = function(){
    this.socket.disconnect();
}

ConnectionManager.prototype.set_snake_direction = function(deg) {
	this.socket.emit("snake_direction", deg);
}
