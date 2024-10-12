/********************************************************************************
* WEB700 – Assignment 03
*
* I declare that this assignment is my own work in accordance with Seneca's
* Academic Integrity Policy:
*
* https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
*
* Name: Masfiur R Chowdhury Student ID: 150173235 Date: 11 Oct 2024
*
********************************************************************************/


class LegoData {

    constructor() {
        this.sets = []
    }

    initialize() {

        return new Promise((resolve, reject) => {
            const setData = require("../data/setData");
            const themeData = require("../data/themeData");
            
    
            setData.forEach((el) => {
                const theme = themeData.find(themeel => themeel.id === el.theme_id)
                let themeName;
    
                if (theme) {
                    themeName = theme.name
                } else {
                    themeName = " "
                }
    
                el.theme = themeName
                this.sets.push(el)
            });
            resolve()
        })
    }

    getAllSets() {
        return new Promise((resolve, reject) => {
            resolve(this.sets)
        })
    }

    getSetByNum(setNum) {
        return new Promise((resolve, reject) => {
            const nSet = this.sets.find(set => set.set_num === setNum);
            if (nSet) {
                resolve(nSet);
            } else {
                reject("unable to find requested set");
            }
        });
    }

    getSetsByTheme(theme) {
        return new Promise((resolve, reject) => {
            const nSet = this.sets.filter(set =>
                set.theme.toLowerCase().includes(theme.toLowerCase())
            );
            if (nSet.length > 0) {
                resolve(nSet);
            } else {
                reject("unable to find requested set");
            }
        });
    }
}

let data = new LegoData();  

data.initialize().then(() => {
    return data.getAllSets();
}).then((sets) => {
    console.log(`Number of Sets: ${sets.length}`);
    return data.getSetByNum("0012-1");
}).then((set) => {
    console.log(set);
    return data.getSetsByTheme('tech');
}).then((theme) => {
    console.log(`Number of 'tech' sets: ${theme.length}`);
}).catch((err) => {
    console.error("Error:", err);
});

module.exports = LegoData;
