const canvas = document.getElementById("snakecanvas");
const context = canvas.getContext("2d");

function startgame(){
    const gridsize = 30;
    const snake = [{x:120,y:120}]
    let direction = "right";
    let food = foodposition();
    let food2 = foodposition2();
    pic = new Image();
    pic.src = "https://static.wikia.nocookie.net/minecraft/images/8/80/Apple20100105.png/revision/latest?cb=20200111002509"
    function foodposition(){
        max_x = (canvas.width / gridsize)-1;
        max_y = (canvas.height / gridsize)-1;

        grid_x = Math.floor(Math.random() * max_x) - 0;
        grid_y = Math.floor(Math.random() * max_y) - 0;

        const x = grid_x * gridsize;
        const y = grid_y * gridsize;

        return {x, y};
    }
    function foodposition2(){
        max_x = (canvas.width / gridsize)-1;
        max_y = (canvas.height / gridsize)-1;

        grid_x = Math.floor(Math.random() * max_x) - 0;
        grid_y = Math.floor(Math.random() * max_y) - 0;

        const x = grid_x * gridsize;
        const y = grid_y * gridsize;

        return {x, y};
    }
    

    function draw(){
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.fillStyle = "skyblue";
        snake.forEach(function(segment){
            context.fillRect(segment.x, segment.y, gridsize, gridsize);
        });

        context.fillStyle = "red";
        context.fillRect(food.x, food.y, gridsize, gridsize);

        context.drawImage(pic, food2.x, food2.y, gridsize, gridsize);
        // context.fillStyle = "green";
        // context.fillRect(food2.x, food2.y, gridsize, gridsize);
 
    }
    function move(){
        const head  = {... snake[0]}
        switch(direction){
            case "up":
                head.y -= gridsize;
                break;
            case "down":
                head.y += gridsize;
                break;
            case "left":
                head.x -= gridsize;
                break;
            case "right":
                head.x += gridsize;
                break;
        }
       

        if(head.x === food.x && head.y === food.y){
            snake.unshift(food);
            food = foodposition();
        }
        else{
            snake.pop();
        } 
        if(head.x === food2.x && head.y === food2.y){
            snake.unshift(food2);
            food2 = foodposition2();
        }
        
        
        
        if(head.x < 0){
            head.x = canvas.width;
        }
        if(head.x > canvas.width){
            head.x = 0;
        }
        if(head.y < 0){
            head.y = canvas.height;
        }
        if(head.y > canvas.height){
            head.y = 0;
        }

        if (collisionitself(head)){
            alert("game over");
            location.reload();
        }
        snake.unshift(head)
    }

    function collisionitself(head){
        return snake.slice(1).some(segment=> segment.x === head.x && segment.y === head.y);
    }
    function onkeypress(event){
        const key = event.key.toLowerCase();
        if(["w", "a", "s", "d"].includes(key)){
            if (key=="w" && direction !== "down"){direction = "up";}
            if (key=="a" && direction !== "right"){direction = "left";}
            if (key=="s" && direction !== "up"){direction = "down";}
            if (key=="d" && direction !== "left"){direction = "right";}
        }
    }
    window.addEventListener("keydown", onkeypress);
    function loopgame(){
        move(); 
        draw();
        
        
    }
    setInterval(loopgame, 150);
}