//  1. Get the current time:
        const date = new Date();
        leadingZero = (i) => { return (i < 10)? '0'+ i : i };//display time in 2 digit format
        let seconds = leadingZero(date.getSeconds()); 
        let minutes = leadingZero(date.getMinutes());
        let hours = leadingZero(date.getHours() > 12 ? date.getHours() - 12 : date.getHours()); //display time in 12h format
        
        document.getElementById("minutes").innerHTML = minutes;
        document.getElementById("hours").innerHTML = hours;
        document.getElementById("seconds").innerHTML = seconds;
        
//  2. Start setInterval
        function* startCounting() {
            function addSecond() {
                if(seconds < 59) {
                    seconds++; 
                    seconds = leadingZero(seconds); //add zero if seconds < 10
                    document.getElementById("seconds").innerHTML = seconds;
                } else {
                    takeTime(); //if seconds > 59, move to the next function;
                }
            }
            setInterval(addSecond, 1000);
        }
//  2b. Run the 1st generator
        let start = startCounting();
        start.next(); // start counting seconds;
//  3. If seconds = 60, run this function:
//      a. reset seconds
//      b. increase minutes
        function takeTime() {
//          a. reset seconds
            function* runGenerators() {
                yield; //call generator.next() to set seconds = 0;
                seconds = 0; 
                seconds = leadingZero(seconds);
                document.getElementById("seconds").innerHTML = seconds;
//          b. call 2nd generator to increase minutes
                yield* countMinutes(); //call generator.next() to increase minutes;
            }
//  4. Increase minutes 
            function* countMinutes() {
                if(minutes <59){
                    minutes++;
                    minutes = leadingZero(minutes);
                    document.getElementById("minutes").innerHTML = minutes;
                } else {
                    //reset
                    yield; //call generator.next() to set minutes = 0;
                    minutes = 0;
                    minutes = leadingZero(minutes);
                    document.getElementById("minutes").innerHTML = minutes;
                    yield* countHours(); //call generator.next() to increase hours
                }
            }
//  5. Increase hours
            function* countHours(){
                if (hours < 11) {
                    hours++;
                    hours = leadingZero(hours);
                    document.getElementById("hours").innerHTML = hours;
                } else {
                    yield; //call generator.next() to set hours = 0;
                    hours = 0;
                    hours = leadingZero(hours);
                    document.getElementById("hours").innerHTML = hours;
                }
            }
//      run generators
        let myGen = runGenerators();
        myGen.next();  //set seconds = 0;
        myGen.next();  //increase minutes (call countMinute());
        myGen.next();  //set minutes = 0;
        myGen.next();  // set hours = 0;
    }