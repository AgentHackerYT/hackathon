const easyArr = ['🍇', '🍊', '🍐', '🍋', '🍌', '🥝','🥥'];

const medArr = ':heart: :brown_heart: :green_heart: :black_heart: :blue_heart: :purple_heart: :orange_heart: :white_heart: 💖 💘 💝'.split(' ')
 function slots(mode = "easy"){

    if(mode == "medium"){

        const shuffled = SlotShuffle(easyArr)
            
            if(shuffled.array[0] == '🍌' && shuffled[0] == shuffled.array[1] && shuffled.array[1] == shuffled.array[2]){

                return { 

                    won: true,

                    jackpot: true,

                    multiplier: 10,

                    result: shuffled.array.map(x => x).join(" ")

                }

            }else if(shuffled.array[0] == '🍇' && shuffled[0] == shuffled.array[1] && shuffled.array[1] == shuffled.array[2]){

                return { 

                    won: true,

                    jackpot: false,

                    multiplier: 8,

                    result: shuffled.array.map(x => x).join(" ")

                }

            }else if(shuffled.array[0] == shuffled.array[1] && (shuffled.array[1] == shuffled.array[2])){

                return {

                    won: true,

                    jackpot: false,

                    multiplier: 6,

                    result: shuffled.array.map(x => x).join(" ")

                }

            }else if(shuffled.array[0] == shuffled.array[1] || shuffled[1] == shuffled.array[2] || shuffled[2] == shuffled.array[0]){

                return {

                    won: true,

                    jackpot: false,

                    multiplier: 2,

                    result: shuffled.array.map(x => x).join(" ")

                }

            }else if(shuffled.array[0] == "🍋" || shuffled.array[1] == "🍋" || shuffled.array[2] == "🍋" && shuffled.array[0] == shuffled.array[1] || shuffled.array[2] == shuffled.array[1] || shuffled.array[0] == shuffled.array[2]){

                return {

                    won: true,

                    jackpot: false,

                    multiplier: 3,

                    result: shuffled.array.map(x => x).join(" ")

                }

            }else if(shuffled.array[0] == "🍐" || shuffled.array[1] == "🍐" || shuffled.array[2] == "🍐" && shuffled.array[0] == shuffled.array[1] || shuffled.array[2] == shuffled.array[1] || shuffled.array[0] == shuffled.array[2]){

                return {

                    won: true,

                    jackpot: false,

                    multiplier: 3,

                    result: shuffled.array.map(x => x).join(" ")

                }

            }else{

                return {

                    won: false,

                    jackpot: false,

                    multiplier: (-2),

                    result: shuffled.array.map(x => x).join(" ")

                }

            }


    }

    if(mode == "medium"){

        const shuffled = SlotShuffle(medArr)

        if(shuffled.array[0] == ":heart:" && shuffled.array[0] == shuffled.array[1] && shuffled.array[1] == shuffled.array[2]){

            return {

                won: true,

                jackpot: true,

                multiplier: 30,

                result: shuffled.array.map(x => x).join(" ")

            }

        }else if(shuffled.array[0] == ":green_heart:" && shuffled.array[0] == shuffled.array[1] && shuffled.array[1] == shuffled.array[2] ){

            return {

                won:true,

                jackpot: false,

                multiplier: 20,

                result: shuffled.array.map(x => x).join(" ")

            }

        }else if(shuffled.array[0] == shuffled.array[1] || shuffled.array[1] == shuffled.array[2] || shuffled.array[2] == shuffled.array[0]){

            return {

                won: true,

                jackpot: false,

                multiplier: 18,

                result: shuffled.array.map(x => x).join(" ")

            }

        }else if(shuffled.array[0] == ":black_heart:" || shuffled.array[1] == ":black_heart:" || shuffled.array[2] == ":black_heart:" && shuffled.array[1] == shuffled.array[2] || shuffled.array[1] == shuffled.array[0] || shuffled.array[0] == shuffled.array[2]){

            return {

                won: true,

                jackpot: false,

                multiplier: 13,

                result: shuffled.array.map(x => x).join(" ")

            }

        }else if(shuffled.array[0] == "💖" || shuffled.array[1] == "💖" || shuffled.array[2] == "💖" && shuffled.array[0] == shuffled.array[1] || shuffled.array[1]  == shuffled.array[2] || shuffled.array[2] == shuffled.array[0]){

        return {

            won: true,

            jackpot: false,

            multiplier: 10,

            result: shuffled.array.map(x => x).join(" ")

        }
    }else{

        return {

            won: false,

            jackpot: false,

            multiplier: (-5),

            result: shuffled.array.map(x => x).join(" ")

        }

    }

    }

}

function SlotShuffle(array){

    const shuffle1 = array[Math.floor(Math.random() * array.length)];

    const shuffle2 = array[Math.floor(Math.random() * array.length)];

    const shuffle3 = array[Math.floor(Math.random() * array.length)];

    return {

        array: [ shuffle1, shuffle2, shuffle3 ],

        object: {

            shuffle1: shuffle1,

            shuffle2: shuffle2,

            shuffle3: shuffle3

        }
    }

}

module.exports = slots