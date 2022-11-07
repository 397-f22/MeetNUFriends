// var distance = require('jaro-winkler');

const tokenize = (string) => {
    return string.split(/[,.\s]/)
}

const stem = (string) => {
    var stemmer = require('porter-stemmer').stemmer
    return stemmer(string)
}

export const getBigrams = (string) =>{
    var s = string.toLowerCase()
    var v = s.split(''); 
    for(var i=0; i<v.length; i++){
        v[i] = s.slice(i, i + 2); 
    } 
    return v; 
} 

export const stringSimilarity = (str1, str2) =>{ 
    if(str1.length>0 && str2.length>0){ 
        const stems1 = tokenize(str1.toLocaleLowerCase()).map(word => stem(word))
        const stems2 = tokenize(str2.toLocaleLowerCase()).map(word => stem(word))
        console.log('-------')
        console.log(stems1)
        console.log(stems2)
        console.log('-------')
        const matches = stems1.filter(stem => stems2.includes(stem))
        console.log(matches.length/(stems1.length > stems2.length? stems1.length: stems2.length))
        return matches.length/(stems1.length > stems2.length? stems1.length: stems2.length)

        

    } 
    
    console.log(0)
    return 0.0 
}