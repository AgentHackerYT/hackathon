const fs = require('fs');

class Database {

    constructor(){

        this.db = new Map()

        this.loadDatabase()

    }

    loadDatabase(){

        const exists = fs.existsSync("./database.json")

        if(!exists) fs.writeFileSync("./database.json", "[]")

        const data = fs.readFileSync("./database.json", "ascii")

        if(!data) fs.writeFileSync("./database.json", "[]")

        let JSONParsed

        try{
            
        JSONParsed = JSON.parse(data)

        JSONParsed.forEach(value =>{

            this.db.set(value.key, value.value)

        })

    }catch(err){    

    }

    }

    saveData(){
        

		if(!this.db.entries()) return;

		let arr = []

		this.db.forEach((value , key) =>{

			arr.push({key: key, value: value})

		})

		fs.writeFileSync("database.json", JSON.stringify(arr.map(x => {return {key: x.key, value: x.value}})))


    }

    set(key, value){

        this.db.set(key, value)

        this.saveData()

    }

    delete(key){

        this.db.delete(key)

        this.saveData()

    }

    get(key){

        return this.db.get(key)

    }

    add(key, value){

        if(typeof value !== 'number') value = parseInt(value)

        const parsedNo = parseInt(this.db.get(key)) || 0

        this.db.set(key , parsedNo + value)

        this.saveData()

    }
    
    subtract(key, value){

        if(typeof value !== 'number') value = parseInt(value)

        const parsedNo = parseInt(this.db.get(key)) || 0

        this.db.set(key , parsedNo - value)

        this.saveData()

    }

    push(key, value){

        let got = JSON.parse(this.db.get(key)) 

        if(typeof got !== "object") {;got = []}

        got.push(value)

        this.db.set(key, JSON.stringify(got))

        this.saveData()


    }

}

module.exports = Database