// load cards
window.addEventListener('load', (event) => {
    getCards(16)
    var clicked = {};
    var data1 = -1; 
    var data2 = -1;
    $(".flip-card").on("click", function(){
        // if($(".flip-animation").length < 2 ){
        //     $(this).find(".flip-card-inner").addClass("flip-animation");
        // } else {
        //     $(".flip-card-inner").removeClass("flip-animation");
        // }
        if(data1 === -1 || data2 === -1){
            $(this).find(".flip-card-inner").addClass("flip-animation");
            if(data1 !== -1){
                data2 = $(this).find(".flip-card-inner").data("type");
            } else {
                data1 = $(this).find(".flip-card-inner").data("type");
                console.log("type", $(this).find(".flip-card-inner").data("type"))
            }
            console.log(data1, data2);
                if(data2 > -1 && data1 > -1){
                    if(data2 !== data1){
                        setTimeout(function(){ 
                            console.log("removing")
                            $(".flip-card-inner[data-type='"+data1+"'").removeClass("flip-animation");
                            $(".flip-card-inner[data-type='"+data2+"'").removeClass("flip-animation");
                            data1 = -1; 
                            data2 = -1;        
                        }, 1000); 
                    } else {
                        data1 = -1; 
                        data2 = -1;
                    }
                }
        }

        // var data = $(this).find("flip-card-back").data("type");
        // if($(".flip-animation").length == 2 && $().length !=2){

        // }
        
    })
  });

function getRandomInt(max) {
return Math.floor(Math.random() * Math.floor(max));
}

function getCards(numCards){
    var cardContainer = $("#card-container");
    var html = "";
    // get random number using array length
    // remove index from array 
    // get new random number using array length 
    var base_arr = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18]
    var rand_arr_index = getRandomInt(base_arr.length); 
    var rand_arr; 
    if(rand_arr_index + (numCards/2) > base_arr.length){
        var arr1 = base_arr.slice(rand_arr_index, base_arr.length); 
        var arr2 = base_arr.slice(0, (numCards/2) - arr1.length);
        rand_arr = arr1.concat(arr2);
    } else {
        rand_arr = base_arr.slice(rand_arr_index, rand_arr_index + (numCards/2))
    }
    var used = {};
    for(var i = 0; i < numCards; i++){
        var random_index = getRandomInt(rand_arr.length);
        var data = rand_arr[random_index];
         if (used[data] === 1){
            used[data] += 1;
            rand_arr.splice(random_index, 1);
        } else {
            used[data] = 1;
        }
        html += `<div class="flip-card">
        <div class="flip-card-inner" data-type="`+data+`">
          <div class="flip-card-front">
            <!-- image goes here -->
          </div>
          <div class="flip-card-back">
          <!-- image goes here -->
          `+data+`
          </div>
        </div>
      </div>
      `
    }
    cardContainer.html(html);
}

