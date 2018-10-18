angular.module("tacoApp", [])
.controller("TacoController", TacoController);

TacoController.$inject = ["$http"];

function TacoController($http){
    var ctrl = this; 
    ctrl.onInit = onInit;
    ctrl.selectedShell;
    ctrl.selectedBaselayer;
    ctrl.selectedMixin;
    ctrl.selectedCondiment;
    ctrl.selectedSeasoning;
    ctrl.tacos = [];
    ctrl.assembleTaco = assembleTaco;
    ctrl.getRandomTaco = getRandomTaco; 
    
    onInit();


    function onInit(){
        getData("shells");
        getData("baselayers");
        getData("mixins");
        getData("condiments");
        getData("seasonings");
    }

    function assembleTaco(){
        if (!ctrl.selectedShell || !ctrl.selectedBaselayer || !ctrl.selectedMixin || !ctrl.selectedCondiment || !ctrl.selectedSeasoning){
            alert("Whoops! It looks like you haven't finished picking ingredients for your awesome taco!")
            return; 
        }
        ctrl.tacos.push(getTacoString());
        clearOptions();
    }

    function getRandomTaco(){
        ctrl.selectedShell = randomElement(ctrl.shells);
        ctrl.selectedBaselayer = randomElement(ctrl.baselayers);
        ctrl.selectedMixin = randomElement(ctrl.mixins);
        ctrl.selectedCondiment = randomElement(ctrl.condiments);
        ctrl.selectedSeasoning = randomElement(ctrl.seasonings);
        ctrl.tacos.push(getTacoString());
        clearOptions();
    }

    function getTacoString(){
        var mixinString = (ctrl.selectedMixin instanceof Array)? toSentenceFormat(ctrl.selectedMixin.map(x=>x.name)) : ctrl.selectedMixin.name;
        var condimentString = (ctrl.selectedCondiment instanceof Array)? toSentenceFormat(ctrl.selectedCondiment.map(x=>x.name)) : ctrl.selectedCondiment.name;
        return "A delicious taco consisting of "+ctrl.selectedBaselayer.name+" with "+mixinString+ " on "+ ctrl.selectedShell.name+", seasoned with "+ctrl.selectedSeasoning.name+" and served with a side of "+condimentString+"."
    }

    function toSentenceFormat(array){
        if( array.length > 1 ){
            var lastWord = " and " + array.pop();
            if(array.length > 1 ){
              lastWord = "," + lastWord;
            }
          }else{
            var lastWord = "";
          }
          return array.join(", ") + lastWord;
    }

    function randomElement(array){
        return array[Math.floor(Math.random()*array.length)];
    }

    function clearOptions(){
        ctrl.selectedShell=null;
        ctrl.selectedBaselayer=null;
        ctrl.selectedMixin=null;
        ctrl.selectedCondiment=null;
        ctrl.selectedSeasoning=null;
    }

    function getData(object){
        $http.get('https://tacos-ocecwkpxeq.now.sh/'+object.toString()).then(function(response){
            switch(object){
                case "shells":
                    ctrl.shells = response.data;
                    break;
                case "baselayers":
                    ctrl.baselayers = response.data;
                    break;
                case "mixins":
                    ctrl.mixins = response.data;
                    break;
                case "condiments":
                    ctrl.condiments = response.data;
                    break;
                case "seasonings":
                    ctrl.seasonings = response.data;
                    break;
                default:
                    break;
            }
            
        })
    }
}